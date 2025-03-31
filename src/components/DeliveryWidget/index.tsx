import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { DeliveryMethodId } from './types'; // Предполагается, что типы находятся в отдельном файле
import { fetchPostTariff } from '../../api/post';
import { PostTariffRequest } from '../../api/post/models';
import { Cdek } from '../../api/cdek';
import { ApiRequest } from '../../api/cdek/types/api';
import { Courierist } from '../../api/courierist';
import { LPost } from '../../api/l-post';

// Типы данных для опций доставки
type DeliveryOption = {
  id: DeliveryMethodId | string;
  title: string;
  cost: number;
  duration: string;
};

// Универсальный интерфейс посылки
export interface UniversalPackage {
  weight: number; // Вес в граммах
  length?: number; // Длина в см
  width?: number; // Ширина в см
  height?: number; // Высота в см
  declaredValue?: number; // Объявленная ценность в рублях
  dimensionType?: 'S' | 'M' | 'L' | 'XL' | 'OVERSIZED'; // Типоразмер
}

// Форматы адресов для разных методов доставки
type PostAddress = {
  fromIndex: string;
  toIndex: string;
};

type CdekAddress = {
  fromAddress: string;
  toAddress: string;
};

type CourieristAddress = {
  fromAddress: string;
  toAddress: string;
};

type LPostAddress = {
  fromWarehouseId: number; // ID_Sklad
  toPickupPointId?: number; // ID_PickupPoint (опционально для ПВЗ)
  latitude?: number; // Для курьерской доставки
  longitude?: number; // Для курьерской доставки
};

type DeliveryAddress =
  | { method: DeliveryMethodId.POST; data: PostAddress }
  | { method: DeliveryMethodId.CDEK_DOOR | DeliveryMethodId.CDEK_POINT; data: CdekAddress }
  | { method: DeliveryMethodId.COURIERIST; data: CourieristAddress }
  | { method: DeliveryMethodId.LPOST_COURIER; data: LPostAddress }
  | { method: DeliveryMethodId.LPOST_POINT; data: LPostAddress };

type DeliveryWidgetProps = {
  colors?: Colors;
  deliveryMethods: DeliveryAddress[];
  packages: UniversalPackage[];
  postConfig?: {
    accessToken: string;
    basicToken: string;
    request: PostTariffRequest;
  };
  cdekConfig?: {
    account: string;
    password: string;
    url_base: 'https://api.edu.cdek.ru/v2' | 'https://api.cdek.ru/v2';
    request: Omit<ApiRequest.CalculatorByTariff, 'tariff_code' | 'to_location' | 'from_location'> &
      Partial<Pick<ApiRequest.CalculatorByTariff, 'tariff_code' | 'to_location' | 'from_location'>>;
  };
  courieristConfig?: {
    login: string;
    password: string;
  };
  lpostConfig?: {
    secret: string;
  };
  customOptions?: DeliveryOption[];
};

// Тип для кастомизации цветов
type Colors = {
  text?: string;
  background?: string;
  border?: string;
  primary?: string;
};

// Метод преобразования универсального формата посылки
const convertPackage = (packages: UniversalPackage[], method: DeliveryMethodId) => {
  switch (method) {
    case DeliveryMethodId.POST: {
      const totalMass = packages.reduce((sum, pkg) => sum + pkg.weight, 0);
      const dimensions = packages[0];
      return {
        mass: totalMass,
        ...(dimensions?.length && dimensions?.width && dimensions?.height
          ? {
              dimension: {
                length: dimensions.length,
                width: dimensions.width,
                height: dimensions.height,
              },
            }
          : {}),
        'dimension-type': dimensions?.dimensionType,
        'declared-value': dimensions?.declaredValue,
      };
    }
    case DeliveryMethodId.CDEK_DOOR:
    case DeliveryMethodId.CDEK_POINT:
      return {
        packages: packages.map((pkg) => ({
          weight: pkg.weight,
          length: pkg.length,
          width: pkg.width,
          height: pkg.height,
        })),
      };
    case DeliveryMethodId.COURIERIST:
      return {
        shipment: packages.map((pkg) => ({
          weight: pkg.weight / 1000, // Перевод в кг
          length: (pkg.length || 0) + (pkg.width || 0) + (pkg.height || 0),
          unit: 1,
        })),
      };
    case DeliveryMethodId.LPOST_COURIER:
    case DeliveryMethodId.LPOST_POINT:
      return {
        Weight: packages.reduce((sum, pkg) => sum + pkg.weight, 0), // Суммарный вес в граммах
        Value: packages[0]?.declaredValue || 0, // Объявленная стоимость
      };
    default:
      return {};
  }
};

const DeliveryWidget: React.FC<DeliveryWidgetProps> = ({
  colors,
  deliveryMethods,
  packages,
  postConfig,
  cdekConfig,
  courieristConfig,
  lpostConfig,
  customOptions = [],
}) => {
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const CDEKClient = useMemo(
    () =>
      cdekConfig
        ? new Cdek({
            account: cdekConfig.account,
            password: cdekConfig.password,
            url_base: cdekConfig.url_base,
          })
        : null,
    [cdekConfig?.account, cdekConfig?.password, cdekConfig?.url_base]
  );

  const CourieristClient = useMemo(
    () =>
      courieristConfig
        ? new Courierist({
            login: courieristConfig.login,
            password: courieristConfig.password,
          })
        : null,
    [courieristConfig?.login, courieristConfig?.password]
  );

  const LPostClient = useMemo(
    () =>
      lpostConfig
        ? new LPost({
            secret: lpostConfig.secret,
          })
        : null,
    [lpostConfig?.secret]
  );

  const fetchDeliveryOptions = useCallback(async () => {
    try {
      setIsLoading(true);
      const options: DeliveryOption[] = [];

      // Авторизация для сервисов, если используются
      if (CourieristClient) await CourieristClient.authenticate();
      if (LPostClient) await LPostClient.authenticate();

      const requests: Promise<any>[] = deliveryMethods.map((method) => {
        switch (method.method) {
          case DeliveryMethodId.POST:
            if (!postConfig) return Promise.resolve(null);
            const postPackageData = convertPackage(packages, DeliveryMethodId.POST);
            return fetchPostTariff({
              accessToken: postConfig.accessToken,
              basicToken: postConfig.basicToken,
              body: {
                'index-from': method.data.fromIndex,
                'index-to': method.data.toIndex,
                ...postConfig.request,
                ...postPackageData,
              },
            }).catch(() => null);

          case DeliveryMethodId.CDEK_DOOR:
            if (!CDEKClient || !cdekConfig) return Promise.resolve(null);
            const cdekDoorPackageData = convertPackage(packages, DeliveryMethodId.CDEK_DOOR);
            return CDEKClient.calculatorByTariff({
              ...cdekConfig.request,
              tariff_code: 137,
              from_location: { address: method.data.fromAddress },
              to_location: { address: method.data.toAddress },
              ...cdekDoorPackageData,
            }).catch(() => null);

          case DeliveryMethodId.CDEK_POINT:
            if (!CDEKClient || !cdekConfig) return Promise.resolve(null);
            const cdekPointPackageData = convertPackage(packages, DeliveryMethodId.CDEK_POINT);
            return CDEKClient.calculatorByTariff({
              ...cdekConfig.request,
              tariff_code: 136,
              from_location: { address: method.data.fromAddress },
              to_location: { address: method.data.toAddress },
              ...cdekPointPackageData,
            }).catch(() => null);

          case DeliveryMethodId.COURIERIST:
            if (!CourieristClient) return Promise.resolve(null);
            return CourieristClient.evaluateOrder(method.data, packages).catch(() => null);

          case DeliveryMethodId.LPOST_COURIER:
            if (!LPostClient || !method.data.latitude || !method.data.longitude)
              return Promise.resolve(null);
            const lpostCourierPackageData = convertPackage(packages, DeliveryMethodId.LPOST_COURIER);
            return LPostClient.getServicesCalc({
              fromWarehouseId: method.data.fromWarehouseId,
              latitude: method.data.latitude,
              longitude: method.data.longitude,
              weight: lpostCourierPackageData.Weight || 1,
              value: lpostCourierPackageData.Value || 0,
              sumPayment: 0,
              options: { fitting: false, returnDocuments: false },
            }).catch(() => null);

          case DeliveryMethodId.LPOST_POINT:
            if (!LPostClient || !method.data.toPickupPointId) return Promise.resolve(null);
            const lpostPointPackageData = convertPackage(packages, DeliveryMethodId.LPOST_POINT);
            return LPostClient.getServicesCalc({
              fromWarehouseId: method.data.fromWarehouseId,
              toPickupPointId: method.data.toPickupPointId,
              weight: lpostPointPackageData.Weight || 1,
              value: lpostPointPackageData.Value || 0,
              sumPayment: 0,
              options: { fitting: false, returnDocuments: false },
            }).catch(() => null);

          default:
            return Promise.resolve(null);
        }
      });

      const responses = await Promise.all(requests);

      deliveryMethods.forEach((method, index) => {
        const response = responses[index];
        switch (method.method) {
          case DeliveryMethodId.POST:
            if (response?.['total-rate']) {
              options.push({
                id: DeliveryMethodId.POST,
                title: 'Почта России',
                cost: response['total-rate'] / 100,
                duration: `до ${response['delivery-time']['max-days']} дней`,
              });
            }
            break;

          case DeliveryMethodId.CDEK_DOOR:
            if (response?.total_sum) {
              options.push({
                id: DeliveryMethodId.CDEK_DOOR,
                title: 'СДЭК-экспресс (до двери)',
                cost: response.total_sum,
                duration: `${response.period_min}-${response.period_max} дней`,
              });
            }
            break;

          case DeliveryMethodId.CDEK_POINT:
            if (response?.total_sum) {
              options.push({
                id: DeliveryMethodId.CDEK_POINT,
                title: 'СДЭК-экспресс (до пункта выдачи)',
                cost: response.total_sum,
                duration: `${response.period_min}-${response.period_max} дней`,
              });
            }
            break;

          case DeliveryMethodId.COURIERIST:
            if (response?.price) {
              options.push({
                id: DeliveryMethodId.COURIERIST,
                title: 'Курьерист',
                cost: response.price,
                duration: response.delivery_intervals?.length
                  ? `${response.delivery_intervals[0].timeFrom}-${response.delivery_intervals[0].timeTo} (${response.estimate_at})`
                  : `до ${response.estimate_at}`,
              });
            }
            break;

          case DeliveryMethodId.LPOST_COURIER:
            if (response?.sumCost) {
              options.push({
                id: DeliveryMethodId.LPOST_COURIER,
                title: 'Л-Пост (курьер)',
                cost: response.sumCost,
                duration: response.possibleDelivDates?.length
                  ? `${response.possibleDelivDates[0].intervals[0].timeFrom}-${response.possibleDelivDates[0].intervals[0].timeTo} (${response.possibleDelivDates[0].dateDelive})`
                  : `${response.dayLogistic} дн.`,
              });
            }
            break;

          case DeliveryMethodId.LPOST_POINT:
            if (response?.sumCost) {
              options.push({
                id: DeliveryMethodId.LPOST_POINT,
                title: 'Л-Пост (до ПВЗ)',
                cost: response.sumCost,
                duration: `${response.dayLogistic} дн.`,
              });
            }
            break;
        }
      });

      setDeliveryOptions([...options, ...customOptions]);
    } catch (error) {
      console.error('Failed to fetch delivery options:', error);
      setDeliveryOptions([...customOptions]);
    } finally {
      setIsLoading(false);
    }
  }, [
    deliveryMethods,
    packages,
    postConfig,
    cdekConfig,
    courieristConfig,
    lpostConfig,
    customOptions,
    CDEKClient,
    CourieristClient,
    LPostClient,
  ]);

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
        date: {
          color: colors?.text || '#000',
          marginTop: 10,
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