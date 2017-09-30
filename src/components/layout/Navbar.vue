<template>
    <div>
        <div class="header">
            <span class="title">后台管理系统</span>
            <el-popover ref="popover1" placement="right" width="200" trigger="hover" content="菜单栏展开或收缩"></el-popover>
            <i class="fa fa-bars" v-popover:popover1 @click="toggleSideBar"></i>
            <ul class="right">
                <li><span style="color:white;font-size:14px;">{{userName+'('+roleName+')'}}</span></li>
                <li><i class="el-icon-edit"></i><span @click="dialogFormVisible = true">修改密码</span></li>
                <li><i class="el-icon-setting "></i><span @click="logout">退出登录</span></li>
            </ul>
        </div>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible" >
            <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="原密码" prop="beforePass">
                    <el-input type="password" v-model="ruleForm2.beforePass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="pass">
                    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import {global} from './../../global/global';
    export default{
        data(){
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请输入密码'));
                } else {
                if (this.ruleForm2.checkPass !== '') {
                    this.$refs.ruleForm2.validateField('checkPass');
                }
                callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.pass) {
                callback(new Error('两次输入密码不一致!'));
                } else {
                callback();
                }
            };
            return{
                dialogFormVisible:false,
                ruleForm2: {
                    pass: '',
                    checkPass: '',
                    beforePass: ''
                },
                userName:'',
                roleName:'',
                rules2: {
                    beforePass:[
                        { required: true, message: '请输入原密码', trigger: 'blur' },
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' },
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' },
                    ],
                }
            }
        },
        components:{

        },
        mounted(){
            //获取用户信息。
            let vm=this;
            global.get(`/city-tucs-contr/user/getCurrentUserStatus`,{ params:null},function (res) {
                vm.userName=res.body.bean.userName;
                vm.roleName=res.body.bean.roleName;
            })
        },
        methods:{
            toggleSideBar(){
              this.$emit('toggleSideBar');
            },
            logout() {
                this.$store.dispatch('LogOut').then(() => {
                        location.reload();// 为了重新实例化vue-router对象 避免bug
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }

        }
    }
</script>
<style scoped>
    .header {
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: #3c8dbc;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        color:white;
    }
    .fa-bars{
        border:2px solid white;
        padding:4px 5px;
        border-radius:50%;
    }
    .title {
        width: 200px;
        text-align: center;
        display: inline-block;
        color: white;
        font-size:16px;
    }
    
    i {
        cursor: pointer;
        margin-right:3px;
    }
    
    .right {
        float: right;
        padding-right: 30px;
        cursor: pointer;
    }
    .right li{
        float:left;
        list-style:none;
        padding:0 20px;
        
    }
    .right li:hover{
        background:rgb(54,127,165);
    }
</style>