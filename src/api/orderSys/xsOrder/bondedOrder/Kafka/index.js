import fetch from 'utils/fetch';
import store from 'store';
import {
  getToken
} from 'utils/auth';

export function page(query) {
  return fetch({
  url: '/api/ordersys/kafkaConsumer/page',
  method: 'get',
  params: query
  });
  }

// 修改
export function getObj(id) {
    return fetch({
      url: '/api/ordersys/kafkaConsumer/' + id,
      method: 'get'
    })
  }
// 修改确认
export function installObj(obj) {
    return fetch({
      url: '/api/ordersys/kafkaConsumer/edit',
      method: 'put',
      data: obj
    })
  } 
// 重发
export function orderReset(query) {
    return fetch({
      url: '/api/ordersys/kafkaConsumer/reConsumer',
      method: 'get',
      params: query
    })
  } 