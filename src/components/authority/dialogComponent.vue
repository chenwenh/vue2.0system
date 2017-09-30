<template>
 
    <el-dialog :title="title" :visible.sync="dialogVisible" size="tiny" style="padding-bottom:20px;">
        <el-form :inline="true" :model="formCustom" class="demo-form-inline" ref="formCustom" label-width="100px">
            <el-form-item label="参数类型名称" prop="name">
                <el-input v-model="formCustom.name" ></el-input>
            </el-form-item>
            <el-form-item label="参数类型" prop="code">
                <el-input v-model="formCustom.code"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" style="float:right;padding-bottom:20px;">
            <el-button  @click="close()">取 消</el-button>
            <el-button type="primary" @click="submit()" v-waves :loading="loading">确 定</el-button>
       </span>
    </el-dialog>
</template>
<script>
    import {global} from '../../global/global';
    export default{
        data(){
            return{
                 dialogVisible:false,
                 loading:false,
                 formCustom:{
                    name:'',
                    code:''
                 },
            }
        },
        props:['title'],
        mounted(){
           
        },
        methods:{
            //点击确定提交时
            submit(){
                let vm=this;
                console.log(this.title);
                if(vm.title=='添加'){
                    global.submitCommon('/city-tucs-contr/parametersTypeSys/save?',vm.formCustom,function(){vm.$emit('submit')},'添加成功','添加失败');
                }
                else if(vm.title=='编辑'){
                    global.submitCommon('/city-tucs-contr/parametersTypeSys/update',vm.formCustom,function(){vm.$emit('submit')},'编辑成功','编辑失败');
                }
                vm.close();
            },
            //取消窗口关闭并且表单清空
            close(){
                global.resetForm(this.formCustom);//表单数据清空
                this.dialogVisible=false;
            },
            //弹出框显示并且表单清空
            show(){
                this.dialogVisible=true;
                global.resetForm(this.formCustom);
            },
            //弹出框显示并给表单赋值。
            form(val){
                this.dialogVisible=true;
                this.formCustom=val;
            },
        }
    }
</script>