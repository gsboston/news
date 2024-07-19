import { createApp } from 'vue'
import Contact from './views/Contact.vue'
// 计算设置rem的基准值，即html的font-size
import 'amfe-flexible'

const app = createApp(Contact)

// 挂载
app.mount('#contact')
