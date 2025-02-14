import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { DeliveryMethodProps } from './types';
import { deliveriesData } from './data';
import defaultStyles from './styles';
import useApp from '../../hooks/useApp';

const DeliveryMethod: React.FC<DeliveryMethodProps> = ({
  styles,
  onSelectDeliveryMethod: onPress,
  activeDeliveryMethod: active,
  deliveryMethods,
}) => {
  const { isDarkMode } = useApp();

  const deliveries = useMemo(() => {
    if (deliveryMethods?.length) {
      return deliveriesData?.filter((el) =>
        deliveryMethods.some((el2) => el.id === el2)
      );
    }

    return deliveriesData;
  }, [deliveryMethods]);

  return (
    <View style={{ ...defaultStyles.container, ...styles?.container }}>
      {deliveries?.map((el) => (
        <TouchableOpacity
          key={el.id}
          onPress={() => {
            onPress(el.id);
          }}
          style={{
            ...defaultStyles.item,
            ...styles?.item,
          }}
        >
          <View
            style={{
              ...defaultStyles.itemInner,
              ...styles?.itemInner,
            }}
          >
            <View
              style={{
                ...defaultStyles.itemContainer,
                ...styles?.itemContainer,
              }}
            >
              <Text
                style={{
                  color: isDarkMode ? '#fff' : '#000',
                  ...defaultStyles.title,
                  ...styles?.title,
                }}
              >
                {el.title}
              </Text>
              {el.description && (
                <Text
                  style={{
                    color: isDarkMode ? '#fff' : '#000',
                    ...defaultStyles.description,
                    ...styles?.description,
                  }}
                >
                  {el.description}
                </Text>
              )}
            </View>
            <View
              style={{
                ...defaultStyles.checkbox,
                ...styles?.checkbox,
                backgroundColor: active === el.id ? '#F93D00' : undefined,
              }}
            >
              {active === el.id && (
                <View
                  style={{
                    ...defaultStyles.checkboxActive,
                    ...styles?.checkboxActive,
                  }}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default DeliveryMethod;
