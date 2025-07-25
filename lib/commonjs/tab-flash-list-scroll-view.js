"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabFlashListScrollView = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNativeReanimated = _interopRequireDefault(require("react-native-reanimated"));
var _scene = require("./scene");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function TabFlashListScrollViewComponent(props, ref) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_scene.SceneComponent, {
    ...props,
    forwardedRef: ref,
    ContainerView: _reactNativeReanimated.default.ScrollView
  });
}
const TabFlashListScrollView = exports.TabFlashListScrollView = /*#__PURE__*/_react.default.forwardRef(TabFlashListScrollViewComponent);
//# sourceMappingURL=tab-flash-list-scroll-view.js.map