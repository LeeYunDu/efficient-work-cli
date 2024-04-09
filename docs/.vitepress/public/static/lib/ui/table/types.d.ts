import { ExtractPropTypes } from 'vue';
export interface ColumnItemCtx {
    [key: string]: any;
}
export interface PaginationCtx {
    [key: string]: any;
}
export type TablePaginationMapper = {
    currentPage: string;
    pageSize: string;
};
export interface PaginationProps extends PaginationCtx {
    total: number;
    pageSize: number;
    current: number;
    onChange: (page: number, pageSize: number) => void;
}
export type TableFilterItem = {
    text: string;
    value: string | number;
};
export type TablePagination = {
    total: number;
    pageSize?: number;
    currentPage?: number;
    mapper?: TablePaginationMapper;
    props?: PaginationProps;
};
export interface ColumnProps extends ColumnItemCtx {
    type: string;
    filterMultiple: boolean;
}
export type ColumnItem = {
    label: string;
    key: string;
    type?: string;
    slotName?: string;
    props: ColumnProps;
};
export type TableProps = {
    columnKey: string;
    filterAble: boolean;
    filters: TableFilterItem[];
    [key: string]: any;
};
export type TableOptions = {
    autoScroll: boolean;
    dataPath: string;
    pagination: boolean | TablePagination;
    noData: {
        text: string;
        image: string;
    };
    groupBtn?: any;
};
export declare const uiTableProps: {
    data: import("../../utils/vue/props").EpPropFinalized<ArrayConstructor, unknown, unknown, () => never[], boolean>;
    columns: import("../../utils/vue/props").EpPropFinalized<(new (...args: any[]) => ColumnItem[]) | (() => ColumnItem[]) | ((new (...args: any[]) => ColumnItem[]) | (() => ColumnItem[]))[], unknown, unknown, () => never[], boolean>;
    btns: import("../../utils/vue/props").EpPropFinalized<(new (...args: any[]) => ColumnItem[]) | (() => ColumnItem[]) | ((new (...args: any[]) => ColumnItem[]) | (() => ColumnItem[]))[], unknown, unknown, () => never[], boolean>;
    props: import("../../utils/vue/props").EpPropFinalized<(new (...args: any[]) => TableProps) | (() => TableProps) | ((new (...args: any[]) => TableProps) | (() => TableProps))[], unknown, unknown, () => {}, boolean>;
    options: import("../../utils/vue/props").EpPropFinalized<(new (...args: any[]) => TableOptions) | (() => TableOptions) | ((new (...args: any[]) => TableOptions) | (() => TableOptions))[], unknown, unknown, () => {}, boolean>;
};
export type UiTableProps = ExtractPropTypes<typeof uiTableProps>;
