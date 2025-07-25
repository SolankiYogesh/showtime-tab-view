import React from "react";

import Animated from "react-native-reanimated";
import { SceneComponent } from "@showtime-xyz/tab-view";

function TabFlashListScrollViewComponent(props: any, ref: any) {
  return (
    <SceneComponent
      {...props}
      useExternalScrollView
      forwardedRef={ref}
      ContainerView={Animated.ScrollView}
    />
  );
}

export const TabFlashListScrollView = React.forwardRef(
  TabFlashListScrollViewComponent
);
