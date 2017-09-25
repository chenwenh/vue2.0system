
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import $ from 'jquery';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式
import 'normalize.css/normalize.css';// normalize.css 样式格式化
import vueWaves from './directive/waves';// 水波纹指令
import Cookies from 'js-cookie';
Vue.use(ElementUI);
Vue.use(vueWaves);

Vue.config.productionTip = false;

const whiteList = ['/login','/404'];// 不重定向白名单
//路由跳转时判断。
router.beforeEach((to, from, next) => {
    NProgress.start(); // 开启Progress
    if (store.getters.token) { // 判断是否有token.如果已登录，则token存在，否则无。
            if (to.path === '/login') {
              next({ path: '/' });//跳到登录之后的首页
            } 
            else {
                next();
            }
    } 
    else {  
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next()
        } else {
            next('/login'); // 否则全部重定向到登录页
        }
    }
    NProgress.done();   
});

//路由跳转成功之后。
router.afterEach(() => {
  NProgress.done(); // 结束Progress
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
