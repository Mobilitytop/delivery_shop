import React from 'react';
import {Text, TextInput, View} from 'react-native';
import defaultStyles from './styles';
import useApp from '../../hooks/useApp';
import {PostMethodProps} from './types';

const PostMethod: React.FC<PostMethodProps> = ({styles}) => {
  const {isDarkMode} = useApp();

  return (
    <>
      <View
        style={{
          ...defaultStyles.labelWrapper,
          ...styles?.labelWrapper,
        }}>
        <Text
          style={{
            color: isDarkMode ? '#fff' : '#000',
            ...defaultStyles.label,
            ...styles?.label,
          }}>
          Адрес доставки
        </Text>

        <Text
          style={{
            ...defaultStyles.required,
            ...styles?.required,
          }}>
          *
        </Text>
      </View>
      <TextInput
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
        }}>
        <Text
          style={{
            color: isDarkMode ? '#fff' : '#000',
            ...defaultStyles.label,
            ...styles?.label,
          }}>
          Индекс
        </Text>
        <Text
          style={{
            ...defaultStyles.required,
            ...styles?.required,
          }}>
          *
        </Text>
      </View>
      <TextInput
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
        }}>
        <Text
          style={{
            color: isDarkMode ? '#fff' : '#000',
            ...defaultStyles.label,
            ...styles?.label,
          }}>
          Комментарий к заказу
        </Text>
      </View>
      <TextInput
        style={{
          color: isDarkMode ? '#fff' : '#000',
          ...defaultStyles.input,
          ...styles?.input,
        }}
      />

      <Text
        style={{
          color: isDarkMode ? '#fff' : '#000',
          ...defaultStyles.label,
          ...styles?.label,
        }}>
        – обязательные поля
      </Text>
    </>
  );
};

export default PostMethod;
