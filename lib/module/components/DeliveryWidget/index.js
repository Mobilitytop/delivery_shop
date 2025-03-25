"use strict";

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { DeliveryMethodId } from "../DeliveryMethod/types.js";
import { fetchPostTariff } from "../../api/post/index.js";
import { Cdek } from "../../api/cdek/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const DeliveryWidget = ({
  colors,
  address,
  index,
  postConfig,
  CDEKConfig,
  customOptions = []
}) => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const CDEKClient = useMemo(() => new Cdek({
    account: CDEKConfig.account,
    password: CDEKConfig.password,
    url_base: CDEKConfig.url_base
  }), [CDEKConfig.account, CDEKConfig.password, CDEKConfig.url_base]);
  const fetchDeliveryOptions = useCallback(async () => {
    try {
      setIsLoading(true);
      const options = [];
      const [postResponse, cdekDoorResponse, cdekPointResponse] = await Promise.all([fetchPostTariff({
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
          id: DeliveryMethodId.POST,
          title: 'Почта России',
          cost: postResponse['total-rate'] / 100,
          duration: `до ${postResponse['delivery-time']['max-days']} дней`
        });
      }
      if (cdekDoorResponse?.total_sum) {
        options.push({
          id: DeliveryMethodId.CDEK_DOOR,
          title: 'СДЭК-экспресс (до двери)',
          cost: cdekDoorResponse.total_sum,
          duration: `${cdekDoorResponse.period_min}-${cdekDoorResponse.period_max} дней`
        });
      }
      if (cdekPointResponse?.total_sum) {
        options.push({
          id: DeliveryMethodId.CDEK_POINT,
          title: 'СДЭК-экспресс (до пункта выдачи)',
          cost: cdekPointResponse.total_sum,
          duration: `${cdekPointResponse.period_min}-${cdekPointResponse.period_max} дней`
        });
      }
      setDeliveryOptions([...options, ...customOptions]);
    } catch (error) {
      console.error('Failed to fetch delivery options:', error);
      setDeliveryOptions([...customOptions]);
    } finally {
      setIsLoading(false);
    }
  }, [CDEKClient, CDEKConfig, postConfig, address, index, customOptions]);
  useEffect(() => {
    fetchDeliveryOptions();
  }, [fetchDeliveryOptions]);
  const styles = useMemo(() => StyleSheet.create({
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
    section: {
      flex: 1,
      maxWidth: '90%'
    }
  }), [colors]);
  return /*#__PURE__*/_jsx(View, {
    style: styles.container,
    children: isLoading ? /*#__PURE__*/_jsx(Text, {
      style: styles.loading,
      children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430..."
    }) : deliveryOptions.length > 0 ? deliveryOptions.map(option => /*#__PURE__*/_jsxs(View, {
      style: styles.option,
      children: [/*#__PURE__*/_jsxs(View, {
        style: styles.section,
        children: [/*#__PURE__*/_jsx(Text, {
          style: styles.title,
          children: option.title
        }), /*#__PURE__*/_jsxs(Text, {
          style: styles.date,
          children: ["\u0421\u0440\u043E\u043A \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438: ", option.duration]
        })]
      }), /*#__PURE__*/_jsx(Text, {
        style: styles.title,
        children: option.cost === 0 ? 'Бесплатно' : `${parseFloat(option.cost + '').toFixed(1)} руб.`
      })]
    }, option.id)) : /*#__PURE__*/_jsx(Text, {
      style: styles.loading,
      children: "\u041D\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u043E\u0432 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438"
    })
  });
};
export default DeliveryWidget;
//# sourceMappingURL=index.js.map