import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import store from '../store'

import layout from '@/layout'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/login',
      component: layout,
      meta:{
        title:'登录',
        noLogin:true,
      },
      children:[
        {
          path:'login',
          component: () => import( '@/views/login'),
          name:'Login',
          meta:{
            title:'登录',
            noLogin:true,
          }
        },
        // {
        //   path:'register',
        //   name:'Register',
        //   meta:{
        //     title:'用户注册',
        //     noLogin:true,
        //   }
        // },
      ]
    },
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "about" */ '@/views/index'),
      meta:{
        title:'首页',
        noLogin:true,
      }
    },
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async(to, from, next) => {
  
  document.title =  to.meta.title  + ' - 济公人才网';

  const hasToken = getToken()
  // 有token
  if(hasToken){
    // 如果已登录则重定向到主页
    if(to.path === '/login'){
      next({ path: '/' })
    }else{
      
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if(hasRoles){
        next();
      }else{

        try{
          // 获取用户信息
          const { roles , menus } = await store.dispatch('user/getInfo');
          //获取路由图
          const accessRoutes = await store.dispatch('permission/generateRoutes',{roles , menus});
  
          router.addRoutes(accessRoutes);
  
          next({...to , replace:true});
          
        }catch(error){
          await store.dispatch('user/resetToken');
          Message.error(error || '发生错误');
          next(`/login?redirect=${to.path}`);
        }

      }

    }

  }else{

    // 不需要登录，直接进入
    if(to.meta.noLogin){
      next();
    }else{
      // 其他没有访问权限的页面被重定向到登录页面
      next(`/login?redirect=${to.path}`)
    }
    
  }

  next();
  
})

export default router
