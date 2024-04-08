export declare const LOAD_MICRO_APP: unique symbol;
export default function useApp(opts?: any): {
    app: any;
    headerMenus: any;
    currentHeaderMenu: import("vue").ComputedRef<any>;
    sideMenus: import("vue").Ref<{
        id?: string | number | undefined;
        sid?: string | number | undefined;
        name?: string | undefined;
        key?: string | number | undefined;
        menuType: string | number;
        menuModule?: string | number | undefined;
        hidden?: number | undefined;
        parentId?: string | number | undefined;
        orderNum?: string | number | undefined;
        path?: string | undefined;
        routerPath?: string | undefined;
        link?: string | undefined;
        component?: string | undefined;
        componentConfigId?: string | number | undefined;
        pageLoadType?: string | number | undefined;
        pageType?: string | number | undefined;
        componentType?: string | number | undefined;
        icon?: string | undefined;
        projectId?: string | number | undefined;
        options?: string | undefined;
        picture?: string | undefined;
        remark?: string | undefined;
        creater?: string | undefined;
        delete?: string | number | undefined;
        children?: any[] | undefined;
        redirect?: string | undefined;
        _ids?: (string | number)[] | undefined;
        _routes?: any[] | undefined;
    }[]>;
    menuPosition: any;
    menuShowIcon: any;
};