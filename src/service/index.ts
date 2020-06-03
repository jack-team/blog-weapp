import fail from './fail';
import success from './success';
import Taro from '@tarojs/taro';
import * as Const from './const';

interface Options {
  data?: any,
  url: string,
  method: 'POST' | 'GET'
}

const getUrl = (url: string) => (
  `${Const.apiUrl}${url}`
)

const instance = (opts: Options) => (
  new Promise((
    resolve, reject
  ) => {
    const {
      url,
      data,
      method
    } = opts;
    Taro.request({
      data: data,
      method: method,
      url: getUrl(url),
      fail: fail(reject),
      success: success(resolve)
    })
  })
)

const get = (url: string, data?: any) => (
  instance({url: url, data: data, method: 'GET'})
)

const post = (url: string, data?: any) => (
  instance({url: url, data: data, method: 'POST'})
)

class Service {
  static get = get;
  static post = post;
}

export default Service;
