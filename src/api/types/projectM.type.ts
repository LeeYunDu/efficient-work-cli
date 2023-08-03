
//【列表分页获取】,/pc/ads/project/m/getPage 
export interface GpRo<T = any> {
    endRow: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    isFirstPage: boolean;
    isLastPage: boolean;
    list:GpRoList;
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
//【列表分页获取】,/pc/ads/project/m/getPage 
export interface GpParam {
  //1
  pageNum?: number;
  //10
  pageSize?: number;
  //1
  projectId?: number;
}