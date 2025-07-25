"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCollapsibleScrollView = createCollapsibleScrollView;
var _react = _interopRequireDefault(require("react"));
var _reactNativeReanimated = _interopRequireDefault(require("react-native-reanimated"));
var _scene = require("./scene");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function createCollapsibleScrollView(Component) {
  // Use type assertion here if you're sure about the compatibility
  const AnimatePageView = _reactNativeReanimated.default.createAnimatedComponent(Component);
  return /*#__PURE__*/_react.default.forwardRef(function TabViewScene(props, ref) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_scene.SceneComponent, {
      ...props,
      forwardedRef: ref,
      ContainerView: AnimatePageView
    });
  });
}
//# sourceMappingURL=create-collapsible-scroll-view.js.map