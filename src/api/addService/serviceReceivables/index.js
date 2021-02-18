import fetch from 'utils/fetch'

export function page(query) {
  return fetch({
    url: '/api/ordersys/serviceInfo/pageByHandle',
    method: 'get',
    params: query
  })
}

// 业务详情
export function BusinessObj(id) {
  return fetch({
    url: '/api/ordersys/serviceInfo/details/'+ id,
    method: 'get'
  })
}

//收款
export function confirm(obj) {
  return fetch({
    url: '/api/ordersys/serviceInfo/receiptService',
    method: 'post',
    data: obj
  })
}

//批量确认收款
export function allConfirmObj(obj) {
  return fetch({
    url: '/api/ordersys/serviceInfo/payBatch',
    method: 'post',
    data: obj
  })
}
// 查询详情
export function detailsInfo(id) {
  return fetch({
    url: '/api/ordersys/serviceInfo/details/' + id,
    methods: 'get'
  })
}
// 客户名称下拉
export function customerSelect(query) {
  return fetch({
    url: '/api/basedatasys/bdCustomer/getSelectList',
    methods: 'get',
    params: query
  })
}

// 凭证图片上传
export const ImgExportUrl = '/api/ordersys/fileCommon/upload'
export function payObj(obj) {
  return fetch({
    url: '/api/ordersys/serviceInfo/update',
    method: 'post',
    data: obj
  })
}
// 导出
export function exportData(query) {
  return fetch({
    url: '/api/ordersys/serviceInfo/export',
    methods: 'get',
    params: query
  })
}