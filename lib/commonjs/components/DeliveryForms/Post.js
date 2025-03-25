"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _styles = _interopRequireDefault(require("./styles.js"));
var _useApp = _interopRequireDefault(require("../../hooks/useApp.js"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Post = ({
  formData,
  onChangeFormData,
  styles
}) => {
  const {
    isDarkMode
  } = (0, _useApp.default)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: {
          ..._styles.default.labelWrapper,
          ...styles?.labelWrapper
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: {
            color: isDarkMode ? '#fff' : '#000',
            ..._styles.default.label,
            ...styles?.label
          },
          children: "\u0410\u0434\u0440\u0435\u0441 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: {
            ..._styles.default.required,
            ...styles?.required
          },
          children: "*"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
        value: formData.address,
        onChangeText: address => onChangeFormData({
          address
        }),
        style: {
          color: isDarkMode ? '#fff' : '#000',
          ..._styles.default.input,
          ...styles?.input
        }
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
        style: {
          ..._styles.default.labelWrapper,
          ...styles?.labelWrapper
        },
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: {
            color: isDarkMode ? '#fff' : '#000',
            ..._styles.default.label,
            ...styles?.label
          },
          children: "\u0418\u043D\u0434\u0435\u043A\u0441"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
          style: {
            ..._styles.default.required,
            ...styles?.required
          },
          children: "*"
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
        value: formData.index,
        keyboardType: "numeric",
        maxLength: 6,
        onChangeText: index => onChangeFormData({
          index
        }),
        style: {
          color: isDarkMode ? '#fff' : '#000',
          ..._styles.default.input,
          ...styles?.input
        }
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: {
        ..._styles.default.labelWrapper,
        ...styles?.labelWrapper
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.Text, {
        style: {
          color: isDarkMode ? '#fff' : '#000',
          ..._styles.default.label,
          ...styles?.label
        },
        children: "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439 \u043A \u0437\u0430\u043A\u0430\u0437\u0443"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.TextInput, {
      value: formData.comment,
      onChangeText: comment => onChangeFormData({
        comment
      }),
      style: {
        color: isDarkMode ? '#fff' : '#000',
        ..._styles.default.input,
        ...styles?.input
      }
    })]
  });
};
var _default = exports.default = Post;
//# sourceMappingURL=Post.js.map