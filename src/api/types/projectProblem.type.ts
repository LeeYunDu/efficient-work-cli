
//【数据统计】,/pc/ads/project/problem/getData 
export interface GdRo {
  y1: number;
  y2: number;
  y3: number;
}
//【数据统计】,/pc/ads/project/problem/getData 
export interface GdParam {
  area: string;
  city: string;
  gtxm: number;
  isZdyq: number;
  keyword: string;
  //1
  pageNum?: number;
  //10
  pageSize?: number;
  //1
  projectId: number;
  projectPhase: number;
  specialIndustry: string;
  status: number;
  timeRange: string;
  type: string;
  zrcs: string;
}
//【详情】,/pc/ads/project/problem/getDetail 
export interface GdRo {
  //问题描述
  content: string;
  costTimeMs: number;
  finishTime: string;
  //项目类型（0,固投 1，非固投）
  gtxm: number;
  id: number;
  //招大引强 0，否 1.是
  isZdyq: number;
  //项目建设地点（区县）
  projectArea: string;
  //项目建设地点（州市）
  projectCity: string;
  //项目表id
  projectId: number;
  //项目名称
  projectName: string;
  //项目阶段（0.策划，1.签约，2.落地，3.入库）
  projectPhase: number;
  //上报时间
  sbTime: string;
  //省级重大项目 1：是 0：否
  sjzdxm: number;
  //产业类别（11大产业）
  specialIndustry: string;
  //0,待解决 1.已解决
  status: number;
  //问题类型
  type: string;
  //投资单位
  tzdw: string;
  //责任处室
  zrcs: string;
  //责任人单位电话（加密）
  zrdwDh: string;
  //责任人单位联系人
  zrdwXm: string;
}
//【详情】,/pc/ads/project/problem/getDetail 
export interface GdParam {
  //1
  id: number;
}
//【列表分页获取】,/pc/ads/project/problem/getPage 
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
//【列表分页获取】,/pc/ads/project/problem/getPage 
export interface GpParam {
  area: string;
  city: string;
  gtxm: number;
  isZdyq: number;
  keyword: string;
  //1
  pageNum?: number;
  //10
  pageSize?: number;
  //1
  projectId: number;
  projectPhase: number;
  specialIndustry: string;
  status: number;
  timeRange: string;
  type: string;
  zrcs: string;
}