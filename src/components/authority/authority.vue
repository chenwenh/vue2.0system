<template>
  <div>
    <el-form :inline="true" :model="formItem" class="demo-form-inline formSearch" ref="formItem" label-width="100px" style="border-bottom:1px dashed #ccc;" >
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
    <el-button-group style="margin-bottom:3px;">
      <el-button type="primary" icon="plus" @click="add()" v-waves>添加</el-button>
      <el-button type="danger" icon="delete" @click="moreDelete()" v-waves>批量删除</el-button>
      <el-button type="success" icon="check" @click="moreEnable()" v-waves>批量启用</el-button>
      <el-button type="warning" icon="close" @click="moreDisable()" v-waves>批量禁用</el-button>
    </el-button-group>
    <!--表格部分-->
    <el-table :data="tableData" border stripe style="width: 100%" :max-height="height" @selection-change="handleSelectionChange">
      <el-table-column type="index" width="70"></el-table-column>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column v-for="column in columns" :key="column.key" :prop="column.key" :label="column.title" :width="column.width"></el-table-column>
      <el-table-column prop="enable" label="标签" width="100">
        <template scope="scope">
          <el-tag :type="scope.row.enable === '启用' ? 'success' : 'warning'" close-transition>{{scope.row.enable}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="260">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          <el-button size="small" type="success" @click="enable(scope.row)">启用</el-button>
          <el-button size="small" type="warning" @click="disabled(scope.row)">禁用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--弹出层-->
    <el-dialog :title="title" :visible.sync="dialogVisible" size="tiny" style="padding-bottom:20px;">
      <dialog-component @dialogVisible="dialogVisibles()" :title="title" @submit="submit" ref="dialogComponent"></dialog-component>
    </el-dialog>
    <!--分页组件-->
    <page-pagination :total="total" :size="size" :current="current" @currentChange="currentChange" @sizeChange="sizeChange"></page-pagination>
  </div>
</template>
<script>
  import {global} from '../../global/global';
  import pagePagination from './../mainComponent/pagePagination'
  import dialogComponent from './dialogComponent'
  let selectedColumns=[];
  export default {
    data() {
      return {
        formItem: {
          name: '',
          parentMenu: ''
        },
        loading:false,
        title:'',
        parentMenus:[
          {label:"区域一",value:'shanghai'},
          {label:'区域二',value:'beijing'}
        ],
        dialogVisible:false,
        multipleSelection:[],
        tableData:[],
        columns:[
          {
              title: '参数类型名称',
              key: 'name',
          },
          {
              title: '参数类型',
              key: 'code',
          },
          // {
          //     title: '状态',
          //     key: 'enable',
          //     width:300,
          // },
        ],
        size:20,
        total:0,
        current:1,
        height:500
      };
    },
    props:['refresh'],
    activated: function() {
        if (this.refresh) {
            this.search();//重新请求表格数据。
        }
    },
    created(){
       this.height=global.tableHeight();
    },
    mounted(){
      this.height=global.tableHeight();
    },
    components:{
        pagePagination,
        dialogComponent,
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
        global.get(`/city-tucs-contr/parametersTypeSys/getTypeSysList?size=${vm.size}&current=${vm.current}&total=${vm.total}`,{ params:vm.formItem},function (res) {
          if(res.body.success){
            vm.tableData=res.body.result;
            vm.total=res.body.totalData;
            global.tableIndex(vm.tableData,vm.current,vm.size);//表格数据序号
          }
        }, function (res) {
          console.log('请求失败');
        })
      },
      //弹出框关闭。
      dialogVisibles(){
        this.dialogVisible=false;
      },
      //表单重置。
      resetForm(formName){
         this.$refs[formName].resetFields();
      },
      //添加按钮点击时弹框出现，并且初始化表单。
      add(){
        this.dialogVisible=true;
        global.resetForm(this.formCustom);
        this.title="添加";
      }, 
      //弹出框提交
      submit(){
        this.search();
      },
      //编辑时获取该行的信息。
      handleEdit(row) {
        this.dialogVisible=true;
        this.title="编辑";
        let vm=this;
        global.get(`/city-tucs-contr/parametersTypeSys/getSysParamter?id=${row.id}`,{ params:null},function (res) {
            vm.$refs.dialogComponent.form(res.body.result);//调用子组件中的方法
        }, function (res) {
          console.log('请求失败');
        })
      },
      //删除操作公共部分
      delete(title,param){
        let vm=this;
        global.common(param,title,`/city-tucs-contr/parametersTypeSys/delete?id=${param}&current=1`,function(){vm.search();},'删除成功！','删除失败！');
      },
      //单项删除时获取该行的信息。
      handleDelete(row) {
        this.delete('此操作将永久删除该条信息, 是否继续',row.id);
      },
      //批量删除
      moreDelete(){
        let vm=this;
        var length=selectedColumns.length;
        if(length==0){
          global.warningMesBox('请选择要删除的项');
        }
        else{
           this.delete('此操作将永久删除该条信息, 是否继续',selectedColumns);
        }
      },
      //启用公共部分
      enableCommon(title,param){
        let vm=this;
        global.common(param,title,`/city-tucs-contr/parametersTypeSys/paramAvilable?id=${param}`,function(){vm.search();},'启用成功！','启用失败！');
      },
      //单条启用操作
      enable(row){
        this.enableCommon('确定启用吗？',row.id);
      },
      //批量启用操作
      moreEnable(){
        let vm=this;
        var length=selectedColumns.length;
        if(length==0){
          global.warningMesBox('请选择要启用的项');
        }
        else{
           this.enableCommon('确定启用吗？',selectedColumns);
        }
      },
      //禁用公共部分
      disableCommon(title,param){
        let vm=this;
        global.common(param,title,`/city-tucs-contr/parametersTypeSys/paramDeny?id=${param}`,function(){vm.search();},'禁用成功！','禁用失败！');
      },
      //单条禁用操作
      disabled(row){
        this.disableCommon('确定禁用吗？',row.id);
      },
      //批量禁用操作
      moreDisable(){
        let vm=this;
        var length=selectedColumns.length;
        if(length==0){
          global.warningMesBox('请选择要禁用的项');
        }
        else{
           this.disableCommon('确定禁用吗？',selectedColumns);
        }
      },
      //选择多选框时得到当前选择的行的值。
       handleSelectionChange(val) {
        let vm=this;
        this.multipleSelection = val;
        selectedColumns=[];
        for(var i=0;i<this.multipleSelection.length;i++){
          selectedColumns.push(vm.multipleSelection[i].id);
        }
        console.log(selectedColumns);
      },


    }
  }
</script>