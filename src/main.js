import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css
import App from './App.vue'

Vue.use(ElementUI)

new Vue({
  render: h => h(App)
}).$mount('#app')