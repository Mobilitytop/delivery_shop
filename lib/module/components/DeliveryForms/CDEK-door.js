"use strict";

import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import defaultStyles from "./styles.js";
import useApp from "../../hooks/useApp.js";
import { useEffect, useState } from 'react';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const CDEKDoor = ({
  formData,
  onChangeFormData,
  CDEKClient,
  styles
}) => {
  const {
    isDarkMode
  } = useApp();
  const [city, setCity] = useState('');
  const [cities, setCities] = useState([]);
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
    }), /*#__PURE__*/_jsxs(View, {
      style: {
        ...defaultStyles.form,
        ...styles?.form
      },
      children: [/*#__PURE__*/_jsxs(View, {
        style: {
          ...defaultStyles.labelWrapper,
          ...styles?.labelWrapper
        },
        children: [/*#__PURE__*/_jsx(Text, {
          style: {
            color: isDarkMode ? '#fff' : '#000',
            ...defaultStyles.label,
            ...styles?.label
          },
          children: "\u0410\u0434\u0440\u0435\u0441 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438"
        }), /*#__PURE__*/_jsx(Text, {
          style: {
            ...defaultStyles.required,
            ...styles?.required
          },
          children: "*"
        })]
      }), /*#__PURE__*/_jsx(TextInput, {
        value: formData.address,
        onChangeText: address => onChangeFormData({
          address
        }),
        style: {
          color: isDarkMode ? '#fff' : '#000',
          ...defaultStyles.input,
          ...styles?.input
        }
      })]
    }), /*#__PURE__*/_jsxs(View, {
      style: {
        ...defaultStyles.inputs,
        ...styles?.inputs
      },
      children: [/*#__PURE__*/_jsxs(View, {
        style: {
          ...defaultStyles.form,
          ...styles?.form
        },
        children: [/*#__PURE__*/_jsxs(View, {
          style: {
            ...defaultStyles.labelWrapper,
            ...styles?.labelWrapper
          },
          children: [/*#__PURE__*/_jsx(Text, {
            style: {
              color: isDarkMode ? '#fff' : '#000',
              ...defaultStyles.label,
              ...styles?.label
            },
            children: "\u041A\u0432\u0430\u0440\u0442\u0438\u0440\u0430"
          }), /*#__PURE__*/_jsx(Text, {
            style: {
              ...defaultStyles.required,
              ...styles?.required
            },
            children: "*"
          })]
        }), /*#__PURE__*/_jsx(TextInput, {
          value: formData.flat,
          onChangeText: flat => onChangeFormData({
            flat
          }),
          keyboardType: "numeric",
          style: {
            ...defaultStyles.input,
            ...styles?.input
          }
        })]
      }), /*#__PURE__*/_jsxs(View, {
        style: {
          ...defaultStyles.form,
          ...styles?.form
        },
        children: [/*#__PURE__*/_jsxs(View, {
          style: {
            ...defaultStyles.labelWrapper,
            ...styles?.labelWrapper
          },
          children: [/*#__PURE__*/_jsx(Text, {
            style: {
              color: isDarkMode ? '#fff' : '#000',
              ...defaultStyles.label,
              ...styles?.label
            },
            children: "\u041F\u043E\u0434\u044A\u0435\u0437\u0434"
          }), /*#__PURE__*/_jsx(Text, {
            style: {
              ...defaultStyles.required,
              ...styles?.required
            },
            children: "*"
          })]
        }), /*#__PURE__*/_jsx(TextInput, {
          value: formData.entrance,
          onChangeText: entrance => onChangeFormData({
            entrance
          }),
          keyboardType: "numeric",
          style: {
            ...defaultStyles.input,
            ...styles?.input
          }
        })]
      })]
    }), /*#__PURE__*/_jsxs(View, {
      style: {
        ...defaultStyles.inputs,
        ...styles?.inputs
      },
      children: [/*#__PURE__*/_jsxs(View, {
        style: {
          ...defaultStyles.form,
          ...styles?.form
        },
        children: [/*#__PURE__*/_jsxs(View, {
          style: {
            ...defaultStyles.labelWrapper,
            ...styles?.labelWrapper
          },
          children: [/*#__PURE__*/_jsx(Text, {
            style: {
              color: isDarkMode ? '#fff' : '#000',
              ...defaultStyles.label,
              ...styles?.label
            },
            children: "\u042D\u0442\u0430\u0436"
          }), /*#__PURE__*/_jsx(Text, {
            style: {
              ...defaultStyles.required,
              ...styles?.required
            },
            children: "*"
          })]
        }), /*#__PURE__*/_jsx(TextInput, {
          value: formData.floor,
          onChangeText: floor => onChangeFormData({
            floor
          }),
          keyboardType: "numeric",
          style: {
            ...defaultStyles.input,
            ...styles?.input
          }
        })]
      }), /*#__PURE__*/_jsxs(View, {
        style: {
          ...defaultStyles.form,
          ...styles?.form
        },
        children: [/*#__PURE__*/_jsxs(View, {
          style: {
            ...defaultStyles.labelWrapper,
            ...styles?.labelWrapper
          },
          children: [/*#__PURE__*/_jsx(Text, {
            style: {
              color: isDarkMode ? '#fff' : '#000',
              ...defaultStyles.label,
              ...styles?.label
            },
            children: "\u0414\u043E\u043C\u043E\u0444\u043E\u043D"
          }), /*#__PURE__*/_jsx(Text, {
            style: {
              ...defaultStyles.required,
              ...styles?.required
            },
            children: "*"
          })]
        }), /*#__PURE__*/_jsx(TextInput, {
          value: formData.intercom,
          onChangeText: intercom => onChangeFormData({
            intercom
          }),
          style: {
            ...defaultStyles.input,
            ...styles?.input
          }
        })]
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
export default CDEKDoor;
//# sourceMappingURL=CDEK-door.js.map