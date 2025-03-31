"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DeliveryMethodId = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _index = require("../../api/post/index.js");
var _index2 = require("../../api/cdek/index.js");
var _courierist = require("../../api/courierist.js");
var _lPost = require("../../api/l-post.js");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Перечисление методов доставки
let DeliveryMethodId = exports.DeliveryMethodId = /*#__PURE__*/function (DeliveryMethodId) {
  DeliveryMethodId["POST"] = "post";
  DeliveryMethodId["CDEK_DOOR"] = "cdek_door";
  DeliveryMethodId["CDEK_POINT"] = "cdek_point";
  DeliveryMethodId["CUSTOM"] = "custom";
  DeliveryMethodId["COURIERIST"] = "courierist";
  DeliveryMethodId["LPOST_COURIER"] = "lpost_courier";
  // Курьерская доставка
  DeliveryMethodId["LPOST_POINT"] = "lpost_point";
  return DeliveryMethodId;
}({}); // Типы данных для опций доставки
// Универсальный интерфейс посылки
// Форматы адресов для разных методов доставки
// Тип для кастомизации цветов
// Метод преобразования универсального формата посылки
const convertPackage = (packages, method) => {
  switch (method) {
    case DeliveryMethodId.POST:
      {
        const totalMass = packages.reduce((sum, pkg) => sum + pkg.weight, 0);
        const dimensions = packages[0];
        return {
          'mass': totalMass,
          ...(dimensions?.length && dimensions?.width && dimensions?.height ? {
            dimension: {
              length: dimensions.length,
              width: dimensions.width,
              height: dimensions.height
            }
          } : {}),
          'dimension-type': dimensions?.dimensionType,
          'declared-value': dimensions?.declaredValue
        };
      }
    case DeliveryMethodId.CDEK_DOOR:
    case DeliveryMethodId.CDEK_POINT:
      return {
        packages: packages.map(pkg => ({
          weight: pkg.weight,
          length: pkg.length,
          width: pkg.width,
          height: pkg.height
        }))
      };
    case DeliveryMethodId.CUSTOM:
      return {
        cargoes: packages.map(pkg => ({
          Weight: pkg.weight,
          Length: pkg.length || 0,
          Width: pkg.width || 0,
          Height: pkg.height || 0
        }))
      };
    case DeliveryMethodId.COURIERIST:
      return {
        shipment: packages.map(pkg => ({
          weight: pkg.weight / 1000,
          length: (pkg.length || 0) + (pkg.width || 0) + (pkg.height || 0),
          unit: 1
        }))
      };
    case DeliveryMethodId.LPOST_COURIER:
    case DeliveryMethodId.LPOST_POINT:
      return {
        Weight: packages.reduce((sum, pkg) => sum + pkg.weight, 0),
        // Суммарный вес в граммах
        Value: packages[0]?.declaredValue || 0 // Объявленная стоимость
      };
    default:
      return {};
  }
};
const DeliverySelector = ({
  colors,
  deliveryMethods,
  packages,
  postConfig,
  cdekConfig,
  courieristConfig,
  lpostConfig,
  // Новый пропс
  customOptions = [],
  onSelect,
  onLoadComplete,
  onError,
  initialSelectedId
}) => {
  const [deliveryOptions, setDeliveryOptions] = (0, _react.useState)([]);
  const [isLoading, setIsLoading] = (0, _react.useState)(true);
  const [selectedId, setSelectedId] = (0, _react.useState)(initialSelectedId || null);
  const CDEKClient = (0, _react.useMemo)(() => cdekConfig ? new _index2.Cdek({
    account: cdekConfig.account,
    password: cdekConfig.password,
    url_base: cdekConfig.url_base
  }) : null, [cdekConfig?.account, cdekConfig?.password, cdekConfig?.url_base]);
  const CourieristClient = (0, _react.useMemo)(() => courieristConfig ? new _courierist.Courierist({
    login: courieristConfig.login,
    password: courieristConfig.password
  }) : null, [courieristConfig?.login, courieristConfig?.password]);
  const LPostClient = (0, _react.useMemo)(() => lpostConfig ? new _lPost.LPost({
    secret: lpostConfig.secret
  }) : null, [lpostConfig?.secret]);
  const fetchDeliveryOptions = (0, _react.useCallback)(async () => {
    try {
      setIsLoading(true);
      const options = [];

      // Авторизация для всех сервисов, если используются
      if (CourieristClient) await CourieristClient.authenticate();
      if (LPostClient) await LPostClient.authenticate();
      const requests = deliveryMethods.map(method => {
        switch (method.method) {
          case DeliveryMethodId.POST:
            if (!postConfig) return Promise.resolve(null);
            const postPackageData = convertPackage(packages, DeliveryMethodId.POST);
            return (0, _index.fetchPostTariff)({
              accessToken: postConfig.accessToken,
              basicToken: postConfig.basicToken,
              body: {
                'index-from': method.data.fromIndex,
                'index-to': method.data.toIndex,
                ...postConfig.request,
                ...postPackageData
              }
            }).catch(() => null);
          case DeliveryMethodId.CDEK_DOOR:
            if (!CDEKClient || !cdekConfig) return Promise.resolve(null);
            const cdekDoorPackageData = convertPackage(packages, DeliveryMethodId.CDEK_DOOR);
            return CDEKClient.calculatorByTariff({
              ...cdekConfig.request,
              tariff_code: 137,
              from_location: {
                address: method.data.fromAddress
              },
              to_location: {
                address: method.data.toAddress
              },
              ...cdekDoorPackageData
            }).catch(() => null);
          case DeliveryMethodId.CDEK_POINT:
            if (!CDEKClient || !cdekConfig) return Promise.resolve(null);
            const cdekPointPackageData = convertPackage(packages, DeliveryMethodId.CDEK_POINT);
            return CDEKClient.calculatorByTariff({
              ...cdekConfig.request,
              tariff_code: 136,
              from_location: {
                address: method.data.fromAddress
              },
              to_location: {
                address: method.data.toAddress
              },
              ...cdekPointPackageData
            }).catch(() => null);
          case DeliveryMethodId.COURIERIST:
            if (!CourieristClient) return Promise.resolve(null);
            return CourieristClient.evaluateOrder(method.data, packages).catch(() => null);
          case DeliveryMethodId.LPOST_COURIER:
            if (!LPostClient || !method.data.latitude || !method.data.longitude) return Promise.resolve(null);
            const lpostCourierPackageData = convertPackage(packages, DeliveryMethodId.LPOST_COURIER);
            return LPostClient.getServicesCalc({
              fromWarehouseId: method.data.fromWarehouseId,
              latitude: method.data.latitude,
              longitude: method.data.longitude,
              weight: lpostCourierPackageData.Weight || 1,
              value: lpostCourierPackageData.Value || 0,
              sumPayment: 0,
              options: {
                fitting: false,
                returnDocuments: false
              }
            }).catch(() => null);
          case DeliveryMethodId.LPOST_POINT:
            if (!LPostClient || !method.data.toPickupPointId) return Promise.resolve(null);
            const lpostPointPackageData = convertPackage(packages, DeliveryMethodId.LPOST_POINT);
            return LPostClient.getServicesCalc({
              fromWarehouseId: method.data.fromWarehouseId,
              toPickupPointId: method.data.toPickupPointId,
              weight: lpostPointPackageData.Weight || 1,
              value: lpostPointPackageData.Value || 0,
              sumPayment: 0,
              options: {
                fitting: false,
                returnDocuments: false
              }
            }).catch(() => null);
          case DeliveryMethodId.CUSTOM:
            return Promise.resolve(null);
          default:
            return Promise.resolve(null);
        }
      });
      const responses = await Promise.all(requests);
      deliveryMethods.forEach((method, index) => {
        const response = responses[index];
        switch (method.method) {
          case DeliveryMethodId.POST:
            if (response?.['total-rate']) {
              options.push({
                id: DeliveryMethodId.POST,
                title: 'Почта России',
                cost: response['total-rate'] / 100,
                duration: `до ${response['delivery-time']['max-days']} дней`
              });
            }
            break;
          case DeliveryMethodId.CDEK_DOOR:
            if (response?.total_sum) {
              options.push({
                id: DeliveryMethodId.CDEK_DOOR,
                title: 'СДЭК-экспресс (до двери)',
                cost: response.total_sum,
                duration: `${response.period_min}-${response.period_max} дней`
              });
            }
            break;
          case DeliveryMethodId.CDEK_POINT:
            if (response?.total_sum) {
              options.push({
                id: DeliveryMethodId.CDEK_POINT,
                title: 'СДЭК-экспресс (до пункта выдачи)',
                cost: response.total_sum,
                duration: `${response.period_min}-${response.period_max} дней`
              });
            }
            break;
          case DeliveryMethodId.COURIERIST:
            if (response?.price) {
              options.push({
                id: DeliveryMethodId.COURIERIST,
                title: 'Курьерист',
                cost: response.price,
                duration: response.delivery_intervals?.length ? `${response.delivery_intervals[0].timeFrom}-${response.delivery_intervals[0].timeTo} (${response.estimate_at})` : `до ${response.estimate_at}`
              });
            }
            break;
          case DeliveryMethodId.LPOST_COURIER:
            console.log('LPOST_COURIER Response:', response);
            if (response?.sumCost) {
              options.push({
                id: DeliveryMethodId.LPOST_COURIER,
                title: 'Л-Пост (курьер)',
                cost: response.sumCost,
                duration: `${response.dayLogistic} дн.`
              });
            }
            break;
          case DeliveryMethodId.LPOST_POINT:
            console.log('LPOST_POINT Response:', response);
            if (response?.sumCost) {
              options.push({
                id: DeliveryMethodId.LPOST_POINT,
                title: 'Л-Пост (до ПВЗ)',
                cost: response.sumCost,
                duration: `${response.dayLogistic} дн.`
              });
            }
            break;
          case DeliveryMethodId.CUSTOM:
            break;
        }
      });
      const filteredOptions = [...options, ...customOptions];
      setDeliveryOptions(filteredOptions);
      onLoadComplete?.(filteredOptions);
    } catch (error) {
      console.error('Failed to fetch delivery options:', error);
      setDeliveryOptions([...customOptions]);
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  }, [deliveryMethods, packages, postConfig, cdekConfig, courieristConfig, lpostConfig, customOptions, CDEKClient, CourieristClient, LPostClient]);
  (0, _react.useEffect)(() => {
    fetchDeliveryOptions();
  }, [fetchDeliveryOptions]);
  const handleSelect = option => {
    setSelectedId(option.id);
    onSelect?.(option);
  };
  const styles = (0, _react.useMemo)(() => _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors?.background || 'transparent',
      marginTop: 16,
      width: '100%'
    },
    option: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      borderBottomWidth: 0.3,
      paddingVertical: 15,
      borderColor: colors?.border || '#00000044',
      backgroundColor: colors?.background || 'transparent'
    },
    radioContainer: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: '#000',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 20
    },
    radioContainerSelected: {
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: colors?.radioBorder || colors?.primary || '#000',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 20
    },
    radioSelected: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: colors?.radioFill || colors?.primary || '#000'
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
    section: {
      flex: 1,
      maxWidth: '90%'
    },
    cost: {
      color: colors?.text || '#000',
      fontSize: 16,
      fontWeight: '600'
    }
  }), [colors]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
    style: styles.container,
    children: isLoading ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: styles.loading,
      children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..."
    }) : deliveryOptions.length > 0 ? deliveryOptions.map(option => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.TouchableOpacity, {
      style: styles.option,
      onPress: () => handleSelect(option),
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: {
          flexDirection: 'row',
          alignItems: 'center',
          width: '70%'
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
          style: selectedId === option.id ? styles.radioContainerSelected : styles.radioContainer,
          children: selectedId === option.id && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: styles.radioSelected
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
          style: styles.section,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
            style: styles.title,
            children: option.title
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.Text, {
            style: styles.date,
            children: ["\u0421\u0440\u043E\u043A \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438: ", option.duration]
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: styles.cost,
        children: option.cost === 0 ? 'Бесплатно' : `${parseFloat(option.cost + '').toFixed(1)} руб.`
      })]
    }, option.id)) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
      style: styles.loading,
      children: "\u041D\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u043E\u0432 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438"
    })
  });
};
var _default = exports.default = DeliverySelector;
//# sourceMappingURL=index.js.map