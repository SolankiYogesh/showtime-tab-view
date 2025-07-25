"use strict";

import React from "react";
import { FlatList as RNFlatList, Platform } from "react-native";
import Animated from "react-native-reanimated";
import { SceneComponent } from "../scene";
import { jsx as _jsx } from "react/jsx-runtime";
const AnimatePageView = Platform.OS === "web" ? RNFlatList : Animated.createAnimatedComponent(RNFlatList);
function FlatList(props, ref) {
  return /*#__PURE__*/_jsx(SceneComponent, {
    ...props,
    forwardedRef: ref,
    ContainerView: AnimatePageView
  });
}
export const TabFlatList = /*#__PURE__*/React.forwardRef(FlatList);
//# sourceMappingURL=flat-list.js.map