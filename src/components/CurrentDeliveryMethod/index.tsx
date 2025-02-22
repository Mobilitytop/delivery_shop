import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import defaultStyles from './styles';
import useApp from '../../hooks/useApp';
import { deliveriesData } from '../DeliveryMethod/data';
import { CurrentDeliveryMethodProps } from './types';

const CurrentDeliveryMethod: React.FC<CurrentDeliveryMethodProps> = ({
  rate,
  styles,
  activeDeliveryMethod,
  formData,
  onEdit,
}) => {
  const { isDarkMode } = useApp();

  const currentDelivery = useMemo(() => {
    return deliveriesData.find((el) => el.id === activeDeliveryMethod);
  }, [activeDeliveryMethod]);

  return (
    <View style={{ ...defaultStyles.container, ...styles?.container }}>
      <View
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
            <View
              style={{
                ...defaultStyles.header,
                ...styles?.header,
              }}
            >
              <Text
                style={{
                  color: isDarkMode ? '#fff' : '#000',
                  ...defaultStyles.title,
                  ...styles?.title,
                }}
              >
                {currentDelivery?.title}
              </Text>
              <TouchableOpacity
                style={{
                  ...defaultStyles.edit,
                  ...styles?.edit,
                }}
                onPress={onEdit}
              >
                <Text
                  style={{
                    color: isDarkMode ? '#fff' : '#000',
                    ...defaultStyles.editText,
                    ...styles?.editText,
                  }}
                >
                  Изменить
                </Text>
              </TouchableOpacity>
            </View>

            {!!currentDelivery?.description && (
              <Text
                style={{
                  color: isDarkMode ? '#fff' : '#000',
                  ...defaultStyles.description,
                  ...styles?.description,
                }}
              >
                {currentDelivery.description}
              </Text>
            )}

            {formData.pickupPoint && (
              <View
                style={{
                  ...defaultStyles.descriptionWrapper,
                  ...styles?.descriptionWrapper,
                }}
              >
                <Text
                  style={{
                    color: isDarkMode ? '#fff' : '#000',
                    ...defaultStyles.description,
                    ...styles?.description,
                  }}
                >
                  Пункт СДЕК
                </Text>
                <Text
                  style={{
                    color: isDarkMode ? '#fff' : '#000',
                    ...defaultStyles.description,
                    ...styles?.description,
                  }}
                >
                  {formData.pickupPoint?.name}
                </Text>
              </View>
            )}

            {!!formData.address && (
              <View
                style={{
                  ...defaultStyles.descriptionWrapper,
                  ...styles?.descriptionWrapper,
                }}
              >
                <Text
                  style={{
                    color: isDarkMode ? '#fff' : '#000',
                    ...defaultStyles.description,
                    ...styles?.description,
                  }}
                >
                  Адрес
                </Text>
                <Text
                  style={{
                    color: isDarkMode ? '#fff' : '#000',
                    ...defaultStyles.description,
                    ...styles?.description,
                  }}
                >
                  {formData.address}
                </Text>
              </View>
            )}

            {!!formData.flat && (
              <View
                style={{
                  ...defaultStyles.descriptionWrapper,
                  ...styles?.descriptionWrapper,
                }}
              >
                <Text
                  style={{
                    color: isDarkMode ? '#fff' : '#000',
                    ...defaultStyles.description,
                    ...styles?.description,
                  }}
                >
                  Квартира
                </Text>
                <Text
                  style={{
                    color: isDarkMode ? '#fff' : '#000',
                    ...defaultStyles.description,
                    ...styles?.description,
                  }}
                >
                  {formData.flat}
                </Text>
              </View>
            )}

            {!!formData.entrance && (
              <View
                style={{
                  ...defaultStyles.descriptionWrapper,
                  ...styles?.descriptionWrapper,
                }}
              >
                <Text
                  style={{
                    color: isDarkMode ? '#fff' : '#000',
                    ...defaultStyles.description,
                    ...styles?.description,
                  }}
                >
                  Подъезд
                </Text>
                <Text
                  style={{
                    color: isDarkMode ? '#fff' : '#000',
                    ...defaultStyles.description,
                    ...styles?.description,
                  }}
                >
                  {formData.entrance}
                </Text>
              </View>
            )}

            {!!formData.floor && (
              <View
                style={{
                  ...defaultStyles.descriptionWrapper,
                  ...styles?.descriptionWrapper,
                }}
              >
                <Text
                  style={{
                    color: isDarkMode ? '#fff' : '#000',
                    ...defaultStyles.description,
                    ...styles?.description,
                  }}
                >
                  Этаж
                </Text>
                <Text
                  style={{
                    color: isDarkMode ? '#fff' : '#000',
                    ...defaultStyles.description,
                    ...styles?.description,
                  }}
                >
                  {formData.floor}
                </Text>
              </View>
            )}

            {!!formData.intercom && (
              <View
                style={{
                  ...defaultStyles.descriptionWrapper,
                  ...styles?.descriptionWrapper,
                }}
              >
                <Text
                  style={{
                    color: isDarkMode ? '#fff' : '#000',
                    ...defaultStyles.description,
                    ...styles?.description,
                  }}
                >
                  Домофон
                </Text>
                <Text
                  style={{
                    color: isDarkMode ? '#fff' : '#000',
                    ...defaultStyles.description,
                    ...styles?.description,
                  }}
                >
                  {formData.intercom}
                </Text>
              </View>
            )}

            {!!formData.index && (
              <View
                style={{
                  ...defaultStyles.descriptionWrapper,
                  ...styles?.descriptionWrapper,
                }}
              >
                <Text
                  style={{
                    color: isDarkMode ? '#fff' : '#000',
                    ...defaultStyles.description,
                    ...styles?.description,
                  }}
                >
                  Индекс
                </Text>
                <Text
                  style={{
                    color: isDarkMode ? '#fff' : '#000',
                    ...defaultStyles.description,
                    ...styles?.description,
                  }}
                >
                  {formData.index}
                </Text>
              </View>
            )}

            {!!formData.comment && (
              <View
                style={{
                  ...defaultStyles.descriptionWrapper,
                  ...styles?.descriptionWrapper,
                }}
              >
                <Text
                  style={{
                    color: isDarkMode ? '#fff' : '#000',
                    ...defaultStyles.description,
                    ...styles?.description,
                  }}
                >
                  Комментарий
                </Text>
                <Text
                  style={{
                    color: isDarkMode ? '#fff' : '#000',
                    ...defaultStyles.description,
                    ...styles?.description,
                  }}
                >
                  {formData.comment}
                </Text>
              </View>
            )}

            {!!rate && (
              <View
                style={{
                  ...defaultStyles.descriptionWrapper,
                  ...styles?.descriptionWrapper,
                }}
              >
                <Text
                  style={{
                    color: isDarkMode ? '#fff' : '#000',
                    ...defaultStyles.description,
                    ...styles?.description,
                  }}
                >
                  Стоимость доставки
                </Text>
                <Text
                  style={{
                    color: isDarkMode ? '#fff' : '#000',
                    ...defaultStyles.description,
                    ...styles?.description,
                  }}
                >
                  {rate} руб.
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default CurrentDeliveryMethod;
