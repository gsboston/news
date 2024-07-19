<template>
  <div class="sidebar">
    <a v-show="!onlyShowTop" id="twitter-share" href="#">
      <img src="../assets/img/twitter.png" />
    </a>
    <a v-show="!onlyShowTop" id="facebook-share" class="facebook" href="#">
      <img src="../assets/img/facebook.png" />
    </a>
    <a
      v-show="!onlyShowTop"
      id="email-share"
      class="facebook"
      href="mailto:aaronjordan324@gmail.com"
    >
      <img src="../assets/img/email.png" />
    </a>
    <a class="scroll-top-btn" href="javascript:void(0)" @click="scrollToTop">
      <img src="../assets/img/icon-btn-top.png" />
    </a>
  </div>
</template>
<script setup>
import { defineComponent, ref, onMounted, reactive } from 'vue'

const props = defineProps({
  onlyShowTop: {
    default: true
  }
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  const currentUrl = encodeURIComponent(window.location.href)
  const pageTitle = encodeURIComponent(document.title)

  // Twitter 分享链接
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${pageTitle}`
  document.getElementById('twitter-share').setAttribute('href', twitterShareUrl)

  // Facebook 分享链接
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`
  document
    .getElementById('facebook-share')
    .setAttribute('href', facebookShareUrl)
})

function handleScroll() {
  const scrollTopBtn = document.querySelector('.scroll-top-btn')
  const scrollY = window.scrollY || document.documentElement.scrollTop

  if (scrollY > window.innerHeight) {
    scrollTopBtn.classList.add('show')
  } else {
    scrollTopBtn.classList.remove('show')
  }
}

// 滚动到顶部函数
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // 平滑滚动效果
  })
}
</script>
<style lang="less" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 5px;
  bottom: 80px;
  img {
    width: 35px;
    height: 35px;
  }
  .scroll-top-btn {
    img {
      border-radius: 50%;
    }
    display: none;
    color: #fff;
    border-radius: 50%;
    width: 35px;
    height: 35x;
  }

  .scroll-top-btn.show {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
