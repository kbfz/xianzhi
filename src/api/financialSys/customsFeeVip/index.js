import fetch from 'utils/fetch';

export function page(query) {
return fetch({
url: '/api/financialsys/customsFeeVip/customsVipPage',
method: 'get',
params: query
});
}

export function addObj(obj) {
return fetch({
url: '/api/financialsys/customsFeeVip/add',
method: 'post',
data: obj
});
}

export function getObj(id) {
return fetch({
url: '/api/financialsys/customsFeeVip/' + id,
method: 'get'
})
}

export function delObj(id) {
return fetch({
url: '/api/financialsys/customsFeeVip/' + id,
method: 'delete'
})
}

export function putObj(id, obj) {
return fetch({
url: '/api/financialsys/customsFeeVip/' + id,
method: 'put',
data: obj
})
}

// 申报统计
export function statics(obj) {
return fetch({
url: '/api/financialsys/customsFeeVip/customsFeeStatistics',
method: 'get',
params: obj
})
}
    