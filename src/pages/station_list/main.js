import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    "navigationBarTitleText": "附近公交站",
    "enablePullDownRefresh": true,
  }
}
