"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneComponent = SceneComponent;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeGestureHandler = require("react-native-gesture-handler");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _useSyncInitialPosition = require("./hooks/use-sync-initial-position");
var _context = require("./context");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function mergeRefs(...inputRefs) {
  const filteredInputRefs = inputRefs.filter(Boolean);
  if (filteredInputRefs.length <= 1) {
    const firstRef = filteredInputRefs[0];
    return firstRef || null;
  }
  return function mergedRefs(ref) {
    for (const inputRef of filteredInputRefs) {
      if (typeof inputRef === "function") {
        inputRef(ref);
      } else if (inputRef) {
        inputRef.current = ref;
      }
    }
  };
}
function SceneComponent({
  index,
  onScroll: propOnScroll,
  onContentSizeChange,
  ContainerView,
  contentContainerStyle,
  scrollIndicatorInsets,
  forwardedRef,
  useExternalScrollView = false,
  ...restProps
}) {
  //#region refs
  const nativeGestureRef = (0, _react.useRef)(_reactNativeGestureHandler.Gesture.Native());
  const scollViewRef = (0, _reactNativeReanimated.useAnimatedRef)();
  //#endregion

  //#region hooks
  const {
    shareAnimatedValue,
    expectHeight,
    refHasChanged,
    updateSceneInfo,
    scrollViewPaddingTop
  } = (0, _context.useHeaderTabContext)();
  //#endregion

  //#region animations/style
  const scrollY = (0, _reactNativeReanimated.useSharedValue)(0);
  const {
    opacityValue,
    initialPosition
  } = (0, _useSyncInitialPosition.useSyncInitialPosition)(scollViewRef);
  const sceneStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    return {
      opacity: (0, _reactNativeReanimated.withTiming)(opacityValue.value)
    };
  }, [opacityValue]);

  //#endregion

  //#region methods
  const onScrollAnimateEvent = (0, _reactNativeReanimated.useAnimatedScrollHandler)({
    onScroll: e => {
      scrollY.value = e.contentOffset.y;
      shareAnimatedValue.value = e.contentOffset.y;
      if (propOnScroll) {
        (0, _reactNativeReanimated.runOnJS)(propOnScroll)({
          nativeEvent: e
        });
      }
    }
  }, []);

  // adjust the scene size
  const _onContentSizeChange = (0, _react.useCallback)((contentWidth, contentHeight) => {
    onContentSizeChange?.(contentWidth, contentHeight);
    if (Math.ceil(contentHeight) >= expectHeight) {
      initialPosition(shareAnimatedValue.value);
    }
  }, [onContentSizeChange, initialPosition, expectHeight, shareAnimatedValue]);
  //#endregion

  (0, _react.useEffect)(() => {
    refHasChanged?.(nativeGestureRef.current);
  }, [refHasChanged]);
  (0, _react.useEffect)(() => {
    if (scollViewRef?.current) {
      updateSceneInfo({
        scrollRef: scollViewRef,
        index,
        scrollY
      });
    }
  }, [scollViewRef, index, scrollY, updateSceneInfo]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeReanimated.default.View, {
    style: [styles.container, sceneStyle],
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeGestureHandler.GestureDetector, {
      gesture: nativeGestureRef.current,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(ContainerView, {
        ...restProps,
        ref: mergeRefs(scollViewRef, forwardedRef),
        scrollEventThrottle: 16,
        directionalLockEnabled: true,
        contentContainerStyle: [contentContainerStyle, {
          paddingTop: useExternalScrollView ? 0 : scrollViewPaddingTop,
          minHeight: expectHeight
        }],
        onContentSizeChange: _onContentSizeChange,
        onScroll: onScrollAnimateEvent,
        scrollIndicatorInsets: {
          top: scrollViewPaddingTop,
          ...scrollIndicatorInsets
        }
        // bounces={false}
      })
    })
  });
}
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  }
});
//# sourceMappingURL=scene.js.map