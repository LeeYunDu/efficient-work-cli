declare const _default: {
    base: {
        title: string;
        header: {
            hidden: boolean;
        };
        layout: {
            controlItem: boolean;
            controlIgnore: never[];
        };
    };
    layoutConf: {
        base: {
            colNum: number;
            isDraggable: boolean;
            isMirrored: boolean;
            isResizable: boolean;
            margin: number[];
            preventCollision: boolean;
            useCssTransforms: boolean;
            verticalCompact: boolean;
            layoutType: string;
            rowHeight: number;
            maxRows: number;
            groups: {
                i: number;
                indexs: number[];
            }[];
        };
        type: string;
        layout: {
            x: number;
            y: number;
            w: number;
            h: number;
            i: number;
            classList: string[];
            moved: boolean;
            rangeX: number[];
            rangeY: number[];
            point: number[];
            colIndex: number;
            style: {
                width: string;
                minHeight: string;
            };
        }[];
    };
    groupConf: {
        group: never[];
    };
    asyncConf: {
        async: never[];
    };
};
export default _default;
