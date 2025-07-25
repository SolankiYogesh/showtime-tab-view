"use strict";

import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useHeaderTabContext } from "./context";
import { useSharedScrollableRef } from "./hooks";
import { jsx as _jsx } from "react/jsx-runtime";
export function SceneComponent({
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
  } = useHeaderTabContext();
  const scollViewRef = useSharedScrollableRef(forwardedRef);
  const scrollY = useSharedValue(0);
  useEffect(() => {
    if (scollViewRef && scollViewRef.current) {
      updateSceneInfo({
        scrollRef: scollViewRef,
        index,
        scrollY
      });
    }
  }, [scollViewRef, index, scrollY, updateSceneInfo]);
  return /*#__PURE__*/_jsx(ContainerView, {
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
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
//# sourceMappingURL=scene.web.js.map