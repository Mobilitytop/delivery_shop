"use strict";

import { Text, TextInput, View } from 'react-native';
import defaultStyles from "./styles.js";
import useApp from "../../hooks/useApp.js";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
const Pickup = ({
  formData,
  onChangeFormData,
  styles
}) => {
  const {
    isDarkMode
  } = useApp();
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(View, {
      style: {
        ...defaultStyles.labelWrapper,
        ...styles?.labelWrapper
      },
      children: /*#__PURE__*/_jsx(Text, {
        style: {
          color: isDarkMode ? '#fff' : '#000',
          ...defaultStyles.label,
          ...styles?.label
        },
        children: "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 \u043A \u0437\u0430\u043A\u0430\u0437\u0443"
      })
    }), /*#__PURE__*/_jsx(TextInput, {
      value: formData.comment,
      onChangeText: comment => onChangeFormData({
        comment
      }),
      style: {
        color: isDarkMode ? '#fff' : '#000',
        ...defaultStyles.input,
        ...styles?.input
      }
    })]
  });
};
export default Pickup;
//# sourceMappingURL=Pickup.js.map