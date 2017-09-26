import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
import { Loading } from 'element-ui';
import { MessageBox } from 'element-ui';
import { Message } from 'element-ui';
import Cookies from 'js-cookie';
//封装一些全局元素。如全站通用功能函数和http请求等
export const global = {
    /**
     * 统一接口处理：get请求方法封装。this.$http.get(url, [options])
     * @param url { String } -必选 接口url
     * @param options { Object } -必选 含官方的所有options对象。传参为{params:{key:11}}
     * @param sucCb { Function } -必选 成功回调
     * @param errorCb { Function } -可选 失败回调
     * @param isLoading { Boolean } -可选 是否显示加载状态
     * @param isLogin { Boolean } -可选 是否登陆信息（移动端使用得较多，设置头部信息）
     */
    get: function (url, options = {}, sucCb, errorCb, isLoading = true) {
        if (!url) {
            console.log('接口url不能为空！');
            return false;
        }
        //遮罩层
        if(isLoading){
            var loadingInstance = Loading.service({text:"拼命加载中"});
        }
        Vue.http.get(url, options).then((response) => {
            // 响应成功回调
            //返回请求失效时。
            if(response.body.result=='invalidSession'){
                Cookies.remove('userToken');
                Cookies.remove('userId');
                MessageBox.alert('请重新登录', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        window.location.reload();
                    }
                });
                return;
            }
            sucCb(response);
            if(isLoading){
                loadingInstance.close();
            }
        }, (response) => {
            // 响应错误回调
            errorCb(response);
            console.log('请求失败');
            if(isLoading){
               loadingInstance.close();
            }
        })
    },
    //关闭弹出框时，内容清空
    resetForm: function (form) {
        for (var obj in form) {
            form[obj] = '';
        }
    },
    //提示框
    confirmBox: function (title,callback) {
        MessageBox.confirm(title, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            callback();//点击确定时的操作。
        }).catch(() => {
            Message.info('已取消操作');//点击取消时的提示。
        });
    },
    //删除，启用等操作时公共逻辑
    /**
     * param 一般为某行的id值
     * title为弹出框的提示语
     * URL为点击确定时的请求路径
     * succCallBack为请求成功后的操作
     * succTitle为操作成功后的提示语
     * errTitle为操作失败后的提示语
     */
    common:function(param,title,url,succCallBack,succTitle,errTitle){
        var self=this;
        self.confirmBox(title,function(){
            self.submitCommon(url,{},succCallBack,succTitle,errTitle);
        });
    },
    //添加或编辑的公共部分提取。
      submitCommon(url,params,succCallBack,sussTitle,errTitle){
        var self=this;
        self.get(url,{ params:params},function (res) {
            if(res.body.result){
              self.succMsg(sussTitle);
              succCallBack();
            }
            else{
              self.errMsg(errTitle);
            }
          }, function (res) {
             self.errMsg(errTitle);
          })
      },
    //message成功提示
    succMsg(message){
        Message.success(message);
    },
    //message失败提示
    errMsg(message){
        Message.error(message);
    },
    //messageBox警告提示
    warningMesBox(message){
        MessageBox.alert(message,'提示'); 
    },
    //控制表格高度
    tableHeight(){
        var height= $(window).height()-$('.header').height()-$('.formSearch').height()-200;
        return height;
    },
    //表格每页序号排序
    tableIndex(tableData,current,size){
        var xuhao=0;
        setTimeout(function(){
            for(var i=0;i<tableData.length;i++){
                xuhao=(current-1)*size+i+1;
                $('.el-table__row').eq(i).find('.cell div').text(xuhao);
            }
        },0);
    },
};

