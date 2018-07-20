import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    "navigationBarTitleText": "公交-路线",
    "enablePullDownRefresh": false,
    "backgroundTextStyle": "dark"
  }
}
