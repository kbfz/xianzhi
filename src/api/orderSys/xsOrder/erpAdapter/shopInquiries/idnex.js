import fetch from 'utils/fetch'
export function page(obj) {
  return fetch({
    url: '/api/erp-adapter/popManager/searchPopList',
    method: 'post',
    data: obj
  })
}
// 修改
export function updateObj(obj) {
  return fetch({
  url: '/api/erp-adapter/popManager/updatePopInfo',
  method: 'post',
  data: obj
  });
  }
  // 新增
export function addObj(obj) {
  return fetch({
  url: '/api/erp-adapter/popManager/savePopInfo',
  method: 'post',
  data: obj
  });
  }
  // 客户下拉
  export function customerSelect(query) {
    return fetch({
      url: '/api/basedatasys/bdCustomer/getSelectList',
      method: 'get',
      params: query
    })
  }