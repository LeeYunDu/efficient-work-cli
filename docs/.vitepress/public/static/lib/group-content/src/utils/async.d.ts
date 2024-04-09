export declare function loadData(options: any): Promise<{
    dataMap: Map<any, any>;
    dataJson: any;
}>;
export declare function apisClassify(apis: any[]): any;
export declare function asyncData(apis: any[], instance: any): Promise<any[] | {
    error: unknown;
} | undefined>;
