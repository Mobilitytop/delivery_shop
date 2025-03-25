"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _types = require("../DeliveryMethod/types.js");
var _useApp = _interopRequireDefault(require("../../hooks/useApp.js"));
var _styles = _interopRequireDefault(require("./styles.js"));
var _Courier = _interopRequireDefault(require("./Courier.js"));
var _Pickup = _interopRequireDefault(require("./Pickup.js"));
var _CDEKDoor = _interopRequireDefault(require("./CDEK-door.js"));
var _CDEKPoint = _interopRequireDefault(require("./CDEK-point.js"));
var _Post = _interopRequireDefault(require("./Post.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const DeliveryForms = props => {
  const {
    isDarkMode
  } = (0, _useApp.default)();
  const {
    styles,
    activeDeliveryMethod,
    formData,
    onSave
  } = props;
  const disabled = (0, _react.useMemo)(() => {
    switch (activeDeliveryMethod) {
      case _types.DeliveryMethodId.COURIER:
        return !formData.address || !formData.flat || !formData.entrance || !formData.intercom || !formData.floor;
      case _types.DeliveryMethodId.PICKUP:
        return false;
      case _types.DeliveryMethodId.CDEK_DOOR:
        return !formData.city?.code || !formData.address || !formData.flat || !formData.entrance || !formData.intercom || !formData.floor;
      case _types.DeliveryMethodId.CDEK_POINT:
        return !formData.city?.code || !formData.pickupPoint;
      case _types.DeliveryMethodId.POST:
        return !formData.address || !formData.index || formData.index?.length < 6;
      default:
        return false;
    }
  }, [activeDeliveryMethod, formData]);
  const form = (0, _react.useMemo)(() => {
    switch (activeDeliveryMethod) {
      case _types.DeliveryMethodId.COURIER:
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Courier.default, {
          ...props
        });
      case _types.DeliveryMethodId.PICKUP:
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Pickup.default, {
          ...props
        });
      case _types.DeliveryMethodId.CDEK_DOOR:
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_CDEKDoor.default, {
          ...props
        });
      case _types.DeliveryMethodId.CDEK_POINT:
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_CDEKPoint.default, {
          ...props
        });
      case _types.DeliveryMethodId.POST:
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Post.default, {
          ...props
        });
      default:
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {});
    }
  }, [activeDeliveryMethod, props]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: {
      ..._styles.default.container,
      ...styles?.container
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.KeyboardAvoidingView, {
      behavior: _reactNative.Platform.OS === 'ios' ? 'padding' : 'height',
      style: {
        flex: 1,
        zIndex: 1000
      },
      children: form
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: {
        color: isDarkMode ? '#fff' : '#000',
        ..._styles.default.label,
        ...styles?.label
      },
      children: "\u2013 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043F\u043E\u043B\u044F"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TouchableOpacity, {
      disabled: disabled,
      onPress: onSave,
      style: {
        opacity: disabled ? 0.5 : 1,
        ..._styles.default.button,
        ...styles?.button
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: {
          ..._styles.default.buttonText,
          ...styles?.buttonText
        },
        children: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"
      })
    })]
  });
};
var _default = exports.default = DeliveryForms;
//# sourceMappingURL=index.js.map