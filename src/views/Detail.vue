<template>
  <Header></Header>
  <div class="index">
    <div class="title-img">
      <p>{{curObj.title}}</p>
      <img v-if="curIndex!=16 && curIndex!=15 && curIndex!=17" :src="'http://p1-pixel.com/image/' + (curIndex - 0 + 1) + '.jpg'" />
    </div>
    <div class="content">
      <div class="content-item" v-for="(item, index) in curObj.list" :key="index">
        <p class="item-title" v-if="item.title">{{item.title}}</p>
        <p class="item-content" v-if="item.content">{{item.content}}</p>
      </div>
    </div>
    <div v-if="curIndex!=15 && curIndex!=16 && curIndex!=17">
      <div class="dashed-line-container">
        <div class="dashed-line"></div>
        <div class="text">Recommend</div>
        <div class="dashed-line"></div>
      </div>

    
      <template  v-for="(item, index) in list" :key="index">
        <div v-if="item" class="list-item">
          <a @click="handleJumpPage" :href="'detail.html?index=' + item.index">
            <div class="div-img">
              <img :src="'http://p1-pixel.com/image/' + (item.index + 1) + '.jpg'" />
            </div>
            <div>
              <p class="two-lines-ellipsis">{{ item.title }}</p>
              <p class="two-lines-ellipsis news-content">{{ item.content }}</p>
            </div>
          </a>
        </div>
      </template>
    </div>
  </div>

 
  <Footer></Footer>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount, onUnmounted } from 'vue'
import Header from '@/component/Header.vue'
import Footer from '../component/Footer.vue'
import { getUrlParams, getRandomNumber, getRandomItems } from '../utils/globalFunction.js'
import { news } from '../cacheData/news.js'

const query = window.location.search;
const list = ref([])
const type = ref('home')
const pageTitle = ref('Home')
const curIndex = ref(-1)
const curObj = ref({})
const newsIndex = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,21,22,23,24,25]
const nr = ref(localStorage.getItem('needRandom'))

onMounted(() => {
 
  if(!nr.value && query && query.indexOf('index=') > -1) {
    curIndex.value = getUrlParams(window.location.href, 'index')
    curObj.value = news[curIndex.value]
    pageTitle.value = type.value
    localStorage.setItem('needRandom', '1')
  } else {
    let i = getRandomNumber(0, newsIndex.length)
    curIndex.value = newsIndex[i]
    curObj.value = news[curIndex.value]
  }

  let randomItems = getRandomItems(newsIndex, 3)

  list.value = [news[randomItems[0]], news[randomItems[1]], news[randomItems[2]]]
  console.log(list.value, type.value)
  
  // 进行广告渲染
  nextTick(() => {
  
  })
})

function handleJumpPage(){
  localStorage.removeItem('needRandom')
}

onBeforeUnmount(() => {
  localStorage.removeItem('needRandom')
})


</script>

<style lang="less" scoped>
.index{
  padding-bottom: 20px;
}

.title-img{
  margin-top: 10px;
  
  img{
    width: 100%;
    margin-top: 20px;
  }
  p{
    font-size: 19px;
    font-weight: 600;
    text-align: center;
  }
}

.content{
  font-size: 15px;
  color: #666;
  padding-bottom: 20px;
  .item-title{
    font-size: 20px;
    color: #111;
    margin-top: 10px;
  }
  .item-content{
    margin-top: 10px;
  }
}

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
