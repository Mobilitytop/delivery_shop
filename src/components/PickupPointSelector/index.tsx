import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Cdek } from '../../api/cdek';
import { DeliveryMethodId } from './types';
import SelectDropdown from 'react-native-select-dropdown';

// Тип для пункта выдачи
type PickupPoint = {
  code: string;
  name: string;
  address: string;
  workTime: string;
};

// Пропсы компонента
type PickupPointSelectorProps = {
  deliveryMethod: DeliveryMethodId;
  cdekConfig?: {
    account: string;
    password: string;
    url_base: 'https://api.edu.cdek.ru/v2' | 'https://api.cdek.ru/v2';
  };
  toAddress: string;
  toIndex: string | number;
  colors?: Colors;
  onSelect?: (pickupPoint: PickupPoint) => void;
  onError?: (error: Error) => void;
};

// Тип для кастомизации цветов
type Colors = {
  text?: string;
  background?: string;
  border?: string;
  primary?: string;
  radioBorder?: string;
  radioFill?: string;
};

const PickupPointSelector: React.FC<PickupPointSelectorProps> = ({
  deliveryMethod,
  cdekConfig,
  toIndex,
  colors,
  onSelect,
  onError,
}) => {
  const [pickupPoints, setPickupPoints] = useState<PickupPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const fetchPickupPoints = useCallback(async () => {
    if (deliveryMethod !== DeliveryMethodId.CDEK_POINT || !CDEKClient) return;

    try {
      setIsLoading(true);
      const response = await CDEKClient.getPickupPoints({
        postal_code: Number(toIndex),
      });
      const points = response.map((point: any) => ({
        code: point.code,
        name: point.name || `Пункт ${point.code}`,
        address: point.location?.address_full || point.location?.address,
        workTime: point.work_time || 'Не указано',
      }));

      setPickupPoints(points);
    } catch (error) {
      console.error('Failed to fetch pickup points:', error);
      setPickupPoints([]);
      onError?.(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [deliveryMethod, CDEKClient, toIndex, onError]);

  useEffect(() => {
    fetchPickupPoints();
  }, []);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors?.background || 'transparent',
          marginTop: 8,
          width: '100%',
        },
        dropdownButton: {
          width: '100%',
          paddingVertical: 10,
          backgroundColor: colors?.background || '#fff',
          borderWidth: 1,
          borderColor: colors?.border || '#00000044',
          borderRadius: 4,
          paddingHorizontal: 10,
        },
        dropdownButtonText: {
          color: colors?.text || '#000',
          fontSize: 14,
          fontWeight: '500',
          textAlign: 'left',
        },
        dropdownRow: {
          backgroundColor: colors?.background || '#fff',
          borderBottomWidth: 0.3,
          borderColor: colors?.border || '#00000044',
          paddingVertical: 10,
          paddingHorizontal: 10,
        },
        dropdownRowText: {
          color: colors?.text || '#000',
          fontSize: 14,
          fontWeight: '500',
          textAlign: 'left',
        },
        loading: {
          color: colors?.text || '#000',
          textAlign: 'center',
          paddingVertical: 10,
        },
      }),
    [colors]
  );

  if (deliveryMethod !== DeliveryMethodId.CDEK_POINT) return null;

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text style={styles.loading}>Загрузка пунктов выдачи...</Text>
      ) : pickupPoints.length > 0 ? (
        <SelectDropdown
          data={pickupPoints}
          onSelect={(selectedItem: PickupPoint) => {
            onSelect?.(selectedItem);
          }}
          renderButton={(selectedItem) => {
            return (
              <View style={styles.dropdownButton}>
                
                <Text style={styles.dropdownButtonText}>
                  {(selectedItem && selectedItem.address) || 'Выберите пункт выдачи'}
                </Text>
              </View>
            );
          }}
          renderItem={(item: PickupPoint) => (
            <View style={styles.dropdownRow}>
              <Text style={[styles.dropdownRowText, { fontSize: 12, marginTop: 4 }]}>
                {item.address}
              </Text>
            </View>
          )}
          dropdownStyle={{ borderRadius: 4 }}
        />
      ) : (
        <Text style={styles.loading}>Пункты выдачи не найдены</Text>
      )}
    </View>
  );
};

export default PickupPointSelector;