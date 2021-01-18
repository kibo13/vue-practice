import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import LessonOne from '@/views/lessons/Lesson1'
import LessonTwo from '@/views/lessons/Lesson2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/lesson-01',
      name: 'lesson1',
      component: LessonOne
    },
    {
      path: '/lesson-02',
      name: 'lesson2',
      component: LessonTwo
    }
  ]
})
