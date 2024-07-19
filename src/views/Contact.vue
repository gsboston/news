<template>
  <Header></Header>
  <div class="contact">
    <center>
        <h1>Contact Us</h1>
    </center>
    <p> We're delighted to receive your feedback. Feel free to contact us at <a
            href="mailto:admeler@hotmail.com">admeler@hotmail.com</a> </p>
    <p> if you have any issues with our website or are interested in advertising. We'll respond as quickly as
        possible. </p>
  </div>
  <Footer></Footer>
</template>

<script setup>

import Header from '@/component/Header.vue'
import Footer from '../component/Footer.vue'

</script>

<style lang="less" scoped>
.contact{
  font-size: 15px;
  margin-top: 20px;
  padding: 10px;
  min-height: 500px;
}
</style>
