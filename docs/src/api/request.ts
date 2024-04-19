'use strict'
import axios from 'axios'
import { cloneDeep } from 'lodash-es'
// init
const service = axios.create({
  timeout: 60 * 1000
})
// request
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Promise.reject(error)
  }
)
// response
service.interceptors.response.use(
  response => {
    const json = response && response.data

    if (json instanceof Object) {
      if (json.status === 500) {
        json.msg = '系统错误'
      }
      json.success = json.status === 200
      json.errMsg = json.msg || json.errMsg || '系统错误'
      // 如果未登录 后台返回登录页字符串
      if (json.status === 401) {
        json.errMsg = '用户未登录'
      }
      json.response = cloneDeep(response)
    }

    return json
  },
  error => {
    return Promise.reject(error)
  }
)

// ajax entry
const suffix = '' // 后缀
const ajax = function (obj: any, config?: any) {
  const _suffix = obj.suffix !== undefined ? obj.suffix : suffix
  const url = obj.url + _suffix
  const type = obj.type ? obj.type.toUpperCase() : 'GET'
  const uConfig = Object.assign({}, config || {})
  const params = obj.params

  switch (type) {
    case 'POST':
      return service.post(url, params, { ...uConfig })
    case 'PUT':
      return service.put(url, params, { ...uConfig })
    case 'DELETE':
      return service.delete(url, { ...uConfig })
    default:
      return service.get(url, { params: params, ...uConfig })
      break
  }
}

export default ajax
