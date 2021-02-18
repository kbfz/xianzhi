import fetch from "utils/fetch";
// 财务收支统计-----------------------
export function dataAllObj(query) {
  return fetch({
    url: "/api/ordersys/settleAccount/collectToFinacial",
    method: "get",
    params: query
  });
}
// 待确认回款类别
export function unComfiredPacketObj(query) {
    return fetch({
      url: "/api/ordersys/settleAccount/unComfiredPacket",
      method: "get",
      params: query
    });
  }
// 待确认结算单分页
export function pageObj(query) {
    return fetch({
      url: "/api/ordersys/settleAccount/pageList",
      method: "get",
      params: query
    });
  }
  export function childPage(query) {
    return fetch({
      url: "/api/ordersys/saleOrderItems/listBySettleId",
      method: "get",
      params: query
    });
  }
//   结算单确认收款
export function submitFinishObj(obj) {
    return fetch({
      url: "/api/ordersys/settleAccount/submitFinish",
      method: "post",
      data: obj
    });
  }
//   撤销结算单申请
export function rollbackSettleObj(obj) {
    return fetch({
      url: "/api/ordersys/settleAccount/rollbackSettle",
      method: "post",
      data: obj
    });
  }
  export const orderImgExportUrl = '/api/ordersys/fileCommon/upload'
//  编辑结算单接口

export function updateObj(id,obj) {
    return fetch({
      url: "/api/ordersys/settleAccount/" + id,
      method: "put",
      data: obj
    });
  }
// 查看结算单接口
  // 财务总支出------------------------------------------
// 分页查询

export function payPage(query) {
    return fetch({
      url: "/api/ordersys/payDetailInfo/page",
      method: "get",
      params: query
    });
  }
//   新增
export function payAdd(obj) {
    return fetch({
      url: "/api/ordersys/payDetailInfo/add",
      method: "post",
      data: obj
    });
  }
// 查看
export function payObj(id) {
    return fetch({
      url: "/api/ordersys/payDetailInfo/" + id,
      method: "get"
    })
  }
// 编辑
export function payUpdate(id,obj) {
    return fetch({
      url: "/api/ordersys/payDetailInfo/" + id,
      method: "put",
      data: obj
    });
  }
// 删除
export function payDelete(id) {
    return fetch({
      url: "/api/ordersys/payDetailInfo/" + id,
      method: "delete"
    });
  }
  // 支出金额
  export function payAmount(query) {
    return fetch({
      url: "/api/ordersys/payDetailInfo/checkSettlePayAmount",
      method: "get",
      params:query
    })
  }
  // 回款账户s
  export function selectObj(query) {
    return fetch({
      url: "/api/ordersys/salePlatform/getReceiveAccountSelectList",
      method: "get",
      params:query
    })
  }
  // 财务总支出编辑
  export function editPay(obj) {
    return fetch({
      url: "/api/ordersys/payDetailInfo/updatePayDetail",
      method: "post",
      data: obj
    });
  }
// 发起审批
export function approvalObj(query) {
  return fetch({
    url: "/api/ordersys/payDetailInfo/createProcessInstance",
    method: "get",
    params:query
  })
}

