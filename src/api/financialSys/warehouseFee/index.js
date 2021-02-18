import fetch from 'utils/fetch';

export function page(query) {
return fetch({
url: '/api/financialsys/warehouseFee/warehousePage',
method: 'get',
params: query
});
}

export function addObj(obj) {
return fetch({
url: '/api/financialsys/warehouseFee/add',
method: 'post',
data: obj
});
}

export function getObj(id) {
return fetch({
url: '/api/financialsys/warehouseFee/' + id,
method: 'get'
})
}

export function delObj(id) {
return fetch({
url: '/api/financialsys/warehouseFee/' + id,
method: 'delete'
})
}

export function putObj(id, obj) {
return fetch({
url: '/api/financialsys/warehouseFee/' + id,
method: 'put',
data: obj
})
}

// 仓库作业统计
export function statics(obj) {
    return fetch({
    url: '/api/financialsys/warehouseFee/warehouseFeeStatistics',
    method: 'get',
    params: obj
})
}