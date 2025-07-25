"use strict";

import React from "react";
import { Platform, ScrollView as RNScrollView } from "react-native";
import Animated from "react-native-reanimated";
import { SceneComponent } from "../scene";
import { jsx as _jsx } from "react/jsx-runtime";
const AnimatePageView = Platform.OS === "web" ? RNScrollView : Animated.createAnimatedComponent(RNScrollView);
function ScrollView(props, ref) {
  return /*#__PURE__*/_jsx(SceneComponent, {
    ...props,
    forwardedRef: ref,
    ContainerView: AnimatePageView
  });
}
export const TabScrollView = /*#__PURE__*/React.forwardRef(ScrollView);
//# sourceMappingURL=scroll-view.js.map