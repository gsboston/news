import { createApp } from 'vue'
import Terms from './views/Terms.vue'
// 计算设置rem的基准值，即html的font-size
import 'amfe-flexible'

const app = createApp(Terms)

// 挂载
app.mount('#terms')
