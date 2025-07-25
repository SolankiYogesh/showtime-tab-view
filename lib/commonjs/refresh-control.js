"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));
var _useRefreshValue = require("./hooks/use-refresh-value");
var _types = require("./types");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const RefreshControlContainer = /*#__PURE__*/(0, _react.memo)(({
  top,
  refreshHeight,
  overflowPull,
  opacityValue,
  refreshValue,
  isRefreshing,
  isRefreshingWithAnimation,
  pullExtendedCoefficient,
  renderContent,
  refreshControlColor = "#999999"
}) => {
  const refreshType = (0, _reactNativeReanimated.useSharedValue)(_types.RefreshTypeEnum.Idle);
  const progress = (0, _reactNativeReanimated.useDerivedValue)(() => {
    "worklet";

    if (isRefreshingWithAnimation.value) return 1;
    return Math.min(refreshValue.value / refreshHeight, 1);
  }, [refreshHeight]);
  const tranYValue = (0, _reactNativeReanimated.useSharedValue)(0);
  (0, _useRefreshValue.useRefreshDerivedValue)(tranYValue, {
    animatedValue: refreshValue,
    refreshHeight,
    overflowPull,
    pullExtendedCoefficient
  });
  (0, _reactNativeReanimated.useAnimatedReaction)(() => {
    "worklet";

    return {
      _progress: progress.value,
      _isRefreshing: isRefreshing.value,
      _isRefreshingWithAnimation: isRefreshingWithAnimation.value
    };
  }, ({
    _progress,
    _isRefreshing,
    _isRefreshingWithAnimation
  }) => {
    "worklet";

    if (_isRefreshing !== _isRefreshingWithAnimation) {
      refreshType.value = _isRefreshing ? _types.RefreshTypeEnum.Pending : _types.RefreshTypeEnum.Finish;
      return;
    }
    if (_isRefreshing) {
      refreshType.value = _types.RefreshTypeEnum.Refreshing;
    } else {
      refreshType.value = _progress < 1 ? _types.RefreshTypeEnum.Cancel : _types.RefreshTypeEnum.Success;
    }
  }, [refreshHeight]);
  const animatedStyle = (0, _reactNativeReanimated.useAnimatedStyle)(() => {
    "worklet";

    return {
      opacity: (0, _reactNativeReanimated.withSpring)(opacityValue.value, {
        mass: 1,
        damping: 15,
        stiffness: 120
      }),
      transform: [{
        translateY: tranYValue.value
      }]
    };
  }, []);
  const childProps = (0, _react.useMemo)(() => ({
    refreshValue,
    refreshType,
    progress
  }), [refreshValue, refreshType, progress]);
  const _renderContent = (0, _react.useCallback)(() => {
    if (renderContent) {
      return /*#__PURE__*/_react.default.cloneElement(renderContent(childProps), childProps);
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(RefreshControlNormal, {
      ...childProps,
      refreshControlColor: refreshControlColor
    });
  }, [renderContent, childProps, refreshControlColor]);
  const containerStyle = (0, _react.useMemo)(() => [styles.container, {
    top: top - refreshHeight,
    height: refreshHeight
  }, animatedStyle], [top, refreshHeight, animatedStyle]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeReanimated.default.View, {
    style: containerStyle,
    children: _renderContent()
  });
});
const styles = _reactNative.StyleSheet.create({
  baseControl: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingTop: 10
  },
  container: {
    left: 0,
    position: "absolute",
    right: 0,
    width: "100%"
  },
  textStyle: {
    marginTop: 4,
    fontSize: 13,
    textAlign: "center"
  }
});
const RefreshControlNormal = /*#__PURE__*/(0, _react.memo)(function RefreshControlNormal({
  refreshControlColor
}) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNativeReanimated.default.View, {
    style: styles.baseControl,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactNative.ActivityIndicator, {
      color: refreshControlColor
    })
  });
});
var _default = exports.default = RefreshControlContainer;
//# sourceMappingURL=refresh-control.js.map