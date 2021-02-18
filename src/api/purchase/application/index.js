import fetch from "utils/fetch";

export function page(query) {
  return fetch({
    url: "/api/ordersys/purchase/page",
    method: "get",
    params: query
  });
}

export function childPage(query) {
  return fetch({
    url: "/api/ordersys/purchaseItem/listByPurchaseNo",
    method: "get",
    params: query
    // data: obj
  });
}
//新增
export function addObj(obj) {
  return fetch({
    url: "/api/ordersys/purchase/add",
    method: "post",
    data: obj
  });
}
//修改
export function setInfo(obj) {
  return fetch({
    url: "/api/ordersys/purchase/update",
    method: "post",
    data: obj
  });
}
//获取
export function getObj(id) {
  return fetch({
    url: "/api/ordersys/purchase/" + id,
    method: "get"
  });
}
// 采购单统计

export function getObjList(query) {
  return fetch({
    url: "/api/ordersys/purchase/purchaseCollect",
    method: "get",
    params: query
  });
}
//下载
export function addDownLoad() {
  return fetch({
    url: "/api/ordersys/purchaseItem/download",
    method: "get",
    // params: query
  });
}
//上传
export function addUpload(obj) {
  return fetch({
    url: "/api/ordersys/purchaseItem/import",
    method: "post",
    data: obj
  });
}
//删除
export function delObj(id) {
  return fetch({
    url: '/api/ordersys/purchase/' + id,
    method: 'delete'
  })
}
// 图片上传
export const ImgExportUrl = '/api/ordersys/fileCommon/upload'
//填报付款信息
export function submitPay(obj) {
  return fetch({
    url: "/api/ordersys/purchase/submitPay",
    method: "post",
    data: obj
  });
}

//查看详情列表
export function retailPage(query) {
  return fetch({
    url: "/api/ordersys/saleOrderItems/listVo",
    method: "get",
    params: query
  });
}
//分销
export function distrPage(query) {
  return fetch({
    url: "/api/ordersys/saleOrderItems/retailPage",
    method: "get",
    params: query
  });
}

// 币种下拉选择
export function currencyObj(query) {
  return fetch({
    url: '/api/ordersys/bdDictionary/listByType',
    method: 'get',
    params: query
  })
}
// 订单详情  分销订单
export function purchasePage(query) {
  return fetch({
    url: "/api/ordersys/payDetailInfo/pageByPurchase",
    method: "get",
    params: query
  });
}
// 子表查询
export function childGetObj(id) {
  return fetch({
    url: "/api/ordersys/purchaseItem/" + id,
    method: "get"
  });
}
// 编辑保存
export function childSave(id,obj) {
  return fetch({
    url: "/api/ordersys/purchaseItem/update/" + id,
    method: "put",
    data: obj
  });
}
// 删除
export function childDel(id,obj) {
  return fetch({
    url: "/api/ordersys/purchaseItem/delete/" + id,
    method: "delete"
  });
}
// 供应商名称
export function supplierPage(query) {
  return fetch({
    url: "/api/ordersys/saleSupplier/selectList",
    method: "get",
    params: query
  });
}
