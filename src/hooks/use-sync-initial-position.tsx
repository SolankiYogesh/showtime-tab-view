import type React from "react";
import { useCallback, useRef } from "react";

import type Animated from "react-native-reanimated";
import { useSharedValue } from "react-native-reanimated";

import { useHeaderTabContext } from "../context";
import { _ScrollTo } from "../utils";
import { runOnUI } from "react-native-worklets";

export const useSyncInitialPosition = (
  ref: React.RefObject<Animated.ScrollView>
) => {
  const opacityValue = useSharedValue(0);
  const isInitiated = useRef(true);
  const { headerHeight, minHeaderHeight } = useHeaderTabContext();

  const initialPosition = useCallback(
    (position: number) => {
      if (!isInitiated.current) return;
      isInitiated.current = false;
      runOnUI(_ScrollTo)(
        ref as never,
        0,
        Math.min(position, headerHeight - minHeaderHeight),
        false
      );
      opacityValue.value = 1;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [headerHeight, minHeaderHeight, ref]
  );

  return {
    opacityValue,
    initialPosition,
  };
};
