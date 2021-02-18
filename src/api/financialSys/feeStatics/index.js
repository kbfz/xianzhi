import fetch from 'utils/fetch';

// 财务首页 各客户总费用
export function cusTotalFee(obj) {
return fetch({
url: '/api/financialsys/feeStatics/getCusTotalFee',
method: 'get',
params: obj
})
}

// 财务首页 收费单项总费用
export function feeStatics(obj) {
return fetch({
url: '/api/financialsys/feeStatics/getFeeStaticsVo',
method: 'get',
params: obj
})
}