import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import lodash from 'lodash'
import store from '@/store/store'
import router from '@/router/router'
import constant from '@/plugins/constant'
import utils from '@/plugins/utils'

import Modal from '@/components/Modal'

require('@/assets/main.css')

const app = createApp(App)

// components
app.component('Modal', Modal)

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
app.use(store)
app.use(router).mount('#app')
