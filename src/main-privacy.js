import { createApp } from 'vue'
import Privacy from './views/Privacy.vue'
// 计算设置rem的基准值，即html的font-size
import 'amfe-flexible'

const app = createApp(Privacy)

// 挂载
app.mount('#privacy')
