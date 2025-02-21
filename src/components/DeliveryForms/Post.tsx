import { Text, TextInput, View } from 'react-native';

import defaultStyles from './styles';
import useApp from '../../hooks/useApp';
import { DeliveryFormsProps } from './types';

type PostProps = DeliveryFormsProps;

const Post: React.FC<PostProps> = ({ formData, onChangeFormData, styles }) => {
  const { isDarkMode } = useApp();

  return (
    <>
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
            Адрес доставки
          </Text>

          <Text
            style={{
              ...defaultStyles.required,
              ...styles?.required,
            }}
          >
            *
          </Text>
        </View>
        <TextInput
          value={formData.address}
          onChangeText={(address) => onChangeFormData({ address })}
          style={{
            color: isDarkMode ? '#fff' : '#000',
            ...defaultStyles.input,
            ...styles?.input,
          }}
        />

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
            Индекс
          </Text>
          <Text
            style={{
              ...defaultStyles.required,
              ...styles?.required,
            }}
          >
            *
          </Text>
        </View>
        <TextInput
          value={formData.index}
          keyboardType="numeric"
          maxLength={6}
          onChangeText={(index) => onChangeFormData({ index })}
          style={{
            color: isDarkMode ? '#fff' : '#000',
            ...defaultStyles.input,
            ...styles?.input,
          }}
        />
      </>
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

export default Post;
