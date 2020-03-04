import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
// 配置axios基础路径
axios.defaults.baseURL="http://1.kkcakeend.applinzi.com/"
// 配置发送请求保存session信息
axios.defaults.withCredentials=true;
// axios.defaults.baseURL="http://192.168.1.4:4000";
// 将axios对象保存到vue的原型对象中，让所有组件对象都可以使用
Vue.prototype.axios=axios;

// 引入第三方组件库mintui
import MintUI from "mint-ui";
// 单独引入mint-ui组件库中的样式文件
import "mint-ui/lib/style.css"
// 将MintUI注册给Vue实例
Vue.use(MintUI)
// 引入字体图标
import "./font/iconfont.css"
// 引入font-awesome
import 'font-awesome/css/font-awesome.css'
// CSS reset
import 'normalize.css/normalize.css'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
