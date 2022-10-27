import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import lodash from 'lodash'
import store from '@/store/store'
import router from '@/router/router'
import { initSetting } from '@/plugins/global'

require('@/assets/main.css')

initSetting(axios)

const app = createApp(App)
app.config.globalProperties.axios = axios
app.config.globalProperties._ = lodash
app.use(store)
app.use(router).mount('#app')
