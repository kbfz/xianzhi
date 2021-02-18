import fetch from 'utils/fetch';
import store from 'store';
import {
  getToken
} from 'utils/auth';
export function page(query) {
return fetch({
url: '/api/ordersys/buyPurchaseOrder/page',
method: 'get',
params: query
});
}
// 表格里面的商品明细
export function detailObj(query) {
return fetch({
url: '/api/ordersys/buyPurchaseOrderdetails/page',
method: 'get',
params: query
});
}
export function addObj(obj) {
return fetch({
url: '/api/ordersys/buyPurchaseOrder/add',
method: 'post',
data: obj
});
}

 export function getObj(id) {
 return fetch({
 url: '/api/ordersys/buyPurchaseOrder/' + id,
 method: 'get'
 })
 }
// 订单流程
export function stepObj(id) {
    return fetch({
    url: '/api/ordersys/sellBsorderStep/' + id,
    method: 'get'
    })
    }
export function delObj(id) {
return fetch({
url: '/api/ordersys/buyPurchaseOrder/' + id,
method: 'delete'
})
}
// 订单编辑
export function putObj(id, obj) {
return fetch({
url: '/api/ordersys/buyPurchaseOrder/' + id,
method: 'put',
data: obj
})
}
// 订单统计
export function orderStatistics(query) {
    return fetch({
    url: '/api/ordersys/sellBsorderHead/statistics',
    method: 'get',
    params: query
    })
}
// 采购审核
export function orderAudited(obj) {
    return fetch({
    url: '/api/ordersys/buyPurchaseOrder/buy/updatePurchase',
    method: 'post',
    data: obj
    })
}
// excel 导出方法
 export const excelExport = params => {
     let temp = ''
     for (let item in params) {
       if (item === 'url') continue
       temp += item + '=' + params[item] + '&'
     }
     temp += 'appId=' + store.getters.appId + '&accessToken=' + getToken()
      //window.location.href = params.url + '?' + temp  //在当前窗口打开
    //   console.log(temp)
     window.open(params.url + '?' + temp)  //打开一个新窗口
   }
// 导出的url
export  const orderExcelExportUrl = '/api/ordersys/buyPurchaseOrder/buy/exportPurchase.file'

// 订单作废
export function orderCancel(obj) {
    return fetch({
    url: '/api/ordersys/buyPurchaseOrder/buy/deletePurchase',
    method: 'post',
    data: obj
    })
}


