import React, {useState} from 'react';
import {StyleSheetProperties, Text, View, ViewStyle} from 'react-native';
import defaultStyles from './styles';
import DeliveryMethod from '../DeliveryMethod';
import {DeliveryMethodId, DeliveryMethodStyle} from '../DeliveryMethod/types';
import useApp from '../../hooks/useApp';
import DeliveryForms from '../DeliveryForms';

type DeliveryConfig = {
  deliveryMethods?: DeliveryMethodId[];
  styles?: {
    container?: ViewStyle;
    title?: StyleSheetProperties;
    deliveryMethod?: DeliveryMethodStyle;
  };
};

const Delivery: React.FC<DeliveryConfig> = ({styles}) => {
  const {isDarkMode} = useApp();

  const [activeDeliveryMethod, setActiveDeliveryMethod] =
    useState<DeliveryMethodId | null>(null);

  const onSelectDeliveryMethod = (id: DeliveryMethodId | null) => {
    setActiveDeliveryMethod(id);
  };

  return (
    <View style={{...defaultStyles.container, ...styles?.container}}>
      <Text
        style={{
          color: isDarkMode ? '#fff' : '#000',
          ...defaultStyles.title,
          ...styles?.title,
        }}>
        Способ Доставки
      </Text>
      <DeliveryMethod
        onSelectDeliveryMethod={onSelectDeliveryMethod}
        activeDeliveryMethod={activeDeliveryMethod}
      />
      <DeliveryForms activeDeliveryMethod={activeDeliveryMethod} />
    </View>
  );
};

export default Delivery;
