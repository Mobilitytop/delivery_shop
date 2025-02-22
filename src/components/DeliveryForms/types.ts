import {
  ScrollViewProps,
  StyleSheetProperties,
  TextInputProps,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { DeliveryMethodId } from '../DeliveryMethod/types';
import { Cdek } from '../../api/cdek';
import { ApiResponse } from '../../api/cdek/types/api';

export type DeliveryFormsStyles = {
  container?: ViewStyle;
  inputs?: ViewStyle;
  form?: ViewStyle;
  labelWrapper?: StyleSheetProperties;
  label?: StyleSheetProperties;
  buttonText?: StyleSheetProperties;
  required?: StyleSheetProperties;
  input?: TextInputProps;
  button?: TouchableOpacityProps;
  search?: ViewStyle;
  searchResult?: ScrollViewProps;
  searchResultItem?: TouchableOpacityProps;
  searchResultText?: TextStyle;
};

export type DeliveryFormData = {
  address?: string;
  entrance?: string;
  flat?: string;
  floor?: string;
  intercom?: string;
  index?: string;
  comment?: string;
  city?: ApiResponse.GetSuggestCities | null;
  pickupPoint?: ApiResponse.GetPickupPoints | null;
};

export type DeliveryFormsProps = {
  activeDeliveryMethod: DeliveryMethodId;
  styles?: DeliveryFormsStyles;
  formData: DeliveryFormData;
  onChangeFormData: (props: DeliveryFormData) => void;
  onSave: () => void;
  CDEKClient: Cdek;
};
