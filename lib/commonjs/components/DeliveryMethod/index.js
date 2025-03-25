"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _data = require("./data.js");
var _styles = _interopRequireDefault(require("./styles.js"));
var _useApp = _interopRequireDefault(require("../../hooks/useApp.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const DeliveryMethod = ({
  styles,
  onSelectDeliveryMethod: onPress,
  activeDeliveryMethod: active,
  deliveryMethods
}) => {
  const {
    isDarkMode
  } = (0, _useApp.default)();
  const deliveries = (0, _react.useMemo)(() => {
    if (deliveryMethods?.length) {
      return _data.deliveriesData?.filter(el => deliveryMethods.some(el2 => el.id === el2));
    }
    return _data.deliveriesData;
  }, [deliveryMethods]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: {
      ..._styles.default.container,
      ...styles?.container
    },
    children: deliveries?.map(el => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
      onPress: () => {
        onPress(el.id);
      },
      style: {
        ..._styles.default.item,
        ...styles?.item
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: {
          ..._styles.default.itemInner,
          ...styles?.itemInner
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: {
            ..._styles.default.itemContainer,
            ...styles?.itemContainer
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: {
              color: isDarkMode ? '#fff' : '#000',
              ..._styles.default.title,
              ...styles?.title
            },
            children: el.title
          }), el.description && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: {
              color: isDarkMode ? '#fff' : '#000',
              ..._styles.default.description,
              ...styles?.description
            },
            children: el.description
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: {
            ..._styles.default.checkbox,
            ...styles?.checkbox,
            backgroundColor: active === el.id ? '#F93D00' : undefined
          },
          children: active === el.id && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: {
              ..._styles.default.checkboxActive,
              ...styles?.checkboxActive
            }
          })
        })]
      })
    }, el.id))
  });
};
var _default = exports.default = DeliveryMethod;
//# sourceMappingURL=index.js.map