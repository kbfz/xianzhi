import fetch from 'utils/fetch'
export function page(query) {
  return fetch({
    url: '/api/ordersys/warehouseGoods/page',
    // url: '/api/wms-adapter/stockApi/queryStock',
    method: 'get',
    params: query
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
// 仓库下拉选择
export function bdWarehouseSelectList(query) {
  return fetch({
    url: '/api/basedatasys/bdWarehouse/getSelectListForWareHouseQuery',
    method: 'get',
    params: query
  })
}
