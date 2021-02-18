import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router);

/* layout */
import Layout from '../views/layout/Layout';
// appId:app系统路由序号表
export const routerApp = {
  'ce825ff0-016c-8627-78c8-577b07461ddb': 1,
  'bcbaccd3f0ad0c6bf4d63dc055c6dc6c': 2
}

// 权限系统的动态路由
export const asyncRouterMap = [
  {
    path: 'userManager',
    icon: 'fa-user',
    component: _import('admin/user/index'),
    name: '用户管理',
    authority: 'userManager'
  },
  // Api用户管理
  {
    path: 'apiUser',
    icon: 'fa-user',
    component: _import('admin/apiUser/index'),
    name: 'API用户管理',
    authority: 'apiUser'
  },
  {
    path: 'menuManager',
    icon: 'category',
    component: _import('admin/menu/index'),
    name: '菜单管理',
    authority: 'menuManager'
  }, {
    path: 'groupManager',
    icon: 'group_fill',
    component: _import('admin/group/index'),
    name: '角色权限管理',
    authority: 'groupManager'
  }, {
    path: 'groupTypeManager',
    icon: 'fa-users',
    component: _import('admin/groupType/index'),
    name: '角色类型管理',
    authority: 'groupTypeManager'
  }, {
    path: 'gateLogManager',
    icon: 'viewlist',
    component: _import('admin/gateLog/index'),
    name: '操作日志管理',
    authority: 'gateLogManager'
  }, {
    path: 'apiManager',
    icon: 'setting',
    component: _import('admin/apiToken/index'),
    name: 'api授权令牌管理',
    authority: 'apiManager'
  },
  {
    path: 'authorityManage',
    icon: 'viewlist',
    component: _import('admin/authorityManage/index'),
    name: '数据权限管理',
    authority: 'authorityManage'
  },

  // {
  //   path: 'demo',
  //   icon: 'fa-user',
  //   component: _import('admin/demo/index'),
  //   name: '用户管理',
  //   authority: 'demo'
  // }
];



// demo业务系统的动态路由
// export const asyncRouterMap2 = [
//   {
//     path: 'demo',
//     icon: 'fa-user',
//     component: _import('admin/demo/index'),
//     name: '用户管理',
//     authority: 'demo'
//   }]


// 基础信息管理的动态路由
export const asyncRouterMapForBaseData = [
  //客户信息管理
  {
    path: 'custome',
    icon: 'fa-user',
    component: _import('baseDataSys/customer/bdcustomer/index'),
    name: '客户',
    authority: 'custome'
  },
  {
    path: 'config',
    icon: 'fa-user',
    component: _import('baseDataSys/customer/bdcustomer/config'),
    name: '配置',
    authority: 'custome'
  },
  {
    path: 'BasicConfiguration',
    icon: 'fa-user',
    component: _import('baseDataSys/customer/BasicConfiguration/index'),
    name: '基础配置',
    authority: 'BasicConfiguration'
  },
  {
    path: 'CustomsDeployment',
    icon: 'fa-user',
    component: _import('baseDataSys/customer/CustomsDeployment/index'),
    name: '关区配置',
    authority: 'CustomsDeployment'
  },
  {
    path: 'ReturnCustomer',
    icon: 'fa-user',
    component: _import('baseDataSys/customer/ReturnCustomer/index'),
    name: '回传客户配置',
    authority: 'ReturnCustomer'
  },
  {
    path: 'customerConfigure',
    icon: 'fa-user',
    component: _import('baseDataSys/customerConfigure/index'),
    name: '平台配置',
    authority: 'customerConfigure'
  },
  //基础信息管理
  {
    path: 'supplier',
    icon: 'fa-user',
    component: _import('baseDataSys/bdSupplier/index'),
    name: '供应商',
    authority: 'supplier'
  },
  {
    path: 'payment',
    icon: 'fa-user',
    component: _import('baseDataSys/bdPayment/index'),
    name: '支付企业',
    authority: 'payment'
  },
  {
    path: 'agent',
    icon: 'fa-user',
    component: _import('baseDataSys/bdAgent/index'),
    name: '报关行企业',
    authority: 'agent'
  },
  {
    path: 'wareHouse',
    icon: 'fa-user',
    component: _import('baseDataSys/bdWarehouse/index'),
    name: '仓库',
    authority: 'wareHouse'
  },
  {
    path: 'logistics',
    icon: 'fa-user',
    component: _import('baseDataSys/bdLogistics/index'),
    name: '物流企业',
    authority: 'logistics'
  },
  {
    path: 'Identity',
    icon: 'fa-user',
    component: _import('baseDataSys/Identity/index'),
    name: '申报身份',
    authority: 'Identity'
  },
  // 电商平台
  {
    path: 'businessPlatform',
    icon: 'fa-user',
    component: _import('baseDataSys/bdBusinessPlatform/index'),
    name: '电商平台',
    authority: 'businessPlatform'
  },
  {
    path: 'CustomsCode',
    icon: 'fa-user',
    component: _import('baseDataSys/CustomsCode/index'),
    name: '关区代码',
    authority: 'CustomsCode'
  },
  //其他
  {
    path: 'port',
    icon: 'fa-user',
    component: _import('baseDataSys/bdPort/index'),
    name: '口岸编码管理',
    authority: 'port'
  },
  //国检信息
  {
    path: 'ciqCountrycode',
    icon: 'fa-user',
    component: _import('baseDataSys/bdCiqCountrycode/index'),
    name: '国检国家代码管理',
    authority: 'ciqCountrycode'
  },
  {
    path: 'ciqTransportway',
    icon: 'fa-user',
    component: _import('baseDataSys/bdCiqTransportway/index'),
    name: '国检运输方式管理',
    authority: 'ciqTransportway'
  },
  {
    path: 'ciqTransport',
    icon: 'fa-user',
    component: _import('baseDataSys/bdCiqTransport/index'),
    name: '国检运输工具管理',
    authority: 'ciqTransport'
  },
{
    path: 'ciqPackage',
    icon: 'fa-user',
    component: _import('baseDataSys/bdCiqPackage/index'),
    name: '国检包装管理',
    authority: 'ciqPackage'
  },
  {
    path: 'ciqMoney',
    icon: 'fa-user',
    component: _import('baseDataSys/bdCiqMoney/index'),
    name: '国检币制管理',
    authority: 'ciqMoney'
  },
  {
    path: 'ciqUnit',
    icon: 'fa-user',
    component: _import('baseDataSys/bdCiqUnit/index'),
    name: '国检单位管理',
    authority: 'ciqUnit'
  },
  //商品信息管理
  {
    path: 'goodsRecord',
    icon: 'fa-user',
    component: _import('baseDataSys/bdGoodsRecord/index'),
    name: '商品备案',
    authority: 'goodsRecord'
  },
  {
    path: 'traceSourceGoods',
    icon: 'fa-user',
    component: _import('baseDataSys/bdTraceSourceGoods/index'),
    name: '商品溯源',
    authority: 'traceSourceGoods'
  },
  {
    path: 'goodsRelation',
    icon: 'fa-user',
    component: _import('baseDataSys/bdGoodsRelation/index'),
    name: '商品关系',
    authority: 'goodsRelation'
  },
  {
    path: 'omsOutService',
    icon: 'fa-user',
    component: _import('baseDataSys/bdGoodsRelation/components/omsOutService'),
    name: '商品关系 / 添加商品关系',
    authority: 'omsOutService'
  },
  {
    path: 'hscode',
    icon: 'fa-user',
    component: _import('baseDataSys/bdHscode/index'),
    name: 'hs编码管理',
    authority: 'hscode'
  },

  //海关信息
  {
    path: 'cusCountrycode',
    icon: 'fa-user',
    component: _import('baseDataSys/bdCusCountrycode/index'),
    name: '海关国家代码管理',
    authority: 'cusCountrycode'
  },
  {
    path: 'cusPort',
    icon: 'fa-user',
    component: _import('baseDataSys/bdCusPort/index'),
    name: '海关港口管理',
    authority: 'cusPort'
  },
  {
    path: 'cusPackage',
    icon: 'fa-user',
    component: _import('baseDataSys/bdCusPackage/index'),
    name: '海关包装管理',
    authority: 'cusPackage'
  },
  {
    path: 'cusMoney',
    icon: 'fa-user',
    component: _import('baseDataSys/bdCusMoney/index'),
    name: '海关币制管理',
    authority: 'cusMoney'
  },
  {
    path: 'cusUnit',
    icon: 'fa-user',
    component: _import('baseDataSys/bdCusUnit/index'),
    name: '海关单位管理',
    authority: 'cusUnit'
  },
];


// 订单业务系统的动态路由
export const asyncRouterMapForOrder = [
  //订单详情
  // 保税订单
  {
    path: 'bondedNormal',
    icon: 'fa-user',
    component: _import('orderSys/xsOrder/bondedOrder/bondedNormal/index'),
    name: '订单详情 / 订单查询',
    authority: 'bondedNormal'
  },
  {
    path: 'OrderExport',
    icon: 'fa-user',
    component: _import('orderSys/xsOrder/bondedOrder/OrderExport/index'),
    name: '订单详情 / 订单导出结果',
    authority: 'OrderExport'
  },
  {
    path: 'bondedAbnormality',
    icon: 'fa-user',
    component: _import('orderSys/xsOrder/bondedOrder/bondedAbnormality/index'),
    name: ' 订单详情 / 异常订单',
    authority: 'bondedAbnormality'
  },
  {
    path: 'logisticsQuery',
    icon: 'fa-user',
    component: _import('orderSys/xsOrder/logisticsQuery/index'),
    name: '订单详情 / 物流轨迹查询',
    authority: 'logisticsQuery'
  },
    {
    path: 'logisticsExpireTime',
    icon: 'fa-user',
    component: _import('orderSys/xsOrder/logisticsExpireTime/index'),
    name: '订单详情 / 物流超时查询',
    authority: 'logisticsExpireTime'
  },
//业务报表
{
  path: 'bondedOrdeReport',
  icon: 'fa-user',
  component: _import('orderSys/xsOrder/bondedOrder/bondedOrdeReport/index'),
  name: '业务报表 / 订单申报报表',
  authority: 'bondedOrdeReport'
},
{
  path: 'bondedWarehouseReport',
  icon: 'fa-user',
  component: _import('orderSys/xsOrder/bondedOrder/bondedWarehouseReport/index'),
  name: '业务报表 / 仓库作业报表',
  authority: 'bondedWarehouseReport'
},
//订单监控
{
  path: 'declarationMon',
  icon: 'fa-user',
  component: _import('orderSys/xsOrder/bondedOrder/declarationMon/index'),
  name: '申报监控 / 推送申报监控',
  authority: 'declarationMon'
},
{
  path: 'bondedDeclaration',
  icon: 'fa-user',
  component: _import('orderSys/xsOrder/bondedOrder/bondedDeclaration/index'),
  name: '申报监控 / 订单申报监控',
  authority: 'bondedDeclaration'
},
{
  path: 'warehouseMon',
  icon: 'fa-user',
  component: _import('orderSys/xsOrder/bondedOrder/warehouseMon/index'),
  name: '申报监控 / 推送仓库监控',
  authority: 'warehouseMon'
},
{
  path: 'bondedWarehouse',
  icon: 'fa-user',
  component: _import('orderSys/xsOrder/bondedOrder/bondedWarehouse/index'),
  name: '申报监控 / 仓库作业监控',
  authority: 'bondedWarehouse'
},
{
  path: 'Kafka',
  icon: 'fa-user',
  component: _import('orderSys/xsOrder/bondedOrder/Kafka/index'),
  name: '申报监控 / 消息异常管理',
  authority: 'Kafka'
},
// 第三方平台
{
  path: 'erpOrder',
  icon: 'fa-user',
  component: _import('orderSys/xsOrder/erpAdapter/erpOrder/index'),
  name: '第三方平台 / 订单查询',
  authority: 'erpOrder'
},
{
  path: 'pddErpOrder',
  icon: 'fa-user',
  component: _import('orderSys/xsOrder/erpAdapter/pddErpOrder/index'),
  name: '第三方平台 / 拼多多订单查询',
  authority: 'pddErpOrder'
},
{
  path: 'erpAbnormalLog',
  icon: 'fa-user',
  component: _import('orderSys/xsOrder/erpAdapter/erpAbnormalLog/index'),
  name: '第三方平台 / 异常日志',
  authority: 'erpAbnormalLog'
},
{
  path: 'pddErpAbnormalLog',
  icon: 'fa-user',
  component: _import('orderSys/xsOrder/erpAdapter/pddErpAbnormalLog/index'),
  name: '第三方平台 / 拼多多异常日志',
  authority: 'pddErpAbnormalLog'
},
{
  path: 'shopInquiries',
  icon: 'fa-user',
  component: _import('orderSys/xsOrder/erpAdapter/shopInquiries/index'),
  name: '第三方平台 / 店铺管理',
  authority: 'shopInquiries'
},
{
  path: 'vipOrderInquiry',
  icon: 'fa-user',
  component: _import('orderSys/xsOrder/erpAdapter/vipOrderInquiry/index'),
  name: '第三方平台 / 唯品订单查询',
  authority: 'vipOrderInquiry'
},
// 库存管理
{
  path: 'stockSearch',
  icon: 'fa-user',
  component: _import('orderSys/stockManage/index'),
  name: '订单管理 / 库存管理 / 库存查询',
  authority: 'stockSearch'
},
  
  // 销售订单管理 》 订单流程监控
  //{
   // path: 'orderMonitoring',
   // icon: 'fa-user',
    //component: _import('orderSys/xsOrder/orderMonitoring/index'),
    //name: '销售订单管理 / 订单流程监控',
    //authority: 'orderMonitoring'
 // },

 // {
  //  path: 'logisticsDispatch',
  //  icon: 'fa-user',
  //  component: _import('orderSys/xsOrder/logisticsDispatch/index'),
  //  name: '销售订单管理 / 物流派送查询',
   // authority: 'logisticsDispatch'
  //},

]

export const asyncRouterMapForTraceSys = [
      //订单详情
  // 保税订单
  {
    path: 'bondedNormalTrace',
    icon: 'fa-user',
    component: _import('traceSys/xsOrder/bondedOrder/bondedNormal/index'),
    name: '防伪溯源 / 商品防伪溯源',
    authority: 'bondedNormalTrace'
  },
  {
    path: 'OrderExportTrace',
    icon: 'fa-user',
    component: _import('traceSys/xsOrder/bondedOrder/OrderExport/index'),
    name: '防伪溯源 / 防伪溯源码管理',
    authority: 'OrderExportTrace'
  },
  {
    path: 'bondedAbnormalityTrace',
    icon: 'fa-user',
    component: _import('traceSys/xsOrder/bondedOrder/bondedAbnormality/index'),
    name: '防伪溯源 / 监控码管理',
    authority: 'bondedAbnormalityTrace'
  },
  {
    path: 'logisticsQueryTrace',
    icon: 'fa-user',
    component: _import('traceSys/xsOrder/logisticsQuery/index'),
    name: '防伪溯源 / 供应链管理',
    authority: 'logisticsQueryTrace'
  },
    {
    path: 'logisticsExpireTimeTrace',
    icon: 'fa-user',
    component: _import('traceSys/xsOrder/logisticsExpireTime/index'),
    name: '防伪溯源 / 综合查询',
    authority: 'logisticsExpireTimeTrace'
  },
  //业务报表
  {
    path: 'bondedOrdeReportTrace',
    icon: 'fa-user',
    component: _import('traceSys/xsOrder/bondedOrder/bondedOrdeReport/index'),
    name: '防伪溯源 / BI报表',
    authority: 'bondedOrdeReportTrace'
  },
]
//财务系统的动态路由
export const asyncRouterMapForfinancial = [
  //财务管理
  {
    path: 'accountConfig',
    icon: 'fa-user',
    component: _import('financialSys/accountConfig/index'),
    name: '财务管理 / 作业收费配置管理',
    authority: 'accountConfig'
  },
  {
    path: 'customsFee',
    icon: 'fa-user',
    component: _import('financialSys/customsFee/index'),
    name: '财务管理  /  海关作业收费管理',
    authority: 'customsFee'
  },
  {
    path: 'warehouseFee',
    icon: 'fa-user',
    component: _import('financialSys/warehouseFee/index'),
    name: '财务管理  /  仓库作业收费管理',
    authority: 'warehouseFee'
  },
  // 保证金列表
  {
    path: 'marginList',
    icon: 'fa-user',
    component: _import('financialSys/bondAdmin/index'),
    name: '保证金管理  /  保证金列表',
    authority: 'marginList'
  },
  // 海关税单列表
  {
    path: 'customsList',
    icon: 'fa-user',
    component: _import('financialSys/customerConfig/index'),
    name: '保证金管理  /  海关税单列表',
    authority: 'customsList'
  },
  // 海关税单详情
  {
    path: 'customsListDetail',
    icon: 'fa-user',
    component: _import('financialSys/customerConfig/components/update'),
    name: '财务管理  /  海关税单列表 / 税单详情',
    authority: 'customsListDetail'
  },
  {
    path: 'customsFeeVip',
    icon: 'fa-user',
    component: _import('financialSys/customsFeeVip/index'),
    name: '财务管理  /  唯品会申报作业收费',
    authority: 'customsFeeVip'
  },
  {
    path: 'BillClassification',
    icon: 'fa-user',
    component: _import('financialSys/DataConfiguration/BillClassification/index'),
    name: '账单管理  /  账单分类配置',
    authority: 'BillClassification'
  },
  {
    path: 'CustomerData',
    icon: 'fa-user',
    component: _import('financialSys/DataConfiguration/CustomerData/index'),
    name: '账单管理  /  客户数据配置',
    authority: 'CustomerData'
  },
  {
    path: 'BillDownload',
    icon: 'fa-user',
    component: _import('financialSys/DataConfiguration/BillDownload/index'),
    name: '账单管理  /  账单下载列表',
    authority: 'BillDownload'
  },
  // 小客户管理
  {
    path: 'customerBill',
    icon: 'fa-user',
    component: _import('financialSys/accountBill/customerBill/index'),
    name: '小客户账单系统  /  客户账单',
    authority: 'customerBill'
  },
  {
    path: 'customerBillDetails', // 客户账单-详情
    icon: 'fa-user',
    component: _import('financialSys/accountBill/customerBill/details'),
    name: '小客户账单系统  /  客户账单详情',
    authority: 'customerBillDetails'
  },
  {
    path: 'historyDetails',// 客户账单-历史详请
    icon: 'fa-user',
    component: _import('financialSys/accountBill/customerBill/historyDetails'),
    name: '小客户账单系统  /  客户账单历史详请详情',
    authority: 'customerBillDetails'
  },
  {
    path: 'serviceUpload',
    icon: 'fa-user',
    component: _import('financialSys/accountBill/serviceUpload/index'),
    name: '小客户账单系统  /  客服上传',
    authority: 'serviceUpload'
  },
  {
    path: 'logisticsUpload',
    icon: 'fa-user',
    component: _import('financialSys/accountBill/logisticsUpload/index'),
    name: '小客户账单系统  /  国际物流上传',
    authority: 'logisticsUpload'
  },
  {
    path: 'logisticsUpload',
    icon: 'fa-user',
    component: _import('financialSys/accountBill/logisticsUpload/index'),
    name: '小客户账单系统  /  国际物流上传',
    authority: 'logisticsUpload'
  },
  {
    path: 'wareUpload',
    icon: 'fa-user',
    component: _import('financialSys/accountBill/wareUpload/index'),
    name: '小客户账单系统  /  仓库&现场上传',
    authority: 'wareUpload'
  },
  {
    path: 'chargingStandard',
    icon: 'fa-user',
    component: _import('financialSys/accountBill/chargingStandard/index'),
    name: '小客户账单系统  /  收费标准',
    authority: 'chargingStandard'
  },
  {
    path: 'chargDetail',
    icon: 'fa-user',
    component: _import('financialSys/accountBill/chargingStandard/chargDetail'),
    name: '小客户账单系统  /  收费详情',
    authority: 'chargDetail'
  },
  {
    path: 'materialManage',
    icon: 'fa-user',
    component: _import('financialSys/accountBill/materialManage/index'),
    name: '小客户账单系统  /  包材管理',
    authority: 'materialManage'
  }
]
//采销管理的动态路由
export const asyncRouterMapForPurchase = [
  //采购单
  {
    path: 'applications',
    icon: 'fa-user',
    component: _import('purchase/application/index'),
    name: '商品采销 / 采购单',
    authority: 'applications'
  },
   // 采购单
   {
    path: 'applicationDetail',
    icon: 'fa-user',
    component: _import('purchase/application/components/update'),
    name: '商品采销 / 采购单 / 采购单详情',
    authority: 'applicationDetail'
  },
  {
    path: 'commodity',
    icon: 'fa-user',
    component: _import('purchase/commodity/index'),
    name: '商品采销 / 采购单',
    authority: 'commodity'
  },
  {
    path: 'supplierInfo',
    icon: 'fa-user',
    component: _import('purchase/supplierInfo/index'),
    name: '商品采销 / 供应商信息',
    authority: 'supplierInfo'
  },
  {
    path: 'statement',
    icon: 'fa-user',
    component: _import('purchase/statement/index'),
    name: '商品采销 / 采销结算单',
    authority: 'statement'
  },
  {
    path: 'settlement',
    icon: 'fa-user',
    component: _import('purchase/settlement/index'),
    name: '商品采销 / 销售订单',
    authority: 'settlement'
  },
  {
    path: 'stockControl',
    icon: 'fa-user',
    component: _import('purchase/stockControl/index'),
    name: '商品采销 / 库存管理',
    authority: 'stockControl'
  },
  {
    path: 'payApplication',
    icon: 'fa-user',
    component: _import('purchase/payApplication/index'),
    name: '商品采销 / 付款申请',
    authority: 'payApplication'
  },
  // 分销管理
  {
    path: 'distribution',
    icon: 'fa-user',
    component: _import('purchase/distribution/index'),
    name: '分销管理  /  分销订单',
    authority: 'distribution'
  },
  {
    path: 'distributionStatement',
    icon: 'fa-user',
    component: _import('purchase/distributionStatement/index'),
    name: '分销管理  /  分销结算单',
    authority: 'distributionStatement'
  },
  // 财务收支
  {
    path: 'financeBudget',
    icon: 'fa-user',
    component: _import('purchase/revenue/financeBudget/index'),
    name: '财务收支',
    authority: 'financeBudget'
  },
]

// 增值服务路由
export const asyncRouterMapAddService = [
  {
    path: 'myaddService',
    icon: 'fa-user',
    component: _import('addService/myaddService/index'),
    name: '我的增值服务',
    authority: 'myaddService'
  },
  {
    path: 'statistics',
    icon: 'fa-user',
    component: _import('addService/statistics/index'),
    name: '统计',
    authority: 'statistics'
  },
  {
    path: 'serviceApplication',
    icon: 'fa-user',
    component: _import('addService/serviceApplication/index'),
    name: '增值服务申请',
    authority: 'serviceApplication'
  },
  {
    path: 'servicesCheck',
    icon: 'fa-user',
    component: _import('addService/serviceCheck/index'),
    name: '客服处理',
    authority: 'servicesCheck'
  },
  {
    path: 'servicePricing',
    icon: 'fa-user',
    component: _import('addService/servicePricing/index'),
    name: '销售处理',
    authority: 'servicePricing'
  },
  {
    path: 'serviceReceivables',
    icon: 'fa-user',
    component: _import('addService/serviceReceivables/index'),
    name: '财务收款',
    authority: 'serviceReceivables'
  },
  {
    path: 'serviceConfig',
    icon: 'fa-user',
    component: _import('addService/serviceConfig/index'),
    name: '增值服务项配置',
    authority: 'serviceConfig'
  },
]

//  系统首页动态路由
//  export const firstPageRouter = {
//   path: '/',
//   name: '系统首页',
//   component: _import('layout/IndexLayout'),
//   children: [
//     {
//       path: 'HomePage',
//       component: _import('layout/HomePage')
//     },
//     {
//       path: 'adminSys',
//       name: '权限管理系统',
//       component: Layout,
//       // children: [] // 动态获取的数组
//       children: store.getters.permissionRouter // 动态获取的数组

//     },
//     {
//       path: 'demoSys',
//       name: 'demo业务系统',
//       component: Layout,
//       children: []
//     }
//    ]
// }














/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will no redirct in the levelbar
 * noDropdown : if `noDropdown:true` will has no submenu
 * meta : { role: ['admin'] }  will control the page role
 **/
export const constantRouterMap = [
  {
    path: '/login',
    component: _import('login/index'),
    hidden: true
  },
  {
    path: '/authredirect',
    component: _import('login/authredirect'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/index/homePage',
    hidden: true
  },
  {
    path: '/index',
    redirect: '/index/homePage',
    hidden: true
  },
  {
    path: '/index',
    name: '系统首页',
    component: _import('layout/IndexLayout'),
    children: [
      {
        path: 'homePage',
        component: _import('layout/HomePage')
      },
      {
        path: 'changePassword',
        component: _import('layout/changePassword'),
      },
      {
        path: 'adminSys',
        name: '权限管理系统',
        component: Layout,
        children: [
          {
            path: '',
            component: _import('dashboard/index'),
          },
          ...asyncRouterMap
        ]
      },
      {
        path: 'orderSys',
        name: '订单业务系统',
        component: Layout,
        children: [
          {
            path: '',
            component: _import('dashboard/chars')
          },
          ...asyncRouterMapForOrder
        ]
      },
      {
        path: 'baseDataSys',
        name: '基础信息系统',
        component: Layout,
        children: [
          {
            path: '',
            icon: 'fa-user',
            component: _import('baseDataSys/customer/bdcustomer/index'),
            name: '客户',
            authority: 'custome'
          },
          ...asyncRouterMapForBaseData
        ]
      },
      {
        path: 'financialSys',
        name: '财务管理系统',
        component: Layout,
        children: [
          {
            path: '',
            component: _import('dashboard/financialSys')
          },
          ...asyncRouterMapForfinancial
        ]
      },
     
      {
        path: 'addService',
        name: '增值服务',
        component: Layout,
        children: [
          {
            path: '',
            component: _import('dashboard/addService')
          },
          ...asyncRouterMapAddService
        ]
      },
      {
        path: 'purchase',
        name: '采销管理',
        component: Layout,
        children: [
          {
            path: '',
            icon: 'fa-user',
            component: _import('dashboard/purchase'),
          },
          ...asyncRouterMapForPurchase
        ]
      },
      {
        path: 'traceSys',
        name: '防伪溯源',
        component: Layout,
        children: [
          {
            path: '',
            icon: 'fa-user',
            component: _import('dashboard/chars')
          },
          ...asyncRouterMapForTraceSys
        ]
      }
      // {
      //   path: 'changePassword',
      //   name: '修改密码',
      //   component: Layout,
      //   children: [
      //     {
      //       path: 'changePassword',
      //       component: _import('layout/changePassword')
      //     }
      //   ]
      // },
    ],
    hidden: true
  },
  {
    path: '*',
    component: _import('error/404'),
    hidden: true
  },
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});


