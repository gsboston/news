import { createApp } from 'vue'
import Dmca from './views/Dmca.vue'
// 计算设置rem的基准值，即html的font-size
import 'amfe-flexible'

const app = createApp(Dmca)

// 挂载
app.mount('#dmca')
