"use strict";

import React, { useMemo } from 'react';
import { Text, View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { DeliveryMethodId } from "../DeliveryMethod/types.js";
import useApp from "../../hooks/useApp.js";
import defaultStyles from "./styles.js";
import Courier from "./Courier.js";
import Pickup from "./Pickup.js";
import CDEKDoor from "./CDEK-door.js";
import CDEKPoint from "./CDEK-point.js";
import Post from "./Post.js";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
const DeliveryForms = props => {
  const {
    isDarkMode
  } = useApp();
  const {
    styles,
    activeDeliveryMethod,
    formData,
    onSave
  } = props;
  const disabled = useMemo(() => {
    switch (activeDeliveryMethod) {
      case DeliveryMethodId.COURIER:
        return !formData.address || !formData.flat || !formData.entrance || !formData.intercom || !formData.floor;
      case DeliveryMethodId.PICKUP:
        return false;
      case DeliveryMethodId.CDEK_DOOR:
        return !formData.city?.code || !formData.address || !formData.flat || !formData.entrance || !formData.intercom || !formData.floor;
      case DeliveryMethodId.CDEK_POINT:
        return !formData.city?.code || !formData.pickupPoint;
      case DeliveryMethodId.POST:
        return !formData.address || !formData.index || formData.index?.length < 6;
      default:
        return false;
    }
  }, [activeDeliveryMethod, formData]);
  const form = useMemo(() => {
    switch (activeDeliveryMethod) {
      case DeliveryMethodId.COURIER:
        return /*#__PURE__*/_jsx(Courier, {
          ...props
        });
      case DeliveryMethodId.PICKUP:
        return /*#__PURE__*/_jsx(Pickup, {
          ...props
        });
      case DeliveryMethodId.CDEK_DOOR:
        return /*#__PURE__*/_jsx(CDEKDoor, {
          ...props
        });
      case DeliveryMethodId.CDEK_POINT:
        return /*#__PURE__*/_jsx(CDEKPoint, {
          ...props
        });
      case DeliveryMethodId.POST:
        return /*#__PURE__*/_jsx(Post, {
          ...props
        });
      default:
        return /*#__PURE__*/_jsx(_Fragment, {});
    }
  }, [activeDeliveryMethod, props]);
  return /*#__PURE__*/_jsxs(View, {
    style: {
      ...defaultStyles.container,
      ...styles?.container
    },
    children: [/*#__PURE__*/_jsx(KeyboardAvoidingView, {
      behavior: Platform.OS === 'ios' ? 'padding' : 'height',
      style: {
        flex: 1,
        zIndex: 1000
      },
      children: form
    }), /*#__PURE__*/_jsx(Text, {
      style: {
        color: isDarkMode ? '#fff' : '#000',
        ...defaultStyles.label,
        ...styles?.label
      },
      children: "\u2013 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043F\u043E\u043B\u044F"
    }), /*#__PURE__*/_jsx(TouchableOpacity, {
      disabled: disabled,
      onPress: onSave,
      style: {
        opacity: disabled ? 0.5 : 1,
        ...defaultStyles.button,
        ...styles?.button
      },
      children: /*#__PURE__*/_jsx(Text, {
        style: {
          ...defaultStyles.buttonText,
          ...styles?.buttonText
        },
        children: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"
      })
    })]
  });
};
export default DeliveryForms;
//# sourceMappingURL=index.js.map