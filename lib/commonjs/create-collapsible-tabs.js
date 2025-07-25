"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCollapsibleTabsComponent = createCollapsibleTabsComponent;
var _react = _interopRequireWildcard(require("react"));
var _reactNativeTabView = require("react-native-tab-view");
var _gestureContainer = require("./gesture-container");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function createCollapsibleTabsComponent(Component) {
  return /*#__PURE__*/_react.default.forwardRef(function tabView(props, ref) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(CollapsibleHeaderTabView, {
      ...props,
      forwardedRef: ref,
      Component: Component
    });
  });
}
function CollapsibleHeaderTabView({
  forwardedRef,
  ...props
}) {
  const gestureContainerRef = (0, _react.useRef)(null);
  const initialPageRef = (0, _react.useRef)(props.navigationState.index);
  (0, _react.useEffect)(() => {
    gestureContainerRef.current?.setCurrentIndex(props.navigationState.index);
  }, [props.navigationState.index]);
  (0, _react.useImperativeHandle)(forwardedRef, () => ({
    // Todo: add snapTo tab view content method
  }), []);
  const renderTabBar = (0, _react.useCallback)(tabbarProps => {
    return props?.renderTabBar ? props.renderTabBar(tabbarProps) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeTabView.TabBar, {
      ...tabbarProps
    });
  }, [props]);
  const renderTabView = e => {
    const {
      Component,
      renderScene,
      ...restProps
    } = props;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(Component, {
      ...restProps,
      renderTabBar: tabbarProps => e.renderTabBarContainer(renderTabBar(tabbarProps)),
      renderScene: props => e.renderSceneHeader(renderScene(props), props)
    });
  };
  return (
    /*#__PURE__*/
    // @ts-expect-error Needs fixing
    (0, _jsxRuntime.jsx)(_gestureContainer.GestureContainer, {
      ref: gestureContainerRef,
      initialPage: initialPageRef.current,
      renderTabView: renderTabView,
      ...props
    })
  );
}
//# sourceMappingURL=create-collapsible-tabs.js.map