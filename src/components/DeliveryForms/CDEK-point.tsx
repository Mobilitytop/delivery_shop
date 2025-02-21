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

type CDEKPointProps = DeliveryFormsProps;

const CDEKPoint: React.FC<CDEKPointProps> = ({
  formData,
  onChangeFormData,
  styles,
  CDEKClient,
}) => {
  const { isDarkMode } = useApp();
  const [city, setCity] = useState('');
  const [cities, setCities] = useState<ApiResponse.GetSuggestCities[]>([]);

  const [pickupPoint, setPickupPoint] = useState('');
  const [pickupPoints, setPickupPoints] = useState<
    ApiResponse.GetPickupPoints[]
  >([]);

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
    CDEKClient.getPickupPoints({ city_code: city.code }).then((response) => {
      setPickupPoints(response);
    });
  };

  const onSelectPickupPoint = (pickupPoint: ApiResponse.GetPickupPoints) => {
    onChangeFormData({ pickupPoint });
    setPickupPoint(pickupPoint.name);
    setPickupPoints([]);
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

      {(!!pickupPoints?.length || !!formData.pickupPoint) && (
        <View style={{ ...defaultStyles.search, ...styles?.search }}>
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
              Пункт выдачи
            </Text>
          </View>

          <TextInput
            value={pickupPoint}
            onChangeText={(value) => setPickupPoint(value)}
            style={{
              color: isDarkMode ? '#fff' : '#000',
              ...defaultStyles.input,
              ...styles?.input,
            }}
          />

          {!!pickupPoint &&
            !!pickupPoints?.filter((item) =>
              item?.name?.toLowerCase().includes(pickupPoint.toLowerCase())
            )?.length && (
              <ScrollView
                style={{
                  ...defaultStyles.searchResult,
                  ...styles?.searchResult,
                }}
              >
                {pickupPoints
                  ?.filter((item) =>
                    item?.name
                      ?.toLowerCase()
                      .includes(pickupPoint.toLowerCase())
                  )
                  .map((el) => (
                    <TouchableOpacity
                      key={el.code}
                      onPress={() => {
                        onSelectPickupPoint(el);
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
                        {el.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            )}
        </View>
      )}

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

export default CDEKPoint;
