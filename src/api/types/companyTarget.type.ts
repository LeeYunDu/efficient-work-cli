
//【地区分布】,/pc/ads/company/target/getAreaFb 
export interface GafParam {
  area: string;
  keyword: string;
  label: string;
  //1
  pageNum?: number;
  //10
  pageSize?: number;
  tag: string;
  yxd: string;
  zrcs: string;
}
//【详情】,/pc/ads/company/target/getDetail 
export interface GdRo {
  //核准日期
  approvalDate: string;
  //企业标签
  bq: string;
  //实际经营地址
  busiAddressReal: string;
  //经营范围
  busiScope: string;
  //经营状态
  busiStatus: string;
  //营业期限结束
  busiTermEnd: string;
  //营业期限开始
  busiTermStart: string;
  //被执行人
  bzxr: string;
  //产业链
  cyl: string;
  //法律风险（重大）
  flfx: string;
  //合作企业
  hzqy: string;
  id: number;
  //经营风险（重大）
  jyfx: string;
  //企业法人
  legalPerson: string;
  //企业联系方式
  lxr: string;
  projectId: number;
  //企业法人
  qyfr: string;
  //企业简介
  qyjj: string;
  //企业名称
  qymc: string;
  //实缴资本
  realCapitalQxx: string;
  //注册地址
  registerAddress: string;
  //注册资本
  registerCapitalQxx: string;
  //注册时间
  registerTime: string;
  //登记机关
  registrationAuthority: string;
  //失信信息
  sxxx: string;
  //所在地省份
  szd: string;
  //投资来源地（企业注册地）
  tzlyd: string;
  //企业统一社会信用代码
  xydm: string;
  //行政处罚
  xzcf: string;
  //限制高消费
  xzgxf: string;
  //有效状态0，有效 1 无效
  yxzt: number;
  //责任处室
  zrcs: string;
}
//【详情】,/pc/ads/company/target/getDetail 
export interface GdParam {
  //1
  id: number;
}
//【列表分页获取】,/pc/ads/company/target/getPage 
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
//【列表分页获取】,/pc/ads/company/target/getPage 
export interface GpParam {
  area: string;
  keyword: string;
  label: string;
  //1
  pageNum?: number;
  //10
  pageSize?: number;
  tag: string;
  yxd: string;
  zrcs: string;
}