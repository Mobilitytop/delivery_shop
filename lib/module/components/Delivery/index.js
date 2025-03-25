"use strict";

import React, { useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import defaultStyles from "./styles.js";
import DeliveryMethod from "../DeliveryMethod/index.js";
import CurrentDeliveryMethod from "../CurrentDeliveryMethod/index.js";
import { DeliveryMethodId } from "../DeliveryMethod/types.js";
import useApp from "../../hooks/useApp.js";
import DeliveryForms from "../DeliveryForms/index.js";
import { fetchPostTariff } from "../../api/post/index.js";
import { Cdek } from "../../api/cdek/index.js";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
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
  } = useApp();
  const [edit, setEdit] = useState(true);
  const [rate, setRate] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  let activeDeliveryMethod, setActiveDeliveryMethod;
  [activeDeliveryMethod, setActiveDeliveryMethod] = useState(DeliveryMethodId.COURIER);
  const CDEKClient = useMemo(() => {
    return new Cdek({
      account: CDEKConfig.account,
      password: CDEKConfig.password,
      url_base: CDEKConfig.url_base
    });
  }, [CDEKConfig.account, CDEKConfig.password, CDEKConfig.url_base]);
  useEffect(() => {
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
    if (activeDeliveryMethod === DeliveryMethodId.POST) {
      const data = await fetchPostTariff({
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
    } else if (activeDeliveryMethod === DeliveryMethodId.CDEK_POINT) {
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
    } else if (activeDeliveryMethod === DeliveryMethodId.CDEK_DOOR) {
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
  return /*#__PURE__*/_jsxs(View, {
    style: {
      ...defaultStyles.container,
      ...styles?.container
    },
    children: [/*#__PURE__*/_jsx(Text, {
      style: {
        color: isDarkMode ? '#fff' : '#000',
        ...defaultStyles.title,
        ...styles?.title
      },
      children: "\u0421\u043F\u043E\u0441\u043E\u0431 \u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0438"
    }), edit ? /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(DeliveryMethod, {
        styles: styles?.deliveryMethod,
        onSelectDeliveryMethod: onSelectDeliveryMethod,
        activeDeliveryMethod: activeDeliveryMethod
      }), /*#__PURE__*/_jsx(DeliveryForms, {
        styles: styles?.deliveryForms,
        activeDeliveryMethod: activeDeliveryMethod,
        formData: formData,
        onChangeFormData: onChangeFormData,
        onSave: onSave,
        CDEKClient: CDEKClient
      })]
    }) : /*#__PURE__*/_jsx(CurrentDeliveryMethod, {
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
export default Delivery;
//# sourceMappingURL=index.js.map