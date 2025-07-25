import React from "react";
import {
  FlatList as RNFlatList,
  type FlatListProps,
  Platform,
} from "react-native";

import Animated from "react-native-reanimated";

import { SceneComponent } from "../scene";

const AnimatePageView =
  Platform.OS === "web"
    ? RNFlatList
    : Animated.createAnimatedComponent(RNFlatList);
export type TabFlatListProps<T> = FlatListProps<T> & {
  index: number;
};

function FlatList<T>(props: TabFlatListProps<T>, ref: any) {
  return (
    <SceneComponent
      {...props}
      forwardedRef={ref}
      ContainerView={AnimatePageView}
    />
  );
}

export const TabFlatList = React.forwardRef(FlatList) as <T>(
  props: TabFlatListProps<T> & {
    ref?: React.Ref<RNFlatList<T>>;
  }
) => React.ReactElement;
