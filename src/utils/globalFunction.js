import { trackAdApi, trackPageApi, trackUserApi } from '../api/track.js'
import { getIpApi } from '../api/common.js'
import UAParser from 'ua-parser-js'

let osVersion = ''
let devModel = ''
let devVendor = ''
let osName = getOs()
let pixelFlag = checkPixelEvent()

export const adsAdArr = []
export const adgAdArr = ['vfttqz1kr1-idg', 'vfttqz1jp2-idg', 'vfttqz1au3-idg']

// 获取 ua 操作系统
export function getOs() {
    const parser = new UAParser();
    const ua = parser.setUA(navigator.userAgent).getResult();
    osVersion = ua.os.version
    devModel = ua.device.model;
    devVendor = ua.device.vendor;
    jkConsole('ua', ua)
    return ua.os.name || ''
}

// 广告事件上报
export async function trackAdEvent(param) {
    if (param.hasOwnProperty('adInfo')) {
        delete param.adInfo
    }
    let res = await trackAdApi(param)
    jkConsole(res)
}

// 页面事件上报
export async function trackPageEvent(param) {
    if (param.hasOwnProperty('adInfo')) {
        delete param.adInfo
    }
    let res = await trackPageApi(param)
    jkConsole('resPage:', res)
    if (res?.data?.limitAdType) {
        switch (res.data.limitAdType) {
            case 'limit-suser':
                localStorage.setItem('limit-suser', 1)
                break;
            case 'limit-sua':
                localStorage.setItem('limit-sua', 1)
                break;
            case 'limit-sip':
                localStorage.setItem('limit-sip', 1)
                break;
        }
    } else {
        localStorage.setItem('limit-suser', 0)
        localStorage.setItem('limit-sua', 0)
        localStorage.setItem('limit-sip', 0)
    }

    // 处理服务端返回上报策略
    let trackRules = {}
    if (res?.data?.reportIat) {
        // 上报时间间隔，分钟
        trackRules['reportIat'] = res.data.reportIat
    }
    if (res?.data?.clickMaxIat) {
        // 点击间隔，秒
        trackRules['clickMaxIat'] = res.data.clickMaxIat
    }
    if (res?.data?.osvDisList) {
        // 扣量列表 osv: version[number], dis: percent[number]
        trackRules['osvDis'] = res.data.osvDisList
    }
    localStorage.setItem('trackRules', JSON.stringify(trackRules))
}

export function getTrkOpt() {

}

// adg 广告配置
const idForCode = {
    'vafb': {
        'div-gpt-ad-1715832005224-0': 'briskgamey.com_jk_0516_300x250_1',
        'div-gpt-ad-1715832038184-0': 'briskgamey.com_jk_0516_300x250_2',
        'div-gpt-ad-1715832066318-0': 'briskgamey.com_jk_0516_300x250_3',
        'div-gpt-ad-1715832096284-0': 'briskgamey.com_jk_0516_300x250_4',
    },
    'vfttqz1kr1-idg': {
        'div-gpt-ad-1720087655904-0': 'quizs1.zestfulplay.com_0704_JK_300x250_1',
        'div-gpt-ad-1720087671015-0': 'quizs1.zestfulplay.com_0704_JK_300x250_2',
        'div-gpt-ad-1720087690085-0': 'quizs1.zestfulplay.com_0704_JK_300x250_3',
        'div-gpt-ad-1720087703938-0': 'quizs1.zestfulplay.com_0704_JK_300x250_4'
    },
    'vfttqz1jp2-idg': {
        'div-gpt-ad-1720087624783-0': 'quizs2.zestfulplay.com_0704_JK_300x250_1',
        'div-gpt-ad-1720087600855-0': 'quizs2.zestfulplay.com_0704_JK_300x250_2',
        'div-gpt-ad-1720087576075-0': 'quizs2.zestfulplay.com_0704_JK_300x250_3',
        'div-gpt-ad-1720087548439-0': 'quizs2.zestfulplay.com_0704_JK_300x250_4'
    },
    'vfttqz1au3-idg': {
        'div-gpt-ad-1720087842120-0': 'quizs3.zestfulplay.com_0704_JK_300x250_1',
        'div-gpt-ad-1720087807918-0': 'quizs3.zestfulplay.com_0704_JK_300x250_2',
        'div-gpt-ad-1720087785106-0': 'quizs3.zestfulplay.com_0704_JK_300x250_3',
        'div-gpt-ad-1720087763626-0': 'quizs3.zestfulplay.com_0704_JK_300x250_4',
    }
}

// adg 广告配置
var idForClass = {
    'vafb': {
        'div-gpt-ad-1715832005224-0': 'ad1',
        'div-gpt-ad-1715832038184-0': 'ad2',
        'div-gpt-ad-1715832066318-0': 'ad3',
        'div-gpt-ad-1715832096284-0': 'ad4',
    },
    'vfttqz1kr1-idg': {
        'div-gpt-ad-1720087655904-0': 'ad1',
        'div-gpt-ad-1720087671015-0': 'ad2',
        'div-gpt-ad-1720087690085-0': 'ad3',
        'div-gpt-ad-1720087703938-0': 'ad4'
    },
    'vfttqz1jp2-idg': {
        'div-gpt-ad-1720087624783-0': 'ad1',
        'div-gpt-ad-1720087600855-0': 'ad2',
        'div-gpt-ad-1720087576075-0': 'ad3',
        'div-gpt-ad-1720087548439-0': 'ad4'
    },
    'vfttqz1au3-idg': {
        'div-gpt-ad-1720087842120-0': 'ad1',
        'div-gpt-ad-1720087807918-0': 'ad2',
        'div-gpt-ad-1720087785106-0': 'ad3',
        'div-gpt-ad-1720087763626-0': 'ad4',
    }
}

// ads && adg 广告配置
const indexForCode = {
    'vafb': {
        'ad1': 'briskgamey.com_jk_0516_300x250_1',
        'ad2': 'briskgamey.com_jk_0516_300x250_2',
        'ad3': 'briskgamey.com_jk_0516_300x250_3',
        'ad4': 'briskgamey.com_jk_0516_300x250_4',
    },
    'vettauqz': {
        'ad1': 'whistleh.com_05301_300X250_1',
        'ad2': 'whistleh.com_05301_300X250_2',
        'ad3': 'whistleh.com_05301_300X250_3',
        'ad4': 'whistleh.com_05301_300X250_4',
    },
    'vettauqz2': {
        'ad1': 'whistleh.com_05302_300X250_1',
        'ad2': 'whistleh.com_05302_300X250_2',
        'ad3': 'whistleh.com_05302_300X250_3',
        'ad4': 'whistleh.com_05302_300X250_4',
    },
    'vettkrqz3': {
        'ad1': 'whistleh.com_05303_300X250_1',
        'ad2': 'whistleh.com_05303_300X250_2',
        'ad3': 'whistleh.com_05303_300X250_3',
        'ad4': 'whistleh.com_05303_300X250_4',
    },
    'vettcaqz4': {
        'ad1': 'whistleh.com_05304_300X250_1',
        'ad2': 'whistleh.com_05304_300X250_2',
        'ad3': 'whistleh.com_05304_300X250_3',
        'ad4': 'whistleh.com_05304_300X250_4',
    },
    'vettsaqz5': {
        'ad1': 'whistleh.com_06121_300X250_1',
        'ad2': 'whistleh.com_06121_300X250_2',
        'ad3': 'whistleh.com_06121_300X250_3',
        'ad4': 'whistleh.com_06121_300X250_4',
    },
    'vettaeqz6': {
        'ad1': 'whistleh.com_06122_300X250_1',
        'ad2': 'whistleh.com_06122_300X250_2',
        'ad3': 'whistleh.com_06122_300X250_3',
        'ad4': 'whistleh.com_06122_300X250_4',
    },
    'vettbrqz7': {
        'ad1': 'whistleh.com_06123_300X250_1',
        'ad2': 'whistleh.com_06123_300X250_2',
        'ad3': 'whistleh.com_06123_300X250_3',
        'ad4': 'whistleh.com_06123_300X250_4',
    },
    'vetttwqz8': {
        'ad1': 'whistleh.com_0506_300X250_1',
        'ad2': 'whistleh.com_0506_300X250_2',
        'ad3': 'whistleh.com_0506_300X250_3',
        'ad4': 'whistleh.com_0506_300X250_4',
    },
    'vgttqz2kr1': {
        'ad1': 'normallno.com_06211_300X250_1',
        'ad2': 'normallno.com_06211_300X250_2',
        'ad3': 'normallno.com_06211_300X250_3',
        'ad4': 'normallno.com_06211_300X250_4'
    },
    'vgttqz2jp2': {
        'ad1': 'normallno.com_06212_300X250_1',
        'ad2': 'normallno.com_06212_300X250_2',
        'ad3': 'normallno.com_06212_300X250_3',
        'ad4': 'normallno.com_06212_300X250_4'
    },
    'vgttqz2au3': {
        'ad1': 'normallno.com_06213_300X250_1',
        'ad2': 'normallno.com_06213_300X250_2',
        'ad3': 'normallno.com_06213_300X250_3',
        'ad4': 'normallno.com_06213_300X250_4'
    },
    'vgmtgqz2us4': {
        'ad1': 'normallno.com_06271_300X250_1',
        'ad2': 'normallno.com_06271_300X250_2',
        'ad3': 'normallno.com_06271_300X250_3',
        'ad4': 'normallno.com_06271_300X250_4'
    },
    'vfttqz1kr1-idg': {
        'ad1': 'quizs1.zestfulplay.com_0704_JK_300x250_1',
        'ad2': 'quizs1.zestfulplay.com_0704_JK_300x250_2',
        'ad3': 'quizs1.zestfulplay.com_0704_JK_300x250_3',
        'ad4': 'quizs1.zestfulplay.com_0704_JK_300x250_4'
    },
    'vfttqz1jp2-idg': {
        'ad1': 'quizs2.zestfulplay.com_0704_JK_300x250_1',
        'ad2': 'quizs2.zestfulplay.com_0704_JK_300x250_2',
        'ad3': 'quizs2.zestfulplay.com_0704_JK_300x250_3',
        'ad4': 'quizs2.zestfulplay.com_0704_JK_300x250_4'
    },
    'vfttqz1au3-idg': {
        'ad1': 'quizs3.zestfulplay.com_0704_JK_300x250_1',
        'ad2': 'quizs3.zestfulplay.com_0704_JK_300x250_2',
        'ad3': 'quizs3.zestfulplay.com_0704_JK_300x250_3',
        'ad4': 'quizs3.zestfulplay.com_0704_JK_300x250_4',
    }

}

export function adSlotIdForCode(id) {
    const pg = sessionStorage.getItem('pg') || 'vettauqz'
    return idForCode[pg][id]
}

export function adSlotIndexForCode(index) {
    const pg = sessionStorage.getItem('pg') || 'vettauqz'
    return indexForCode[pg][index]
}

export function adSlotIdForClass(id) {
    const pg = sessionStorage.getItem('pg') || 'vettauqz'
    return idForClass[pg][id]
}

// 获取页面事件参数
export function getTrackPageParams() {
    if (!localStorage.getItem('h5Uid')) {
        localStorage.setItem('h5Uid', generateUUID())
    }

    if (!sessionStorage.getItem('sessionId')) {
        sessionStorage.setItem('sessionId', generateUUID())
    }
    return {
        source: 'mbuy',
        h5Uid: localStorage.getItem('h5Uid'),
        sessionId: sessionStorage.getItem('sessionId'),
        // appId: 0, // option
        // appCode: '', // option
        // category: '', // option
        // mkMedia: '', // option 暂不传
        // mkAccountId: 0, // option 暂不传
        // mkAccountCode: '', // option 暂不传
        // mkCampaignId: 0, // option 暂不传
        mkCampaignCode: localStorage.getItem('mkCampaignCode') || '', // option
        // mkLinkId: '', // option
        // mkLinkCode: '', // option
        // adMedia: '', // option
        // adAccountId: 0, // option
        // adAccountCode: '', // option
        language: navigator.language || navigator.userLanguage,
        brand: '', // 暂时传空字符串
        model: '', // 暂时传空字符串
        domain: window.location.hostname,
        url: window.location.href,
        referrer: sessionStorage.getItem('referrer') || '',
        pageName: window.location.href.split('.html')[0].split('/')[window.location.href.split('.html')[0].split('/').length - 1],
        devicePixelRatio: window.devicePixelRatio, // 设备像素比
        deviceMemory: navigator.deviceMemory, // 设备内存
        hardwareConcurrency: navigator.hardwareConcurrency, // 硬件并发数
        languages: navigator.languages.join(','), // 语言集
        vendor: navigator.vendor, // 浏览器供应商
        height: window.innerHeight,
        width: window.innerWidth,
        limitAdType: localStorage.getItem('limit-home') == 1 ? 'limit-home' : (localStorage.getItem('limit-device') == 1 ? 'limit-device' : ''),
    }
}

// 获取广告事件参数
export function getTrackAdParams() {
    if (!localStorage.getItem('h5Uid')) {
        localStorage.setItem('h5Uid', generateUUID())
    }

    if (!sessionStorage.getItem('sessionId')) {
        sessionStorage.setItem('sessionId', generateUUID())
    }
    return {
        source: 'mbuy',
        h5Uid: localStorage.getItem('h5Uid'),
        sessionId: sessionStorage.getItem('sessionId'),
        // appId: 0, // option
        // appCode: '', // option
        // category: '', // option
        // mkMedia: '', // option 暂不传
        // mkAccountId: 0, // option 暂不传
        // mkAccountCode: '', // option 暂不传
        // mkCampaignId: 0, // option 暂不传
        mkCampaignCode: localStorage.getItem('mkCampaignCode') || '', // option
        // mkLinkId: '', // option
        // mkLinkCode: '', // option
        // adMedia: '', // option
        // adAccountId: 0, // option
        // adAccountCode: '', // option
        //
        // adId: 0,
        // adCode: '',
        // adType: '',
        language: navigator.language || navigator.userLanguage,
        brand: '', // 暂时传空字符串
        model: '', // 暂时传空字符串
        domain: window.location.hostname,
        url: window.location.href,
        referrer: sessionStorage.getItem('referrer') || '',
        pageName: window.location.href.split('.html')[0].split('/')[window.location.href.split('.html')[0].split('/').length - 1],
    }
}

// // 获取页面事件参数
export function getTrackUserParams(type, localPixel = '') {
    if (!localStorage.getItem('h5Uid')) {
        localStorage.setItem('h5Uid', generateUUID())
    }

    if (!sessionStorage.getItem('sessionId')) {
        sessionStorage.setItem('sessionId', generateUUID())
    }

    return {
        "source": 'mbuy',
        "event": "userEvent",
        "actionOne": osName + " - " + pixelFlag + ' - ' + localPixel,
        "actionTwo": navigator.userAgent,
        "actionMsg": type,
        "h5Uid": localStorage.getItem('h5Uid'),
        "appUid": "443185c687594d87598d485b4ba140ad",
        "sessionId": localStorage.getItem('sessionId'),
        // "appId": 88,
        // "appCode": "x100games",
        // "category": "game",
        // "mkMedia": "tiktok",
        // "mkAccountId": 10,
        // "mkAccountCode": "12345abcd",
        // "mkCampaignId": 101,
        "mkCampaignCode": localStorage.getItem('mkCampaignCode') || '', // option
        // "mkLinkId": 1001,
        // "mkLinkCode": "abc",
        // "adMedia": "google",
        // "adAccountId": 10,
        // "adAccountCode": "12345abcd",
        "ip": "187.4.27.223",
        "ua": "Mozilla/5.0 (Linux; Android 9; ASUS_X00TDB Build/PKQ1; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/119.0.6045.66 Mobile Safari/537.36",
        "os": "android",
        "osVersion": "10",
        "uaMedia": "1711ec8b-10d6-4947-b2c7-29925b616b1c",
        "country": "BR",
        "city": "beijing",
        "language": "en-US",
        "brand": "vivo",
        "model": "vivo 1920",
        "domain": "www.x100games.com",
        "url": "https://www.x100games.com/home.html?pa=tt_01",
        "referrer": "https://www.baicu.com",
        "pageName": "home",
        "belongAppCode": "2048app"
    }
}

export function addPageShowEvent() {
    let platform = sessionStorage.getItem('pg')
    window.addEventListener("pageshow", function (event) {
        jkConsole('页面 pageshow')
        window.focus();
        if (platform == 'vafb') {
            if (event.persisted) {
                refreshAd()
            }
        }
    })
}

// 获取 n 分钟前的时间戳
export function getTimeStampAgo(n) {
    const currentTimeStamp = Date.now()
    const nMinutesAgoTimeStamp = currentTimeStamp - n * 60 * 1000
    return nMinutesAgoTimeStamp
}

// 获取n-m随机数
export function getRandomNumber(n, m) {
    // 确保 n 和 m 都为正整数
    n = Math.ceil(n)
    m = Math.ceil(m)

    // 生成 n 到 m 之间的随机数
    return Math.floor(Math.random() * (m - n + 1)) + n
}

// 随机取出 n 项
export function getRandomItems(arr, num) {
    if (num > arr.length) {
        throw new Error("num should not be greater than the length of the array");
    }
    const result = [];
    const usedIndices = new Set();
    while (result.length < num) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        if (!usedIndices.has(randomIndex)) {
            usedIndices.add(randomIndex);
            result.push(arr[randomIndex]);
        }
    }
    return result;
}


// 获取 url 参数
export function getUrlParams(url, variable) {
    const query = url.split('#')[0].split('?')[1]
    if (query) {
        const vars = query.split('&')
        for (let i = 0; i < vars.length; i++) {
            const pair = vars[i].split('=')
            if (pair[0] == variable) {
                return pair[1]
            }
        }
        return false
    }
}

export function getParamsStr(url) {
    const query = url.split('#')[0].split('?')[1]
    if (query) {
        return '?' + query
    }
    return ''
}

export function generateUUID() {
    let uuid = '', i, random;
    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
}

// 广告 request 事件上报
export function adRequestTrack(classNameList) {
    if (!classNameList || !classNameList.length) return
    for (let i = 0; i < classNameList.length; i++) {
        let ad = getTrkOpt().adInfo.find(it => it.adCode == adSlotIndexForCode(classNameList[i]))
        trackAdEvent({ ...getTrackAdParams(), event: 'request', ...ad, ...getTrkOpt() })
    }
}

// 判断 homepv
export function checkHomePv() {
    // 记录 home uv，大于 60 次添加 limit-home 标记
    let date = new Date().getDate()
    let month = new Date().getMonth() + 1
    let str = date + '-' + month
    let hUv = localStorage.getItem(str + 'homeUv') || 0
    hUv++
    localStorage.setItem(str + 'homeUv', hUv)
    if (hUv >= 60) {
        localStorage.setItem('limit-home', 1)
    } else {
        localStorage.setItem('limit-home', 0)
    }
}

// 判断 ua
export function checkUa() {
    let ua = navigator.userAgent
    ua = ua.split('open_news')[0].trim()
    const parser = new UAParser();
    const uaObj = parser.setUA(ua).getResult();
    let uaStr = uaObj.browser.name + '-' + uaObj.device.vendor + '-' + uaObj.device.model + '-' + uaObj.engine.name + '-' + uaObj.os.name;
    let lUa = localStorage.getItem('quizUaStr') || ''
    if (lUa && lUa != uaStr) {
        localStorage.setItem('limit-device', 1)
    } else {
        localStorage.setItem('quizUaStr', uaStr)
        localStorage.setItem('limit-device', 0)
    }
}

// 判断 ip
export async function checkIp() {
    let limitIp = localStorage.getItem('limit-ip')
    if (limitIp != 1) {
        const res = await getIpApi()
        let ipList = localStorage.getItem('ipList') ? JSON.parse(localStorage.getItem('ipList')) : []
        if (!ipList.includes(res.ip)) {
            ipList.push(res.ip)
        }
        if (ipList.length > 8) {
            localStorage.setItem('limit-ip', 1)
        } else {
            localStorage.setItem('limit-ip', 0)
        }
        localStorage.setItem('ipList', JSON.stringify(ipList))
    }
}

// 判断点击次数 20 次/天
export function checkClickCount() {
    let date = new Date().getDate()
    let month = new Date().getMonth() + 1
    let str = date + '-' + month
    let quizClick = localStorage.getItem(str + 'quizClick') || 0
    if (quizClick >= 20) {
        localStorage.setItem('limit-click', 1)
    } else {
        localStorage.setItem('limit-click', 0)
    }
}

export function checkHomePage() {
    checkUa()
    // checkIp()
    checkHomePv()
    checkClickCount()
}

export function checkOtherPage() {
    checkUa()
    // checkIp()
    checkClickCount()
}

// 获取限制的字符串
export function getLimitStr() {
    // client limit
    let limitHome = localStorage.getItem('limit-home')
    let limitDevice = localStorage.getItem('limit-device')
    let hardwareConcurrency = getHardwareConcurrency() // limitHc

    // server limit
    let limitSuser = localStorage.getItem('limit-suser')
    let limitSua = localStorage.getItem('limit-sua')
    let limitSip = localStorage.getItem('limit-sip')

    return (limitHome == 1) ? 'limitHome' : (limitDevice == 1) ? 'limitDevice' : (limitSuser == 1) ? 'limitSuser' : (limitSua == 1) ? 'limitSua' : (limitSip == 1) ? 'limitSip' : (hardwareConcurrency < 2 || hardwareConcurrency > 16) ? 'limitHc' : '';
}

// 返回渲染标记 根据返回结果判断是否渲染广告
export function getLimitFlag() {
    let limitFlag = false

    // client limit
    let limitHome = localStorage.getItem('limit-home')
    let limitDevice = localStorage.getItem('limit-device')
    let hardwareConcurrency = getHardwareConcurrency()

    // server limit
    let limitSuser = localStorage.getItem('limit-suser')
    let limitSua = localStorage.getItem('limit-sua')
    let limitSip = localStorage.getItem('limit-sip')

    if (osName.indexOf('iOS') > -1) {
        jkConsole('iOS os')
        limitFlag = true
    }

    if (limitHome == 1 || limitDevice == 1 || (hardwareConcurrency < 2 || hardwareConcurrency > 16)) {
        jkConsole('client limit')
        limitFlag = true
    }
    if (limitSuser == 1 || limitSua == 1 || limitSip == 1) {
        jkConsole('server limit')
        limitFlag = true
    }
    return limitFlag
}

// 返回上报标记，判断是否需要上报 false: 上报，true：不上报
export function checkPixelEvent() {
    let pixelFlag = false
    if (osName.toLowerCase().trim() != 'android') {
        pixelFlag = true
    }

    return pixelFlag
}

// 从 localstorage 获取广告点击次数
export function getAdClickCount() {
    let date = new Date().getDate()
    let month = new Date().getMonth() + 1
    let str = date + '-' + month
    let quizClick = localStorage.getItem(str + 'quizClick') || 0
    return quizClick
}

// 获取浏览器核数
export function getHardwareConcurrency() {
    return navigator.hardwareConcurrency || 1
}

// 刷新广告
let limit = 0
export function refreshAd(time = 0) {
    jkConsole('刷新广告')
    limit++
    setTimeout(() => {
        if (googletag && googletag.pubads && typeof googletag.pubads == 'function') {
            googletag.pubads().refresh()
            jkConsole('已刷新')
        } else if (limit <= 3) {
            jkConsole('待刷新')
            refreshAd(300)
        }
    }, time)
}

/**
 * 1. 监听 document 的 blur 事件，进行广告点击、tt 上报
 * 触发 blur 只能代表是点击了 iframe 内部，并不代表一定会跳转
 * 记录当前 timestamp，
 */
let curTimeStamp = 0;
let curClickAdObj = {};
export function blurEvent() {
    var e = document.activeElement
    // todo adg 广告需要处理 parentNode
    jkConsole("document.blur", $(e)[0].parentNode?.parentNode?.parentNode?.id, e.tagName)
    let id = $(e)[0].parentNode?.parentNode?.parentNode?.id || ''
    // 插屏广告 没有 id
    if (e && "iframe" === e.tagName.toLowerCase() && id) {
        curTimeStamp = new Date().getTime()
        curClickAdObj = { id }
        setTimeout(() => {
            window.focus();
        }, 0)
    }
}

/**
 * 2. 添加 visibitychanged 事件
 * 判断timestamp，相近则进行上报 (清空信息)
 */
export function addVisibitychangedEvent() {
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'hidden') {
            // 判断当前时间戳和 curTimeStamp 的间隔，小于 5s 进行上报
            var curT = new Date().getTime()
            if (curT - curTimeStamp < 5000 && curClickAdObj && curClickAdObj.id) {
                curTimeStamp = 0
                // 进行上报
                pixelEvent(1)
                const ad = getTrkOpt().adInfo.find(it => it.adCode == adSlotIndexForCode(curClickAdObj.id))
                trackUserApi(getTrackUserParams('before'))
                trackAdEvent({ ...getTrackAdParams(), event: 'click', ...ad, ...getTrkOpt() })

                // 点击次数限制
                var overlay = $('#' + curClickAdObj.id + ' .' + curClickAdObj.id + '-pop');
                if (overlay.css('display') === 'none' || overlay.css('display') === '') {
                    let date = new Date().getDate()
                    let month = new Date().getMonth() + 1
                    let str = date + '-' + month
                    let quizClick = localStorage.getItem(str + 'quizClick') || 0
                    quizClick++
                    localStorage.setItem(str + 'quizClick', quizClick)
                    // let cc = getAdClickCount()
                    jkConsole('点击次数' + quizClick)
                    // 点击次数超过20次，显示遮罩
                    if (quizClick >= 20) {
                        jkConsole(curClickAdObj.id, '点击超过20次，开始屏蔽')
                        $('.ad-pop').css('display', 'block')
                    }
                }
            }
        } else {
            setTimeout(() => {
                window.focus();
                jkConsole('页面 visibilitychange')
            }, 0)
        }
        curTimeStamp = 0
        curClickAdObj = {}
    })
    $('a').on('click', function (event) {
        curTimeStamp = 0
        curClickAdObj = {}
    })
}

// ----------------------------google ad sense 广告监听方法-----------------------------
// 监听广告容器属性变化 判断是否加载
let observer = null
export function listenerAdAttr(idList, doAdInView = true, cb = new Function()) {
    if (doAdInView) {
        listenerAdInView()
    }
    let $adArr = []
    for (let i = 0; i < idList.length; i++) {
        $adArr.push($('#' + idList[i] + ' .adsbygoogle'))
    }

    var resizeObserver = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-ad-status') {
                var targetElement = mutation.target;
                var attributeName = mutation.attributeName;
                var newValue = $(targetElement).attr(attributeName);
                jkConsole('广告加载,', attributeName, newValue, mutation.target.parentNode.id)
                cb(mutation.target.parentNode.id, newValue)
                if (newValue == 'filled') {
                    jkConsole('广告加载完成')
                    observer.observe($('#' + mutation.target.parentNode.id)[0]);
                }
            }
        }
    })
    var config = {
        attributes: true, // 监听属性变化
        attributeFilter: ['data-ad-status'], // 指定要监听的属性
        subtree: false, // 不需要监听子节点
        attributeOldValue: true // 保留旧值
    };
    for (let i = 0; i < $adArr.length; i++) {
        resizeObserver.observe($adArr[i][0], config)
    }
}

// 监控广告是否入屏
function listenerAdInView(cb = new Function()) {
    let limitClick = localStorage.getItem('limit-click')
    observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                observer.unobserve(entry.target);
                jkConsole('广告显示！', entry)
                if (entry.target.id && limitClick != 1) {
                    $('.' + entry.target.id + '-pop').css('display', 'none')
                    const ad = getTrkOpt().adInfo.find(it => it.adCode == adSlotIndexForCode(entry.target.id))
                    trackAdEvent({ ...getTrackAdParams(), event: 'show', ...ad, ...getTrkOpt() })
                    pixelEvent(2)
                    cb()
                }
            }
        });
    }, {
        threshold: 0.6
    });
}

// ----------------------------google ad manage 广告监听方法-----------------------------
// 添加广告show的事件监听
export function listenerAdShow() {
    if (!googletag) {
        jkConsole('googletag is undefined!')
        return
    }
    googletag.cmd.push(function () {
        googletag.pubads().addEventListener('impressionViewable', event => {
            showCallback(event)
        })
    })
}

// 广告显示
function showCallback(event) {
    let limitClick = localStorage.getItem('limit-click')
    var slotId = event.slot.getSlotElementId()
    var adCode = adSlotIdForCode(slotId)
    // 广告显示后再隐藏遮罩
    var className = adSlotIdForClass(slotId)
    if (className && limitClick != 1) {
        $('.' + className + '-pop').css('display', 'none')
    }
    if (adCode) {
        jkConsole('广告显示！', slotId, adCode)
        const ad = getTrkOpt().adInfo.find(it => it.adCode == adCode)
        trackAdEvent({ ...getTrackAdParams(), event: 'show', ...ad, ...getTrkOpt() })
        pixelEvent(2)
    }
}

// pixel 上报
export function pixelEvent(type = 1) {
    jkConsole('pixel event type:', type)
    const pg = sessionStorage.getItem('pg')
    if ((osName === undefined) || pixelFlag) {
        trackUserApi(getTrackUserParams('prevent'))
        jkConsole('The os does not exist or is not Android')
        return
    }

    let tfc = localStorage.getItem('tfc')
    if (type == 1 && !tfc) {
        // 点击广告
        jkConsole('ttq search')
        // 通过服务端返回 判断是否需要上报 pixel search
        if (checkWhetherPixelSearch()) {
            let strLimit = getLimitStr()
            if (pg == 'vgmtgqz2us4') {
                dataLayer.push({ 'event': 'adclick' });
                trackPageEvent({ ...getTrackPageParams(), event: 'pixelSearch', ...getTrkOpt(), limitAdType: strLimit })
            } else {
                ttq.track('Search', {
                    content_type: 'product', contents: [{ content_id: '1001', content_name: 'ads' }],
                    value: 0.01, currency: 'USD'
                })
                trackUserApi(getTrackUserParams('after'))
                trackPageEvent({ ...getTrackPageParams(), event: 'pixelSearch', ...getTrkOpt(), limitAdType: strLimit })
            }

        } else {
            trackUserApi(getTrackUserParams('discontent'))
        }

    } else if (type == 2) {
        // 广告显示
        if (pg != 'vgmtgqz2us4') {
            ttq.track('Contact', {
                content_type: 'product', contents: [{ content_id: '1001', content_name: 'ads' }],
                value: 0.01, currency: 'USD'
            })
        }
    } else if (type == 3) {
        // 开始答题
        if (pg != 'vgmtgqz2us4') {
            ttq.track('ClickButton')
        }
    }
}

// 根据服务端返回策略 判断是否需要上报 pixel search
function checkWhetherPixelSearch() {
    // 服务端返回策略
    let trackRulesStr = localStorage.getItem('trackRules')
    let trackRules = {}
    if (trackRulesStr) {
        trackRules = JSON.parse(trackRulesStr)
    }
    // 获取本地存储的策略数据
    let clientRulesStr = localStorage.getItem('clientRules')
    let clientRules = {
        lastTrack: 0,
        pageMounted: 0,
    }
    if (clientRulesStr) {
        clientRules = JSON.parse(clientRulesStr)
    }

    if (trackRulesStr) {
        // 1. 判断上报间隔时间(服务端返回相应策略 && 时间未超出)
        if (trackRules.reportIat && !isMoreThanSomeMinutes(new Date().getTime(), clientRules.lastTrack, trackRules.reportIat)) {
            localStorage.setItem('rrrrrrrrr', 'reportIat')
            return false
        }
        // 2. 判断是否超出页面加载时间间隔（服务端返回策略 && 事件已经超出）
        if (trackRules.clickMaxIat && isMoreThanSomeMinutes(new Date().getTime(), clientRules.pageMounted, trackRules.clickMaxIat / 60)) {
            localStorage.setItem('rrrrrrrrr', 'clickMaxIat')
            return false
        }
        // 3. 根据扣量列表进行几率渲染（版本<9 || 版本没取到 不传， >=9如果策略里没有按 100%，）
        if (trackRules.osvDis && trackRules.osvDis.length) {
            osVersion = osVersion && osVersion.split('.')[0]
            if (!osVersion || osVersion < 9) {
                localStorage.setItem('rrrrrrrrr', 'osVersion')
                return false
            }
            let findOsv = trackRules.osvDis.find(it => it.osv == osVersion)
            if (findOsv && findOsv.dis) {
                if (!randomBoolean(100 - findOsv.dis)) {
                    localStorage.setItem('rrrrrrrrr', 'random')
                    return false
                }
            }
        }
    }
    clientRules.lastTrack = new Date().getTime()
    localStorage.setItem('clientRules', JSON.stringify(clientRules))
    localStorage.setItem('rrrrrrrrr', 'ok')
    return true
}

function isIntervalMoreThan15Days(timestamp1, timestamp2) {
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);

    const timeDifference = Math.abs(date2 - date1);
    const fifteenDaysInMilliseconds = 15 * 24 * 60 * 60 * 1000;
    return timeDifference > fifteenDaysInMilliseconds;
}

function isMoreThanSomeMinutes(timestamp1, timestamp2, mins) {
    let diff = Math.abs(timestamp1 - timestamp2);
    let someMinutesInMilliseconds = mins * 60 * 1000;
    return diff > someMinutesInMilliseconds;
}

export function setMountedTimeStamp() {
    let clientRulesStr = localStorage.getItem('clientRules')
    let clientRules = {
        lastTrack: 0,
        pageMounted: 0,
    }
    if (clientRulesStr) {
        clientRules = JSON.parse(clientRulesStr)
    }
    clientRules['pageMounted'] = new Date().getTime()

    localStorage.setItem('clientRules', JSON.stringify(clientRules))
}

// 传入返回 true 的概率
function randomBoolean(probability) {
    if (probability < 0 || probability > 100) {
        throw new Error('Probability must be between 0 and 100');
    }
    return Math.random() * 100 < probability;
}

export function jkConsole(...args) {
    let params = window.location.search;
    if (params.indexOf('isDebug=1') > -1) {
        console.log(...args)
    }
}

// 获取 sSign 参数
// sSign.value = '84690df9ed3e895d'
// if(query.value && query.value.indexOf('sSign') > -1) {
//     let sSignStr = query.value.split('sSign=')[1]
//     if(sSignStr && sSignStr.indexOf('&') > -1 ) {
//         sSign.value = sSignStr.split('&')[0]
//     } else if(sSignStr) {
//         sSign.value = sSignStr
//     }
//     jkConsole('sSign', sSign.value)
// }
// quizs.value = quizList[sSign.value] || []

// 获取热门 不带 sSign 参数是热门页
// getQuizApi({
//     "sortAttribute": "iPosition",  //排序字段-iPosition：根据显示位置排序
//     "order": "ascending",  //排序方式-ascending：升序，descending：倒序
//     "currentPage": "1",  //页码
//     "pageSize": "30"   //每页显示条数
// })
// jkConsole('获取热门')

export function checkIdgPop() {
    let curPg = sessionStorage.getItem('pg')
    if (curPg && curPg.indexOf('-idg') > -1) {
        console.log(111111)
        $('.ad-pop').css('display', 'none')
    }
}