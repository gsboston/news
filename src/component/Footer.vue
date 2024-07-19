<template>
  <div class="bottom">
    <div class="bottom-btn">
      <a @click="handleJumpPage" href="detail.html?index=18">About Us</a>
      <a @click="handleJumpPage" href="detail.html?index=19">Privacy Policy</a>
      <a @click="handleJumpPage" href="detail.html?index=20">Teams of Use</a>
    </div>
    <!-- <div class="bottom-info">2019-2023 daringbeam.com All Rights Reserved</div> -->
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
    height: 35px;
    font-size: 10px;
    color: #8d99a2;
    font-weight: 600;
    margin-top: 15px;
    justify-content: center;
    display: flex;
    align-items: center;
  }
}
</style>
