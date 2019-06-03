import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/list',
      name: 'list',
      // route level code-splitting
      // this generates a separate chunk (list.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "list" */ './views/List.vue')
    },
    {
      path: '/chart',
      name: 'chart',
      // route level code-splitting
      // this generates a separate chunk (chart.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "chart" */ './views/Chart.vue')
    },
    {
      path: '/help',
      name: 'help',
      // route level code-splitting
      // this generates a separate chunk (help.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "help" */ './views/Help.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      // route level code-splitting
      // this generates a separate chunk (settings.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "settings" */ './views/Settings.vue')
    },
    {
      path: '/calendar',
      name: 'calendar',
      // route level code-splitting
      // this generates a separate chunk (calendar.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "calendar" */ './views/Calendar.vue')
    }
  ]
})
