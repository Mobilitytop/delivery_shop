"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _styles = _interopRequireDefault(require("./styles.js"));
var _index = _interopRequireDefault(require("../DeliveryMethod/index.js"));
var _index2 = _interopRequireDefault(require("../CurrentDeliveryMethod/index.js"));
var _types = require("../DeliveryMethod/types.js");
var _useApp = _interopRequireDefault(require("../../hooks/useApp.js"));
var _index3 = _interopRequireDefault(require("../DeliveryForms/index.js"));
var _index4 = require("../../api/post/index.js");
var _index5 = require("../../api/cdek/index.js");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const initialFormData = {
  address: '',
  entrance: '',
  flat: '',
  floor: '',
  intercom: '',
  index: '',
  comment: '',
  city: null,
  pickupPoint: null
};
const Delivery = ({
  styles,
  postConfig,
  CDEKConfig,
  onChange,
  getData
}) => {
  const {
    isDarkMode
  } = (0, _useApp.default)();
  const [edit, setEdit] = (0, _react.useState)(true);
  const [rate, setRate] = (0, _react.useState)(0);
  const [formData, setFormData] = (0, _react.useState)(initialFormData);
  let activeDeliveryMethod, setActiveDeliveryMethod;
  [activeDeliveryMethod, setActiveDeliveryMethod] = (0, _react.useState)(_types.DeliveryMethodId.COURIER);
  const CDEKClient = (0, _react.useMemo)(() => {
    return new _index5.Cdek({
      account: CDEKConfig.account,
      password: CDEKConfig.password,
      url_base: CDEKConfig.url_base
    });
  }, [CDEKConfig.account, CDEKConfig.password, CDEKConfig.url_base]);
  (0, _react.useEffect)(() => {
    if (onChange) {
      onChange({
        ...formData,
        rate,
        activeDeliveryMethod
      });
    }
  }, [activeDeliveryMethod, formData, onChange, rate]);
  const onSelectDeliveryMethod = id => {
    setActiveDeliveryMethod(id);
    setRate(0);
    onChangeFormData(initialFormData);
  };
  const onChangeFormData = value => {
    setFormData(prev => ({
      ...prev,
      ...value
    }));
  };
  const onSave = async () => {
    setEdit(false);
    if (activeDeliveryMethod === _types.DeliveryMethodId.POST) {
      const data = await (0, _index4.fetchPostTariff)({
        accessToken: postConfig.accessToken,
        basicToken: postConfig.basicToken,
        body: {
          'index-to': formData.index,
          ...postConfig.request
        }
      });
      if (data?.['total-rate']) {
        setRate(data?.['total-rate'] / 100);
        getData?.({
          ...formData,
          rate: data?.['total-rate'] / 100,
          activeDeliveryMethod
        });
      }
    } else if (activeDeliveryMethod === _types.DeliveryMethodId.CDEK_POINT) {
      const data = await CDEKClient.calculatorByTariff({
        ...CDEKConfig.request,
        tariff_code: 136,
        to_location: {
          code: formData.city?.code
        }
      });
      setRate(data?.total_sum);
      getData?.({
        ...formData,
        rate: data?.total_sum,
        activeDeliveryMethod
      });
    } else if (activeDeliveryMethod === _types.DeliveryMethodId.CDEK_DOOR) {
      const params = {
        ...CDEKConfig.request,
        tariff_code: 137,
        to_location: {
          code: formData.city?.code,
          address: `${formData.address} ${formData.entrance}д. ${formData.floor}эт. ${formData.flat}кв. Домофон: ${formData.intercom}`
        }
      };
      const data = await CDEKClient.calculatorByTariff(params);
      setRate(data?.total_sum);
      getData?.({
        ...formData,
        rate: data?.total_sum,
        activeDeliveryMethod
      });
    } else {
      getData?.({
        ...formData,
        rate,
        activeDeliveryMethod
      });
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
    style: {
      ..._styles.default.container,
      ...styles?.container
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: {
        color: isDarkMode ? '#fff' : '#000',
        ..._styles.default.title,
        ...styles?.title
      },
      children: "\u0421\u043F\u043E\u0441\u043E\u0431 \u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0438"
    }), edit ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_index.default, {
        styles: styles?.deliveryMethod,
        onSelectDeliveryMethod: onSelectDeliveryMethod,
        activeDeliveryMethod: activeDeliveryMethod
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_index3.default, {
        styles: styles?.deliveryForms,
        activeDeliveryMethod: activeDeliveryMethod,
        formData: formData,
        onChangeFormData: onChangeFormData,
        onSave: onSave,
        CDEKClient: CDEKClient
      })]
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_index2.default, {
      styles: styles?.currentDeliveryMethod,
      activeDeliveryMethod: activeDeliveryMethod,
      formData: formData,
      rate: rate,
      onEdit: () => {
        setEdit(true);
      }
    })]
  });
};
var _default = exports.default = Delivery;
//# sourceMappingURL=index.js.map