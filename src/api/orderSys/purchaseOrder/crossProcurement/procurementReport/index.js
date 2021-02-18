import fetch from 'utils/fetch';

export function page(query) {
return fetch({
url: '/api/ordersys/sellBsorderHead/page',
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
    url: '/api/ordersys/sellBsorderHead/statistics',
    method: 'get',
    params: query
    })
}
// 订单重置
export function orderReset(query) {
    return fetch({
    url: '/api/ordersys/sellBsorderHead/reset',
    method: 'get',
    params: query
    })
}