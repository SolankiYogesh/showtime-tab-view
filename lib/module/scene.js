"use strict";

import React, { useCallback, useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useSyncInitialPosition } from "./hooks/use-sync-initial-position";
import { useHeaderTabContext } from "./context";
import { jsx as _jsx } from "react/jsx-runtime";
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
export function SceneComponent({
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
  const nativeGestureRef = useRef(Gesture.Native());
  const scollViewRef = useAnimatedRef();
  //#endregion

  //#region hooks
  const {
    shareAnimatedValue,
    expectHeight,
    refHasChanged,
    updateSceneInfo,
    scrollViewPaddingTop
  } = useHeaderTabContext();
  //#endregion

  //#region animations/style
  const scrollY = useSharedValue(0);
  const {
    opacityValue,
    initialPosition
  } = useSyncInitialPosition(scollViewRef);
  const sceneStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacityValue.value)
    };
  }, [opacityValue]);

  //#endregion

  //#region methods
  const onScrollAnimateEvent = useAnimatedScrollHandler({
    onScroll: e => {
      scrollY.value = e.contentOffset.y;
      shareAnimatedValue.value = e.contentOffset.y;
      if (propOnScroll) {
        runOnJS(propOnScroll)({
          nativeEvent: e
        });
      }
    }
  }, []);

  // adjust the scene size
  const _onContentSizeChange = useCallback((contentWidth, contentHeight) => {
    onContentSizeChange?.(contentWidth, contentHeight);
    if (Math.ceil(contentHeight) >= expectHeight) {
      initialPosition(shareAnimatedValue.value);
    }
  }, [onContentSizeChange, initialPosition, expectHeight, shareAnimatedValue]);
  //#endregion

  useEffect(() => {
    refHasChanged?.(nativeGestureRef.current);
  }, [refHasChanged]);
  useEffect(() => {
    if (scollViewRef?.current) {
      updateSceneInfo({
        scrollRef: scollViewRef,
        index,
        scrollY
      });
    }
  }, [scollViewRef, index, scrollY, updateSceneInfo]);
  return /*#__PURE__*/_jsx(Animated.View, {
    style: [styles.container, sceneStyle],
    children: /*#__PURE__*/_jsx(GestureDetector, {
      gesture: nativeGestureRef.current,
      children: /*#__PURE__*/_jsx(ContainerView, {
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
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
//# sourceMappingURL=scene.js.map