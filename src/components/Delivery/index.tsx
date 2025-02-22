import React, { useMemo, useState } from 'react';
import { Text, TextStyle, View, ViewStyle } from 'react-native';
import defaultStyles from './styles';
import DeliveryMethod from '../DeliveryMethod';
import CurrentDeliveryMethod from '../CurrentDeliveryMethod';
import { DeliveryMethodId, DeliveryMethodStyle } from '../DeliveryMethod/types';
import useApp from '../../hooks/useApp';
import DeliveryForms from '../DeliveryForms';
import { DeliveryFormData, DeliveryFormsStyles } from '../DeliveryForms/types';
import { fetchPostTariff } from '../../api/post';
import { PostTariffRequest } from '../../api/post/models';
import { CurrentDeliveryMethodStyle } from '../CurrentDeliveryMethod/types';
import { Cdek } from '../../api/cdek';
import { ApiRequest } from '../../api/cdek/types/api';

type DeliveryConfig = {
  postConfig: {
    accessToken: string;
    basicToken: string;
    request: PostTariffRequest;
  };
  CDEKConfig: {
    account: string;
    password: string;
    url_base: 'https://api.edu.cdek.ru/v2' | 'https://api.cdek.ru/v2';
    request: Omit<
      ApiRequest.CalculatorByTariff,
      'tariff_code' | 'to_location'
    > &
      Partial<
        Pick<ApiRequest.CalculatorByTariff, 'tariff_code' | 'to_location'>
      >;
  };
  deliveryMethods?: DeliveryMethodId[];
  styles?: {
    container?: ViewStyle;
    title?: TextStyle;
    deliveryMethod?: DeliveryMethodStyle;
    deliveryForms?: DeliveryFormsStyles;
    currentDeliveryMethod?: CurrentDeliveryMethodStyle;
  };
};

const initialFormData: DeliveryFormData = {
  address: '',
  entrance: '',
  flat: '',
  floor: '',
  intercom: '',
  index: '',
  comment: '',
  city: null,
  pickupPoint: null,
};

const Delivery: React.FC<DeliveryConfig> = ({
  styles,
  postConfig,
  CDEKConfig,
}) => {
  const { isDarkMode } = useApp();
  const [edit, setEdit] = useState(true);
  const [rate, setRate] = useState(0);
  const [formData, setFormData] = useState(initialFormData);

  const CDEKClient = useMemo(() => {
    return new Cdek({
      account: CDEKConfig.account,
      password: CDEKConfig.password,
      url_base: CDEKConfig.url_base,
    });
  }, [CDEKConfig.account, CDEKConfig.password, CDEKConfig.url_base]);

  const [activeDeliveryMethod, setActiveDeliveryMethod] =
    useState<DeliveryMethodId>(DeliveryMethodId.COURIER);

  const onSelectDeliveryMethod = (id: DeliveryMethodId) => {
    setActiveDeliveryMethod(id);
    setRate(0);
    onChangeFormData(initialFormData);
  };

  const onChangeFormData = (value: DeliveryFormData) => {
    setFormData((prev) => ({ ...prev, ...value }));
  };

  const onSave = async () => {
    setEdit(false);

    if (activeDeliveryMethod === DeliveryMethodId.POST) {
      const data = await fetchPostTariff({
        accessToken: postConfig.accessToken,
        basicToken: postConfig.basicToken,
        body: { 'index-to': formData.index, ...postConfig.request },
      });

      if (data?.['total-rate']) {
        setRate(data?.['total-rate'] / 100);
      }
    } else if (activeDeliveryMethod === DeliveryMethodId.CDEK_POINT) {
      const data = await CDEKClient.calculatorByTariff({
        ...CDEKConfig.request,
        tariff_code: 136,
        to_location: {
          code: formData.city?.code,
        },
      });

      setRate(data?.total_sum);
    } else if (activeDeliveryMethod === DeliveryMethodId.CDEK_DOOR) {
      const params = {
        ...CDEKConfig.request,
        tariff_code: 137,
        to_location: {
          code: formData.city?.code,
          address: `${formData.address} ${formData.entrance}д. ${formData.floor}эт. ${formData.flat}кв. Домофон: ${formData.intercom}`,
        },
      };

      const data = await CDEKClient.calculatorByTariff(params);

      setRate(data?.total_sum);
    }
  };

  return (
    <View style={{ ...defaultStyles.container, ...styles?.container }}>
      <Text
        style={{
          color: isDarkMode ? '#fff' : '#000',
          ...defaultStyles.title,
          ...styles?.title,
        }}
      >
        Способ Доставки
      </Text>
      {edit ? (
        <>
          <DeliveryMethod
            styles={styles?.deliveryMethod}
            onSelectDeliveryMethod={onSelectDeliveryMethod}
            activeDeliveryMethod={activeDeliveryMethod}
          />
          <DeliveryForms
            styles={styles?.deliveryForms}
            activeDeliveryMethod={activeDeliveryMethod}
            formData={formData}
            onChangeFormData={onChangeFormData}
            onSave={onSave}
            CDEKClient={CDEKClient}
          />
        </>
      ) : (
        <CurrentDeliveryMethod
          styles={styles?.currentDeliveryMethod}
          activeDeliveryMethod={activeDeliveryMethod}
          formData={formData}
          rate={rate}
          onEdit={() => {
            setEdit(true);
          }}
        />
      )}
    </View>
  );
};

export default Delivery;
