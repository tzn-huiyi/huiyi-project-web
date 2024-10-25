import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    // 基础主组件，系统功能分别为其子组件
    path: '/',
    component: () => import('@/views/MainPage.vue'),
    //进入网站时，默认重定向到首页（不会覆盖主组件的菜单栏等基础内容）
    redirect: '/HomePage',
    children: [
      //首页
      {
        path: 'HomePage',
        component: () => import('@/views/HomePage/HomePage.vue')
      },

      //文章功能页面
      // 普通文章页面
      {
        path: 'ArticleBasic',
        component: () => import('@/views/ArticlePage/ArticleBasic.vue'),
        meta: { requiresAuth: true }
      },

      // 会员文章页面
      {
        path: 'ArticleVip',
        component: () => import('@/views/ArticlePage/ArticleVip.vue'),
        meta: { requiresAuth: true }
      },

      // 会员文章页面
      {
        path: 'ArticleSecret',
        component: () => import('@/views/ArticlePage/ArticleSecret.vue'),
        meta: { requiresAuth: true }
      }

      //系统设置页面
    ]
    
  }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
