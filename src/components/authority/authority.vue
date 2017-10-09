<template>
  <div>
    <el-form :inline="true" :model="formItem" class="demo-form-inline formSearch" ref="formItem" label-width="100px" style="border-bottom:1px dashed #ccc;">
      <el-form-item label="权限名称" prop="name">
        <el-input v-model="formItem.name" placeholder="权限名称"></el-input>
      </el-form-item>
      <el-form-item label="上级权限" prop="parentMenu">
        <el-select v-model="formItem.parentMenu" placeholder="上级权限" clearable>
          <el-option v-for="item in parentMenus" :label="item.label" :value="item.value" :key="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search" v-waves>查询</el-button>
        <el-button type="primary" @click="resetForm('formItem')" v-waves>重置</el-button>
      </el-form-item>
    </el-form>
    <!--表格部分-->
    <table-component ref="tableComponent" @tableData="tableDatas" @search="submit" @dialog="dialog"></table-component>
    <!--弹出层-->
    <dialog-component ref="dialogComponents" :title="title" @submit="submit"></dialog-component>
    <!--分页组件-->
    <page-pagination :total="total" :size="size" :current="current" @currentChange="currentChange" @sizeChange="sizeChange"></page-pagination>
  </div>
</template>
<script>
import {global} from '../../global/global';
import pagePagination from './../mainComponent/pagePagination'
import dialogComponent from './dialogComponent'
import tableComponent from './tableComponent'
let selectedColumns=[];
export default {
  data() {
    return {
      // 查询条件部分
      formItem: {
        name: '',
        parentMenu: ''
      },
      parentMenus:[
        {label:"区域一",value:'shanghai'},
        {label:'区域二',value:'beijing'}
      ],
      //弹出框部分
      title:'',
      //分页部分
      size:20,
      total:0,
      current:1,
      user: {
        email: '',
      }
    };
  },
  props:['refresh'],
  activated: function() {
      //如果窗口关闭过，重新打开时需要重新加载数据。
      if (this.refresh) {
          this.resetForm('formItem');
          this.current=1;
          this.size=20;
          this.search();//重新请求表格数据。
      }
  },
  mounted(){
  },
  components:{
      pagePagination,
      dialogComponent,
      tableComponent,
  },
  methods: {
    //当前页发生改变时
    currentChange(val){
      this.current=val;
      this.search();
    },
    //每页显示条数改变时
    sizeChange(val){
      this.size=val;
      this.search();
    },
    //查询获取表格数据。
    search(){
      let vm=this;
      // this.$http.post(`/city-tucs-contr/parametersTypeSys/getTypeSysList?size=${vm.size}&current=${vm.current}&total=${vm.total}`,vm.formItem).then(function(res){
      //     vm.$refs.tableComponent.tableDatas(res.data.result);//调用子组件中的方法,给表格填充数据。
      //     vm.total=res.data.totalData;
      //     global.tableIndex(res.data.result,vm.current,vm.size);//表格数据序号
      // },function(error){
        
      // })
      global.post(`/city-tucs-contr/parametersTypeSys/getTypeSysList?size=${vm.size}&current=${vm.current}&total=${vm.total}`,vm.formItem,function (res) {
        if(res.body.success){
          vm.$refs.tableComponent.tableDatas(res.body.result);//调用子组件中的方法,给表格填充数据。
          vm.total=res.body.totalData;
          global.tableIndex(res.body.result,vm.current,vm.size);//表格数据序号
        }
      }, function (res) {
        console.log('请求失败');
      })
      // global.get(`/city-tucs-contr/parametersTypeSys/getTypeSysList?size=${vm.size}&current=${vm.current}&total=${vm.total}`,{ params:vm.formItem},function (res) {
      //   if(res.body.success){
      //     vm.$refs.tableComponent.tableDatas(res.body.result);//调用子组件中的方法,给表格填充数据。
      //     vm.total=res.body.totalData;
      //     global.tableIndex(res.body.result,vm.current,vm.size);//表格数据序号
      //   }
      // }, function (res) {
      //   console.log('请求失败');
      // })
    },
    //表单重置。
    resetForm(formName){
        this.$refs[formName].resetFields();
    },
    //弹出框标题和表单赋值。
    dialog(title){
      this.title=title;//标题赋值
      this.$refs.dialogComponents.show();//弹出框显示
    },
    //弹出框提交
    submit(){
      this.search();
    },
    //弹出框显示并给赋值
    tableDatas(val,title){
      this.dialog(title);
      this.$refs.dialogComponents.form(val);//调用弹出框中的form方法。
    },
    
  }
}
</script>