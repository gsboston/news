<template>
  <Header></Header>
  <div class="index">
    <div class="dashed-line-container">
      <div class="dashed-line"></div>
      <div class="text">{{ pageTitle.replaceAll('%20',' ') }}</div>
      <div class="dashed-line"></div>
    </div>
    <template v-for="(item, index) in list" :key="index">
      <div v-if="item" class="list-item">
        <a v-if="item.type!='AboutUs' && item.type!='PrivacyPolicy' && item.type!='TermsofUse'"
         :href="'detail.html?index=' + item.index">
          <div class="div-img">
            <img :src="'http://p1-pixel.com/image/' + (item.index + 1) + '.jpg'" />
          </div>
          <div>
            <p class="two-lines-ellipsis">{{ item.title }}</p>
            <p class="two-lines-ellipsis news-content">{{ item.list[0].content }}</p>
          </div>
        </a>
        <a v-else>
          <div>
            <p class="two-lines-ellipsis">{{ item.title }}</p>
            <p class="news-content">{{ item.content }}</p>
          </div>
        </a>
      </div>
    </template>
  </div>
  <Footer></Footer>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import Header from '@/component/Header.vue'
import Footer from '../component/Footer.vue'
import { getUrlParams } from '../utils/globalFunction.js'
import { news } from '../cacheData/news.js'

const query = window.location.search;
const list = ref([])
const type = ref('home')
const pageTitle = ref('Home')

onMounted(() => {
  localStorage.removeItem('needRandom')
  if(query && query.indexOf('type=') > -1) {
    type.value = getUrlParams(window.location.href, 'type').replaceAll('%20','')
    list.value = news.filter(it => it.type == type.value)
    pageTitle.value = type.value
  } else {
    type.value = 'home'
    // 1，2，7，8，13，14
    list.value = [ news[0], news[1], news[6], news[7], news[12], news[13] ]
  }
  console.log(list.value, type.value)
  
  // 进行广告渲染
  nextTick(() => {})
})

</script>

<style lang="less" scoped>
.dashed-line-container {
  display: flex;
  align-items: center;
  text-align: center;
}
.dashed-line {
  flex-grow: 1;
  height: 1px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="15" height="1"><line x1="0" y1="0" x2="8" y2="0" stroke="%23444" stroke-width="3"/></svg>') repeat-x;
}
.text {
  margin: 0 10px;
  white-space: nowrap;
  font-size: 18px;
  font-weight: 600;
}

.index {
  min-height: calc(100% - 98px);
  // padding: 10px;
  padding-left: 15px;
  padding-right: 15px;

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
      display: flex;
      div{

      }
      .div-img{
        width: 90px;
        height: 90px;
        img {
          width: 90px;
          height: 90px;
          object-fit: cover;
          border-radius: 10px;
        }
      }
      p {
        font-size: 16px;
        font-weight: 600;
        padding: 0 10px;
        color: #333;
      }
      .news-content{
        font-size: 12px;
        color: #999;
        margin-top: 6px;
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

.two-lines-ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2; /* 显示两行 */
  line-height: 1.5em; /* 设置行高，确保两行文本显示正常 */
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
</style>
