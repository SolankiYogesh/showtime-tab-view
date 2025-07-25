"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TabFlatList", {
  enumerable: true,
  get: function () {
    return _scrollableView.TabFlatList;
  }
});
Object.defineProperty(exports, "TabScrollView", {
  enumerable: true,
  get: function () {
    return _scrollableView.TabScrollView;
  }
});
Object.defineProperty(exports, "TabSectionList", {
  enumerable: true,
  get: function () {
    return _scrollableView.TabSectionList;
  }
});
exports.createCollapsibleTabsComponent = createCollapsibleTabsComponent;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeTabView = require("react-native-tab-view");
var _context = require("./context");
var _hooks = require("./hooks");
var _reactNativeReanimated = require("react-native-reanimated");
var _jsxRuntime = require("react/jsx-runtime");
var _scrollableView = require("./scrollable-view");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function createCollapsibleTabsComponent() {
  return /*#__PURE__*/_react.default.forwardRef(CollapsibleHeaderTabView);
}
function CollapsibleHeaderTabView({
  renderTabBar: renderTabBarProp,
  renderScrollHeader,
  initTabbarHeight = 44,
  minHeaderHeight = 0,
  navigationState,
  emptyBodyComponent,
  renderScene,
  renderSceneHeader: renderSceneHeaderProp,
  ...restProps
}, ref) {
  const shareAnimatedValue = (0, _reactNativeReanimated.useSharedValue)(0);
  const headerTrans = (0, _reactNativeReanimated.useSharedValue)(0);
  const curIndexValue = (0, _reactNativeReanimated.useSharedValue)(0);
  const isSlidingHeader = (0, _reactNativeReanimated.useSharedValue)(false);
  const isStartRefreshing = (0, _reactNativeReanimated.useSharedValue)(false);

  // layout
  const [tabbarHeight, setTabbarHeight] = (0, _react.useState)(initTabbarHeight);
  const containeRef = (0, _react.useRef)(null);
  (0, _react.useImperativeHandle)(ref, () => ({}), []);
  const tabbarOnLayout = (0, _react.useCallback)(({
    nativeEvent: {
      layout: {
        height
      }
    }
  }) => {
    if (Math.abs(tabbarHeight - height) < 1) return;
    setTabbarHeight(height);
  }, [tabbarHeight]);
  const renderTabBar = (0, _react.useCallback)(tabbarProps => {
    return renderTabBarProp ? renderTabBarProp(tabbarProps) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeTabView.TabBar, {
      ...tabbarProps
    });
  }, [renderTabBarProp]);
  const renderTabView = e => {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeTabView.TabView, {
      navigationState: navigationState,
      ...restProps,
      renderTabBar: tabbarProps => e.renderTabBarContainer(renderTabBar(tabbarProps)),
      renderScene: props => e.renderSceneHeader(renderScene(props), props)
    });
  };
  const renderTabBarContainer = children => {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
      style: styles.tabbarStyle,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        onLayout: tabbarOnLayout,
        children: children
      })
    });
  };
  const renderSceneHeader = (children, props) => {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.full,
      children: [renderSceneHeaderProp?.(props.route), children]
    });
  };
  const {
    updateSceneInfo
  } = (0, _hooks.useSceneInfo)(curIndexValue);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_context.HeaderTabContext.Provider, {
    value: {
      shareAnimatedValue,
      headerTrans,
      tabbarHeight,
      expectHeight: 0,
      headerHeight: 0,
      refreshHeight: 0,
      overflowPull: 0,
      pullExtendedCoefficient: 0,
      refHasChanged: () => false,
      curIndexValue,
      minHeaderHeight,
      updateSceneInfo,
      isSlidingHeader,
      isStartRefreshing,
      scrollStickyHeaderHeight: 0,
      scrollViewPaddingTop: 0
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      ref: containeRef,
      style: styles.full,
      children: [renderScrollHeader && renderScrollHeader(), navigationState.routes.length === 0 && emptyBodyComponent ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
        style: {
          marginTop: tabbarHeight
        },
        children: emptyBodyComponent
      }) : renderTabView({
        renderTabBarContainer: renderTabBarContainer,
        renderSceneHeader: renderSceneHeader
      })]
    })
  });
}
const styles = _reactNative.StyleSheet.create({
  full: {
    flex: 1
  },
  tabbarStyle: {
    zIndex: 1
  }
});
//# sourceMappingURL=create-collapsible-tabs.web.js.map