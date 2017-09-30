<template>
    <div>
        <input v-model="names">
        <el-button type="primary" icon="plus" @click="first()" v-waves>传到另一个组件</el-button>
        <el-button-group style="margin-bottom:3px;">
            <el-button type="primary" icon="plus" @click="add()" v-waves>添加</el-button>
            <el-button type="danger" icon="delete" @click="moreDelete()" v-waves>批量删除</el-button>
            <el-button type="success" icon="check" @click="moreEnable()" v-waves>批量启用</el-button>
            <el-button type="warning" icon="close" @click="moreDisable()" v-waves>批量禁用</el-button>
        </el-button-group>
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
    </div>
</template>
<script>
import bus from './../../assets/js/eventBus'
import {global} from '../../global/global';
let selectedColumns=[];
export default{
    data(){
        return{
            height:500,
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
            ],
            names:'',
        }
    },
    mounted(){
      this.height=global.tableHeight(200);
    },
    methods:{
        first(){
            bus.$emit('second',this.names);
        },
        tableDatas(res){
            this.tableData=res;
        },
        //添加按钮点击时弹框出现，并且初始化表单。
        add(){
            this.$emit('dialog','添加');
        }, 
        //编辑时获取单条数据。
        handleEdit(row){
            let vm=this;
            global.get(`/city-tucs-contr/parametersTypeSys/getSysParamter?id=${row.id}`,{ params:null},function (res) {
                vm.$emit('tableData',res.body.result,'编辑');//向父组件传递数据。
            }, function (res) {
                console.log('请求失败');
            })
        },
         //删除操作公共部分
        delete(title,param){
            let vm=this;
            global.common(param,title,`/city-tucs-contr/parametersTypeSys/delete?id=${param}&current=1`,function(){vm.$emit('search')},'删除成功！','删除失败！');
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
            global.common(param,title,`/city-tucs-contr/parametersTypeSys/paramAvilable?id=${param}`,function(){vm.$emit('search')},'启用成功！','启用失败！');
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
            global.common(param,title,`/city-tucs-contr/parametersTypeSys/paramDeny?id=${param}`,function(){vm.$emit('search')},'禁用成功！','禁用失败！');
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