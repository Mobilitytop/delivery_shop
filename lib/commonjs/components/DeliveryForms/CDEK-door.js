"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _styles = _interopRequireDefault(require("./styles.js"));
var _useApp = _interopRequireDefault(require("../../hooks/useApp.js"));
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CDEKDoor = ({
  formData,
  onChangeFormData,
  CDEKClient,
  styles
}) => {
  const {
    isDarkMode
  } = (0, _useApp.default)();
  const [city, setCity] = (0, _react.useState)('');
  const [cities, setCities] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: {
        ..._styles.default.labelWrapper,
        ...styles?.labelWrapper
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: {
          color: isDarkMode ? '#fff' : '#000',
          ..._styles.default.label,
          ...styles?.label
        },
        children: "\u0413\u043E\u0440\u043E\u0434"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: {
        ..._styles.default.search,
        ...styles?.search
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
        value: city,
        onChangeText: value => setCity(value),
        style: {
          color: isDarkMode ? '#fff' : '#000',
          ..._styles.default.input,
          ...styles?.input
        }
      }), !!cities.length && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ScrollView, {
        style: {
          ..._styles.default.searchResult,
          ...styles?.searchResult
        },
        children: cities?.map(el => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
          onPress: () => {
            onSelectCity(el);
          },
          style: {
            ..._styles.default.searchResultItem,
            ...styles?.searchResultItem
          },
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            numberOfLines: 1,
            ellipsizeMode: "tail",
            style: {
              ..._styles.default.searchResultText,
              ...styles?.searchResultText
            },
            children: el.full_name
          })
        }, el.city_uuid))
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: {
        ..._styles.default.form,
        ...styles?.form
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: {
          ..._styles.default.labelWrapper,
          ...styles?.labelWrapper
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: {
            color: isDarkMode ? '#fff' : '#000',
            ..._styles.default.label,
            ...styles?.label
          },
          children: "\u0410\u0434\u0440\u0435\u0441 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: {
            ..._styles.default.required,
            ...styles?.required
          },
          children: "*"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
        value: formData.address,
        onChangeText: address => onChangeFormData({
          address
        }),
        style: {
          color: isDarkMode ? '#fff' : '#000',
          ..._styles.default.input,
          ...styles?.input
        }
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: {
        ..._styles.default.inputs,
        ...styles?.inputs
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: {
          ..._styles.default.form,
          ...styles?.form
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: {
            ..._styles.default.labelWrapper,
            ...styles?.labelWrapper
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: {
              color: isDarkMode ? '#fff' : '#000',
              ..._styles.default.label,
              ...styles?.label
            },
            children: "\u041A\u0432\u0430\u0440\u0442\u0438\u0440\u0430"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: {
              ..._styles.default.required,
              ...styles?.required
            },
            children: "*"
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
          value: formData.flat,
          onChangeText: flat => onChangeFormData({
            flat
          }),
          keyboardType: "numeric",
          style: {
            ..._styles.default.input,
            ...styles?.input
          }
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: {
          ..._styles.default.form,
          ...styles?.form
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: {
            ..._styles.default.labelWrapper,
            ...styles?.labelWrapper
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: {
              color: isDarkMode ? '#fff' : '#000',
              ..._styles.default.label,
              ...styles?.label
            },
            children: "\u041F\u043E\u0434\u044A\u0435\u0437\u0434"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: {
              ..._styles.default.required,
              ...styles?.required
            },
            children: "*"
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
          value: formData.entrance,
          onChangeText: entrance => onChangeFormData({
            entrance
          }),
          keyboardType: "numeric",
          style: {
            ..._styles.default.input,
            ...styles?.input
          }
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: {
        ..._styles.default.inputs,
        ...styles?.inputs
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: {
          ..._styles.default.form,
          ...styles?.form
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: {
            ..._styles.default.labelWrapper,
            ...styles?.labelWrapper
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: {
              color: isDarkMode ? '#fff' : '#000',
              ..._styles.default.label,
              ...styles?.label
            },
            children: "\u042D\u0442\u0430\u0436"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: {
              ..._styles.default.required,
              ...styles?.required
            },
            children: "*"
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
          value: formData.floor,
          onChangeText: floor => onChangeFormData({
            floor
          }),
          keyboardType: "numeric",
          style: {
            ..._styles.default.input,
            ...styles?.input
          }
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: {
          ..._styles.default.form,
          ...styles?.form
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: {
            ..._styles.default.labelWrapper,
            ...styles?.labelWrapper
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: {
              color: isDarkMode ? '#fff' : '#000',
              ..._styles.default.label,
              ...styles?.label
            },
            children: "\u0414\u043E\u043C\u043E\u0444\u043E\u043D"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: {
              ..._styles.default.required,
              ...styles?.required
            },
            children: "*"
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
          value: formData.intercom,
          onChangeText: intercom => onChangeFormData({
            intercom
          }),
          style: {
            ..._styles.default.input,
            ...styles?.input
          }
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: {
        ..._styles.default.labelWrapper,
        ...styles?.labelWrapper
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: {
          color: isDarkMode ? '#fff' : '#000',
          ..._styles.default.label,
          ...styles?.label
        },
        children: "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 \u043A \u0437\u0430\u043A\u0430\u0437\u0443"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
      value: formData.comment,
      onChangeText: comment => onChangeFormData({
        comment
      }),
      style: {
        color: isDarkMode ? '#fff' : '#000',
        ..._styles.default.input,
        ...styles?.input
      }
    })]
  });
};
var _default = exports.default = CDEKDoor;
//# sourceMappingURL=CDEK-door.js.map