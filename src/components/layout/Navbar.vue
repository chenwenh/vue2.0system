<template>
    <div>
        <div class="header">
            <span class="title">后台管理系统</span>
            <el-popover ref="popover1" placement="right" width="200" trigger="hover" content="菜单栏展开或收缩">
            </el-popover>
            <i class="fa fa-bars" v-popover:popover1 @click="toggleSideBar"></i>
            <div class="right">
                <span @click="dialogFormVisible = true">修改密码</span>
                <span @click="logout">退出登录</span>
            </div>
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
        methods:{
            toggleSideBar(){
              
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
<style>
    .header {
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: #CCC;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
    }
    
    .title {
        width: 200px;
        text-align: center;
        display: inline-block;
        color: black;
    }
    
    i {
        cursor: pointer;
    }
    
    .right {
        float: right;
        padding-right: 30px;
        cursor: pointer;
    }
</style>