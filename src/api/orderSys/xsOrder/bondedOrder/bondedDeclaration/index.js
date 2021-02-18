import fetch from 'utils/fetch';

export function page(query) {
return fetch({
url: '/api/ordersys/sellBsorderHead/selectpage',
method: 'get',
params: query
});
}
// 表格里面的商品明细
export function detailObj(query) {
return fetch({
url: '/api/ordersys/sellBsorderList/page',
method: 'get',
params: query
});
}


export function addObj(obj) {
return fetch({
url: '/api/ordersys/sellBsorderHead/add',
method: 'post',
data: obj
});
}

 export function getObj(id) {
 return fetch({
 url: '/api/ordersys/sellBsorderHead/' + id,
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
url: '/api/ordersys/sellBsorderHead/' + id,
method: 'delete'
})
}

export function putObj(id, obj) {
return fetch({
url: '/api/ordersys/sellBsorderHead/' + id,
method: 'put',
data: obj
})
}
// 订单统计
export function orderStatistics(query) {
    return fetch({
    url: '/api/ordersys/sellBsorderHead/selectbyparastatistics',
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
// 订单状态
export function receiveObj(query) {
    return fetch({
    url: '/api/ordersys/sellBsorderHead/receiveCustomInfo',
    method: 'get',
    params: query
    })
    }
    // 订单取消
    export function handleObj(query) {
        return fetch({
        url: '/api/ordersys/sellBsorderHead/handleOrder',
        method: 'get',
        params: query
        })
        }   