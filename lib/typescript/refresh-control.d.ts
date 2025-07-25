import React from "react";
import { type SharedValue } from "react-native-reanimated";
import { type RefreshControlProps } from "./types";
type RefreshControlContainerProps = {
    top: number;
    refreshHeight: number;
    overflowPull: number;
    opacityValue: SharedValue<number>;
    refreshValue: SharedValue<number>;
    isRefreshing: SharedValue<boolean>;
    isRefreshingWithAnimation: SharedValue<boolean>;
    pullExtendedCoefficient: number;
    renderContent?: (refreshProps: RefreshControlProps) => React.ReactElement;
    refreshControlColor?: string;
};
declare const RefreshControlContainer: React.NamedExoticComponent<RefreshControlContainerProps>;
export default RefreshControlContainer;
//# sourceMappingURL=refresh-control.d.ts.map