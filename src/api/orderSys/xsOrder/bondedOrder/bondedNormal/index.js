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
    url: '/api/ordersys/sellBsorderStatistics/page',
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
// 关区下拉选择
export function selectDis(query) {
    return fetch({
    url: '/api/basedatasys/bdDistrict/getSelectList2',
    method: 'get',
    params: query
    })
    }
// 取消订单
export function cancelObj(obj) {
    return fetch({
    url: '/api/ordersys/sellCancelrecords/cancelorder',
    method: 'post',
    data: obj
    });
    }

// 订单状态
export function receiveObj(query) {
    return fetch({
    url: '/api/ordersys/sellBsorderHead/receiveCustomInfo',
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
// 订单作废
export function orderDetele(query) {
    return fetch({
    url: '/api/ordersys/sellBsorderHead/invalid',
    method: 'get',
    params: query
    })
}
// 批量作废、重置
export function allResetObj(obj) {
    return fetch({
    url: '/api/ordersys/sellBsorderHead/batchUpdateOrderStatue',
    method: 'post',
    data: obj
    });
    }
// 订单已完成
export function orderCompelete(query) {
    return fetch({
    url: '/api/ordersys/sellBsorderHead/compelete',
    method: 'get',
    params: query
    })
}
// 物流轨迹查询
export function loginsticsOrder(query) {
    return fetch({
    url: '/api/ordertrace/logistrace/page',
    method: 'get',
    params: query
    });
    }
    // 导出当前数据
    export function exportOrder(query) {
        return fetch({
        url: '/api/ordersys/sellBsorderHead/export',
        method: 'get',
        params: query
        });
        }   