import fetch from 'utils/fetch'

export function page(query) {
  return fetch({
    url: '/api/erp-adapter/customerGoods/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return fetch({
    url: '/api/erp-adapter/customerGoods/add',
    method: 'post',
    data: obj
  })
}
export function detailObj(query) {
  return fetch({
    url: '/api/basedatasys/bdGoodsRelation/queryByQstCode',
    method: 'get',
    params: query
  })
}
export function getObj(id) {
  return fetch({
    url: 'api/erp-adapter/customerGoods/' + id,
    method: 'get'
  })
}
export function delObj(id) {
  return fetch({
    url: '/api/basedatasys/bdGoodsRelation/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: 'api/erp-adapter/customerGoods/' + id,
    method: 'put',
    data: obj
  })
}
// 客户下拉选择
export function selectObj(query) {
  return fetch({
    url: '/api/basedatasys/bdCustomer/getSelectList',
    method: 'get',
    params: query
  })
}
// 供应商
export function supplierObj(query) {
  return fetch({
    url: '/api/basedatasys/bdSupplier/getSelectList',
    method: 'get',
    params: query
  })
}

// oms数据
export function omsOutService(query) {
  return fetch({
    url: '/api/basedatasys/bdGoods/queryByGoodsNo',
    method: 'get',
    params: query
  })
}
