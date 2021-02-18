 import fetch from 'utils/fetch';
// 包材费------------------------------------------------------------
export function packAdd(obj) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillPackage/add',
        method: 'post',
        data: obj,
    });
}
// 获取详情
export function packGet(id) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillPackage/' + id,
        method: 'get',
    });
}
// 更新保存
export function packUpdate(id,obj) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillPackage/' + id,
        method: 'put',
        data: obj,
    });
}
// 删除
export function packDel(id) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillPackage/' + id,
        method: 'delete'
    });
}
// 仓储费新增-------------------------------------------------------
export function wareAdd(obj) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillWarehouseFee/add',
        method: 'post',
        data: obj,
    });
}
// 获取详情
export function wareGet(id) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillWarehouseFee/' + id,
        method: 'get',
    });
}
// 更新保存
export function wareUpdate(id,obj) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillWarehouseFee/' + id,
        method: 'put',
        data: obj,
    });
}
// 删除
export function wareDel(id) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillWarehouseFee/' + id,
        method: 'delete'
    });
}
// 查验费--------------------------------------------------------------------
export function checkAdd(obj) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillCheck/add',
        method: 'post',
        data: obj,
    });
}
// 获取详情
export function checkGet(id) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillCheck/' + id,
        method: 'get',
    });
}
// 更新保存
export function checkUpdate(id,obj) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillCheck/' + id,
        method: 'put',
        data: obj,
    });
}
// 删除
export function checkDel(id) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillCheck/' + id,
        method: 'delete'
    });
}