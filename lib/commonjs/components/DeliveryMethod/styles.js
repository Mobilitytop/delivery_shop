"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
const styles = _reactNative.StyleSheet.create({
  container: {},
  item: {
    paddingVertical: 10
  },
  itemInner: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#ececec',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#ececec',
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkboxActive: {
    width: 9,
    height: 9,
    borderRadius: 10,
    backgroundColor: '#fff'
  },
  itemContainer: {
    flex: 1,
    paddingRight: 10
  },
  title: {
    fontSize: 15,
    lineHeight: 22
  },
  description: {
    fontSize: 13,
    lineHeight: 21
  }
});
var _default = exports.default = styles;
//# sourceMappingURL=styles.js.map