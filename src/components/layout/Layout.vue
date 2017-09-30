<template>
    <div class="layout">
        <Navbar @toggleSideBar="toggleSideBar"></Navbar>
        <!--左侧导航菜单-->
        <div class="sidebar">
            <el-menu class="el-menu-vertical-demo"  :collapse="isCollapse">
                <template v-for="(item,index) in items">
                    <el-submenu :index="index+''">
                        <template slot="title">
                            <i class="el-icon-message"></i>
                            <span slot="title">{{item.head}}</span>
                        </template>
                        <template v-for="child in item.children">
                            <el-menu-item :index="child.code">
                                <span slot="title" @click="createTab(child.href,child.label)">{{child.label}}</span>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
            </el-menu>
        </div>
        <!--tab页形成-->
        <div class="box">
        <div class="tabs-wrap clearfix">
            <ul class="mt10 clearfix">
                <li :class="currentTab==v.key?'active':''" @click="changeTab(v.key)" v-for="(v, index) in tabItems">{{v.label}}
                    <i @click.stop="closeTab(index,v.key)" title="关闭"></i>
                </li>
            </ul>
            <span @click="closeTab()">关闭所有</span>
        </div>
        <!--对应的路由显示部分-->
        <div style="margin-right:20px;padding-top:10px;" class="content">
            <keep-alive>
                <router-view :refresh="refresh" @childcreatetab="createTab" @childclosetab="closeTab"></router-view>
            </keep-alive>
        </div>
        </div>
    </div>
</template>
<script>
    import Navbar from './Navbar';
    import {global} from '../../global/global';
    export default {
    data() {
      return {
        currentTab: "",
        refresh: true,
        isCollapse:false,
        tabItems: [
            {
                label:'首页',
                key:'/mainComponent/home'
            },
        ],
       
        //左侧sidebar
        items:
            [
                {head: "用户管理", type: "ionic",children:[{code: "50", label: "表单验证", href: "/mainComponent/form", parent_code: "49", idx: "11", id: "52"}]},
                {head: "用户管理", type: "ionic",children:[{code: "51", label: "权限管理", href: "/mainComponent/authority", parent_code: "49", idx: "11", id: "53"}]},
                {head: "机构信息", type: "ionic",children:[
                    {code: "52", label: "机构信息", href: "/mainComponent/instituInfo", parent_code: "49", idx: "11", id: "53"},
                    {code: "53", label: "机构管理", href: "/mainComponent/institution_ver2", parent_code: "49", idx: "11", id: "53"},
                ]},
                {head: "报表信息", type: "ionic",children:[{code: "54", label: "消费交易汇总", href: "/mainComponent/consumerTransactionSummary", parent_code: "49", idx: "11", id: "53"}]},
            ],
      }
    },
     components: {
        Navbar,
    },
    mounted:function(){
        let vm=this;
        $('.tabs-wrap ul li:nth-child(1) i').hide();//第一个tab的图标不显示。
        this.$router.push('/mainComponent/home');
        this.currentTab = '/mainComponent/home';//初始化时显示组件
        $('.sidebar').css({"height":$(window).height()-45});
        if(this.isCollapse){
            $('.box').css({"margin-left":"80px"});
        }
        else{
            $('.box').css({"margin-left":"220px"});
        }
        //登录成功的提示
        this.$notify({
          title: '登录成功',
          message: '欢迎进入后台管理系统',
          type: 'success',
          offset: 100
        });
        //窗口大小改变时，左侧菜单栏折叠和展开。
        window.onresize=function(){
            $('.sidebar').css({"height":$(window).height()-45});
            if($(window).width()<1200){
                vm.isCollapse=true;
                $('.box').css({"margin-left":"80px"});
            }
            else{
                vm.isCollapse=false;
                $('.box').css({"margin-left":"220px"});
            }
        }
         
    },
    methods: {
        toggleSideBar(){
            this.isCollapse=!this.isCollapse;
             if(this.isCollapse){
                $('.box').css({"margin-left":"80px"});
            }
            else{
                $('.box').css({"margin-left":"220px"});
            }
        },
        //创建tab标签
        createTab(key,label) {
            var newItem={
                label:label,
                key:key
            }
            //判断是否打开过
            var count=0;
            for(var i=0;i<this.tabItems.length;i++){
                if(this.tabItems[i].key==key){
                    count++;
                    break;
                }
            }
            console.log('label打开过'+count);
            //如果没有打开过，则进行添加显示。
            if(count==0){
                this.tabItems.push(newItem);
                this.refresh = true; //没有打开过将标志设为true，对应路由打开的页面需要重新加载。
            }
            else{
                this.refresh=false;
            }
            this.$router.push(key);
            this.currentTab = key;
        },
        //切换tab
        changeTab(key) {
            this.currentTab = key;
            this.$router.push(key);
            this.refresh=false;
            //console.log(this.refresh);
        },
        //关闭tab
        closeTab(index,key) {
            if (!key) {
                this.tabItems = [
                    {
                        label: "首页",
                        key:'/mainComponent/home'
                    }
                ];
                this.currentTab = '/mainComponent/home';
                this.$router.push('/mainComponent/home');//如果没有传入参数，则将所有的窗口关闭，只剩下首页。
            } else {
                this.currentTab='/mainComponent/home';
                this.tabItems.splice(index,1)
                this.$router.push('/mainComponent/home');//如果指定了关闭窗口的key值，则关闭此窗口并且回到首页。
            }
        },
     
    }
  }
</script>
<style scoped>
    .layout{
        height:100%;
    }
    .box{height:100%;}
    .box .content{ 
        height:-moz-calc(100% - 100px); 
        height:-webkit-calc(100% - 100px);
        height: calc(100% - 100px);}
    .box .content div:nth-child(1){
        height:100%;
    }
    .box .content div:nth-child(1) .left{
       height:100%;
    }
    /*左侧菜单栏*/
    
    .sidebar {
        position:fixed;
        left:0;
        top:0;
        z-index:10;
        margin-top:40px;
        background: #eef1f6;
    }
    ::-webkit-scrollbar {
        width: 0px;
        height: 1px;
    }
    
    ::-webkit-scrollbar-thumb {
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: rgba(0, 0, 0, 0.2);
    }
    /*中间显示内容*/
    
    .mainContent {
        padding-left: 220px;
        padding-top: 50px;
    }
    /*sidebar样式*/
    
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
    }
    
    .el-menu-item {
        padding: 0;
        padding-left: 0 !important;
    }
    
    .el-submenu .el-menu-item {
        padding: 0;
    }
    
    .el-menu li> span {
        text-decoration: none;
        height: 50px;
        line-height: 50px;
        display: block;
        padding-left: 45px;
    }
    
    .el-menu li span.active {
        color: #20a0ff;
    }
    
    .el-menu li >span:hover {
        color: #20a0ff;
    }
    /*tab部分*/
    
    .tabs-wrap {
        padding-top: 50px;
        overflow: hidden;
        border-bottom: 1px solid #ccc;
        position: relative;
    }
    
    .tabs-wrap span {
        position: absolute;
        right: 20px;
        list-style: none;
        float: left;
        margin: 4px 0 0 4px;
        float: left;
        border: 1px solid #ccc;
        cursor: pointer;
        border-bottom: none;
        border-radius: 4px 4px 0 0;
        background-color: #efefef;
        font-size: 14px;
        padding: 7px 10px 7px 10px;
    }
    
    .tabs-wrap ul li {
        list-style: none;
        float: left;
        margin: 4px 0 0 4px;
        float: left;
        border: 1px solid #ccc;
        position: relative;
        cursor: pointer;
        border-bottom: none;
        border-radius: 4px 4px 0 0;
        background-color: #efefef;
        font-size: 14px;
        padding: 7px 25px 7px 10px;
    }
    
    .tabs-wrap ul li:nth-child(1) {
        padding: 7px 12px;
    }
    
    .tabs-wrap ul li i:nth-child(1) {
        background: url(../../assets/img/icon.png) no-repeat;
        width: 14px;
        height: 14px;
        background-size: 30px;
        position: absolute;
        top: 9px;
        right: 5px;
        background-position: -15px 0;
    }
    
    .tabs-wrap ul li.active {
        color: #20a0ff;
        border-color: #20a0ff;
        background-color: #fff;
    }
</style>