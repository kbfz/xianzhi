import fetch from 'utils/fetch';
import store from 'store';
import {
  getToken
} from 'utils/auth';

export function page(query) {
  return fetch({
  url: '/api/ordertrace/logistrace/getLogisticsExpireByPage',
  method: 'get',
  params: query
  });
  }
// excel 导出方法
export const excelExport = params => {
    let temp = ''
    for (let item in params) {
      if (item === 'url') continue
      temp += item + '=' + params[item] + '&'
    }
    temp += 'appId=' + store.getters.appId + '&accessToken=' + getToken()
     //window.location.href = params.url + '?' + temp  //在当前窗口打开
   //   console.log(temp)
    window.open(params.url + '?' + temp)  //打开一个新窗口
    // console.log(params.url + '?' + temp)
  }
  export  const exportGoodsById = '/api/ordertrace/logistrace/exportLogisData'

  export function pageQuery(query) {
    return fetch({
    url: '/api/ordertrace/logistrace/page',
    method: 'get',
    params: query
    });
    }
  // 客户下拉选择
  export function selectObj(query) {
    return fetch({
    url: '/api/basedatasys/bdCustomer/getSelectList',
    method: 'get',
    params: query
    })
    }