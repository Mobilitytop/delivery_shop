"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _styles = _interopRequireDefault(require("./styles.js"));
var _useApp = _interopRequireDefault(require("../../hooks/useApp.js"));
var _data = require("../DeliveryMethod/data.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const CurrentDeliveryMethod = ({
  rate,
  styles,
  activeDeliveryMethod,
  formData,
  onEdit
}) => {
  const {
    isDarkMode
  } = (0, _useApp.default)();
  const currentDelivery = (0, _react.useMemo)(() => {
    return _data.deliveriesData.find(el => el.id === activeDeliveryMethod);
  }, [activeDeliveryMethod]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: {
      ..._styles.default.container,
      ...styles?.container
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: {
        ..._styles.default.item,
        ...styles?.item
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: {
          ..._styles.default.itemInner,
          ...styles?.itemInner
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: {
            ..._styles.default.itemContainer,
            ...styles?.itemContainer
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: {
              ..._styles.default.header,
              ...styles?.header
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ..._styles.default.title,
                ...styles?.title
              },
              children: currentDelivery?.title
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
              style: {
                ..._styles.default.edit,
                ...styles?.edit
              },
              onPress: onEdit,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
                style: {
                  color: isDarkMode ? '#fff' : '#000',
                  ..._styles.default.editText,
                  ...styles?.editText
                },
                children: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C"
              })
            })]
          }), !!currentDelivery?.description && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: {
              color: isDarkMode ? '#fff' : '#000',
              ..._styles.default.description,
              ...styles?.description
            },
            children: currentDelivery.description
          }), formData.pickupPoint && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: {
              ..._styles.default.descriptionWrapper,
              ...styles?.descriptionWrapper
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ..._styles.default.description,
                ...styles?.description
              },
              children: "\u041F\u0443\u043D\u043A\u0442 \u0421\u0414\u0415\u041A"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ..._styles.default.description,
                ...styles?.description
              },
              children: formData.pickupPoint?.name
            })]
          }), !!formData.address && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: {
              ..._styles.default.descriptionWrapper,
              ...styles?.descriptionWrapper
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ..._styles.default.description,
                ...styles?.description
              },
              children: "\u0410\u0434\u0440\u0435\u0441"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ..._styles.default.description,
                ...styles?.description
              },
              children: formData.address
            })]
          }), !!formData.flat && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: {
              ..._styles.default.descriptionWrapper,
              ...styles?.descriptionWrapper
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ..._styles.default.description,
                ...styles?.description
              },
              children: "\u041A\u0432\u0430\u0440\u0442\u0438\u0440\u0430"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ..._styles.default.description,
                ...styles?.description
              },
              children: formData.flat
            })]
          }), !!formData.entrance && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: {
              ..._styles.default.descriptionWrapper,
              ...styles?.descriptionWrapper
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ..._styles.default.description,
                ...styles?.description
              },
              children: "\u041F\u043E\u0434\u044A\u0435\u0437\u0434"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ..._styles.default.description,
                ...styles?.description
              },
              children: formData.entrance
            })]
          }), !!formData.floor && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: {
              ..._styles.default.descriptionWrapper,
              ...styles?.descriptionWrapper
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ..._styles.default.description,
                ...styles?.description
              },
              children: "\u042D\u0442\u0430\u0436"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ..._styles.default.description,
                ...styles?.description
              },
              children: formData.floor
            })]
          }), !!formData.intercom && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: {
              ..._styles.default.descriptionWrapper,
              ...styles?.descriptionWrapper
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ..._styles.default.description,
                ...styles?.description
              },
              children: "\u0414\u043E\u043C\u043E\u0444\u043E\u043D"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ..._styles.default.description,
                ...styles?.description
              },
              children: formData.intercom
            })]
          }), !!formData.index && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: {
              ..._styles.default.descriptionWrapper,
              ...styles?.descriptionWrapper
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ..._styles.default.description,
                ...styles?.description
              },
              children: "\u0418\u043D\u0434\u0435\u043A\u0441"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ..._styles.default.description,
                ...styles?.description
              },
              children: formData.index
            })]
          }), !!formData.comment && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: {
              ..._styles.default.descriptionWrapper,
              ...styles?.descriptionWrapper
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ..._styles.default.description,
                ...styles?.description
              },
              children: "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ..._styles.default.description,
                ...styles?.description
              },
              children: formData.comment
            })]
          }), !!rate && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
            style: {
              ..._styles.default.descriptionWrapper,
              ...styles?.descriptionWrapper
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ..._styles.default.description,
                ...styles?.description
              },
              children: "\u0421\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438"
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
              style: {
                color: isDarkMode ? '#fff' : '#000',
                ..._styles.default.description,
                ...styles?.description
              },
              children: [rate, " \u0440\u0443\u0431."]
            })]
          })]
        })
      })
    })
  });
};
var _default = exports.default = CurrentDeliveryMethod;
//# sourceMappingURL=index.js.map