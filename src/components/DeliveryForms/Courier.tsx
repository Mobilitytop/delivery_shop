import { Text, TextInput, View } from 'react-native';

import defaultStyles from './styles';
import useApp from '../../hooks/useApp';
import { DeliveryFormsProps } from './types';

type CourierProps = DeliveryFormsProps;

const Courier: React.FC<CourierProps> = ({
  formData,
  onChangeFormData,
  styles,
}) => {
  const { isDarkMode } = useApp();

  return (
    <>
      <View
        style={{
          ...defaultStyles.form,
          ...styles?.form,
        }}
      >
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
      </View>

      <View
        style={{
          ...defaultStyles.inputs,
          ...styles?.inputs,
        }}
      >
        <View
          style={{
            ...defaultStyles.form,
            ...styles?.form,
          }}
        >
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
              Квартира
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
            value={formData.flat}
            onChangeText={(flat) => onChangeFormData({ flat })}
            keyboardType="numeric"
            style={{
              ...defaultStyles.input,
              ...styles?.input,
            }}
          />
        </View>

        <View
          style={{
            ...defaultStyles.form,
            ...styles?.form,
          }}
        >
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
              Подъезд
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
            value={formData.entrance}
            onChangeText={(entrance) => onChangeFormData({ entrance })}
            keyboardType="numeric"
            style={{
              ...defaultStyles.input,
              ...styles?.input,
            }}
          />
        </View>
      </View>

      <View
        style={{
          ...defaultStyles.inputs,
          ...styles?.inputs,
        }}
      >
        <View
          style={{
            ...defaultStyles.form,
            ...styles?.form,
          }}
        >
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
              Этаж
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
            value={formData.floor}
            onChangeText={(floor) => onChangeFormData({ floor })}
            keyboardType="numeric"
            style={{
              ...defaultStyles.input,
              ...styles?.input,
            }}
          />
        </View>

        <View
          style={{
            ...defaultStyles.form,
            ...styles?.form,
          }}
        >
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
              Домофон
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
            value={formData.intercom}
            onChangeText={(intercom) => onChangeFormData({ intercom })}
            style={{
              ...defaultStyles.input,
              ...styles?.input,
            }}
          />
        </View>
      </View>

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

export default Courier;
