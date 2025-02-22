import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import defaultStyles from './styles';
import useApp from '../../hooks/useApp';
import { DeliveryFormsProps } from './types';
import { useEffect, useState } from 'react';
import { ApiResponse } from '../../api/cdek/types/api';

type CDEKDoorProps = DeliveryFormsProps;

const CDEKDoor: React.FC<CDEKDoorProps> = ({
  formData,
  onChangeFormData,
  CDEKClient,
  styles,
}) => {
  const { isDarkMode } = useApp();
  const [city, setCity] = useState('');
  const [cities, setCities] = useState<ApiResponse.GetSuggestCities[]>([]);

  useEffect(() => {
    CDEKClient.getSuggestCities({ name: city, country_code: 'RU' }).then(
      (response) => {
        setCities(response);
      }
    );
  }, [CDEKClient, city]);

  const onSelectCity = (city: ApiResponse.GetSuggestCities) => {
    onChangeFormData({ city });
    setCity(city.full_name);
    setCities([]);
  };

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
          Город
        </Text>
      </View>

      <View style={{ ...defaultStyles.search, ...styles?.search }}>
        <TextInput
          value={city}
          onChangeText={(value) => setCity(value)}
          style={{
            color: isDarkMode ? '#fff' : '#000',
            ...defaultStyles.input,
            ...styles?.input,
          }}
        />

        {!!cities.length && (
          <ScrollView
            style={{ ...defaultStyles.searchResult, ...styles?.searchResult }}
          >
            {cities?.map((el) => (
              <TouchableOpacity
                key={el.city_uuid}
                onPress={() => {
                  onSelectCity(el);
                }}
                style={{
                  ...defaultStyles.searchResultItem,
                  ...styles?.searchResultItem,
                }}
              >
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    ...defaultStyles.searchResultText,
                    ...styles?.searchResultText,
                  }}
                >
                  {el.full_name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
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

export default CDEKDoor;
