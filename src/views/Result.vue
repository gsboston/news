<template>
  <Header></Header>
  <div class="result">
    <div v-show="!loading">
      <!-- ad1 -->
      <div class="ad-title ad1-title">
        <div class="line"></div><div class="text">ADVERTISEMENT</div><div class="line"></div>
      </div>
      <div class="ad1" id="ad1">
        <div class="ad-pop ad1-pop"></div>
      </div>
      <!-- result -->
      <div class="result-container">
        <img v-if="result?.coverImg" :src="'https://quizs.briskgamey.com/common/image/answer/' + result?.coverImg"/>
        <p>{{ result?.rExplain }}</p>
      </div>
      <!-- ad2 -->
      <div class="ad-title ad2-title">
        <div class="line"></div><div class="text">ADVERTISEMENT</div><div class="line"></div>
      </div>
      <div class="ad2" id="ad2">
        <div class="ad-pop ad2-pop"></div>
      </div>
      <!-- mid-text -->
      <div class="mid-text">
        <div class="mid-text-btn">
          <a :href="'detail.html' + query">Test again</a>
        </div>
        <div class="mid-text-btn"><a href="index.html">Home</a></div>
      </div>
    </div>
    <!-- 加载结果 -->
    <div class="loading-result" v-show="loading">
      <p>Wait a moment,the picture is uploading.</p>
      <p>We won't save it,it only used for quizs.</p>
      <p>Your result is coming soon,wait a moment...</p>
      <div class="loader">Loading...</div>
    </div>
    <!-- 底部推荐 -->
    <div class="tj-container">
      <div class="mid-text-btn2">You Might Like</div>
      <div class="mid-text-line"></div>
      <!-- ad3 -->
      <div class="ad-title ad3-title">
        <div class="line"></div><div class="text">ADVERTISEMENT</div><div class="line"></div>
      </div>
      <div class="ad3" id="ad3">
        <div class="ad-pop ad3-pop"></div>
      </div>
      <template v-for="(item, index) in hotList" :key="index">
        <div class="list-item">
          <a :href="'detail.html?qSign=' + item.qSign">
            <img :src="'https://quizs.briskgamey.com/common/image/theme' + item.coverImg"/>
            <p class="two-lines-ellipsis">{{ item.qName }}</p>
          </a>
          <div class="item-line"></div>
        </div>
      </template>
    </div>
  </div>
  <Footer></Footer>
  <Sidebar></Sidebar>
</template>

<script setup>
import { ref, onMounted, reactive, nextTick, watch} from 'vue'
import Header from '@/component/Header.vue'
import Footer from '../component/Footer.vue'
import Sidebar from '../component/Sidebar.vue'
import { addVisibitychangedEvent, blurEvent, listenerAdAttr, addPageShowEvent, getParamsStr, getRandomNumber, listenerAdShow,
   checkOtherPage, getLimitFlag, setMountedTimeStamp, jkConsole, adgAdArr, checkIdgPop } from '../utils/globalFunction'
import { getResultApi } from '../api/common.js'
import { hotList } from '../cacheData/hot.js'
import { adData } from '../utils/adDataStr.js'

const query = ref(getParamsStr(window.location.href))
let result = reactive({})
const loading = ref(true)
const qSign = ref('')
const waitApi = ref(false)
const platform = sessionStorage.getItem('pg')

// check event ua、ip
checkOtherPage()

watch(loading, (newValue, oldValue) => {
  if(!newValue) {
    nextTick(() => {
      // 判断渲染标记，决定是否渲染广告
      let limitFlag = getLimitFlag()
      if(!limitFlag) {
        $('#ad1').append(adData[platform]['ad1'])
        $('#ad2').append(adData[platform]['ad2'])
        nextTick(() => {
          if(!adgAdArr.includes(platform)) {
            listenerAdAttr(['ad1', 'ad2'], false)
          }
        })
      }
    })
  }
})

onMounted(() => {
  setMountedTimeStamp()
  // 通过 pageshow 事件判断是否来自缓存（后退操作）
  addPageShowEvent()

  // 判断是否显示结果
  checkShowLoading(4000)

  // 获取 sSign 参数
  qSign.value = 'c7900a403a18e82d'
  if (query.value && query.value.indexOf('qSign') > -1) {
    const qSignStr = query.value.split('qSign=')[1]
    if (qSignStr && qSignStr.indexOf('&') > -1) {
      qSign.value = qSign.value.split('&')[0]
    } else if (qSignStr) {
      qSign.value = qSignStr
    }
  }

  // 请求结果数据
  getResult(showResult)

  // 进行广告渲染（添加广告位代码、广告 request 事件上报、广告点击事件监听、广告显示监听）
  nextTick(() => {
    // 判断渲染标记，决定是否渲染广告
    let limitFlag = getLimitFlag()
    if(!limitFlag) {
      // 1. 通过 document.blur 事件监控广告点击
      listenerBlur()

      // 2. 添加广告位代码
      $('#ad3').append(adData[platform]['ad3'])
      
      // 3. 监听广告加载
      nextTick(() => {
        if(adgAdArr.includes(platform)) {
          // adg 广告【加载、显示】监听
          checkIdgPop()
          listenerAdShow()
        } else {
          // ads 广告【加载、显示】监听
          listenerAdAttr(['ad3'])
        }
      })
    }
  })
})

// 监听 document 的 blur 事件，进行广告点击、tt 上报
function listenerBlur() {
  window.removeEventListener("blur", blurEvent)
  setTimeout(() => { window.focus() }, 0)
  window.addEventListener("blur", blurEvent)
  addVisibitychangedEvent()
}

// 获取结果
async function getResult(cb) {
  const res = await getResultApi({
    qSign: qSign.value
  })
  cb(res.data)
}

// 显示结果
function showResult(data) {
  if (data && data.length) {
    const index = getRandomNumber(0, data.length - 1)
    result = data[index]
  } else {
    jkConsole('Failed to obtain results')
  }
  waitApi.value = true
}

// 判断结果是否准备好
function checkShowLoading(timeOut) {
  setTimeout(() => {
    if (waitApi.value) {
      loading.value = false
    } else {
      checkShowLoading(1000)
    }
  }, timeOut)
}
</script>

<style lang="less" scoped>
.result {
  min-height: calc(100% - 148px);
  padding: 10px;

  .ad-title {
    display: flex;
    align-items: center;
    // margin-left: -10px;
    // margin-right: -10px;
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

  .result-container {
    img {
      width: 100%;
    }
    p {
      font-size: 14px;
      margin-top: 15px;
      margin-bottom: 15px;
    }
  }

  .mid-text {
    .mid-text-btn {
      margin-top: 10px;
      color: #333;
      width: 100%;
      height: 30px;
      background: #fff;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid #999;
      font-weight: 600;
      a {
        color: #333;
      }
    }
    p {
      font-size: 13px;
      margin-top: 30px;
    }
    .mid-text-btn2 {
      width: 100%;
      height: 45px;
      margin-top: 25px;
      background-image: linear-gradient(90deg, #ff7c59 0, #ffb431 100%),
        linear-gradient(#fc4260, #fc4260);
      color: #fff;
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .mid-text-line {
      width: 100%;
      border-top: 1px solid #ccc;
      margin-top: 15px;
      margin-bottom: 5px;
    }
  }

  .tj-container {
    width: 100%;
    .mid-text-btn2 {
      width: calc(100% + 20px);
      height: 45px;
      margin-top: 25px;
      background-image: linear-gradient(90deg, #ff7c59 0, #ffb431 100%),
        linear-gradient(#fc4260, #fc4260);
      color: #fff;
      font-size: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: -10px;
      margin-right: -10px;
    }
    .mid-text-line {
      width: calc(100% + 20px);
      border-top: 1px solid #ccc;
      margin-left: -10px;
      margin-right: -10px;
      margin-top: 15px;
      margin-bottom: 5px;
    }
    .list-item {
      margin-top: 10px;
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
      .item-line {
        margin-top: 10px;
        width: 100%;
        height: 0;
        border-top: 1px solid #ccc;
      }
    }
  }

  .loading-result {
    p {
      font-size: 13px;
      text-align: center;
      margin-top: 20px;
    }
    .loader {
      margin: 100px auto;
      font-size: 25px;
      width: 1em;
      height: 1em;
      border-radius: 50%;
      position: relative;
      text-indent: -9999em;
      -webkit-animation: load5 1.1s infinite ease;
      animation: load5 1.1s infinite ease;
      -webkit-transform: translateZ(0);
      -ms-transform: translateZ(0);
      transform: translateZ(0);
    }
  }
}

.ad1, .ad2, .ad3 {
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

.two-lines-ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2; /* 显示两行 */
  line-height: 1.5em; /* 设置行高，确保两行文本显示正常 */
}

@keyframes load5 {
  0%,
  100% {
    box-shadow: 0em -2.6em 0em 0em #058af0,
      1.8em -1.8em 0 0em rgba(5, 138, 240, 0.2),
      2.5em 0em 0 0em rgba(5, 138, 240, 0.2),
      1.75em 1.75em 0 0em rgba(5, 138, 240, 0.2),
      0em 2.5em 0 0em rgba(5, 138, 240, 0.2),
      -1.8em 1.8em 0 0em rgba(5, 138, 240, 0.2),
      -2.6em 0em 0 0em rgba(5, 138, 240, 0.5),
      -1.8em -1.8em 0 0em rgba(5, 138, 240, 0.7);
  }

  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(5, 138, 240, 0.7),
      1.8em -1.8em 0 0em #058af0, 2.5em 0em 0 0em rgba(5, 138, 240, 0.2),
      1.75em 1.75em 0 0em rgba(5, 138, 240, 0.2),
      0em 2.5em 0 0em rgba(5, 138, 240, 0.2),
      -1.8em 1.8em 0 0em rgba(5, 138, 240, 0.2),
      -2.6em 0em 0 0em rgba(5, 138, 240, 0.2),
      -1.8em -1.8em 0 0em rgba(5, 138, 240, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(5, 138, 240, 0.5),
      1.8em -1.8em 0 0em rgba(5, 138, 240, 0.7), 2.5em 0em 0 0em #058af0,
      1.75em 1.75em 0 0em rgba(5, 138, 240, 0.2),
      0em 2.5em 0 0em rgba(5, 138, 240, 0.2),
      -1.8em 1.8em 0 0em rgba(5, 138, 240, 0.2),
      -2.6em 0em 0 0em rgba(5, 138, 240, 0.2),
      -1.8em -1.8em 0 0em rgba(5, 138, 240, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(5, 138, 240, 0.2),
      1.8em -1.8em 0 0em rgba(5, 138, 240, 0.5),
      2.5em 0em 0 0em rgba(5, 138, 240, 0.7), 1.75em 1.75em 0 0em #058af0,
      0em 2.5em 0 0em rgba(5, 138, 240, 0.2),
      -1.8em 1.8em 0 0em rgba(5, 138, 240, 0.2),
      -2.6em 0em 0 0em rgba(5, 138, 240, 0.2),
      -1.8em -1.8em 0 0em rgba(5, 138, 240, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(5, 138, 240, 0.2),
      1.8em -1.8em 0 0em rgba(5, 138, 240, 0.2),
      2.5em 0em 0 0em rgba(5, 138, 240, 0.5),
      1.75em 1.75em 0 0em rgba(5, 138, 240, 0.7), 0em 2.5em 0 0em #058af0,
      -1.8em 1.8em 0 0em rgba(5, 138, 240, 0.2),
      -2.6em 0em 0 0em rgba(5, 138, 240, 0.2),
      -1.8em -1.8em 0 0em rgba(5, 138, 240, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(5, 138, 240, 0.2),
      1.8em -1.8em 0 0em rgba(5, 138, 240, 0.2),
      2.5em 0em 0 0em rgba(5, 138, 240, 0.2),
      1.75em 1.75em 0 0em rgba(5, 138, 240, 0.5),
      0em 2.5em 0 0em rgba(5, 138, 240, 0.7), -1.8em 1.8em 0 0em #058af0,
      -2.6em 0em 0 0em rgba(5, 138, 240, 0.2),
      -1.8em -1.8em 0 0em rgba(5, 138, 240, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(5, 138, 240, 0.2),
      1.8em -1.8em 0 0em rgba(5, 138, 240, 0.2),
      2.5em 0em 0 0em rgba(5, 138, 240, 0.2),
      1.75em 1.75em 0 0em rgba(5, 138, 240, 0.2),
      0em 2.5em 0 0em rgba(5, 138, 240, 0.5),
      -1.8em 1.8em 0 0em rgba(5, 138, 240, 0.7), -2.6em 0em 0 0em #058af0,
      -1.8em -1.8em 0 0em rgba(5, 138, 240, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(5, 138, 240, 0.2),
      1.8em -1.8em 0 0em rgba(5, 138, 240, 0.2),
      2.5em 0em 0 0em rgba(5, 138, 240, 0.2),
      1.75em 1.75em 0 0em rgba(5, 138, 240, 0.2),
      0em 2.5em 0 0em rgba(5, 138, 240, 0.2),
      -1.8em 1.8em 0 0em rgba(5, 138, 240, 0.5),
      -2.6em 0em 0 0em rgba(5, 138, 240, 0.7), -1.8em -1.8em 0 0em #058af0;
  }
}
</style>
