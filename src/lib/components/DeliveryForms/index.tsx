import React, {useMemo} from 'react';
import {Text, TextInput, View, TouchableOpacity} from 'react-native';
import defaultStyles from './styles';
import {DeliveryMethodId} from '../DeliveryMethod/types';
import useApp from '../../hooks/useApp';
import {DeliveryFormsProps} from './types';
import PostMethod from './PostMethod';

const DeliveryForms: React.FC<DeliveryFormsProps> = ({
  styles,
  activeDeliveryMethod,
}) => {
  const {isDarkMode} = useApp();

  const forms = useMemo(() => {
    if (
      activeDeliveryMethod === DeliveryMethodId.COURIER ||
      activeDeliveryMethod === DeliveryMethodId.CDEK_DOOR ||
      activeDeliveryMethod === DeliveryMethodId.CDEK_POINT
    ) {
      return (
        <>
          <View
            style={{
              ...defaultStyles.labelWrapper,
              ...styles?.labelWrapper,
            }}>
            <Text
              style={{
                color: isDarkMode ? '#fff' : '#000',
                ...defaultStyles.label,
                ...styles?.label,
              }}>
              Адрес доставки
            </Text>

            <Text
              style={{
                ...defaultStyles.required,
                ...styles?.required,
              }}>
              *
            </Text>
          </View>
          <TextInput
            style={{
              color: isDarkMode ? '#fff' : '#000',
              ...defaultStyles.input,
              ...styles?.input,
            }}
          />

          <View
            style={{
              ...defaultStyles.labelWrapper,
              ...styles?.labelWrapper,
            }}>
            <Text
              style={{
                color: isDarkMode ? '#fff' : '#000',
                ...defaultStyles.label,
                ...styles?.label,
              }}>
              Индекс
            </Text>
            <Text
              style={{
                ...defaultStyles.required,
                ...styles?.required,
              }}>
              *
            </Text>
          </View>
          <TextInput
            style={{
              color: isDarkMode ? '#fff' : '#000',
              ...defaultStyles.input,
              ...styles?.input,
            }}
          />

          <View
            style={{
              ...defaultStyles.labelWrapper,
              ...styles?.labelWrapper,
            }}>
            <Text
              style={{
                color: isDarkMode ? '#fff' : '#000',
                ...defaultStyles.label,
                ...styles?.label,
              }}>
              Комментарий к заказу
            </Text>
          </View>
          <TextInput
            style={{
              color: isDarkMode ? '#fff' : '#000',
              ...defaultStyles.input,
              ...styles?.input,
            }}
          />

          <Text
            style={{
              color: isDarkMode ? '#fff' : '#000',
              ...defaultStyles.label,
              ...styles?.label,
            }}>
            – обязательные поля
          </Text>
        </>
      );
    } else if (activeDeliveryMethod === DeliveryMethodId.POST) {
      return <PostMethod styles={styles} />;
    } else if (activeDeliveryMethod === DeliveryMethodId.PICKUP) {
      return (
        <View
          style={{
            ...defaultStyles.labelWrapper,
            ...styles?.labelWrapper,
          }}>
          <Text
            style={{
              color: isDarkMode ? '#fff' : '#000',
              ...defaultStyles.label,
              ...styles?.label,
            }}>
            Комментарий к заказу
          </Text>
        </View>
      );
    }

    return <></>;
  }, [activeDeliveryMethod, isDarkMode, styles]);

  return (
    <View style={{...defaultStyles.container, ...styles?.container}}>
      {forms}
      <TouchableOpacity
        style={{
          ...defaultStyles.button,
          ...styles?.button,
        }}>
        <Text
          style={{
            ...defaultStyles.buttonText,
            ...styles?.buttonText,
          }}>
          Продолжить
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeliveryForms;
