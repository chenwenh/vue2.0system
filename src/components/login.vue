<template>
    <div class="login-container">
        <el-form autoComplete="on" :model="formCustom" :rules="loginRules" ref="formCustom" label-position="left"
                 label-width="0px"
                 class="card-box login-form">
            <h3 class="title">系统登录<i class="fa fa-tripadvisor" aria-hidden="true"></i></h3>
            <el-form-item  prop="insCode">
                <span class="svg-container"><i class="fa fa-user-circle-o" aria-hidden="true"></i></span>
                <el-input v-model="formCustom.insCode" placeholder="机构号"></el-input>
            </el-form-item>
            <el-form-item prop="user">
                <span class="svg-container"><i class="fa fa-user-circle-o" aria-hidden="true"></i></span>
                <el-input name="email" type="text" v-model="formCustom.user" 
                          placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="passwd">
                <span class="svg-container"><i class="fa fa-lock" aria-hidden="true"></i></span>
                <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="formCustom.passwd"
                          autoComplete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin" v-waves>
                    登录
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {   
      name: 'login',
      data() {
            const validateInsCode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入机构号'));
                } else {
                    callback();
                }
            };
			const validateUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    callback();
                }
            };
			const validatePasswd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
        return {
            formCustom: {
                insCode:'',
                user:'',
                passwd:'',
            },
            loginRules: {
               insCode: [
                    { validator: validateInsCode, trigger: 'blur' }
                ],
                user: [
                    { validator: validateUser, trigger: 'blur' }
                ],
                passwd: [
                    { validator: validatePasswd, trigger: 'blur' }
                ],

            },
            loading: false,
            showDialog: false
        }
      },
      methods: {
        handleLogin() {
            this.$refs.formCustom.validate(valid => {
                if (valid) {
                    this.loading = true;
                    var  par = JSON.parse(JSON.stringify(this.formCustom)) ;
                    this.$store.dispatch('Login', par).then(() => {
                        this.loading = false;
                        this.$router.push({ path: '/' });
                    }).catch(err => {
                        this.$message.error(err);
                        this.loading = false;
                    });
                } else {
                  console.log('error submit!!');
                  return false;
                }
            });
        },
      },
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .tips{
      font-size: 14px;
      color: #fff;
      margin-bottom: 5px;
    }
    .login-container {
        height: 100vh;
        background: url('../assets/img/bg_sky.jpg') no-repeat;
        background-size: cover;
        
        input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
            -webkit-text-fill-color: #fff !important;
        }
        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: #eeeeee;
            height: 47px;
        }
        .el-input {
            display: inline-block;
            height: 47px;
            width: 84%;
        }
        .svg-container {
            padding: 6px 5px 6px 15px;
            width: 40px;
            float: left;
            text-align: center;
            color: #889aa4;
            font-size: 20px;
        }

        .title {
            font-size: 26px;
            font-weight: 400;
            color: #eeeeee;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }

        .login-form {
            position: absolute;
            left: 0;
            right: 0;
            width: 400px;
            padding: 35px 35px 15px 35px;
            margin: 120px auto;
        }

        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }

        .forget-pwd {
            color: #fff;
        }
    }
</style>
