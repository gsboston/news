import axios from 'axios'
import Cookies from 'js-cookie'
import qs from 'qs'
import CryptoJS from 'crypto-js'

export default class Axios {
  constructor(arg) {
    const { baseURL, timeout = 0, headers } = arg
    this.httpService = axios.create({
      baseURL,
      timeout,
      headers
    })

    this.httpService.interceptors.request.use(
      config => {
        const timestamp = (new Date().getTime() / 1000).toFixed(0)
        // let params = {
        //     channel: "ApiApplet",
        //     clientversion: "1.0"
        // }
        // let ordered = Object.keys(params).sort().map(key => `${key}=${params[key]}`).join("&");
        // params['Partner'] = "XunChaApplet";
        // params['PartnerKey_XunChaApplet'] = "7BB4F9BB-7E99-46CF-98E8-B00F480C31EB";
        // let toHash = ordered + '&timestamp=' + timestamp + params['PartnerKey_XunChaApplet'];
        // let signature = CryptoJS.MD5(toHash).toString();
        // config.headers['timestamp'] = timestamp;
        // config.headers['sign'] = signature;
        // config.url += '?partner=XunChaApplet&channel=ApiApplet&clientversion=1.0&timestamp=' + timestamp + '&Sign=' + signature
        return config
      },
      err => {
        Promise.reject(err)
      }
    )
    this.httpService.interceptors.response.use(
      response => {
        return response.data
      },
      err => {
        return Promise.reject(err)
      }
    )
  }

  get(url, params = {}, opts = {}, headers = {}) {
    return new Promise((resolve, reject) => {
      this.send(resolve, reject, opts, {
        url,
        method: 'get',
        params,
        headers,
        paramsSerializer(params) {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        }
      })
    })
  }

  post(url, params = {}, opts = {}, headers = {}, reqParams = {}) {
    return new Promise((resolve, reject) => {
      this.send(resolve, reject, opts, {
        url,
        method: 'post',
        data: params,
        ...reqParams,
        headers: { 'Content-Type': 'application/json', ...headers }
      })
    })
  }

  put(url, params = {}, opts = {}, headers = {}) {
    return new Promise((resolve, reject) => {
      this.send(resolve, reject, opts, {
        url,
        method: 'put',
        data: params,
        headers: { 'Content-Type': 'application/json', ...headers }
      })
    })
  }

  delete(url, params = {}, opts = {}, headers = {}) {
    return new Promise((resolve, reject) => {
      this.send(resolve, reject, opts, {
        url,
        method: 'delete',
        params,
        headers
      })
    })
  }

  send(resolve, reject, opts, reqParams) {
    const {
      isLoading = true,
      isShowMessage = true,
      isFullReturn = false
    } = opts
    // const loading = isLoading
    this.httpService({
      ...reqParams,
      headers: {
        // Authorization: "Bearer " + Cookies.get("token"),
        ...reqParams.headers
      }
    })
      .then(res => {
        if (res.resCode === 0 || isFullReturn) {
          resolve(res)
        } else {
          reject(res)
          // isShowMessage && showNotify({ type: 'warning', message: res.message || "请求失败！" });
        }
        // setTimeout(() => {
        //     isLoading && loading.close();
        // }, 0);
      })
      .catch(err => {
        reject(err)
        // showNotify({ type: 'warning', message: res.message || "请求失败！" });
        // setTimeout(() => {
        //     isLoading && loading.close();
        // }, 0);
      })
  }
}
