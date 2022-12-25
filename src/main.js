import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import lodash from 'lodash'
import store from '@/store/index'
import router from '@/router/router'
import constant from '@/plugins/constant'
import utils from '@/plugins/utils'
import globalComponents from '@/plugins/globalComponents'

const app = createApp(App)

// axios
axios.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  function (response) {
    return response
  }, function (error) {
    return Promise.reject(error)
  }
)

app.config.globalProperties.axios = axios
app.config.globalProperties._ = lodash
app.config.globalProperties.$utils = utils
app.config.globalProperties.$constant = constant

app.use(globalComponents)
app.use(store)
app.use(router).mount('#app')
