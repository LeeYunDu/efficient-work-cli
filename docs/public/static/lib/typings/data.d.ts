export interface TreeMode {
    id: string;
    name?: string;
    children?: Array<TreeMode | any>;
}
export interface CompanyTypeMode extends TreeMode {
    requestKey: string;
}
export interface MenuMode {
    id?: string | number;
    sid?: string | number;
    name?: string;
    key?: string | number;
    menuType: string | number;
    menuModule?: string | number;
    hidden?: number;
    parentId?: string | number;
    orderNum?: string | number;
    path?: string;
    routerPath?: string;
    link?: string;
    component?: string;
    componentConfigId?: string | number;
    pageLoadType?: string | number;
    pageType?: string | number;
    componentType?: string | number;
    icon?: string;
    projectId?: string | number;
    options?: string;
    picture?: string;
    remark?: string;
    creater?: string;
    delete?: string | number;
    children?: MenuMode[];
    redirect?: string;
    _ids?: Array<string | number>;
    _routes?: MenuMode[];
}
