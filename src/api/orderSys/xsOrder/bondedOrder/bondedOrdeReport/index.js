import fetch from 'utils/fetch';

export function page(query) {
return fetch({
url: '/api/ordersys/sellBsorderDeclaration/page',
method: 'get',
params: query
});
}

// 订单统计
export function orderStatistics(query) {
    return fetch({
    url: '/api/ordersys/sellBsorderDeclaration/declarationstatistics',
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