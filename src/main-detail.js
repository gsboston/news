import { createApp } from 'vue'
import Detail from './views/Detail.vue'
// 计算设置rem的基准值，即html的font-size
import 'amfe-flexible'

const app = createApp(Detail)

// 挂载
app.mount('#appDetail')
