import Vue from 'vue'
import Vuex from 'vuex'

import course from '@/store/modules/course'
import lesson from '@/store/modules/lesson'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    course,
    lesson
  }
})
