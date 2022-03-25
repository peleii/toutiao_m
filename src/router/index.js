import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'
import Layout from '@/views/layout/index.vue'
import Home from '@/views/home/index.vue'
import My from '@/views/my/index.vue'
import Shipin from '@/views/shipin/index.vue'
import Wenda from '@/views/wenda/index.vue'

Vue.use(VueRouter)

const routes = [
  { path: '', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/layout',
    component: Layout,
    redirect: '/layout/home',
    children: [
      { path: 'home', component: Home },
      { path: 'wenda', component: Wenda },
      { path: 'shipin', component: Shipin },
      { path: 'my', component: My }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
