import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import LessonOne from '@/views/lessons/Lesson1'
import LessonTwo from '@/views/lessons/Lesson2'
import LessonThree from '@/views/lessons/Lesson3'
import LessonFour from '@/views/lessons/Lesson4'
import LessonFive from '@/views/lessons/Lesson5'
import LessonSix from '@/views/lessons/Lesson6'
import LessonSeven from '@/views/lessons/Lesson7'
import LessonEight from '@/views/lessons/Lesson8'
import LessonNine from '@/views/lessons/Lesson9'
import LessonTen from '@/views/lessons/Lesson10'
import LessonEleven from '@/views/lessons/Lesson11'

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
    },
    {
      path: '/lesson-03',
      name: 'lesson3',
      component: LessonThree
    },
    {
      path: '/lesson-04',
      name: 'lesson4',
      component: LessonFour
    },
    {
      path: '/lesson-05',
      name: 'lesson5',
      component: LessonFive
    },
    {
      path: '/lesson-06',
      name: 'lesson6',
      component: LessonSix
    },
    {
      path: '/lesson-07',
      name: 'lesson7',
      component: LessonSeven
    },
    {
      path: '/lesson-08',
      name: 'lesson8',
      component: LessonEight
    },
    {
      path: '/lesson-09',
      name: 'lesson9',
      component: LessonNine
    },
    {
      path: '/lesson-10',
      name: 'lesson10',
      component: LessonTen
    },
    {
      path: '/lesson-11',
      name: 'lesson11',
      component: LessonEleven
    }
  ]
})
