import {
  StyleSheetProperties,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { DeliveryFormData } from '../DeliveryForms/types';
import { DeliveryMethodId } from '../DeliveryMethod/types';

export type CurrentDeliveryMethodStyle = {
  container?: ViewStyle;
  item?: StyleSheetProperties;
  itemInner?: StyleSheetProperties;
  checkbox?: StyleSheetProperties;
  checkboxActive?: StyleSheetProperties;
  itemContainer?: StyleSheetProperties;
  title?: StyleSheetProperties;
  description?: StyleSheetProperties;
  descriptionWrapper?: ViewStyle;
  header?: ViewStyle;
  edit?: TouchableOpacityProps;
  editText?: StyleSheetProperties;
};

export type CurrentDeliveryMethodProps = {
  rate?: number;
  styles?: CurrentDeliveryMethodStyle;
  activeDeliveryMethod: DeliveryMethodId;
  formData: DeliveryFormData;
  onEdit: () => void;
};
