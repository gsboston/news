import { createApp } from 'vue'
import Index from './views/Index.vue'
// 计算设置rem的基准值，即html的font-size
import 'amfe-flexible'

const app = createApp(Index)

// 挂载
app.mount('#app')
