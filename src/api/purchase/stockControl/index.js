import fetch from "utils/fetch";

export function page(query) {
  return fetch({
    url: "/api/ordersys/saleProductInfo/listVo",
    method: "get",
    params: query
  });
}
//新增
export function addObj(obj) {
  return fetch({
    url: "/api/ordersys/saleProductInfo/add",
    method: "post",
    data: obj
  });
}
//修改
export function setInfo(obj) {
  return fetch({
    url: "/api/ordersys/saleProductInfo/update",
    method: "post",
    data: obj
  });
}
//获取
export function getObj(id) {
  return fetch({
    url: "/api/ordersys/saleProductInfo/" + id,
    method: "get"
  });
}
//删除
export function delObj(id) {
  return fetch({
    url: '/api/ordersys/saleProductInfo/' + id,
    method: 'delete'
  })
}