import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

const navigationBarTitleText = '公交pro';
export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    "pages": [
      "^pages/route/main",
      "pages/transit_list/main",
      "pages/transit_detail/main",

      "pages/station_list/main",

      "pages/metro_list/main",

      "pages/setting/main",
    ],
    "window": {
      "backgroundTextStyle": "dark",
      "backgroundColor": "#EFEFEF",
      "navigationBarBackgroundColor": "#4287FF",
      "navigationBarTitleText": navigationBarTitleText,
      "navigationBarTextStyle": "white"
    },
    "tabBar": {
      "color": "#333333",
      "selectedColor": "#4287FF",
      "backgroundColor": "#FFFFFF",
      "borderStyle": "black",
      "position": "bottom",
      "list": [
        {
          "pagePath": "pages/route/main",
          "text": "路线",
          "iconPath": "static/image/tabBar/route.png",
          "selectedIconPath": "static/image/tabBar/route@active.png"
        },
        {
          "pagePath": "pages/station_list/main",
          "text": "附近公交站",
          "iconPath": "static/image/tabBar/busstop.png",
          "selectedIconPath": "static/image/tabBar/busstop@active.png"
        },
        {
          "pagePath": "pages/metro_list/main",
          "text": "附近地铁站",
          "iconPath": "static/image/tabBar/metro.png",
          "selectedIconPath": "static/image/tabBar/metro@active.png"
        },
        {
          "pagePath": "pages/setting/main",
          "text": "设置",
          "iconPath": "static/image/tabBar/setting.png",
          "selectedIconPath": "static/image/tabBar/setting@active.png"
        }
      ]
    },
    "networkTimeout": {
      "request": 60000
    }
  }
}
