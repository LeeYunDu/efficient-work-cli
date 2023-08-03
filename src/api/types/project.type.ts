
//【列表单条记录详情】,/pc/ads/project/getDetail 
export interface GdRo<T = any> {
    //申报时间
    applyTime: string;
    //项目备案代码
    badm: string;
    //项目备案名称
    bamc: string;
    //银行贷款（万元）
    bankCapital: number;
    //策划时间
    cfTime: string;
    //归档状态 0.未归档  1 ，已终止 ，2 已完成
    ckStatus: number;
    //归档时间
    ckTime: string;
    //线索来源
    clueSource: string;
    companyInvestDetail: T;
    completeMoney: number;
    completeMoneyY: number;
    //盯引单位
    dydw: string;
    //盯引人电话（加密）
    dyrDh: string;
    //盯引人姓名
    dyrXm: string;
    //盯引人职位
    dyrZw: string;
    //财政资金（万元）
    fiscalCapital: number;
    //拟固定投资（万元）
    fixedInvestMoney: number;
    followLogCount: number;
    //项目类型（0,固投 1，非固投）
    gtxm: number;
    //数据id
    id: number;
    //国名经济分类代码
    industryCode: string;
    industryName: string;
    //铺底流动资金（万元）
    initialCapital: number;
    //建设期利息（万元）
    interestCapital: number;
    //计划总投资 （万元）
    investTotalMoney: number;
    //建设性质（0,新建，1.续建，2.扩建）
    investXz: number;
    investXzStr: string;
    //是否发布（0，未发布 ，1已发布）
    isFb: number;
    //招大引强 0，否 1.是
    isZdyq: number;
    //竣工时间
    jgTime: string;
    //开工时间
    kgTime: string;
    //拟用地面积（亩）
    landAreaPlan: string;
    //项目维度
    lat: string;
    //落地时间
    ldTime: string;
    //项目经度
    lng: string;
    //其他（万元）
    otherCapital: number;
    //自有资金（万元）
    ownCapital: number;
    //项目选址
    projectAddress: string;
    //项目优势
    projectAdvantage: string;
    //项目建设地点（区县）
    projectArea: string;
    //项目建设地点（州市）
    projectCity: string;
    //项目代码
    projectCode: string;
    //项目名称
    projectName: string;
    //项目概况
    projectOverview: string;
    //项目所属园区
    projectPark: string;
    //项目阶段（0.策划，1.签约，2.落地，3.入库）
    projectPhase: number;
    //支持政策
    projectPolicy: string;
    projectSigningDetail: T;
    //项目类型（0,用地类项目，1.非用地类项目）
    projectType: number;
    //要素保障
    projectYsbz: string;
    //签约时间
    qyTime: string;
    //入库时间
    rkTime: string;
    //入统时间
    rtTime: string;
    //申报单位
    sbdw: string;
    //申报单位电话（加密）
    sbdwDh: string;
    //申报单位姓名
    sbdwXm: string;
    //申报单位联系人职位
    sbdwZw: string;
    signFileList: T;
    //省级重大项目 1：是 0：否
    sjzdxm: number;
    //产业类别（11大产业）
    specialIndustry: string;
    targetCompany: string;
    //投产时间
    tcTime: string;
    //投资单位
    tzdw: string;
    //投资单位信用代码
    tzdwCreditNo: string;
    //投资单位联系人电话（加密）
    tzdwDh: string;
    //投资单位联系人
    tzdwXm: string;
    //投资单位联系人岗位
    tzdwZw: string;
    //责任处室
    zrcs: string;
    //责任人单位
    zrdw: string;
    //责任人单位电话（加密）
    zrdwDh: string;
    //责任人单位联系人
    zrdwXm: string;
    //责任人单位职务
    zrdwZw: string;
    //招商单位
    zsdw: string;
    //招商单位联系人电话（加密）
    zsdwDh: string;
    //招商单位联系人
    zsdwXm: string;
    //招商单位联系人职位
    zsdwZw: string;
}
//【列表单条记录详情】,/pc/ads/project/getDetail 
export interface GdParam {
  //1
  id: number;
}
//【列表分页获取】,/pc/ads/project/getPage 
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
//【列表分页获取】,/pc/ads/project/getPage 
export interface GpParam {
  area: string;
  city: string;
  gtxm: number;
  industryCode: string;
  investMoneyRange: string;
  isZdyq: number;
  keyword: string;
  landAreaRange: string;
  //1
  pageNum?: number;
  //10
  pageSize?: number;
  projectPhase: number;
  projectType: number;
  specialIndustry: string;
  zrcs: string;
}
//【招商进度】,/pc/ads/project/getProjectProgress 
export interface GppRo {
  //创建时间
  createTime: string;
  //审核内容
  examineContent: string;
  //审批意见
  examineDesc: string;
  //审核状态0不同意 1同意
  examineStatus: number;
  id: number;
  //项目id
  projectId: number;
  //项目名称
  projectName: string;
}
//【招商进度】,/pc/ads/project/getProjectProgress 
export interface GppParam {
  //1
  pageNum?: number;
  //10
  pageSize?: number;
  //1
  projectId?: number;
}