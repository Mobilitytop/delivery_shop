"use strict";

import { Text, TextInput, View } from 'react-native';
import defaultStyles from "./styles.js";
import useApp from "../../hooks/useApp.js";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const Courier = ({
  formData,
  onChangeFormData,
  styles
}) => {
  const {
    isDarkMode
  } = useApp();
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(View, {
      style: {
        ...defaultStyles.form,
        ...styles?.form
      },
      children: [/*#__PURE__*/_jsxs(View, {
        style: {
          ...defaultStyles.labelWrapper,
          ...styles?.labelWrapper
        },
        children: [/*#__PURE__*/_jsx(Text, {
          style: {
            color: isDarkMode ? '#fff' : '#000',
            ...defaultStyles.label,
            ...styles?.label
          },
          children: "\u0410\u0434\u0440\u0435\u0441 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438"
        }), /*#__PURE__*/_jsx(Text, {
          style: {
            ...defaultStyles.required,
            ...styles?.required
          },
          children: "*"
        })]
      }), /*#__PURE__*/_jsx(TextInput, {
        value: formData.address,
        onChangeText: address => onChangeFormData({
          address
        }),
        style: {
          color: isDarkMode ? '#fff' : '#000',
          ...defaultStyles.input,
          ...styles?.input
        }
      })]
    }), /*#__PURE__*/_jsxs(View, {
      style: {
        ...defaultStyles.inputs,
        ...styles?.inputs
      },
      children: [/*#__PURE__*/_jsxs(View, {
        style: {
          ...defaultStyles.form,
          ...styles?.form
        },
        children: [/*#__PURE__*/_jsxs(View, {
          style: {
            ...defaultStyles.labelWrapper,
            ...styles?.labelWrapper
          },
          children: [/*#__PURE__*/_jsx(Text, {
            style: {
              color: isDarkMode ? '#fff' : '#000',
              ...defaultStyles.label,
              ...styles?.label
            },
            children: "\u041A\u0432\u0430\u0440\u0442\u0438\u0440\u0430"
          }), /*#__PURE__*/_jsx(Text, {
            style: {
              ...defaultStyles.required,
              ...styles?.required
            },
            children: "*"
          })]
        }), /*#__PURE__*/_jsx(TextInput, {
          value: formData.flat,
          onChangeText: flat => onChangeFormData({
            flat
          }),
          keyboardType: "numeric",
          style: {
            ...defaultStyles.input,
            ...styles?.input
          }
        })]
      }), /*#__PURE__*/_jsxs(View, {
        style: {
          ...defaultStyles.form,
          ...styles?.form
        },
        children: [/*#__PURE__*/_jsxs(View, {
          style: {
            ...defaultStyles.labelWrapper,
            ...styles?.labelWrapper
          },
          children: [/*#__PURE__*/_jsx(Text, {
            style: {
              color: isDarkMode ? '#fff' : '#000',
              ...defaultStyles.label,
              ...styles?.label
            },
            children: "\u041F\u043E\u0434\u044A\u0435\u0437\u0434"
          }), /*#__PURE__*/_jsx(Text, {
            style: {
              ...defaultStyles.required,
              ...styles?.required
            },
            children: "*"
          })]
        }), /*#__PURE__*/_jsx(TextInput, {
          value: formData.entrance,
          onChangeText: entrance => onChangeFormData({
            entrance
          }),
          keyboardType: "numeric",
          style: {
            ...defaultStyles.input,
            ...styles?.input
          }
        })]
      })]
    }), /*#__PURE__*/_jsxs(View, {
      style: {
        ...defaultStyles.inputs,
        ...styles?.inputs
      },
      children: [/*#__PURE__*/_jsxs(View, {
        style: {
          ...defaultStyles.form,
          ...styles?.form
        },
        children: [/*#__PURE__*/_jsxs(View, {
          style: {
            ...defaultStyles.labelWrapper,
            ...styles?.labelWrapper
          },
          children: [/*#__PURE__*/_jsx(Text, {
            style: {
              color: isDarkMode ? '#fff' : '#000',
              ...defaultStyles.label,
              ...styles?.label
            },
            children: "\u042D\u0442\u0430\u0436"
          }), /*#__PURE__*/_jsx(Text, {
            style: {
              ...defaultStyles.required,
              ...styles?.required
            },
            children: "*"
          })]
        }), /*#__PURE__*/_jsx(TextInput, {
          value: formData.floor,
          onChangeText: floor => onChangeFormData({
            floor
          }),
          keyboardType: "numeric",
          style: {
            ...defaultStyles.input,
            ...styles?.input
          }
        })]
      }), /*#__PURE__*/_jsxs(View, {
        style: {
          ...defaultStyles.form,
          ...styles?.form
        },
        children: [/*#__PURE__*/_jsxs(View, {
          style: {
            ...defaultStyles.labelWrapper,
            ...styles?.labelWrapper
          },
          children: [/*#__PURE__*/_jsx(Text, {
            style: {
              color: isDarkMode ? '#fff' : '#000',
              ...defaultStyles.label,
              ...styles?.label
            },
            children: "\u0414\u043E\u043C\u043E\u0444\u043E\u043D"
          }), /*#__PURE__*/_jsx(Text, {
            style: {
              ...defaultStyles.required,
              ...styles?.required
            },
            children: "*"
          })]
        }), /*#__PURE__*/_jsx(TextInput, {
          value: formData.intercom,
          onChangeText: intercom => onChangeFormData({
            intercom
          }),
          style: {
            ...defaultStyles.input,
            ...styles?.input
          }
        })]
      })]
    }), /*#__PURE__*/_jsx(View, {
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
export default Courier;
//# sourceMappingURL=Courier.js.map