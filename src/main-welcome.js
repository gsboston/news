import { createApp } from 'vue'
import Welcome from './views/Welcome.vue'
// 计算设置rem的基准值，即html的font-size
import 'amfe-flexible'

const app = createApp(Welcome)

// 挂载
app.mount('#appWelcome')
