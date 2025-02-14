import {
  StyleSheetProperties,
  TextInputProps,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { DeliveryMethodId } from '../DeliveryMethod/types';

export type DeliveryFormsStyles = {
  container?: ViewStyle;
  labelWrapper?: StyleSheetProperties;
  label?: StyleSheetProperties;
  buttonText?: StyleSheetProperties;
  required?: StyleSheetProperties;
  input?: TextInputProps;
  button?: TouchableOpacityProps;
};

export type DeliveryFormData = {
  address?: string;
  index?: string;
  comment?: string;
};

export type DeliveryFormsProps = {
  activeDeliveryMethod: DeliveryMethodId;
  styles?: DeliveryFormsStyles;
  formData: DeliveryFormData;
  onChangeFormData: (props: DeliveryFormData) => void;
  onSave: () => void;
};
