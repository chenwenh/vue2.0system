<template>
    <div class="layout">
        <Navbar></Navbar>
        <!--左侧导航菜单-->
        <div class="sidebar">
            <el-menu class="el-menu-vertical-demo">
                <template v-for="(item,index) in items">
                    <el-submenu :index="index+''" >
                        <template slot="title"><i class="el-icon-menu"></i>{{item.head}}</template>
                        <el-menu-item v-for="child in item.children" :index="child.code" :key="child.code" ><span @click="createTab(child.href,child.label)">{{child.label}}</span></el-menu-item>
                    </el-submenu>
                </template>
            </el-menu>
        </div>
        <!--tab页形成-->
        <div class="tabs-wrap clearfix">
            <ul class="mt10 clearfix">
                <li :class="currentTab==v.key?'active':''" @click="changeTab(v.key)" v-for="(v, index) in tabItems">{{v.label}}
                    <i  @click.stop="closeTab(index,v.key)" title="关闭"></i>
                </li>
            </ul>
            <span @click="closeTab()">关闭所有</span>
        </div>
        <!--对应的路由显示部分-->
        <div style="margin-left:220px;margin-right:20px;padding-top:10px;">
            <keep-alive>
                <router-view :refresh="refresh" @childcreatetab="createTab" @childclosetab="closeTab"></router-view>
            </keep-alive>
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
        tabItems: [
            {
                label:'首页',
                key:'/mainComponent/home'
            },
        ],
       
        //左侧sidebar
        isCollapse:false,
        items:
            [
                {head: "用户管理", type: "ionic",children:[{code: "50", label: "表单验证", href: "/mainComponent/form", parent_code: "49", idx: "11", id: "50"}]},
                {head: "用户管理", type: "ionic",children:[{code: "50", label: "权限管理", href: "/mainComponent/authority", parent_code: "49", idx: "11", id: "50"}]}
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
    },
    methods: {
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
            //console.log(this.refresh);
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
    /*左侧菜单栏*/
    
    .sidebar {
        position: fixed;
        top: 40px;
        left: 0;
        height: 100%;
        text-align: left;
        overflow: auto;
        width: 200px;
        z-index: 30;
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
        margin-left: 200px;
        overflow: hidden;
        border-bottom: 1px solid #ccc;
        position:relative;
    }
    .tabs-wrap span{
        position:absolute;
        right:20px;
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