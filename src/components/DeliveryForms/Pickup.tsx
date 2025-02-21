import { Text, TextInput, View } from 'react-native';

import defaultStyles from './styles';
import useApp from '../../hooks/useApp';
import { DeliveryFormsProps } from './types';

type PickupProps = DeliveryFormsProps;

const Pickup: React.FC<PickupProps> = ({
  formData,
  onChangeFormData,
  styles,
}) => {
  const { isDarkMode } = useApp();

  return (
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
    </>
  );
};

export default Pickup;
