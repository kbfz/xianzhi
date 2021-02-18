import fetch from 'utils/fetch';

export function page(query) {
return fetch({
url: '/api/financialsys/exportHistory/page',
method: 'get',
params: query
});
}

export function delObj(id) {
  return fetch({
  url: '/api/financialsys/exportHistory/' + id,
  method: 'delete'
  })
  }

// 下拉框
export function selectObj(query) {
  return fetch({
      url: '/api/financialsys/exportConfig/selectDropList',
      methods: 'get',
      params: query
  })
}