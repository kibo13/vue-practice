import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/assets/css/tailwind.css'

import marked from 'marked'
import MyPlugin from '@/plugins/myPlugin'

Vue.filter('marked', marked)
Vue.use(MyPlugin)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
