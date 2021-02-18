import fetch from "utils/fetch";

export function page(query) {
  return fetch({
    url: "/api/ordersys/settleAccount/pageList",
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
  export function childPage(query) {
    return fetch({
      url: "/api/ordersys/saleOrderItems/listBySettleId",
      method: "get",
      params: query
    });
  }
//   新增结算单
export function addObj(obj) {
    return fetch({
      url: "/api/ordersys/settleAccount/add",
      method: "post",
      data: obj
    });
  }
// 编辑 查询
export function getDetail(id) {
    return fetch({
      url: "/api/ordersys/settleAccount/" + id,
      method: "get"
    });
  }
// 编辑 保存
export function updateObj(id,obj) {
    return fetch({
      url: "/api/ordersys/settleAccount/" + id,
      method: "put",
      data: obj
    });
  }
//删除
export function delObj(id) {
    return fetch({
      url: '/api/ordersys/settleAccount/' + id,
      method: 'delete'
    })
  }
// 提交
export function submitObj(obj) {
    return fetch({
      url: "/api/ordersys/settleAccount/submitFinancial",
      method: "post",
      data: obj
    });
  }
  // 分销下载
  export function addDownLoad() {
    return fetch({
      url: "/api/ordersys/saleOrderItems/downloadRetail",
      method: "get",
      // params: query
    });
  }
  export const orderImgExportUrl = '/api/ordersys/fileCommon/upload'
  
