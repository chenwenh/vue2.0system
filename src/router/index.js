import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Layout from '@/components/layout/Layout';
import Err404 from '@/components/error/404'
import form from '@/components/mainComponent/form'
import authority from '@/components/authority/authority'
import home from '@/components/home'
Vue.use(Router)

const constantRouterMap = [
  { path: '/login', component: Login},
  { path: '/404', component: Err404},  //假地址时重定向
  {
    path: '/',
    redirect: '/mainComponent/home',  //重定向到默认首页
  },
  { 
    path: '/mainComponent',
    component: Layout,
    redirect: 'noredirect',
    noDropdown: true,
    children: [
      { path: 'home', component: home, name: '首页' },
      { path: 'form', component: form, name: '表单验证' },
      { path: 'authority', component: authority, name: '权限管理'}
    ]
  },
  { path: '*', redirect: '/404'}
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});
