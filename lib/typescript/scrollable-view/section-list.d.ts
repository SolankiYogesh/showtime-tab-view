import React from "react";
import { SectionList as RNSectionList, type SectionListProps } from "react-native";
export type TabSectionListProps<T, SectionT> = SectionListProps<T, SectionT> & {
    index: number;
};
export declare const TabSectionList: <T, SectionT>(props: TabSectionListProps<T, SectionT> & {
    ref?: React.Ref<RNSectionList<T, SectionT>>;
}) => React.ReactElement;
//# sourceMappingURL=section-list.d.ts.map