"use strict";

import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import defaultStyles from "./styles.js";
import useApp from "../../hooks/useApp.js";
import { useEffect, useState } from 'react';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const CDEKPoint = ({
  formData,
  onChangeFormData,
  styles,
  CDEKClient
}) => {
  const {
    isDarkMode
  } = useApp();
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
  const [pickupPoint, setPickupPoint] = useState('');
  const [pickupPoints, setPickupPoints] = useState([]);
  useEffect(() => {
    CDEKClient.getSuggestCities({
      name: city,
      country_code: 'RU'
    }).then(response => {
      setCities(response);
    });
  }, [CDEKClient, city]);
  const onSelectCity = city => {
    onChangeFormData({
      city
    });
    setCity(city.full_name);
    setCities([]);
    CDEKClient.getPickupPoints({
      city_code: city.code
    }).then(response => {
      setPickupPoints(response);
    });
  };
  const onSelectPickupPoint = pickupPoint => {
    onChangeFormData({
      pickupPoint
    });
    setPickupPoint(pickupPoint.name);
    setPickupPoints([]);
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(View, {
      style: {
        ...defaultStyles.labelWrapper,
        ...styles?.labelWrapper
      },
      children: /*#__PURE__*/_jsx(Text, {
        style: {
          color: isDarkMode ? '#fff' : '#000',
          ...defaultStyles.label,
          ...styles?.label
        },
        children: "\u0413\u043E\u0440\u043E\u0434"
      })
    }), /*#__PURE__*/_jsxs(View, {
      style: {
        ...defaultStyles.search,
        ...styles?.search
      },
      children: [/*#__PURE__*/_jsx(TextInput, {
        value: city,
        onChangeText: value => setCity(value),
        style: {
          color: isDarkMode ? '#fff' : '#000',
          ...defaultStyles.input,
          ...styles?.input
        }
      }), !!cities.length && /*#__PURE__*/_jsx(ScrollView, {
        style: {
          ...defaultStyles.searchResult,
          ...styles?.searchResult
        },
        children: cities?.map(el => /*#__PURE__*/_jsx(TouchableOpacity, {
          onPress: () => {
            onSelectCity(el);
          },
          style: {
            ...defaultStyles.searchResultItem,
            ...styles?.searchResultItem
          },
          children: /*#__PURE__*/_jsx(Text, {
            numberOfLines: 1,
            ellipsizeMode: "tail",
            style: {
              ...defaultStyles.searchResultText,
              ...styles?.searchResultText
            },
            children: el.full_name
          })
        }, el.city_uuid))
      })]
    }), (!!pickupPoints?.length || !!formData.pickupPoint) && /*#__PURE__*/_jsxs(View, {
      style: {
        ...defaultStyles.search,
        ...styles?.search
      },
      children: [/*#__PURE__*/_jsx(View, {
        style: {
          ...defaultStyles.labelWrapper,
          ...styles?.labelWrapper
        },
        children: /*#__PURE__*/_jsx(Text, {
          style: {
            color: isDarkMode ? '#fff' : '#000',
            ...defaultStyles.label,
            ...styles?.label
          },
          children: "\u041F\u0443\u043D\u043A\u0442 \u0432\u044B\u0434\u0430\u0447\u0438"
        })
      }), /*#__PURE__*/_jsx(TextInput, {
        value: pickupPoint,
        onChangeText: value => setPickupPoint(value),
        style: {
          color: isDarkMode ? '#fff' : '#000',
          ...defaultStyles.input,
          ...styles?.input
        }
      }), !!pickupPoint && !!pickupPoints?.filter(item => item?.name?.toLowerCase().includes(pickupPoint.toLowerCase()))?.length && /*#__PURE__*/_jsx(ScrollView, {
        style: {
          ...defaultStyles.searchResult,
          ...{
            top: 72
          },
          ...styles?.searchResult
        },
        children: pickupPoints?.filter(item => item?.name?.toLowerCase().includes(pickupPoint.toLowerCase())).map(el => /*#__PURE__*/_jsx(TouchableOpacity, {
          onPress: () => {
            onSelectPickupPoint(el);
          },
          style: {
            ...defaultStyles.searchResultItem,
            ...styles?.searchResultItem
          },
          children: /*#__PURE__*/_jsx(Text, {
            numberOfLines: 1,
            ellipsizeMode: "tail",
            style: {
              ...defaultStyles.searchResultText,
              ...styles?.searchResultText
            },
            children: el.name
          })
        }, el.code))
      })]
    }), /*#__PURE__*/_jsx(View, {
      style: {
        ...defaultStyles.labelWrapper,
        ...styles?.labelWrapper
      },
      children: /*#__PURE__*/_jsx(Text, {
        style: {
          color: isDarkMode ? '#fff' : '#000',
          ...defaultStyles.label,
          ...styles?.label
        },
        children: "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 \u043A \u0437\u0430\u043A\u0430\u0437\u0443"
      })
    }), /*#__PURE__*/_jsx(TextInput, {
      value: formData.comment,
      onChangeText: comment => onChangeFormData({
        comment
      }),
      style: {
        color: isDarkMode ? '#fff' : '#000',
        ...defaultStyles.input,
        ...styles?.input
      }
    })]
  });
};
export default CDEKPoint;
//# sourceMappingURL=CDEK-point.js.map