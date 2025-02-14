import {
  requireNativeComponent,
  UIManager,
  Platform,
  type ViewStyle,
} from 'react-native';
import Delivery from './components/Delivery';

const LINKING_ERROR =
  `The package 'delivery-shop' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type DeliveryShopProps = {
  color: string;
  style: ViewStyle;
};

// const ComponentName = 'DeliveryShopView';

// export const DeliveryShopView =
//   UIManager.getViewManagerConfig(ComponentName) != null
//     ? requireNativeComponent<DeliveryShopProps>(ComponentName)
//     : () => {
//         throw new Error(LINKING_ERROR);
//       };

export default Delivery;
