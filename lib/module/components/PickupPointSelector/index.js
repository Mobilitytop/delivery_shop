"use strict";

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Cdek } from "../../api/cdek/index.js";
import { DeliveryMethodId } from "./types.js";
import SelectDropdown from 'react-native-select-dropdown';

// Тип для пункта выдачи

// Пропсы компонента

// Тип для кастомизации цветов
import { jsx as _jsx } from "react/jsx-runtime";
const PickupPointSelector = ({
  deliveryMethod,
  cdekConfig,
  toIndex,
  colors,
  onSelect,
  onError
}) => {
  const [pickupPoints, setPickupPoints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const CDEKClient = useMemo(() => cdekConfig ? new Cdek({
    account: cdekConfig.account,
    password: cdekConfig.password,
    url_base: cdekConfig.url_base
  }) : null, [cdekConfig?.account, cdekConfig?.password, cdekConfig?.url_base]);
  const fetchPickupPoints = useCallback(async () => {
    if (deliveryMethod !== DeliveryMethodId.CDEK_POINT || !CDEKClient) return;
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
  useEffect(() => {
    fetchPickupPoints();
  }, []);
  const styles = useMemo(() => StyleSheet.create({
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
  if (deliveryMethod !== DeliveryMethodId.CDEK_POINT) return null;
  return /*#__PURE__*/_jsx(View, {
    style: styles.container,
    children: isLoading ? /*#__PURE__*/_jsx(Text, {
      style: styles.loading,
      children: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043F\u0443\u043D\u043A\u0442\u043E\u0432 \u0432\u044B\u0434\u0430\u0447\u0438..."
    }) : pickupPoints.length > 0 ? /*#__PURE__*/_jsx(SelectDropdown, {
      data: pickupPoints,
      onSelect: selectedItem => {
        onSelect?.(selectedItem);
      },
      renderButton: selectedItem => {
        return /*#__PURE__*/_jsx(View, {
          style: styles.dropdownButton,
          children: /*#__PURE__*/_jsx(Text, {
            style: styles.dropdownButtonText,
            children: selectedItem && selectedItem.address || 'Выберите пункт выдачи'
          })
        });
      },
      renderItem: item => /*#__PURE__*/_jsx(View, {
        style: styles.dropdownRow,
        children: /*#__PURE__*/_jsx(Text, {
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
    }) : /*#__PURE__*/_jsx(Text, {
      style: styles.loading,
      children: "\u041F\u0443\u043D\u043A\u0442\u044B \u0432\u044B\u0434\u0430\u0447\u0438 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B"
    })
  });
};
export default PickupPointSelector;
//# sourceMappingURL=index.js.map