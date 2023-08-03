
//【大屏指标列表】,/pc/screen/data/getBigScreenDataListResult 
export interface GbsdlRo<T = any> {
    endRow: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    isFirstPage: boolean;
    isLastPage: boolean;
    list:GbsdlRoList;
    navigateFirstPage: number;
    navigateLastPage: number;
    navigatePages: number;
    navigatepageNums: T;
    nextPage: number;
    pageNum: number;
    pageSize: number;
    pages: number;
    prePage: number;
    size: number;
    startRow: number;
    total: number;
}
//【大屏指标列表】,/pc/screen/data/getBigScreenDataListResult 
export interface GbsdlParam {
  keyword: string;
  //1
  pageNum?: number;
  //10
  pageSize?: number;
  sort: string;
  type: string;
}
//【指标手动更新】,/pc/screen/data/updatesqlcode 
export interface URo {
  data: string;
  msg: string;
  status: number;
}