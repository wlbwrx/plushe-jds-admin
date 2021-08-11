
<template>
    <div class="plushe-jds-login">
        <div class="jds-login">
            <h3>分销登录系统</h3>
            <ul class="form_login">
                <li>
                    <span><i class="el-icon-user"></i></span>
                    <el-input v-model="userForm.username" placeholder="请输入账户"></el-input>
                </li>
                <li>
                    <span><i class="el-icon-lock"></i></span>
                    <el-input v-model="userForm.password" type="password" placeholder="请输入密码"></el-input>
                </li>
            </ul>
            <el-button class="jds-login-btn" type="primary" @click="submitForm">登录系统</el-button>
        </div>
    </div>
</template>

<script>
    // import { loginData } from '@/api/user';
    export default {
        data() {
            return {
                userForm: {
                    browserName: "string",
                    ipAddress: "string",
                    osName: "string",
                    password: "123456",
                    platformId: 0,
                    shopsId: 0,
                    username: "plushezt1",
                }
            }
        },
        created(){

        },
        methods: {
            submitForm() {
                this.$store
                    .dispatch('login', this.userForm)
                    .then(() => {
                        this.$router.push('/');
                    }) 
                    .catch(() => {
                        this.$message({
                            type: 'error',
                            message: '登录失败!'
                        });
                    })
            }
        }
    }
</script>

<style lang="less" scoped>
    .plushe-jds-login{
        width:100%;
        height:100vh;
        background:#1f2029; //#f5f93c
        .jds-login{
            position:fixed;
            top:50%;left:50%;
            width:440px;
            height:400px;
            margin-left:-220px;
            margin-top:-200px;
            border-radius:6px;
            background:#2a2b38 url('../../assets/images/loginBg.svg');
            background-position: bottom center;
            background-repeat: no-repeat;
            background-size: 300%;
            padding:50px 35px;
            h3{
                color:#c4c3ca;
                font-size:25px;
                margin-bottom:30px;
                font-weight:bold;
            }
        }
        .form_login{
            li{
                display:-webkit-flex;
                display:flex;
                background:#1f2029;
                padding:5px 15px;
                margin-bottom:15px;
                color:#c4c3ca;
                border-radius:5px;
                span{
                    line-height: 40px;
                    color:#f5f93c;
                }
                .el-input{
                    /deep/.el-input__inner{
                        background:transparent;
                        border:0;
                        color:#c4c3ca;
                    }
                }
            }
        }
        .jds-login-btn{
            width:100%;
            margin-top:20px;
        }
    }
</style>