import { createApp } from 'vue'
import Result from './views/Result.vue'
// 计算设置rem的基准值，即html的font-size
import 'amfe-flexible'

const app = createApp(Result)

// 挂载
app.mount('#appResult')
