import { type SharedValue } from "react-native-reanimated";
export declare function _ScrollTo(ref: never, x: number, y: number, animated: boolean): void;
export declare const isIOS: boolean;
export declare const animateToRefresh: ({ transRefreshing, isRefreshing, isRefreshingWithAnimation, isToRefresh, destPoi, onStartRefresh, }: {
    transRefreshing: SharedValue<number>;
    isRefreshing: SharedValue<boolean>;
    isRefreshingWithAnimation: SharedValue<boolean>;
    isToRefresh: boolean;
    destPoi: number;
    onStartRefresh?: () => void;
}) => void;
//# sourceMappingURL=utils.d.ts.map