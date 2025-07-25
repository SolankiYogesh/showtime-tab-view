"use strict";

import React from "react";
import { Platform, SectionList as RNSectionList } from "react-native";
import Animated from "react-native-reanimated";
import { SceneComponent } from "../scene";
import { jsx as _jsx } from "react/jsx-runtime";
const AnimatePageView = Platform.OS === "web" ? RNSectionList : Animated.createAnimatedComponent(RNSectionList);
function SectionList(props, ref) {
  return /*#__PURE__*/_jsx(SceneComponent, {
    ...props,
    forwardedRef: ref,
    ContainerView: AnimatePageView
  });
}
export const TabSectionList = /*#__PURE__*/React.forwardRef(SectionList);
//# sourceMappingURL=section-list.js.map