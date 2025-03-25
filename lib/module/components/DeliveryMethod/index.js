"use strict";

import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { deliveriesData } from "./data.js";
import defaultStyles from "./styles.js";
import useApp from "../../hooks/useApp.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const DeliveryMethod = ({
  styles,
  onSelectDeliveryMethod: onPress,
  activeDeliveryMethod: active,
  deliveryMethods
}) => {
  const {
    isDarkMode
  } = useApp();
  const deliveries = useMemo(() => {
    if (deliveryMethods?.length) {
      return deliveriesData?.filter(el => deliveryMethods.some(el2 => el.id === el2));
    }
    return deliveriesData;
  }, [deliveryMethods]);
  return /*#__PURE__*/_jsx(View, {
    style: {
      ...defaultStyles.container,
      ...styles?.container
    },
    children: deliveries?.map(el => /*#__PURE__*/_jsx(TouchableOpacity, {
      onPress: () => {
        onPress(el.id);
      },
      style: {
        ...defaultStyles.item,
        ...styles?.item
      },
      children: /*#__PURE__*/_jsxs(View, {
        style: {
          ...defaultStyles.itemInner,
          ...styles?.itemInner
        },
        children: [/*#__PURE__*/_jsxs(View, {
          style: {
            ...defaultStyles.itemContainer,
            ...styles?.itemContainer
          },
          children: [/*#__PURE__*/_jsx(Text, {
            style: {
              color: isDarkMode ? '#fff' : '#000',
              ...defaultStyles.title,
              ...styles?.title
            },
            children: el.title
          }), el.description && /*#__PURE__*/_jsx(Text, {
            style: {
              color: isDarkMode ? '#fff' : '#000',
              ...defaultStyles.description,
              ...styles?.description
            },
            children: el.description
          })]
        }), /*#__PURE__*/_jsx(View, {
          style: {
            ...defaultStyles.checkbox,
            ...styles?.checkbox,
            backgroundColor: active === el.id ? '#F93D00' : undefined
          },
          children: active === el.id && /*#__PURE__*/_jsx(View, {
            style: {
              ...defaultStyles.checkboxActive,
              ...styles?.checkboxActive
            }
          })
        })]
      })
    }, el.id))
  });
};
export default DeliveryMethod;
//# sourceMappingURL=index.js.map