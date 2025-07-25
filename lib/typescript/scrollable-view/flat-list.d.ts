import React from "react";
import { FlatList as RNFlatList, type FlatListProps } from "react-native";
export type TabFlatListProps<T> = FlatListProps<T> & {
    index: number;
};
export declare const TabFlatList: <T>(props: TabFlatListProps<T> & {
    ref?: React.Ref<RNFlatList<T>>;
}) => React.ReactElement;
//# sourceMappingURL=flat-list.d.ts.map