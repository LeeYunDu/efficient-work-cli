
//【获取指标数据】,/pc/screen/value/getcodedata 
export interface GRo<T = any> {
    data: T;
    msg: string;
    status: number;
}
//【获取指标数据】,/pc/screen/value/getcodedata 
export interface GParam<T = any> {
    area: string;
    cacheKey: string;
    city: string;
    //
    codeArray: T;
    isJz: number;
    isZdyq: number;
    //202012
    month: number;
    projectPhase: number;
    specialIndustry: string;
}