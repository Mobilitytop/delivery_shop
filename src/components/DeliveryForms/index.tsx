import React from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import defaultStyles from './styles';
import { DeliveryMethodId } from '../DeliveryMethod/types';
import useApp from '../../hooks/useApp';
import { DeliveryFormsProps } from './types';

const DeliveryForms: React.FC<DeliveryFormsProps> = ({
  styles,
  activeDeliveryMethod,
  formData,
  onChangeFormData,
  onSave,
}) => {
  const { isDarkMode } = useApp();

  const disabled =
    activeDeliveryMethod !== DeliveryMethodId.PICKUP &&
    (!formData.address || !formData.index || formData.index?.length < 6);

  return (
    <View style={{ ...defaultStyles.container, ...styles?.container }}>
      {activeDeliveryMethod !== DeliveryMethodId.PICKUP && (
        <>
          <View
            style={{
              ...defaultStyles.labelWrapper,
              ...styles?.labelWrapper,
            }}
          >
            <Text
              style={{
                color: isDarkMode ? '#fff' : '#000',
                ...defaultStyles.label,
                ...styles?.label,
              }}
            >
              Адрес доставки
            </Text>

            <Text
              style={{
                ...defaultStyles.required,
                ...styles?.required,
              }}
            >
              *
            </Text>
          </View>
          <TextInput
            value={formData.address}
            onChangeText={(address) => onChangeFormData({ address })}
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
            }}
          >
            <Text
              style={{
                color: isDarkMode ? '#fff' : '#000',
                ...defaultStyles.label,
                ...styles?.label,
              }}
            >
              Индекс
            </Text>
            <Text
              style={{
                ...defaultStyles.required,
                ...styles?.required,
              }}
            >
              *
            </Text>
          </View>
          <TextInput
            value={formData.index}
            keyboardType="numeric"
            maxLength={6}
            onChangeText={(index) => onChangeFormData({ index })}
            style={{
              color: isDarkMode ? '#fff' : '#000',
              ...defaultStyles.input,
              ...styles?.input,
            }}
          />
        </>
      )}

      <View
        style={{
          ...defaultStyles.labelWrapper,
          ...styles?.labelWrapper,
        }}
      >
        <Text
          style={{
            color: isDarkMode ? '#fff' : '#000',
            ...defaultStyles.label,
            ...styles?.label,
          }}
        >
          Комментарий к заказу
        </Text>
      </View>
      <TextInput
        value={formData.comment}
        onChangeText={(comment) => onChangeFormData({ comment })}
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
        }}
      >
        – обязательные поля
      </Text>

      <TouchableOpacity
        disabled={disabled}
        onPress={onSave}
        style={{
          opacity: disabled ? 0.5 : 1,
          ...defaultStyles.button,
          ...styles?.button,
        }}
      >
        <Text
          style={{
            ...defaultStyles.buttonText,
            ...styles?.buttonText,
          }}
        >
          Продолжить
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeliveryForms;
