import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store';

Vue.use(Router)

const routes = [
  {
    //登录页面
    path:'/Login',
    component: () => import('@/views/UserLogin.vue'),
    meta: { requiresAuth:false }
  },
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
        component: () => import('@/views/HomePage/HomePage.vue'),
        meta: { requiresAuth: false }
      },

      // 技术分享页
      // java技术分享
      {
        path: 'JavaTech',
        component: () => import('@/views/TechShare/JavaTech.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: 'JavaTechDetail/:id',
        name:'JavaTechDetail',
        component: () => import('@/views/TechShare/JavaTechDetail.vue'),
        meta: { requiresAuth: false }
      },
      // web技术分享
      {
        path: 'WebTech',
        component: () => import('@/views/TechShare/WebTech.vue'),
        meta: { requiresAuth: false }
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
      },

      //系统设置页面
      //用户设置页
      {
        path: 'UserSetting',
        component: () => import('@/views/SettingPage/UserSetting.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'RoleSetting',
        component: () => import('@/views/SettingPage/RoleSetting.vue'),
        meta: { requiresAuth: true }
      },
      //权限设置页
      {
        path: 'PermissionSetting',
        component: () => import('@/views/SettingPage/PermissionSetting.vue'),
        meta: { requiresAuth: true }
      },
      //菜单设置页
      {
        path: 'MenuSetting',
        component: () => import('@/views/SettingPage/MenuSetting.vue'),
        meta: { requiresAuth: true }
      },
      
      //我的简历
      {
        path: 'MyResume',
        component: () => import('@/views/MyResume/MyResume.vue'),
        meta: { requiresAuth: true}
      },
      //本项目介绍
      {
        path: 'ProjectIntroduction',
        component: () => import('@/views/ProjectIntroduction/ProjectIntroduction.vue')
      }
    ]
    
  }
]

//创建Router实例
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})


//路由守卫处理登录逻辑
router.beforeEach((to, from, next) => {
  const token = store.state.token;

  // 如果目标路由需要授权
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      // 未登录，跳转到登录页面并携带重定向路径
      console.log('未登录，跳转到登录页---')
      // return next({ path: '/Login', query: { redirect: to.fullPath } });
    }
  }

  // 如果用户已登录且试图访问登录页面，重定向到首页
  if (to.path === '/Login' && token) {
    console.log('用户已登录，跳转主页---')
    return next('/HomePage'); // 直接跳转，无需额外检查
  }

  // 其他情况下直接放行
  next();
});



export default router;
