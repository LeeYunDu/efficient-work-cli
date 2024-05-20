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


export interface VisualMenus {
  topMenu: MenuMode;
  modules: MenuMode[];
  btns: MenuMode[];
  fields: MenuMode[];
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


export type ComponentOptions = {
  component: any;
  [key: string]: any;
};


export interface TooltipMsg {
  field: MenuMode
  msg: string
  nKey: string
}


interface Custom {
  [x: string]: any
}

interface OptionsComponent {
  labels: MenuMode[]
  [x: string]: any
}

export interface FormComponentOptions {
  component: OptionsComponent
  custom: Custom
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