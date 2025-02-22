import React, { useMemo } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { DeliveryMethodId } from '../DeliveryMethod/types';
import { DeliveryFormsProps } from './types';
import useApp from '../../hooks/useApp';
import defaultStyles from './styles';

import Courier from './Courier';
import Pickup from './Pickup';
import CDEKDoor from './CDEK-door';
import CDEKPoint from './CDEK-point';
import Post from './Post';

const DeliveryForms: React.FC<DeliveryFormsProps> = (props) => {
  const { isDarkMode } = useApp();
  const { styles, activeDeliveryMethod, formData, onSave } = props;

  const disabled = useMemo(() => {
    switch (activeDeliveryMethod) {
      case DeliveryMethodId.COURIER:
        return (
          !formData.address ||
          !formData.flat ||
          !formData.entrance ||
          !formData.intercom ||
          !formData.floor
        );
      case DeliveryMethodId.PICKUP:
        return false;
      case DeliveryMethodId.CDEK_DOOR:
        return (
          !formData.city?.code ||
          !formData.address ||
          !formData.flat ||
          !formData.entrance ||
          !formData.intercom ||
          !formData.floor
        );
      case DeliveryMethodId.CDEK_POINT:
        return !formData.city?.code || !formData.pickupPoint;
      case DeliveryMethodId.POST:
        return (
          !formData.address || !formData.index || formData.index?.length < 6
        );
      default:
        return false;
    }
  }, [activeDeliveryMethod, formData]);

  const form = useMemo(() => {
    switch (activeDeliveryMethod) {
      case DeliveryMethodId.COURIER:
        return <Courier {...props} />;
      case DeliveryMethodId.PICKUP:
        return <Pickup {...props} />;
      case DeliveryMethodId.CDEK_DOOR:
        return <CDEKDoor {...props} />;
      case DeliveryMethodId.CDEK_POINT:
        return <CDEKPoint {...props} />;
      case DeliveryMethodId.POST:
        return <Post {...props} />;
      default:
        return <></>;
    }
  }, [activeDeliveryMethod, props]);

  return (
    <View style={{ ...defaultStyles.container, ...styles?.container }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {form}
      </KeyboardAvoidingView>
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
