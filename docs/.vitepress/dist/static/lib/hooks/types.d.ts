import { GCOptions } from '@/group-content';
import { MenuMode } from '@/typings/data';
import { BaseUiMode, ItemMode, MapperMode } from '@/typings/items';
import { ComputedRef, Ref } from 'vue';
export interface Gc {
    options: GCOptions;
    params: any;
    asyncData: any;
    reload: () => void;
}
export interface GcParam {
    id?: string | number;
    projectId?: string | number;
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
    picture?: string;
    componentType?: string | number;
    options?: ItemMode[];
    children?: any[];
    rule?: any[];
    fields?: FieldItem[];
    btns?: FieldItem[];
    modules?: FieldItem[];
    [key: string]: any;
}
export interface ModuleHookMode {
    menu: ComputedRef<MenuMode>;
    module: ComputedRef<MenuMode>;
    modules: ComputedRef<FieldItem[]>;
    btns: ComputedRef<FieldItem[]>;
    fields: ComputedRef<FieldItem[]>;
    jsonFields: Ref<any>;
    subscribes?: Array<symbol | string>;
    publishs?: Array<symbol | string>;
    fieldConf: any;
    transformData?: Ref<any | any[]>;
    asyncData?: ComputedRef<any>;
}
export interface ModuleOptions {
    id?: string | number;
    menuTypes?: number[];
    dataPath?: string;
    instance?: any;
    useArgData?: boolean;
    menus?: any;
    labels?: any;
}
export interface singleAsyncOptions {
    params: any;
    paramsCacheClean?: boolean;
}
export type StateParam = {
    viewKey: string | number;
};
export type StateRo = {
    menus: ComputedRef<any>;
};
