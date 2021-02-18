import fetch from 'utils/fetch';

export function page(query) {
return fetch({
url: '/api/ordersys/sellBsorderWarehouse/page',
method: 'get',
params: query
});
}

// 订单统计
export function orderStatistics(query) {
    return fetch({
    url: '/api/ordersys/sellBsorderWarehouse/warehousestatistics',
    method: 'get',
    params: query
    })
    }
// 仓库下拉选择
export function selectObj(query) {
    return fetch({
    url: '/api/basedatasys/bdWarehouse/getSelectList',
    method: 'get',
    params: query
    })
    }