"use strict";

import React, { memo, useCallback, useMemo } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import Animated, { useAnimatedReaction, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring } from "react-native-reanimated";
import { useRefreshDerivedValue } from "./hooks/use-refresh-value";
import { RefreshTypeEnum } from "./types";
import { jsx as _jsx } from "react/jsx-runtime";
const RefreshControlContainer = /*#__PURE__*/memo(({
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
  const refreshType = useSharedValue(RefreshTypeEnum.Idle);
  const progress = useDerivedValue(() => {
    "worklet";

    if (isRefreshingWithAnimation.value) return 1;
    return Math.min(refreshValue.value / refreshHeight, 1);
  }, [refreshHeight]);
  const tranYValue = useSharedValue(0);
  useRefreshDerivedValue(tranYValue, {
    animatedValue: refreshValue,
    refreshHeight,
    overflowPull,
    pullExtendedCoefficient
  });
  useAnimatedReaction(() => {
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
      refreshType.value = _isRefreshing ? RefreshTypeEnum.Pending : RefreshTypeEnum.Finish;
      return;
    }
    if (_isRefreshing) {
      refreshType.value = RefreshTypeEnum.Refreshing;
    } else {
      refreshType.value = _progress < 1 ? RefreshTypeEnum.Cancel : RefreshTypeEnum.Success;
    }
  }, [refreshHeight]);
  const animatedStyle = useAnimatedStyle(() => {
    "worklet";

    return {
      opacity: withSpring(opacityValue.value, {
        mass: 1,
        damping: 15,
        stiffness: 120
      }),
      transform: [{
        translateY: tranYValue.value
      }]
    };
  }, []);
  const childProps = useMemo(() => ({
    refreshValue,
    refreshType,
    progress
  }), [refreshValue, refreshType, progress]);
  const _renderContent = useCallback(() => {
    if (renderContent) {
      return /*#__PURE__*/React.cloneElement(renderContent(childProps), childProps);
    }
    return /*#__PURE__*/_jsx(RefreshControlNormal, {
      ...childProps,
      refreshControlColor: refreshControlColor
    });
  }, [renderContent, childProps, refreshControlColor]);
  const containerStyle = useMemo(() => [styles.container, {
    top: top - refreshHeight,
    height: refreshHeight
  }, animatedStyle], [top, refreshHeight, animatedStyle]);
  return /*#__PURE__*/_jsx(Animated.View, {
    style: containerStyle,
    children: _renderContent()
  });
});
const styles = StyleSheet.create({
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
const RefreshControlNormal = /*#__PURE__*/memo(function RefreshControlNormal({
  refreshControlColor
}) {
  return /*#__PURE__*/_jsx(Animated.View, {
    style: styles.baseControl,
    children: /*#__PURE__*/_jsx(ActivityIndicator, {
      color: refreshControlColor
    })
  });
});
export default RefreshControlContainer;
//# sourceMappingURL=refresh-control.js.map