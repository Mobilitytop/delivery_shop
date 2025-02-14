import React, { useState } from 'react';
import { StyleSheetProperties, Text, View, ViewStyle } from 'react-native';
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

type DeliveryConfig = {
  postConfig: {
    accessToken: string;
    basicToken: string;
    request: PostTariffRequest;
  };
  deliveryMethods?: DeliveryMethodId[];
  styles?: {
    container?: ViewStyle;
    title?: StyleSheetProperties;
    deliveryMethod?: DeliveryMethodStyle;
    deliveryForms?: DeliveryFormsStyles;
    currentDeliveryMethod?: CurrentDeliveryMethodStyle;
  };
};

const initialFormData: DeliveryFormData = {
  address: '',
  index: '',
  comment: '',
};

const Delivery: React.FC<DeliveryConfig> = ({ styles, postConfig }) => {
  const { isDarkMode } = useApp();
  const [edit, setEdit] = useState(true);
  const [rate, setRate] = useState(0);
  const [formData, setFormData] = useState(initialFormData);

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

    console.log('Helloi=======>');

    if (activeDeliveryMethod === DeliveryMethodId.POST) {
      const data = await fetchPostTariff({
        accessToken: postConfig.accessToken,
        basicToken: postConfig.basicToken,
        body: { 'index-to': formData.index, ...postConfig.request },
      });

      console.log('data======>', data);

      setRate(data?.['total-rate']);
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
