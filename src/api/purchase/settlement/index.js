import fetch from "utils/fetch";

export function page(query) {
  return fetch({
    url: "/api/ordersys/saleOrderItems/listVo",
    method: "get",
    params: query
  });
}
// 订单平台下拉选择
export function orderObj(query) {
  return fetch({
    url: '/api/ordersys/saleExcelTemplate/selectByTemplate',
    method: 'get',
    params: query
  })
}
//新增
export function addObj(obj) {
  return fetch({
    url: "/api/ordersys/saleOrderItems/add",
    method: "post",
    data: obj
  });
}
//获取
export function getObj(id) {
  return fetch({
    url: "/api/ordersys/saleOrderItems/" + id,
    method: "get"
  });
}
//修改
export function setInfo(obj) {
  return fetch({
    url: "/api/ordersys/saleOrderItems/update",
    method: "post",
    data: obj
  });
}
//删除
export function delObj(id) {
  return fetch({
    url: '/api/ordersys/saleOrderItems/' + id,
    method: 'delete'
  })
}
//分销分页查询
export function retailPage(query) {
  return fetch({
    url: "/api/ordersys/saleOrderItems/retailPage",
    method: "get",
    params: query
  });
}