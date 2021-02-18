import fetch from "utils/fetch";

export function retailPage(query) {
  return fetch({
    url: "/api/ordersys/saleOrderItems/retailPage",
    method: "get",
    params: query
  });
}