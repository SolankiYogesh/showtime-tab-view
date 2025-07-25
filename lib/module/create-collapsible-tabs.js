"use strict";

import React, { useCallback, useEffect, useImperativeHandle, useRef } from "react";
import { TabBar } from "react-native-tab-view";
import { GestureContainer } from "./gesture-container";
import { jsx as _jsx } from "react/jsx-runtime";
export function createCollapsibleTabsComponent(Component) {
  return /*#__PURE__*/React.forwardRef(function tabView(props, ref) {
    return /*#__PURE__*/_jsx(CollapsibleHeaderTabView, {
      ...props,
      forwardedRef: ref,
      Component: Component
    });
  });
}
function CollapsibleHeaderTabView({
  forwardedRef,
  ...props
}) {
  const gestureContainerRef = useRef(null);
  const initialPageRef = useRef(props.navigationState.index);
  useEffect(() => {
    gestureContainerRef.current?.setCurrentIndex(props.navigationState.index);
  }, [props.navigationState.index]);
  useImperativeHandle(forwardedRef, () => ({
    // Todo: add snapTo tab view content method
  }), []);
  const renderTabBar = useCallback(tabbarProps => {
    return props?.renderTabBar ? props.renderTabBar(tabbarProps) : /*#__PURE__*/_jsx(TabBar, {
      ...tabbarProps
    });
  }, [props]);
  const renderTabView = e => {
    const {
      Component,
      renderScene,
      ...restProps
    } = props;
    return /*#__PURE__*/_jsx(Component, {
      ...restProps,
      renderTabBar: tabbarProps => e.renderTabBarContainer(renderTabBar(tabbarProps)),
      renderScene: props => e.renderSceneHeader(renderScene(props), props)
    });
  };
  return (
    /*#__PURE__*/
    // @ts-expect-error Needs fixing
    _jsx(GestureContainer, {
      ref: gestureContainerRef,
      initialPage: initialPageRef.current,
      renderTabView: renderTabView,
      ...props
    })
  );
}
//# sourceMappingURL=create-collapsible-tabs.js.map