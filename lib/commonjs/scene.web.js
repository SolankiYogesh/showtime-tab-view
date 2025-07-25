"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneComponent = SceneComponent;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = require("react-native-reanimated");
var _context = require("./context");
var _hooks = require("./hooks");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function SceneComponent({
  index,
  onScroll,
  ContainerView,
  contentContainerStyle,
  forwardedRef,
  style,
  ...restProps
}) {
  const {
    updateSceneInfo
  } = (0, _context.useHeaderTabContext)();
  const scollViewRef = (0, _hooks.useSharedScrollableRef)(forwardedRef);
  const scrollY = (0, _reactNativeReanimated.useSharedValue)(0);
  (0, _react.useEffect)(() => {
    if (scollViewRef && scollViewRef.current) {
      updateSceneInfo({
        scrollRef: scollViewRef,
        index,
        scrollY
      });
    }
  }, [scollViewRef, index, scrollY, updateSceneInfo]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(ContainerView, {
    ref: scollViewRef,
    scrollEventThrottle: 16,
    directionalLockEnabled: true,
    style: [styles.container, style],
    onScroll: onScroll,
    contentContainerStyle: [contentContainerStyle],
    bounces: false,
    ...restProps
  });
}
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  }
});
//# sourceMappingURL=scene.web.js.map