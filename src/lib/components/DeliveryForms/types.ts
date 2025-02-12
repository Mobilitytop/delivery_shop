import {
  StyleSheetProperties,
  TextInputProps,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {DeliveryMethodId} from '../DeliveryMethod/types';

export type DeliveryFormsStyles = {
  container?: ViewStyle;
  labelWrapper?: StyleSheetProperties;
  label?: StyleSheetProperties;
  buttonText?: StyleSheetProperties;
  required?: StyleSheetProperties;
  input?: TextInputProps;
  button?: TouchableOpacityProps;
};

export type DeliveryFormsProps = {
  activeDeliveryMethod: DeliveryMethodId | null;
  styles?: DeliveryFormsStyles;
};

export type PostMethodProps = {
  styles?: DeliveryFormsStyles;
};
