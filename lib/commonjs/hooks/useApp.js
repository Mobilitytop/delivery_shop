"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
const useApp = () => {
  const isDarkMode = (0, _reactNative.useColorScheme)() === 'dark';
  return {
    isDarkMode
  };
};
var _default = exports.default = useApp;
//# sourceMappingURL=useApp.js.map