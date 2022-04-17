import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './locales'
import './api/core/interceptor'
import './api/core/vue-request'
import './assets/style/tailwind.css'
// 通用字体
import 'vfonts/Lato.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(i18n)
app.mount('#app')
