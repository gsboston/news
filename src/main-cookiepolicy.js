import { createApp } from 'vue'
import Cookiepolicy from './views/Cookiepolicy.vue'
// 计算设置rem的基准值，即html的font-size
import 'amfe-flexible'

const app = createApp(Cookiepolicy)

// 挂载
app.mount('#cookiepolicy')
