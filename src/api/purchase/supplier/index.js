import fetch from "utils/fetch";

export function page(query) {
  return fetch({
    url: "/api/ordersys/saleSupplier/page",
    method: "get",
    params: query
  });
}

// 修改
export function supplierUpdate(id,obj) {
  return fetch({
    url: "/api/ordersys/saleSupplier/" + id,
    method: "put",
    data: obj
  });
}
// 添加
export function supplierAdd(obj) {
  return fetch({
    url: "/api/ordersys/saleSupplier/add",
    method: "post",
    data: obj
  });
}
// 删除
export function supplierDel(id) {
  return fetch({
    url: "/api/ordersys/saleSupplier/" + id,
    method: "delete"
  });
}
// 查询
export function getObj(id) {
  return fetch({
    url: "/api/ordersys/saleSupplier/" + id,
    method: "get"
  });
}

