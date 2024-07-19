<template>
  <div class="header">
    <a class="header-home" :href="'index.html'">
      <img class="header-logo" src="../assets/img/home-btn.png" />
    </a>
    <a class="header-title" :href="'index.html'">
      NEWS
    </a>
    <img
      v-if="!menuActive"
      class="header-menu"
      src="../assets/svg/header-menu.svg"
      @click="handleOpenMenu"
    />
    <img
      v-else
      class="header-menu header-menu-close"
      src="../assets/svg/header-close.svg"
      @click="handleOpenMenu"
    />
    <div class="header-menu-items">
      <ul>
        <li v-for="(it, index) in menus" :key="index">
          <a :href="'index.html?type=' + it.sName"
            ><p>{{ it.sName }}</p></a
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { menus } from '../cacheData/menu.js'

const menuActive = ref(false)
function handleOpenMenu() {
  const div = document.querySelector('.header-menu-items')
  if (menuActive.value) {
    div.style.maxHeight = '0px' // 收起 div
  } else {
    div.style.maxHeight = div.scrollHeight + 'px' // 展开 div
  }
  menuActive.value = !menuActive.value
}
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  height: 48px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-bottom: 1px solid #ede6e6;
  .header-logo {
    width: 150px;
    display: block;
  }
  .header-title{
    color: #111;
    font-size: 22px;
    font-weight: 600;
  }
  .header-home{
    position: absolute;
    width: 30px;
    height: 30px;
    left: 10px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .header-menu {
    position: absolute;
    width: 25px;
    height: 25px;
    right: 12px;
  }
  .header-menu-close {
    width: 20px !important;
    height: 20px !important;
  }
  .header-menu-items {
    position: absolute;
    background: #fff;
    width: 100%;
    top: 50px;
    z-index: 100;
    transition: max-height 0.3s ease-in-out;
    overflow: hidden;
    max-height: 0;
    z-index: 9999;
    ul {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100%;
      border-bottom: 2px solid #f1efef;
      li {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        border-bottom: 2px solid #f1efef;
        background: #fff;
        justify-content: center;
        a {
          p {
            color: #47acff;
            font-size: 15px;
            font-weight: 600;
            padding-left: 15px;
          }
        }
      }
    }
  }
}
</style>
