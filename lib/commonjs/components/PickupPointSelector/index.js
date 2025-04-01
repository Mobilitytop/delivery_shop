"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _index = require("../../api/cdek/index.js");
var _types = require("./types.js");
var _reactNativeSelectDropdown = _interopRequireDefault(require("react-native-select-dropdown"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Тип для пункта выдачи

// Пропсы компонента

// Тип для кастомизации цветов

const PickupPointSelector = ({
  deliveryMethod,
  cdekConfig,
  toIndex,
  colors,
  onSelect,
  onError
}) => {
  const [pickupPoints, setPickupPoints] = (0, _react.useState)([]);
  const [isLoading, setIsLoading] = (0, _react.useState)(false);
  const CDEKClient = (0, _react.useMemo)(() => cdekConfig ? new _index.Cdek({
    account: cdekConfig.account,
    password: cdekConfig.password,
    url_base: cdekConfig.url_base
  }) : null, [cdekConfig?.account, cdekConfig?.password, cdekConfig?.url_base]);
  const fetchPickupPoints = (0, _react.useCallback)(async () => {
    if (deliveryMethod !== _types.DeliveryMethodId.CDEK_POINT || !CDEKClient) return;
    try {
      setIsLoading(true);
      const response = await CDEKClient.getPickupPoints({
        postal_code: Number(toIndex)
      });
      const points = response.map(point => ({
        code: point.code,
        name: point.name || `Пункт ${point.code}`,
        address: point.location?.address_full || point.location?.address,
        workTime: point.work_time || 'Не указано'
      }));
      setPickupPoints(points);
    } catch (error) {
      console.error('Failed to fetch pickup points:', error);
      setPickupPoints([]);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  }, [deliveryMethod, CDEKClient, toIndex, onError]);
  (0, _react.useEffect)(() => {
    fetchPickupPoints();
  }, []);
  const styles = (0, _react.useMemo)(() => _reactNative.StyleSheet.create({
    container: {
      backgroundColor: colors?.background || 'transparent',
      marginTop: 8,
      width: '100%'
    },
    dropdownButton: {
      width: '100%',
      paddingVertical: 10,
      backgroundColor: colors?.background || '#fff',
      borderWidth: 1,
      borderColor: colors?.border || '#00000044',
      borderRadius: 4,
      paddingHorizontal: 10
    },
    dropdownButtonText: {
      color: colors?.text || '#000',
      fontSize: 14,
      fontWeight: '500',
      textAlign: 'left'
    },
    dropdownRow: {
      backgroundColor: colors?.background || '#fff',
      borderBottomWidth: 0.3,
      borderColor: colors?.border || '#00000044',
      paddingVertical: 10,
      paddingHorizontal: 10
    },
    dropdownRowText: {
      color: colors?.text || '#000',
      fontSize: 14,
      fontWeight: '500',
      textAlign: 'left'
    },
    loading: {
      color: colors?.text || '#000',
      textAlign: 'center',
      paddingVertical: 10
    }
  }), [colors]);
  if (deliveryMethod !== _types.DeliveryMethodId.CDEK_POINT) return null;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: styles.container,
    children: isLoading ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: styles.loading,
      children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043F\u0443\u043D\u043A\u0442\u043E\u0432 \u0432\u044B\u0434\u0430\u0447\u0438..."
    }) : pickupPoints.length > 0 ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeSelectDropdown.default, {
      data: pickupPoints,
      onSelect: selectedItem => {
        onSelect?.(selectedItem);
      },
      renderButton: selectedItem => {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: styles.dropdownButton,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.dropdownButtonText,
            children: selectedItem && selectedItem.address || 'Выберите пункт выдачи'
          })
        });
      },
      renderItem: item => /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: styles.dropdownRow,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: [styles.dropdownRowText, {
            fontSize: 12,
            marginTop: 4
          }],
          children: item.address
        })
      }),
      dropdownStyle: {
        borderRadius: 4
      }
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: styles.loading,
      children: "\u041F\u0443\u043D\u043A\u0442\u044B \u0432\u044B\u0434\u0430\u0447\u0438 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B"
    })
  });
};
var _default = exports.default = PickupPointSelector;
//# sourceMappingURL=index.js.map