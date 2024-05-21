import { MenuMode } from '@/typings/data';
export type ComponentOptions = {
    component: any;
    [key: string]: any;
};
export type LayoutType = 'visual' | 'grid' | 'waterfall';
export type PageHeader = {
    hidden: boolean;
};
export type LayoutBase = {
    margin: number[];
    maxRows: number;
    rowHeight: number;
    colNum: number;
    isDraggable: boolean;
    isMirrored: boolean;
    isResizable: boolean;
    preventCollision: boolean;
    useCssTransforms: boolean;
    verticalCompact: boolean;
};
export type AsyncConf = {
    async: AsyncItem[];
};
export type GroupConf = {
    group: GroupItem[];
};
export type LayoutConf = {
    type: LayoutType;
    base: LayoutBase;
    layout: GridItem[];
};
export type PubsubConf = {
    pubsub: PubsubItem[];
};
export type GCBase = {
    title: string;
    header: PageHeader;
};
export interface GCOptions {
    base: GCBase;
    asyncConf: AsyncConf;
    groupConf: GroupConf;
    layoutConf: LayoutConf;
    pubsubConf: PubsubConf;
}
export interface DataApiParams {
    api: string;
    method: string;
}
export interface SlotOption {
    readonly type: 'slot';
    slot?: string;
}
export interface ComponentOption {
    name: string;
    id: number;
    type?: string;
    subType?: string;
    slot?: string;
    options?: ComponentOptions;
    _options?: any;
}
export interface FieldOption {
    type: 'database' | 'custom';
    ids: number[];
    parentId: number;
}
export interface AsyncOption {
    uniques: string[];
}
export interface AnaPubsubOption {
    uniques: string[];
}
export interface AnalyOption {
    components: ComponentOption[] | unknown[];
    fieldConf: FieldOption;
    asyncConf?: AsyncOption;
    pubsubConf?: AnaPubsubOption;
    path: string;
    active: boolean;
}
export interface PubSubBase {
    key: string;
}
export interface PubOption {
    init: PubSubBase;
    destory: PubSubBase;
    asyncData: PubSubBase;
    change: PubSubBase;
}
export interface SubOption extends PubSubBase {
    [key: string]: any;
}
export interface PubSubOption {
    key: string;
    pubs: PubOption;
    subs: SubOption;
}
export interface GroupBase {
    layoutIndex: string | number;
}
export interface GroupHeader {
    [key: string]: string;
}
export interface GroupPubsub {
    header: PubSubOption;
}
export interface GroupItem {
    anas: AnalyOption[];
    base: GroupBase;
    currentAna?: AnalyOption;
    header: GroupHeader;
    pubsub: GroupPubsub;
    _base: {
        layoutIndex: string | number;
        code: string;
        uuid: string;
        SINGLE_ASYNC: string;
    };
    _slots: SlotOption[];
}
export interface GridItem {
    i: number;
    x: number;
    y: number;
    w: number;
    h: number;
    yIndex?: number;
    moved: boolean;
    classList?: string[];
}
export interface AsyncBase {
    layoutIndex: number;
    unique: string;
}
export interface AsyncParam {
    code: number;
    key: string;
    path: string;
    value: string | number;
}
export interface AsyncItem {
    api: string;
    base: AsyncBase;
    type: 'post' | 'get' | 'put' | 'delete';
    url: string;
    params: AsyncParam[];
}
export type PubsubItemBase = {
    layoutIndex: number;
    unique: string;
};
export type PubsubItemInfo = {
    key: string;
    open: boolean;
    desc?: string;
};
export interface PubsubItem {
    base: PubsubItemBase;
    pubs: PubsubItemInfo[];
    subs: PubsubItemInfo[];
}
export interface ActiveModule {
    group: GroupItem;
    layout: GridItem;
}
export interface ComponentModel {
    name: string;
    component: string;
    id: number;
    sid: number;
    options: string;
    picture: string;
    type: string;
    subType: string;
    children?: ComponentModel[];
}
export interface ShowComponentsParam {
    target: string;
}
export interface ComponentRo {
    component: ComponentModel;
}
export interface VisualMenus {
    topMenu: MenuMode;
    modules: MenuMode[];
    btns: MenuMode[];
    fields: MenuMode[];
}
