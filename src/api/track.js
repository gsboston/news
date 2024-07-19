import Axios from './index.js'

// 广告事件上报
export async function trackAdApi(data) {
    return await Axios.post('/h5webad/app/api/track/ad', data)
}

// 页面事件上报
export async function trackPageApi(data) {
    return await Axios.post('/h5webad/app/api/track/page', data)
}

// 用户行为上报
export async function trackUserApi(data) {
    return await Axios.post('/h5webad/app/api/user/event', data)
}