import fetch from 'utils/fetch';

// 国际物流
export function page(query) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillInternational/page',
        method: 'get',
        params: query,
    });
}
// 新增保存
export function addObj(obj) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillInternational/add',
        method: 'post',
        data: obj,
    });
}
// 查询接口
export function getObj(id) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillInternational/' + id,
        method: 'get'
    });
}
// 编辑保存
export function updateObj(id,obj) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillInternational/' + id,
        method: 'put',
        data: obj,
    });
}
// 删除
export function delObj(id) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillInternational/' + id,
        method: 'delete'
    });
}