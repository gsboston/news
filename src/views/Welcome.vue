<template>
  <Header></Header>
  <div class="welcome">
    <!-- ad1 -->
    <div class="ad-title ad1-title">
      <div class="line"></div><div class="text">ADVERTISEMENT</div><div class="line"></div>
    </div>
    <div id="ad1" class="ad1">
      <div class="ad-pop ad1-pop"></div>
    </div>
    <div class="start-btn-div">
      <p>Click to start your quiz</p>
      <div>
        <div class="btn-bg">
          <a href="index.html" @click=handleStartQuiz($event)>Start to Quiz</a>
          <div class="badge">1</div>
        </div>
        <div class="btn-bg-ani"></div>
      </div>
    </div>
    <!-- ad2 -->
    <div class="ad-title ad2-title">
      <div class="line"></div><div class="text">ADVERTISEMENT</div><div class="line"></div>
    </div>
    <div id="ad2" class="ad2">
      <div class="ad-pop ad2-pop"></div>
    </div>
  </div>
  <Footer></Footer>
  <Sidebar></Sidebar>
</template>

<script setup>
import { onMounted, nextTick, ref } from 'vue'
import Header from '@/component/Header.vue'
import Footer from '../component/Footer.vue'
import Sidebar from '../component/Sidebar.vue'
import { addVisibitychangedEvent, blurEvent, addPageShowEvent, listenerAdAttr, trackPageEvent, getTrkOpt, pixelEvent, listenerAdShow, 
  getTrackPageParams, checkHomePage, getLimitFlag, getLimitStr, setMountedTimeStamp, jkConsole, adgAdArr, checkIdgPop, 
  getUrlParams, getRandomNumber } from '../utils/globalFunction.js'
import { adData } from '../utils/adDataStr.js'

const query = window.location.search;
if (query && query.indexOf('ab=') > -1) {
  // ab 测试
  let abArr = getUrlParams(window.location.href, 'ab')?.split(',')
  let index = getRandomNumber(0, abArr.length - 1)
  sessionStorage.setItem('pg', abArr[index])
} else if (query && query.indexOf('vafb') > -1) {
    sessionStorage.setItem('pg', 'vafb')
} else if (query && query.indexOf('vettauqz2') > -1) {
    sessionStorage.setItem('pg', 'vettauqz2')
} else if (query && query.indexOf('vettkrqz3') > -1) {
    sessionStorage.setItem('pg', 'vettkrqz3')
} else if (query && query.indexOf('vettcaqz4') > -1) {
    sessionStorage.setItem('pg', 'vettcaqz4')
} else if (query && query.indexOf('vettsaqz5') > -1) {
    sessionStorage.setItem('pg', 'vettsaqz5')
} else if (query && query.indexOf('vettaeqz6') > -1) {
    sessionStorage.setItem('pg', 'vettaeqz6')
} else if (query && query.indexOf('vettbrqz7') > -1) {
    sessionStorage.setItem('pg', 'vettbrqz7')
} else if (query && query.indexOf('vetttwqz8') > -1) {
    sessionStorage.setItem('pg', 'vetttwqz8')
} else if (query && query.indexOf('vettauqz') > -1) {
    sessionStorage.setItem('pg', 'vettauqz')
} else if (query && query.indexOf('vgttqz2kr1') > -1) { 
    sessionStorage.setItem('pg', 'vgttqz2kr1')
} else if (query && query.indexOf('vgttqz2jp2') > -1) { 
    sessionStorage.setItem('pg', 'vgttqz2jp2')
} else if (query && query.indexOf('vgttqz2au3') > -1) { 
    sessionStorage.setItem('pg', 'vgttqz2au3')
} else if (query && query.indexOf('vgmtgqz2us4') > -1) { 
    sessionStorage.setItem('pg', 'vgmtgqz2us4')
} else if (query && query.indexOf('vfttqz1kr1-idg') > -1) { 
    sessionStorage.setItem('pg', 'vfttqz1kr1-idg')
} else if (query && query.indexOf('vfttqz1jp2-idg') > -1) { 
    sessionStorage.setItem('pg', 'vfttqz1jp2-idg')
} else if (query && query.indexOf('vfttqz1au3-idg') > -1) { 
    sessionStorage.setItem('pg', 'vfttqz1au3-idg')
} else {
    sessionStorage.setItem('pg', 'vettauqz')
}

// 兼容 webview 引导功能
let tfc = ref(false)
let tfcAdArr = ref([])
if (query && query.indexOf('tfc=jukan') > -1) {
    tfc.value = true 
    localStorage.setItem('tfc', 'jukan')
}

// tcf=tu 禁止点击开始答题
let tfcTu = ref(false)
if (query && query.indexOf('tfc=tu') > -1) {
    tfcTu.value = true
    sessionStorage.setItem('tfctu', '1')
    nextTick(() => {
        $(".ad-pop").remove()
    })
} else {
    sessionStorage.removeItem('tfctu')
}

// check event ua、ip、homepv
checkHomePage()

onMounted(() => {
    let platform = sessionStorage.getItem('pg')
    setMountedTimeStamp()

    let str = getLimitStr()
    trackPageEvent({ ...getTrackPageParams(), event: 'home', ...getTrkOpt(), limitAdType: str })

    addPageShowEvent()
    checkIdgPop()
    // 进行广告渲染（添加广告位代码、广告 request 事件上报、广告点击事件监听、广告显示监听）
    nextTick(() => {
        // 判断渲染标记，决定是否渲染广告
        let limitFlag = getLimitFlag()
        if (limitFlag) return
        // 1. 监听 window 的 blur 事件
        listenerBlur()

        // 2. 添加广告位代码
        $('#ad1').append(adData[platform]['ad1'])
        $('#ad2').append(adData[platform]['ad2'])

        nextTick(() => {
            if (adgAdArr.includes(platform)){

                // =================== 4. adg 广告【加载、显示】监听 ===================
                listenerAdShow()
            } else {
                // =================== 4. ads 广告【加载、显示】监听 ===================
                listenerAdAttr(['ad1', 'ad2'], true, (id, status) => {
                    // 兼容 webview 引导功能
                    if (tfc.value) {
                        jkConsole('-----------webview')
                        tfcAdArr.value.push({id, status})
                        if (tfcAdArr.value.length && tfcAdArr.value.length == 2) {
                            // 广告加载完成，随机取出一个
                            let successArr = tfcAdArr.value.filter((it) => it.status=='filled')
                            if (successArr && successArr.length) {
                                // 调用 window.mobliejk.show() 和 window.mobliejk.guide();
                                let itemAd = getRandomItem(successArr)
                                jkConsole('----------随机到数据为：', itemAd.id, itemAd.status)
                                if (window.mobliejk) {
                                    window.mobliejk.show(JSON.stringify({
                                        "location": itemAd.id,
                                        "adPage": "list",
                                        "adType": "info",
                                        "event": "debug_h5web_ad_show"
                                    }))
                                } else {
                                    jkConsole('window.mobliejk is not defined')
                                }
                                if (window.mobliejk) {
                                    var offset = $('#' + itemAd.id).offset();
                                    var height = $('#' + itemAd.id).outerHeight();
                                    var centerY = offset.top + height / 2;
                                    centerY = centerY.toFixed(0) + ''
                                    window.mobliejk.guide(centerY)
                                } else {
                                    jkConsole('window.mobliejk is not defined')
                                }
                            }
                        } else {
                            jkConsole('no ad show')
                        }
                    }
                })
            }
        })
    })
})

// 监听 document 的 blur 事件，进行广告点击、tt 上报
function listenerBlur() {
    window.removeEventListener("blur", blurEvent)
    setTimeout(() => { window.focus() }, 0)
    window.addEventListener("blur", blurEvent)
    addVisibitychangedEvent()
}

function getRandomItem(arr) {
    if (arr.length === 0) {
        return
    }
    // const randomIndex = Math.floor(Math.random() * arr.length);
    // 暂时只取第一个，0621 修改，如果第一个没加载那就是取第二个
    const randomIndex = 0
    let result = arr.filter(it => it.id == 'ad1')
    if (result && result.length) {
        return result[0]
    }else{
      
        return arr[randomIndex];
    }
}

// 开始答题 上报
function handleStartQuiz(e) {
    if (tfcTu.value) {
        e.preventDefault()
        return
    }
    pixelEvent(3)
    let str = getLimitStr();
    let eventStr = ''
    if (e.isTrusted) {
        jkConsole('手动点击上报')
        eventStr = 'wclick'
    } else {
        jkConsole('自动点击上报')
        eventStr = 'aclick'
    }
    trackPageEvent({
        ...getTrackPageParams(),
        event: eventStr,
        ...getTrkOpt(),
        limitAdType: str
    })
}
</script>

<style lang="less" scoped>
.welcome {
  min-height: calc(100% - 148px);
  padding: 10px;
  .ad-title {
    display: flex;
    align-items: center;
    .line {
      flex-grow: 1;
      height: 1px;
      background-color: #ccc;
    }
    .text {
      color: #999;
      padding: 0 5px;
      font-size: 13px;
    }
  }

  .start-btn-div {
    position: relative;
    p {
      font-size: 15px;
      text-align: center;
    }
    > div {
      position: relative;
      .btn-bg {
        width: 98%;
        height: 45px;
        background: #3175FF;
        margin-top: 15px;
        margin-bottom: 15px;
        margin-left: 1%;
        font-size: 20px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 10;

        a {
          z-index: 11;
          color: #fff;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 600;
        }

        .badge {
          position: absolute;
          top: -12px;
          right: -8px;
          width: 20px;
          height: 20px;
          background-color: red;
          color: white;
          border-radius: 50%;
          font-size: 13px;
          font-weight: 600;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .btn-bg-ani {
        position: absolute;
        width: 98%;
        height: 45px;
        left: 1%;
        z-index: 9;
        border-radius: 8px;
        animation: breathingAnimation 1.4s infinite;
        background: #3175FF;
        top: 0;
      }
    }
  }
}

@keyframes breathingAnimation {
  0% {
    box-shadow: 0 0 0 0 #3b5998;
  }
  50% {
    box-shadow: 0 0 0 14px rgba(29, 89, 152, 0);
  }
  100% {
    box-shadow: 0 0 0 14px rgba(59, 89, 152, 0);
  }
}

.index {
  min-height: calc(100% - 148px);
  // padding: 10px;

  .ad-title {
    display: flex;
    align-items: center;
    // margin-top: 10px;
    .line {
      flex-grow: 1;
      height: 1px;
      background-color: #ccc;
    }
    .text {
      color: #999;
      padding: 0 5px;
      font-size: 13px;
    }
  }

  .list-item {
    margin-top: 10px;
    // border-top: 1px solid #ccc;
    position: relative;
    padding-bottom: 10px;
    a {
      img {
        width: 100%;
      }
      p {
        font-size: 20px;
        font-weight: 600;
        padding: 0 10px;
        color: #333;
      }
    }
    .hot-icon {
      font-size: 12px;
      font-weight: 600;
      position: absolute;
      left: 5px;
      top: 5px;
      background: #f90000;
      color: #fff;
      border-radius: 50%;
      width: 28px;
      height: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .item-line {
      margin-top: 10px;
      width: 100%;
      height: 0;
      border-top: 1px solid #ccc;
    }
  }
  .list-item.is-hot {
    border: 4px solid #f90000;
  }
}

.ad1,.ad2 {
  min-height: 150px;
  position: relative;
  .ad-pop{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 8888;
    display: block;
    margin: -10px -10px 0 -10px;
  }
}
</style>
