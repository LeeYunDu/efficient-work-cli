export interface CardMode {
    title?: string;
    desc?: string;
    thumb?: string;
    price?: number;
}
export interface ItemMode {
    label: string;
    value: any;
    image?: any;
    icon?: any;
    type?: string;
    path?: string;
    unit?: string;
    props?: any;
    option?: any;
}
export interface BaseUiMode {
    label: string;
    key: string;
    type?: string;
    value?: any;
    slotName?: string;
}
export interface FormMode extends BaseUiMode {
    props?: any;
    gridProps?: any;
    formItemProps?: any;
    options?: ItemMode[];
    child?: FormMode;
    rule?: any;
    show?: any;
    change?: any;
    _visible?: boolean;
    _config?: any;
}
export interface TableMode extends BaseUiMode {
    props?: any;
    option?: any;
}
export interface BtnItem extends BaseUiMode {
    props?: any;
    option?: any;
}
export interface MapperMode {
    label: string;
    value: string;
    children: string;
}
export interface FieldItem extends BaseUiMode {
    label: string;
    key: string;
    tValue?: any;
    unit?: string;
    props?: any;
    mapper?: MapperMode;
    transform?: any;
    path?: string;
    link?: string;
    componentType?: string | number;
    options?: ItemMode[];
    children?: any[];
    rule?: any[];
}
