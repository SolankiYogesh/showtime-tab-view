import { type SharedValue } from "react-native-reanimated";
import type { UpdateSceneInfoParams } from "../types";
export declare const useSceneInfo: (curIndexValue: SharedValue<number>) => {
    childScrollRef: {
        [index: number]: any;
    };
    childScrollYTrans: {
        [index: number]: SharedValue<number>;
    };
    sceneIsReady: SharedValue<{
        [index: number]: boolean;
    }>;
    updateSceneInfo: ({ index, scrollRef, scrollY }: UpdateSceneInfoParams) => void;
};
//# sourceMappingURL=use-scene-info.d.ts.map