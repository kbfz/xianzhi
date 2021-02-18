
import fetch from 'utils/fetch';

// 获取收费标准列表
export function getCustomerRatesList(query) {
    return fetch({
        url: '/api/ordersys/customerController/page',
        method: 'get',
        params: query,
    });
}


// 获取客户下拉框
export function getCustomerSelectList(query) {
    return fetch({
        url: '/api/ordersys/customerController/getCustomerSelectList',
        method: 'get',
        params: query,
    });
}

// 查看当前收费标准 ?customerCode=1
export function getActiveRule(query) {
    return fetch({
        url: '/api/ordersys/customerController/getActiveRule',
        method: 'get',
        params: query,
    });
}

// 查看历史收费标准 ?customerCode=1
export function getHistoryRule(query) {
    return fetch({
        url: '/api/ordersys/customerController/getHistoryRule',
        method: 'get',
        params: query,
    });
}

// 历史收费标准下拉框 ?customerCode=1
export function getHistoryRuleSelectList(query) {
    return fetch({
        url: '/api/ordersys/customerController/getHistoryRuleSelectList',
        method: 'get',
        params: query,
    });
}

// 根据下拉框编码查询收费标准 ?ruleCode
export function getCustomerRuleByRuleCode(query) {
    return fetch({
        url: '/api/ordersys/customerRule/getCustomerRuleByRuleCode',
        method: 'get',
        params: query,
    });
}


// 快递费，获编辑
export function getCustomerRuleExpress(id) {
    return fetch({
        url: `/api/ordersys/customerRuleExpress/${id}`,
        method: 'get',
    });
}

// 快递费，修改
export function updateExpress(obj) {
    return fetch({
        url: `/api/ordersys/customerRuleExpress/update`,
        method: 'put',
        data:obj
    });
}

// 快递费省份列表
export function getProvince(id) {
    return fetch({
        url: `/api/ordersys/customerRuleExpressProvince/${id}`,
        method: 'get',
    });
}

// 快递费省份列表修改
export function updateProvince(obj) {
    return fetch({
        url: `/api/ordersys/customerRuleExpressProvince/update`,
        method: 'put',
        data:obj
    });
}

// 快递费省份列表 删除
export function deleteProvince(query) {
    return fetch({
        url: `/api/ordersys/customerRuleExpressProvince/deleteById`,
        method: 'get',
        params: query,
    });
}

// 快递费省份列表 添加
export function addProvince(obj) {
    return fetch({
        url: `/api/ordersys/customerRuleExpressProvince/add`,
        method: 'post',
        data: obj,
    });
}

// 获取操作费 
export function getOperateFee(id) {
    return fetch({
        url: `/api/ordersys/customerRuleOperateFee/${id}`,
        method: 'get',
    });
}

// 操作费 修改 
export function updateOperateFee(obj) {
    return fetch({
        url: `/api/ordersys/customerRuleOperateFee/update`,
        method: 'put',
        data:obj
    });
}

// 操作费 添加
export function addOperateFee(obj) {
    return fetch({
        url: `/api/ordersys/customerRuleOperateFee/add`,
        method: 'post',
        data:obj
    });
}

// 操作费删除：
export function deleteOperateFee(query) {
    return fetch({
        url: `/api/ordersys/customerRuleOperateFee/deleteById`,
        method: 'get',
        params: query,
    });
}

// 获取超额附加费
export function getAttachFee(id) {
    return fetch({
        url: `/api/ordersys/customerRuleAttachFee/${id}`,
        method: 'get',
    });
}

// 超额附加费 修改
export function updateAttachFee(obj) {
    return fetch({
        url: `/api/ordersys/customerRuleAttachFee/update`,
        method: 'put',
        data:obj
    });
}
// 账单服务
export function statusObj(query) {
    return fetch({
        url: `api/ordersys/customerController/switchCustomerStatus`,
        method: 'get',
        params:query
    });
}
// 包材费下拉框
export function packSelect(query) {
    return fetch({
        url: `api/ordersys/customerPackaging/getSelectList`,
        method: 'get',
        params:query
    });
}
// 新增包材费
export function packAdd(obj) {
    return fetch({
        url: `api/ordersys/customerrulepackaging/add`,
        method: 'post',
        data:obj
    });
}
// 获取包材费详情
export function packUpdate(id) {
    return fetch({
        url: `api/ordersys/customerrulepackaging/` + id,
        method: 'get'
    });
}
// 编辑保存
export function packUpdateSave(id,obj) {
    return fetch({
        url: `api/ordersys/customerrulepackaging/` + id,
        method: 'put',
        data:obj
    });
}
// 删除包材
export function packDel(id) {
    return fetch({
        url: '/api/ordersys/customerrulepackaging/' + id,
        method: 'delete'
    });
}
// 仓库编辑
export function getWare(id) {
    return fetch({
        url: `api/ordersys/customerRuleWarehouseFee/` + id,
        method: 'get'
    });
}
// 仓储费保存
export function saveWare(id,obj) {
    return fetch({
        url: `api/ordersys/customerRuleWarehouseFee/` + id,
        method: 'put',
        data:obj
    });
}
// 当前收费标准操作记录
export function rulePage(query) {
    return fetch({
        url: 'api/ordersys/customerRuleLog/page',
        method: 'get',
        params:query
    });
}