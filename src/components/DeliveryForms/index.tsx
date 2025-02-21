import React, { useMemo } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import defaultStyles from './styles';
import { DeliveryMethodId } from '../DeliveryMethod/types';
import useApp from '../../hooks/useApp';
import { DeliveryFormsProps } from './types';
import Pickup from './Pickup';
import Post from './Post';
import CDEKPoint from './CDEK-point';

const DeliveryForms: React.FC<DeliveryFormsProps> = (props) => {
  const { isDarkMode } = useApp();
  const { styles, activeDeliveryMethod, formData, onSave } = props;

  const disabled =
    activeDeliveryMethod === DeliveryMethodId.PICKUP &&
    (!formData.address || !formData.index || formData.index?.length < 6);

  const form = useMemo(() => {
    switch (activeDeliveryMethod) {
      case DeliveryMethodId.PICKUP:
        return <Pickup {...props} />;
      case DeliveryMethodId.POST:
        return <Post {...props} />;
      case DeliveryMethodId.CDEK_POINT:
        return <CDEKPoint {...props} />;
      default:
        return <></>;
    }
  }, [activeDeliveryMethod, props]);

  return (
    <View style={{ ...defaultStyles.container, ...styles?.container }}>
      {form}

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
