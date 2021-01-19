import Vue from 'vue'
import Vuex from 'vuex'

import course from '@/store/modules/course'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    course
  }
})
