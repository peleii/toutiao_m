import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'
import Layout from '@/views/layout/index.vue'
import Home from '@/views/home/index.vue'
import My from '@/views/my/index.vue'
import Search from '@/views/search/search.vue'
import ArticleDetail from '@/views/articleDetail/index.vue'
import UserInfo from '@/views/userInfo/index.vue'
Vue.use(VueRouter)

const routes = [
  { path: '', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/search', component: Search },
  { path: '/userinfo', component: UserInfo },
  {
    path: '/article/:articleId',
    component: ArticleDetail,
    props: true// 开启props传参
  },
  {
    path: '/layout',
    component: Layout,
    redirect: '/layout/home',
    children: [
      { path: 'home', component: Home },
      { path: 'my', component: My }

    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
