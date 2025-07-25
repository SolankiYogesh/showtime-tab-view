"use strict";

import React, { useCallback, useImperativeHandle, useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { TabBar, TabView } from "react-native-tab-view";
import { HeaderTabContext } from "./context";
import { useSceneInfo } from "./hooks";
import { useSharedValue } from "react-native-reanimated";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export { TabFlatList, TabScrollView, TabSectionList } from "./scrollable-view";
export function createCollapsibleTabsComponent() {
  return /*#__PURE__*/React.forwardRef(CollapsibleHeaderTabView);
}
function CollapsibleHeaderTabView({
  renderTabBar: renderTabBarProp,
  renderScrollHeader,
  initTabbarHeight = 44,
  minHeaderHeight = 0,
  navigationState,
  emptyBodyComponent,
  renderScene,
  renderSceneHeader: renderSceneHeaderProp,
  ...restProps
}, ref) {
  const shareAnimatedValue = useSharedValue(0);
  const headerTrans = useSharedValue(0);
  const curIndexValue = useSharedValue(0);
  const isSlidingHeader = useSharedValue(false);
  const isStartRefreshing = useSharedValue(false);

  // layout
  const [tabbarHeight, setTabbarHeight] = useState(initTabbarHeight);
  const containeRef = useRef(null);
  useImperativeHandle(ref, () => ({}), []);
  const tabbarOnLayout = useCallback(({
    nativeEvent: {
      layout: {
        height
      }
    }
  }) => {
    if (Math.abs(tabbarHeight - height) < 1) return;
    setTabbarHeight(height);
  }, [tabbarHeight]);
  const renderTabBar = useCallback(tabbarProps => {
    return renderTabBarProp ? renderTabBarProp(tabbarProps) : /*#__PURE__*/_jsx(TabBar, {
      ...tabbarProps
    });
  }, [renderTabBarProp]);
  const renderTabView = e => {
    return /*#__PURE__*/_jsx(TabView, {
      navigationState: navigationState,
      ...restProps,
      renderTabBar: tabbarProps => e.renderTabBarContainer(renderTabBar(tabbarProps)),
      renderScene: props => e.renderSceneHeader(renderScene(props), props)
    });
  };
  const renderTabBarContainer = children => {
    return /*#__PURE__*/_jsx(View, {
      style: styles.tabbarStyle,
      children: /*#__PURE__*/_jsx(View, {
        onLayout: tabbarOnLayout,
        children: children
      })
    });
  };
  const renderSceneHeader = (children, props) => {
    return /*#__PURE__*/_jsxs(View, {
      style: styles.full,
      children: [renderSceneHeaderProp?.(props.route), children]
    });
  };
  const {
    updateSceneInfo
  } = useSceneInfo(curIndexValue);
  return /*#__PURE__*/_jsx(HeaderTabContext.Provider, {
    value: {
      shareAnimatedValue,
      headerTrans,
      tabbarHeight,
      expectHeight: 0,
      headerHeight: 0,
      refreshHeight: 0,
      overflowPull: 0,
      pullExtendedCoefficient: 0,
      refHasChanged: () => false,
      curIndexValue,
      minHeaderHeight,
      updateSceneInfo,
      isSlidingHeader,
      isStartRefreshing,
      scrollStickyHeaderHeight: 0,
      scrollViewPaddingTop: 0
    },
    children: /*#__PURE__*/_jsxs(View, {
      ref: containeRef,
      style: styles.full,
      children: [renderScrollHeader && renderScrollHeader(), navigationState.routes.length === 0 && emptyBodyComponent ? /*#__PURE__*/_jsx(View, {
        style: {
          marginTop: tabbarHeight
        },
        children: emptyBodyComponent
      }) : renderTabView({
        renderTabBarContainer: renderTabBarContainer,
        renderSceneHeader: renderSceneHeader
      })]
    })
  });
}
const styles = StyleSheet.create({
  full: {
    flex: 1
  },
  tabbarStyle: {
    zIndex: 1
  }
});
//# sourceMappingURL=create-collapsible-tabs.web.js.map