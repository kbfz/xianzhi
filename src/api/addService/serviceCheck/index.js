import fetch from 'utils/fetch'

export function page(query) {
  return fetch({
    url: '/api/ordersys/serviceInfo/pageByHandle',
    method: 'get',
    params: query
  })
}
export function setOperateStatus(obj) {
  return fetch({
    url: '/api/ordersys/serviceInfo/setOperateStatus',
    method: 'post',
    data: obj
  })
}

// 业务详情
export function BusinessObj(id) {
  return fetch({
    url: '/api/ordersys/serviceInfo/details/' + id,
    method: 'get'
  })
}

// 确认核对
export function confirm(obj) {
  return fetch({
    url: '/api/ordersys/serviceInfo/updateService',
    method: 'post',
    data: obj
  })
}

// 删除核对
export function delCheck(id) {
  return fetch({
    url: '/api/ordersys/serviceInfo/' + id,
    method: 'delete'
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

// 查询详情
export function detailsInfo(id) {
  return fetch({
    url: '/api/ordersys/serviceInfo/details/' + id,
    methods: 'get'
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
// 检查是否是出账日
export function BillTime(query) {
  return fetch({
    url: '/api/ordersys/serviceInfo/isBillTime',
    method: 'get',
    params: query
  })
}

// 仓库作业信息
export function reportOperation(obj) {
  return fetch({
    url: '/api/ordersys/serviceInfo/reportOperation',
    method: 'post',
    data: obj
  })
}
