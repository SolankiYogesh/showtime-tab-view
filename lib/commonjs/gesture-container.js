"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GestureContainer = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _useRefreshValue = require("./hooks/use-refresh-value");
var _useSceneInfo = require("./hooks/use-scene-info");
var _context = require("./context");
var _refreshControl = _interopRequireDefault(require("./refresh-control"));
var _utils = require("./utils");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const {
  width
} = _reactNative.Dimensions.get("window");
const GestureContainer = exports.GestureContainer = /*#__PURE__*/_react.default.forwardRef(function GestureContainer({
  refreshHeight = 65,
  pullExtendedCoefficient = 0.1,
  overflowPull = 50,
  overflowHeight = 0,
  scrollEnabled = true,
  minHeaderHeight = 0,
  isRefreshing: isRefreshingProp = false,
  initialPage,
  onStartRefresh,
  initTabbarHeight = 49,
  initHeaderHeight = 0,
  renderScrollHeader,
  overridenShareAnimatedValue,
  overridenTranslateYValue,
  renderTabView,
  renderRefreshControl: renderRefreshControlProp,
  animationHeaderPosition,
  animationHeaderHeight,
  panHeaderMaxOffset,
  onPullEnough,
  refreshControlColor,
  refreshControlTop = 0,
  emptyBodyComponent,
  navigationState,
  renderSceneHeader: renderSceneHeaderProp,
  enableGestureRunOnJS = false
}, forwardedRef) {
  //#region animation value
  const defaultShareAnimatedValue = (0, _reactNativeReanimated.useSharedValue)(0);
  const shareAnimatedValue = overridenShareAnimatedValue || defaultShareAnimatedValue;
  const defaultTranslateYValue = (0, _reactNativeReanimated.useSharedValue)(0);
  const translateYValue = overridenTranslateYValue || defaultTranslateYValue;
  const curIndexValue = (0, _reactNativeReanimated.useSharedValue)(initialPage);
  const isSlidingHeader = (0, _reactNativeReanimated.useSharedValue)(false);
  const slideIndex = (0, _reactNativeReanimated.useSharedValue)(curIndexValue.value);
  const headerTrans = (0, _reactNativeReanimated.useSharedValue)(0);
  const opacityValue = (0, _reactNativeReanimated.useSharedValue)(initHeaderHeight === 0 ? 0 : 1);
  /* pull-refresh */
  const isDragging = (0, _reactNativeReanimated.useSharedValue)(false);
  const tabsTrans = (0, _reactNativeReanimated.useSharedValue)(0);
  const tabsRefreshTrans = (0, _reactNativeReanimated.useSharedValue)(refreshHeight);
  const isRefreshing = (0, _reactNativeReanimated.useSharedValue)(false);
  const isStartRefreshing = (0, _reactNativeReanimated.useSharedValue)(false);
  const isRefreshingWithAnimation = (0, _reactNativeReanimated.useSharedValue)(false);
  const basyY = (0, _reactNativeReanimated.useSharedValue)(0);
  const startY = (0, _reactNativeReanimated.useSharedValue)(0);
  const isPullEnough = (0, _reactNativeReanimated.useSharedValue)(false);
  const headerTransStartY = (0, _reactNativeReanimated.useSharedValue)(0);
  const dragIndex = (0, _reactNativeReanimated.useSharedValue)(curIndexValue.value);
  //#endregion

  //#region hooks
  const {
    childScrollRef,
    childScrollYTrans,
    sceneIsReady,
    updateSceneInfo
  } = (0, _useSceneInfo.useSceneInfo)(curIndexValue);
  //#endregion

  //#region state
  const [tabbarHeight, setTabbarHeight] = (0, _react.useState)(initTabbarHeight);
  const [tabviewHeight, setTabviewHeight] = (0, _react.useState)(0);
  const [headerHeight, setHeaderHeight] = (0, _react.useState)(initHeaderHeight - overflowHeight);
  const [scrollStickyHeaderHeight, setStickyHeaderHeight] = (0, _react.useState)(0);
  const [childGestures, setChildRefs] = (0, _react.useState)([]);
  //#endregion

  const calcHeight = (0, _react.useMemo)(() => headerHeight - minHeaderHeight, [headerHeight, minHeaderHeight]);

  //#region methods
  const animateTabsToRefresh = (0, _react.useCallback)(isToRefresh => {
    "worklet";

    if (isToRefresh) {
      (0, _utils.animateToRefresh)({
        transRefreshing: tabsRefreshTrans,
        isRefreshing: isRefreshing,
        isRefreshingWithAnimation: isRefreshingWithAnimation,
        destPoi: 0,
        isToRefresh,
        onStartRefresh
      });
    } else {
      const destPoi = tabsRefreshTrans.value > refreshHeight ? tabsRefreshTrans.value + refreshHeight : refreshHeight;
      (0, _utils.animateToRefresh)({
        transRefreshing: tabsRefreshTrans,
        isRefreshing: isRefreshing,
        isRefreshingWithAnimation: isRefreshingWithAnimation,
        destPoi,
        isToRefresh
      });
    }
  }, [tabsRefreshTrans, isRefreshing, isRefreshingWithAnimation, onStartRefresh, refreshHeight]);
  const stopScrollView = (0, _react.useCallback)(() => {
    "worklet";

    if (!sceneIsReady.value[curIndexValue.value]) return;
    const scrollY = childScrollYTrans[curIndexValue.value]?.value;
    if (scrollY === undefined) return;
    (0, _utils._ScrollTo)(childScrollRef[curIndexValue.value], 0, scrollY + 0.1, false);
  }, [curIndexValue, childScrollRef, childScrollYTrans, sceneIsReady]);
  const onTabsStartRefresh = (0, _react.useCallback)(() => {
    "worklet";

    animateTabsToRefresh(true);
  }, [animateTabsToRefresh]);
  const onTabsEndRefresh = (0, _react.useCallback)(() => {
    "worklet";

    animateTabsToRefresh(false);
  }, [animateTabsToRefresh]);
  const stopAllAnimation = (0, _react.useCallback)(() => {
    "worklet";

    if (!sceneIsReady.value[curIndexValue.value]) return;
    (0, _reactNativeReanimated.cancelAnimation)(headerTrans);
    slideIndex.value = -1;
    dragIndex.value = -1;
    const handleSceneSync = index => {
      const scrollY = childScrollYTrans[index]?.value;
      if (scrollY === undefined) return;
      const syncPosition = Math.min(shareAnimatedValue.value, calcHeight);
      if (scrollY >= calcHeight && shareAnimatedValue.value >= calcHeight) return;
      (0, _utils._ScrollTo)(childScrollRef[index], 0, syncPosition, false);
    };
    for (const key in childScrollRef) {
      if (Object.prototype.hasOwnProperty.call(childScrollRef, key)) {
        if (Number.parseInt(key, 10) === curIndexValue.value) continue;
        handleSceneSync(Number.parseInt(key, 10));
      }
    }
  }, [calcHeight, childScrollRef, childScrollYTrans, curIndexValue, sceneIsReady, shareAnimatedValue, dragIndex, slideIndex, headerTrans]);
  const refHasChanged = (0, _react.useCallback)(ref => {
    if (!ref) return;
    const findItem = childGestures.find(item => item === ref);
    if (findItem) return;
    setChildRefs(prechildRefs => {
      return [...prechildRefs, ref];
    });
  }, [childGestures, setChildRefs]);
  const headerOnLayout = (0, _react.useCallback)(({
    nativeEvent: {
      layout
    }
  }) => {
    const height = layout.height - overflowHeight;
    setHeaderHeight(height);
    if (animationHeaderHeight) {
      animationHeaderHeight.value = Math.abs(calcHeight - minHeaderHeight);
    }
    opacityValue.value = (0, _reactNativeReanimated.withTiming)(1);
  }, [animationHeaderHeight, calcHeight, minHeaderHeight, opacityValue, overflowHeight, setHeaderHeight]);
  const tabbarOnLayout = (0, _react.useCallback)(({
    nativeEvent: {
      layout: {
        height
      }
    }
  }) => {
    if (overflowHeight > height) {
      console.warn("overflowHeight preferably less than the tabbar height");
    }
    if (Math.abs(tabbarHeight - height) < 1) return;
    setTabbarHeight(height);
  }, [overflowHeight, tabbarHeight, setTabbarHeight]);
  const containerOnLayout = (0, _react.useCallback)(event => {
    setTabviewHeight(event.nativeEvent.layout.height);
  }, [setTabviewHeight]);
  //#endregion

  //#region gesture handler
  const gestureHandlerHeader = (0, _react.useMemo)(() => _reactNativeGestureHandler.Gesture.Pan().activeOffsetY([-10, 10]).shouldCancelWhenOutside(false).enabled(scrollEnabled !== false).onBegin(() => {
    if (isRefreshing.value) return;
    stopScrollView();
  }).onUpdate(event => {
    if (!sceneIsReady.value[curIndexValue.value]) return;
    if (isSlidingHeader.value === false) {
      slideIndex.value = curIndexValue.value;
      const scrollY = childScrollYTrans[curIndexValue.value]?.value;
      if (scrollY === undefined) return;
      headerTransStartY.value = scrollY + event.translationY;
      isSlidingHeader.value = true;
    }
    headerTrans.value = Math.max(-event.translationY + headerTransStartY.value, 0);
  }).onEnd(event => {
    if (!sceneIsReady.value[curIndexValue.value]) return;
    if (isSlidingHeader.value === false) return;
    headerTransStartY.value = 0;
    headerTrans.value = (0, _reactNativeReanimated.withDecay)({
      velocity: -event.velocityY,
      clamp: [0, panHeaderMaxOffset ?? headerHeight - minHeaderHeight + overflowHeight]
    }, () => {
      isSlidingHeader.value = false;
    });
  }).runOnJS(enableGestureRunOnJS), [enableGestureRunOnJS, headerHeight, headerTrans, isRefreshing, sceneIsReady, stopScrollView, curIndexValue, childScrollYTrans, isSlidingHeader, slideIndex, panHeaderMaxOffset, minHeaderHeight, headerTransStartY, overflowHeight, scrollEnabled]);
  const gestureHandler = (0, _react.useMemo)(() => _reactNativeGestureHandler.Gesture.Pan().simultaneousWithExternalGesture(gestureHandlerHeader, ...childGestures).shouldCancelWhenOutside(false).enabled(scrollEnabled).activeOffsetX([-width, width]).activeOffsetY([-10, 10]).onBegin(() => {
    stopAllAnimation();
  }).onStart(() => {
    isPullEnough.value = false;
  }).onUpdate(event => {
    if (!sceneIsReady.value[curIndexValue.value] || !onStartRefresh || childScrollYTrans[curIndexValue.value]?.value === undefined) return;
    if (isRefreshing.value !== isRefreshingWithAnimation.value) return;

    // Handle refreshing state
    if (isRefreshing.value) {
      if (event.translationY < 0) {
        // If scrolling down, end refresh immediately
        isRefreshing.value = false;
        isRefreshingWithAnimation.value = false;
        tabsRefreshTrans.value = refreshHeight;
        return;
      }
      if (!isDragging.value) {
        startY.value = refreshHeight - tabsTrans.value + (childScrollYTrans[curIndexValue.value]?.value ?? 0);
        isDragging.value = true;
      }
      // Very stiff resistance
      const pullAmount = -event.translationY + startY.value;
      const resistance = Math.min(1, Math.max(0.96, 1 - pullAmount / (refreshHeight * 0.4)));
      tabsRefreshTrans.value = Math.max(pullAmount * resistance, 0);
      return;
    }

    // Handle pull to refresh
    if (shareAnimatedValue.value > 0 || event.translationY <= 0) return;
    if (!isDragging.value) {
      dragIndex.value = curIndexValue.value;
      basyY.value = event.translationY;
      isDragging.value = true;
      return;
    }
    const pullDistance = event.translationY - basyY.value;
    // Very high resistance and quick ramp-up
    const resistance = Math.min(1, Math.max(0.96, 1 - Math.abs(pullDistance) / (refreshHeight * 0.4)));
    tabsRefreshTrans.value = refreshHeight - pullDistance * resistance;
    if (!isPullEnough.value && pullDistance > refreshHeight && onPullEnough) {
      isPullEnough.value = true;
      (0, _reactNativeReanimated.runOnJS)(onPullEnough)();
    }
  }).onEnd(event => {
    if (!sceneIsReady.value[curIndexValue.value] || !onStartRefresh) return;
    if (!onStartRefresh) return;
    if (isDragging.value === false) return;
    isDragging.value = false;
    if (isRefreshing.value !== isRefreshingWithAnimation.value) return;
    if (isRefreshing.value) {
      startY.value = 0;
      tabsRefreshTrans.value = (0, _reactNativeReanimated.withSpring)(0, {
        mass: 1.4,
        stiffness: 180,
        damping: 25,
        velocity: -event.velocityY * 0.7
      });
    } else {
      tabsRefreshTrans.value < 0 ? onTabsStartRefresh() : onTabsEndRefresh();
    }
  }).runOnJS(enableGestureRunOnJS), [basyY, childScrollYTrans, curIndexValue, dragIndex, isDragging, isPullEnough, isRefreshing, isRefreshingWithAnimation, onPullEnough, onStartRefresh, sceneIsReady, shareAnimatedValue, startY, stopAllAnimation, tabsRefreshTrans, tabsTrans, scrollEnabled, onTabsEndRefresh, onTabsStartRefresh, gestureHandlerHeader, childGestures, refreshHeight, enableGestureRunOnJS]);

  //#endregion

  (0, _react.useEffect)(() => {
    animateTabsToRefresh(isRefreshingProp);
  }, [isRefreshingProp, animateTabsToRefresh]);

  // render Refresh component
  const renderRefreshControl = (0, _react.useCallback)(() => {
    if (!onStartRefresh) return;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_refreshControl.default, {
      top: refreshControlTop,
      refreshHeight: refreshHeight,
      overflowPull: overflowPull,
      refreshValue: tabsTrans,
      opacityValue: opacityValue,
      isRefreshing: isRefreshing,
      isRefreshingWithAnimation: isRefreshingWithAnimation,
      pullExtendedCoefficient: pullExtendedCoefficient,
      renderContent: renderRefreshControlProp,
      refreshControlColor: refreshControlColor
    });
  }, [renderRefreshControlProp, isRefreshing, isRefreshingWithAnimation, onStartRefresh, opacityValue, overflowPull, pullExtendedCoefficient, refreshControlColor, refreshControlTop, refreshHeight, tabsTrans]);

  //#region animation hooks
  (0, _reactNativeReanimated.useAnimatedReaction)(() => {
    return tabsRefreshTrans.value;
  }, mTrans => {
    const nextTabsTrans = Math.max(refreshHeight - mTrans, 0);
    if (tabsTrans.value !== nextTabsTrans) {
      tabsTrans.value = nextTabsTrans;
      // Sync scroll position when tabs position changes
      if (childScrollRef[curIndexValue.value]) {
        const scrollY = childScrollYTrans[curIndexValue.value]?.value;
        if (scrollY !== undefined) {
          if (mTrans > refreshHeight) {
            (0, _utils._ScrollTo)(childScrollRef[curIndexValue.value], 0, mTrans - refreshHeight, false);
          } else if (mTrans < refreshHeight && scrollY > 0) {
            (0, _utils._ScrollTo)(childScrollRef[curIndexValue.value], 0, 0, false);
          }
        }
      }
    }
  });
  (0, _reactNativeReanimated.useAnimatedReaction)(() => {
    return shareAnimatedValue.value;
  }, scrollY => {
    // for scrollview bounces effect on iOS
    if (_utils.isIOS && animationHeaderPosition && scrollY < calcHeight) {
      animationHeaderPosition.value = -scrollY;
    }
  });

  // slide header
  (0, _reactNativeReanimated.useAnimatedReaction)(() => {
    return headerTrans && slideIndex.value === curIndexValue.value && isSlidingHeader.value;
  }, start => {
    if (!start) return;
    if (!childScrollRef[curIndexValue.value]) return;
    const scrollY = childScrollYTrans[curIndexValue.value]?.value;
    if (scrollY === undefined) return;
    if (scrollY === headerTrans.value) return;
    (0, _utils._ScrollTo)(childScrollRef[curIndexValue.value], 0, headerTrans.value || 0, false);
  });
  const headerTransValue = (0, _reactNativeReanimated.useDerivedValue)(() => {
    const headerTransY = (0, _reactNativeReanimated.interpolate)(shareAnimatedValue.value, [0, calcHeight], [0, -calcHeight], _reactNativeReanimated.Extrapolation.CLAMP);
    if (_utils.isIOS) {
      return shareAnimatedValue.value > 0 ? headerTransY : -shareAnimatedValue.value;
    }
    if (animationHeaderPosition && headerTransY < calcHeight) {
      animationHeaderPosition.value = headerTransY;
    }
    return headerTransY;
  });
  const tabbarAnimateStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      transform: [{
        translateY: headerTransValue.value
      }]
    };
  });
  (0, _useRefreshValue.useRefreshDerivedValue)(translateYValue, {
    animatedValue: tabsTrans,
    refreshHeight,
    overflowPull,
    pullExtendedCoefficient
  });
  const animateStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      transform: [{
        translateY: translateYValue.value
      }]
    };
  });
  const opacityStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      opacity: opacityValue.value
    };
  });
  const headerStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      transform: [{
        translateY: headerTransValue.value
      }]
    };
  });
  //#endregion

  const renderTabBarContainer = (0, _react.useCallback)(children => {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeReanimated.default.View, {
      style: [styles.tabbarStyle, tabbarAnimateStyle],
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeGestureHandler.GestureDetector, {
        gesture: gestureHandlerHeader,
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeReanimated.default.View, {
          style: styles.container,
          children: [renderScrollHeader && /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            onLayout: headerOnLayout,
            children: renderScrollHeader()
          }), navigationState?.routes.length === 0 && emptyBodyComponent ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.View, {
            style: {
              marginTop: tabbarHeight
            },
            children: emptyBodyComponent
          }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeReanimated.default.View, {
            style: {
              transform: [{
                translateY: -overflowHeight
              }]
            },
            onLayout: tabbarOnLayout,
            children: children
          })]
        })
      })
    });
  }, [emptyBodyComponent, gestureHandlerHeader, headerOnLayout, navigationState, overflowHeight, renderScrollHeader, tabbarHeight, tabbarOnLayout, tabbarAnimateStyle]);
  const renderSceneHeader = (0, _react.useCallback)((children, props) => {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNative.View, {
      style: styles.header,
      children: [children, /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeReanimated.default.View, {
        onLayout: ({
          nativeEvent: {
            layout: {
              height
            }
          }
        }) => {
          setStickyHeaderHeight(height);
        },
        style: [{
          top: headerHeight + tabbarHeight,
          ...styles.tabbarStyle
        }, headerStyle],
        children: renderSceneHeaderProp?.(props.route)
      })]
    });
  }, [headerHeight, tabbarHeight, headerStyle, renderSceneHeaderProp, setStickyHeaderHeight]);
  (0, _react.useImperativeHandle)(forwardedRef, () => ({
    setCurrentIndex: index => {
      curIndexValue.value = index;
    }
  }), [curIndexValue]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_context.HeaderTabContext.Provider, {
    value: {
      shareAnimatedValue,
      headerTrans,
      tabbarHeight,
      expectHeight: Math.floor(headerHeight + tabviewHeight - minHeaderHeight),
      headerHeight,
      refreshHeight,
      overflowPull,
      pullExtendedCoefficient,
      refHasChanged,
      curIndexValue,
      minHeaderHeight,
      updateSceneInfo,
      isSlidingHeader,
      isStartRefreshing,
      scrollStickyHeaderHeight,
      scrollViewPaddingTop: tabbarHeight + headerHeight + scrollStickyHeaderHeight
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeGestureHandler.GestureDetector, {
      gesture: gestureHandler,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactNativeReanimated.default.View, {
        style: [styles.container, opacityStyle],
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeReanimated.default.View, {
          style: [styles.container, animateStyle],
          onLayout: containerOnLayout,
          children: renderTabView({
            renderTabBarContainer: renderTabBarContainer,
            renderSceneHeader: renderSceneHeader
          })
        }), renderRefreshControl()]
      })
    })
  });
});
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden"
  },
  header: {
    flex: 1
  },
  tabbarStyle: {
    left: 0,
    position: "absolute",
    right: 0,
    zIndex: 10
  }
});
//# sourceMappingURL=gesture-container.js.map