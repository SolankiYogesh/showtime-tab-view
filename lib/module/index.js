"use strict";

import { TabView } from "react-native-tab-view";
import { createCollapsibleTabsComponent } from "./create-collapsible-tabs";
export { TabFlatList, TabScrollView, TabSectionList } from "./scrollable-view";
export * from "./create-collapsible-tabs";
export * from "./scene";
export * from "./types";
export { useHeaderTabContext } from "./context";
export const CollapsibleTabView = createCollapsibleTabsComponent(TabView);
//# sourceMappingURL=index.js.map