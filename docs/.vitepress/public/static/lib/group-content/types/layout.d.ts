export interface MoveGridMode {
    xMoveGrid: number;
    yMoveGrid: number;
}
export interface XyGridMode {
    xGrid: number;
    yGrid: number;
}
export interface ItemMoveXYMode {
    moveX: number;
    moveY: number;
}
export interface ItemConfigMode {
    w: number;
    h: number;
    x: number;
    y: number;
    auto?: boolean;
    i: number | string;
    [key: string]: any;
}
export interface LayoutConfigMode {
    rows: number;
    cols: number;
    gap: number;
    auto: boolean;
    xGrid: string | number;
    yGrid: string | number;
    children?: LayoutConfigMode[];
    itemConfig: ItemConfigMode[];
}
export interface TransformMode {
    x: number;
    y: number;
    height: number;
    width: number;
    moveX: number;
    moveY: number;
}
export interface LayoutMode {
    layout: LayoutConfigMode;
    itemConfig: ItemConfigMode;
    children: LayoutMode[];
}
