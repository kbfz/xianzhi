import fetch from 'utils/fetch';

export function page(query) {
return fetch({
url: '/api/financialsys/customsFee/customsPage',
method: 'get',
params: query
});
}

export function addObj(obj) {
return fetch({
url: '/api/financialsys/customsFee/add',
method: 'post',
data: obj
});
}

export function getObj(id) {
return fetch({
url: '/api/financialsys/customsFee/' + id,
method: 'get'
})
}

export function delObj(id) {
return fetch({
url: '/api/financialsys/customsFee/' + id,
method: 'delete'
})
}

export function putObj(id, obj) {
return fetch({
url: '/api/financialsys/customsFee/' + id,
method: 'put',
data: obj
})
}

// 申报统计
export function statics(obj) {
return fetch({
url: '/api/financialsys/customsFee/customsFeeStatistics',
method: 'get',
params: obj
})
}
