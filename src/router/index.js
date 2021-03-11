import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import L01 from '@/views/lessons/01'
import L02 from '@/views/lessons/02'
import L03 from '@/views/lessons/03'
import L04 from '@/views/lessons/04'
import L05 from '@/views/lessons/05'
import L06 from '@/views/lessons/06'
import L07 from '@/views/lessons/07'
import L08 from '@/views/lessons/08'
import L09 from '@/views/lessons/09'
import L10 from '@/views/lessons/10'
import L11 from '@/views/lessons/11'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/lessons/1',
      name: 'lesson1',
      component: L01
    },
    {
      path: '/lessons/2',
      name: 'lesson2',
      component: L02
    },
    {
      path: '/lessons/3',
      name: 'lesson3',
      component: L03
    },
    {
      path: '/lessons/4',
      name: 'lesson4',
      component: L04
    },
    {
      path: '/lessons/5',
      name: 'lesson5',
      component: L05
    },
    {
      path: '/lessons/6',
      name: 'lesson6',
      component: L06
    },
    {
      path: '/lessons/7',
      name: 'lesson7',
      component: L07
    },
    {
      path: '/lessons/8',
      name: 'lesson8',
      component: L08
    },
    {
      path: '/lessons/9',
      name: 'lesson9',
      component: L09
    },
    {
      path: '/lessons/10',
      name: 'lesson10',
      component: L10
    },
    {
      path: '/lessons/11',
      name: 'lesson11',
      component: L11
    }
  ]
})
