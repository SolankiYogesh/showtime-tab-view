"use strict";

import React from 'react';
import Animated from 'react-native-reanimated';
import { SceneComponent } from './scene';
import { jsx as _jsx } from "react/jsx-runtime";
export function createCollapsibleScrollView(Component) {
  // Use type assertion here if you're sure about the compatibility
  const AnimatePageView = Animated.createAnimatedComponent(Component);
  return /*#__PURE__*/React.forwardRef(function TabViewScene(props, ref) {
    return /*#__PURE__*/_jsx(SceneComponent, {
      ...props,
      forwardedRef: ref,
      ContainerView: AnimatePageView
    });
  });
}
//# sourceMappingURL=create-collapsible-scroll-view.js.map