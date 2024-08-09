<template>
  <div class="bottom">
    <div class="bottom-btn">
      <a @click="handleJumpPage" href="detail.html?index=17">About Us</a>
      <a @click="handleJumpPage" href="detail.html?index=15">Privacy Policy</a>
      <a @click="handleJumpPage" href="detail.html?index=16">Teams of Use</a>
    </div>
    <div class="bottom-info">2019-2024 pixel.com  All Rights Reserved</div>
  </div>
</template>
<script setup>
function handleJumpPage(){
  localStorage.removeItem('needRandom')
}
</script>
<style lang="less" scoped>
.bottom {
  background: #00315d;
  padding-top: 15px;
  height: 50px;
  .bottom-btn {
    height: 30px;
    text-align: center;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    a {
      color: #d7dfe6;
      font-size: 14px;
      font-weight: 600;
      border-right: 1px solid #fff;
      padding: 0 12px;

      &:last-child {
        border-right: none;
      }
    }
  }
  .bottom-info {
    height: 25px;
    font-size: 10px;
    color: #fff;
    font-weight: 600;
    justify-content: center;
    display: flex;
    align-items: center; 
    background: #00315d;
  }
}
</style>
