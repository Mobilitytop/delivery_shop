import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { DeliveryMethodId } from '../DeliveryMethod/types';
import { fetchPostTariff } from '../../api/post';
import { PostTariffRequest } from '../../api/post/models';
import { Cdek } from '../../api/cdek';
import { ApiRequest } from '../../api/cdek/types/api';

type DeliveryWidgetProps = {
  colors?: Colors;
  address: string;
  index: string;
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
  customOptions?: DeliveryOption[];
};

type DeliveryOption = {
  id: DeliveryMethodId | string;
  title: string;
  cost: number;
  duration: string;
};

type Colors = {
  text?: string;
  background?: string;
  border?: string;
  primary?: string;
};

const DeliveryWidget: React.FC<DeliveryWidgetProps> = ({
  colors,
  address,
  index,
  postConfig,
  CDEKConfig,
  customOptions = [],
}) => {
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const CDEKClient = useMemo(
    () =>
      new Cdek({
        account: CDEKConfig.account,
        password: CDEKConfig.password,
        url_base: CDEKConfig.url_base,
      }),
    [CDEKConfig.account, CDEKConfig.password, CDEKConfig.url_base]
  );

  const fetchDeliveryOptions = useCallback(async () => {
    try {
      setIsLoading(true);
      const options: DeliveryOption[] = [];

      const [postResponse, cdekDoorResponse, cdekPointResponse] =
        await Promise.all([
          fetchPostTariff({
            accessToken: postConfig.accessToken,
            basicToken: postConfig.basicToken,
            body: { 'index-to': index, ...postConfig.request },
          }).catch(() => null),

          CDEKClient.calculatorByTariff({
            ...CDEKConfig.request,
            tariff_code: 137,
            to_location: { address },
          }).catch(() => null),

          CDEKClient.calculatorByTariff({
            ...CDEKConfig.request,
            tariff_code: 136,
            to_location: { address },
          }).catch(() => null),
        ]);

      if (postResponse?.['total-rate']) {
        options.push({
          id: DeliveryMethodId.POST,
          title: 'Почта России',
          cost: postResponse['total-rate'] / 100,
          duration: `до ${postResponse['delivery-time']['max-days']} дней`,
        });
      }

      if (cdekDoorResponse?.total_sum) {
        options.push({
          id: DeliveryMethodId.CDEK_DOOR,
          title: 'СДЭК-экспресс (до двери)',
          cost: cdekDoorResponse.total_sum,
          duration: `${cdekDoorResponse.period_min}-${cdekDoorResponse.period_max} дней`,
        });
      }

      if (cdekPointResponse?.total_sum) {
        options.push({
          id: DeliveryMethodId.CDEK_POINT,
          title: 'СДЭК-экспресс (до пункта выдачи)',
          cost: cdekPointResponse.total_sum,
          duration: `${cdekPointResponse.period_min}-${cdekPointResponse.period_max} дней`,
        });
      }

      setDeliveryOptions([...options, ...customOptions]);
    } catch (error) {
      console.error('Failed to fetch delivery options:', error);
      setDeliveryOptions([...customOptions]);
    } finally {
      setIsLoading(false);
    }
  }, [CDEKClient, CDEKConfig, postConfig, address, index, customOptions]);

  useEffect(() => {
    fetchDeliveryOptions();
  }, [fetchDeliveryOptions]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors?.background || 'transparent',
          marginTop: 16,
          width: '100%',
        },
        option: {
          color: colors?.text || '#000',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 10,
          borderBottomWidth: 0.3,
          paddingVertical: 25,
          borderColor: colors?.border || '#00000044',
        },
        title: {
          color: colors?.text || '#000',
          fontSize: 16,
          fontWeight: '600',
        },
        date:{
          color: colors?.text || '#000',
          marginTop:10,
          fontSize: 16,
        },
        loading: {
          color: colors?.text || '#000',
          textAlign: 'center',
        },
        section: { flex: 1, maxWidth: '90%' },
      }),
    [colors]
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text style={styles.loading}>Загрузка...</Text>
      ) : deliveryOptions.length > 0 ? (
        deliveryOptions.map((option) => (
          <View key={option.id} style={styles.option}>
            <View style={styles.section}>
              <Text style={styles.title}>{option.title}</Text>
              <Text style={styles.date}>Срок доставки: {option.duration}</Text>
            </View>
            <Text style={styles.title}>
              {option.cost === 0
                ? 'Бесплатно'
                : `${parseFloat(option.cost + '').toFixed(1)} руб.`}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.loading}>Нет доступных вариантов доставки</Text>
      )}
    </View>
  );
};

export default DeliveryWidget;
