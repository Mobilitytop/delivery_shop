import { StyleSheetProperties, ViewStyle } from 'react-native';

export type DeliveryMethodStyle = {
  container?: ViewStyle;
  item?: StyleSheetProperties;
  itemInner?: StyleSheetProperties;
  checkbox?: StyleSheetProperties;
  checkboxActive?: StyleSheetProperties;
  itemContainer?: StyleSheetProperties;
  title?: StyleSheetProperties;
  description?: StyleSheetProperties;
};

export type DeliveryMethodProps = {
  deliveryMethods?: DeliveryMethodId[];
  styles?: DeliveryMethodStyle;
  onSelectDeliveryMethod: (activeDeliveryMethod: DeliveryMethodId) => void;
  activeDeliveryMethod: DeliveryMethodId;
};

export enum DeliveryMethodId {
  COURIER = 'courier',
  PICKUP = 'pickup',
  CDEK_DOOR = 'CDEK-door',
  CDEK_POINT = 'CDEK-point',
  POST = 'post',
}

export type Method = {
  id: DeliveryMethodId;
  title: string;
  description?: string;
};
