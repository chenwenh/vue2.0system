import Cookies from 'js-cookie';
import {global} from '../../global/global';
import { Message } from 'element-ui';

const user = {
  state: {
    uid: Cookies.get('userId'),
    token: Cookies.get('userToken'),
  },
  mutations: {
    SET_UID: (state, uid) => {
      state.uid = uid;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
  },

  actions: {
    // 邮箱登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        global.get('/city-tucs-contr/login/authenticate', { params: userInfo }, function (res) {
          //登录接口，可只返回token 和 uid 。然后可根据uid 查询用户信息
          if (res.body.result== 'success') {
            Cookies.set('userToken','aabbccdd' ); //设置token,需要后台传递过来
            Cookies.set('userId', '236e3402dbab51ea17f9f6f360993233'); //设置用户id，
            commit('SET_TOKEN', 'aabbccdd');
            resolve();
          } else {
            Message({
              showClose: true,
              message: res.body.resultMsg,
              type: 'error'
            });
          }
        }, function (res) {
          reject(res);
        })
        return false;
      });
    },
    // 登出 （头部登出）
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        //换成请求登出接口
        commit('SET_TOKEN', '');
        Cookies.remove('userToken');
        Cookies.remove('userId');
        resolve();
      });
    },
  }
};

export default user;
