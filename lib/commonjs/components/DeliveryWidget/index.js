"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _types = require("../DeliveryMethod/types.js");
var _index = require("../../api/post/index.js");
var _index2 = require("../../api/cdek/index.js");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Utility to debounce a function
const debounce = (fn, ms) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), ms);
  };
};
const DeliveryWidget = /*#__PURE__*/_react.default.memo(({
  colors,
  address,
  index,
  postConfig,
  CDEKConfig,
  customOptions = []
}) => {
  const [deliveryOptions, setDeliveryOptions] = (0, _react.useState)([]);
  const [isLoading, setIsLoading] = (0, _react.useState)(false);
  const [error, setError] = (0, _react.useState)(null);
  const CDEKClient = (0, _react.useMemo)(() => {
    return new _index2.Cdek({
      account: CDEKConfig.account,
      password: CDEKConfig.password,
      url_base: CDEKConfig.url_base
    });
  }, [CDEKConfig.account, CDEKConfig.password, CDEKConfig.url_base]);
  const styles = (0, _react.useMemo)(() => _reactNative.StyleSheet.create({
    container: {
      backgroundColor: colors?.background || 'transparent',
      marginTop: 16,
      width: '100%'
    },
    option: {
      color: colors?.text || '#000',
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 10,
      borderBottomWidth: 0.3,
      paddingVertical: 25,
      borderColor: colors?.border || '#00000044'
    },
    title: {
      color: colors?.text || '#000',
      fontSize: 16,
      fontWeight: '600'
    },
    date: {
      color: colors?.text || '#000',
      marginTop: 10,
      fontSize: 16
    },
    loading: {
      color: colors?.text || '#000',
      textAlign: 'center'
    },
    error: {
      color: colors?.text || '#000',
      textAlign: 'center',
      padding: 10
    },
    section: {
      flex: 1,
      maxWidth: '90%'
    }
  }), [colors?.background, colors?.text, colors?.border]);
  const fetchDeliveryOptions = (0, _react.useMemo)(() => debounce(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const options = [];
      const [postResponse, cdekDoorResponse, cdekPointResponse] = await Promise.all([(0, _index.fetchPostTariff)({
        accessToken: postConfig.accessToken,
        basicToken: postConfig.basicToken,
        body: {
          'index-to': index,
          ...postConfig.request
        }
      }).catch(() => null), CDEKClient.calculatorByTariff({
        ...CDEKConfig.request,
        tariff_code: 137,
        to_location: {
          address
        }
      }).catch(() => null), CDEKClient.calculatorByTariff({
        ...CDEKConfig.request,
        tariff_code: 136,
        to_location: {
          address
        }
      }).catch(() => null)]);
      if (postResponse?.['total-rate']) {
        options.push({
          id: _types.DeliveryMethodId.POST,
          title: 'Почта России',
          cost: postResponse['total-rate'] / 100,
          duration: `до ${postResponse['delivery-time']['max-days']} дней`
        });
      }
      if (cdekDoorResponse?.total_sum) {
        options.push({
          id: _types.DeliveryMethodId.CDEK_DOOR,
          title: 'СДЭК-экспресс (до двери)',
          cost: cdekDoorResponse.total_sum,
          duration: `${cdekDoorResponse.period_min}-${cdekDoorResponse.period_max} дней`
        });
      }
      if (cdekPointResponse?.total_sum) {
        options.push({
          id: _types.DeliveryMethodId.CDEK_POINT,
          title: 'СДЭК-экспресс (до пункта выдачи)',
          cost: cdekPointResponse.total_sum,
          duration: `${cdekPointResponse.period_min}-${cdekPointResponse.period_max} дней`
        });
      }
      setDeliveryOptions([...options, ...customOptions]);
    } catch (err) {
      console.error('Failed to fetch delivery options:', err);
      setError('Не удалось загрузить варианты доставки');
      setDeliveryOptions([...customOptions]);
    } finally {
      setIsLoading(false);
    }
  }, 500), [CDEKClient, CDEKConfig.request, postConfig, address, index, customOptions]);
  (0, _react.useEffect)(() => {
    fetchDeliveryOptions();
  }, [fetchDeliveryOptions]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: styles.container,
    children: error ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: styles.error,
      children: error
    }) : isLoading ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: styles.loading,
      children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..."
    }) : deliveryOptions.length > 0 ? deliveryOptions.map(option => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.option,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: styles.section,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: styles.title,
          children: option.title
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
          style: styles.date,
          children: ["\u0421\u0440\u043E\u043A \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438: ", option.duration]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: styles.title,
        children: option.cost === 0 ? 'Бесплатно' : `${parseFloat(option.cost + '').toFixed(1)} руб.`
      })]
    }, option.id)) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: styles.loading,
      children: "\u041D\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u043E\u0432 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438"
    })
  });
}, (prevProps, nextProps) => {
  return prevProps.address === nextProps.address && prevProps.index === nextProps.index && JSON.stringify(prevProps.colors) === JSON.stringify(nextProps.colors) && JSON.stringify(prevProps.postConfig) === JSON.stringify(nextProps.postConfig) && JSON.stringify(prevProps.CDEKConfig) === JSON.stringify(nextProps.CDEKConfig) && JSON.stringify(prevProps.customOptions) === JSON.stringify(nextProps.customOptions);
});
var _default = exports.default = DeliveryWidget;
//# sourceMappingURL=index.js.map