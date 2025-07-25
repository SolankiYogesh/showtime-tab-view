"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabFlatList = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireDefault(require("react-native-reanimated"));
var _scene = require("../scene");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const AnimatePageView = _reactNative.Platform.OS === "web" ? _reactNative.FlatList : _reactNativeReanimated.default.createAnimatedComponent(_reactNative.FlatList);
function FlatList(props, ref) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_scene.SceneComponent, {
    ...props,
    forwardedRef: ref,
    ContainerView: AnimatePageView
  });
}
const TabFlatList = exports.TabFlatList = /*#__PURE__*/_react.default.forwardRef(FlatList);
//# sourceMappingURL=flat-list.js.map