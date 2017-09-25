
// so：vuex中的数据刷新页面后，会全部消失。存vuex时，同时记得存 Session Storage。或者F5时重新获取接口
import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
  },
  getters :getters			
});

export default store
