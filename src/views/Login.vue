<template>
    <div class="view-login view-register">
        <div class="view-logoBox">
            <img src="../assets/img/logo_blue.png" alt="">
        </div>
        <div class="login-content">
            <div class="left">
                <img src="../assets/img/newbg.png" alt="">
            </div>
            <div class="right" v-show="isLogin">
                <div class="right-content">
                    <h2 class="title">账号登录</h2>
                    <div class="login-tab">
                        <el-form ref="user" :model="user" :rules="rulesForIn">
                            <el-form-item prop="username">
                                <el-input placeholder="请输入账号" v-model="user.username"></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input placeholder="请输入密码" v-model="user.password" show-password></el-input>
                            </el-form-item>
                            <el-form-item>
                                <div class="flex-between">
                                    <div>
                                        <input type="checkBox" @click="checked"></input>
                                        <span class="el-form-input" ref="autoLogin">下次自动登录</span>
                                    </div>
                                    <button class="el-form-btn">
                                        <span class="el-form-forgetPassWord">忘记密码?</span>
                                    </button>
                                </div>
                            </el-form-item>
                        </el-form>
                        <div class="form-bottom-box">
                            <div class="login-btn">
                                <button class="loginBtn" @click="login">
                                    <span>登录</span>
                                </button>
                            </div>
                            <div class="flex-between text-right font14" style="margin-top: 30px">
                                <span>
                                    还没有账号?
                                   <button class="main-color" style="cursor:pointer;background-color: white">
                                        <span @click="isLogin=!isLogin">去注册</span>
                                    </button>
                                </span>
                            </div>
                            <div class="qr-box">
                                <div class="qr-code"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right" v-show="!isLogin">
                <div class="right-content">
                    <h2 class="title">注册账号</h2>
                    <div class="login-tab">
                        <el-form ref="loginUser" :model="loginUser" :rules="rulesForLogin">
                            <el-form-item prop="accountName">
                                <el-input placeholder="请输入账号" v-model="loginUser.accountName"></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input placeholder="请输入密码" v-model="loginUser.password"
                                          show-password></el-input>
                            </el-form-item>
                            <el-form-item prop="password2">
                                <el-input placeholder="请再次输入密码" v-model="loginUser.password2"
                                          show-password></el-input>
                            </el-form-item>
                            <el-form-item>
                                <p class="font16 font-bold" style="text-align:left;">请选择身份</p>
                                <div class="role-box">
                                    <div class="item flex-align" :class="{active:active}" @click="beTeacher">
                                        <img src="../assets/icon-teacher.png" class="icon" alt="">
                                        <span class="name">老师</span>
                                    </div>
                                    <div class="item flex-align" :class="{active:!active}" @click="beStudent">
                                        <img src="../assets/icon-student.png" class="icon" alt="">
                                        <span class="name">学生</span>
                                    </div>
                                </div>
                            </el-form-item>
                            <el-form-item prop="name">
                                <el-input placeholder="请输入姓名" v-model="loginUser.name"></el-input>
                            </el-form-item>
                            <el-form-item prop="school">
                                <el-select
                                    v-model="loginUser.school"
                                    filterable
                                    remote
                                    reserve-keyword
                                    placeholder="请输入学校名"
                                    :remote-method="querySchool"
                                    :loading="schoolLoading">
                                    <el-option
                                        v-for="(item,index) in schoolOptions"
                                        :key="index"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item v-show="!loginUser.isTeacher" prop="studentId">
                                <el-input placeholder="请输入学号" v-model="loginUser.studentId"></el-input>
                            </el-form-item>
                        </el-form>
                        <div class="form-bottom-box">
                            <div class="login-btn">
                                <button class="loginBtn" @click="loginAcc">
                                    <span>注册</span>
                                </button>
                            </div>
                            <div class="flex-between text-right font14" style="margin-top: 30px;margin-bottom: 15px">
                                <span>
                                    已有账号?
                                   <button class="main-color" style="cursor:pointer;background-color: white">
                                        <span @click="isLogin=!isLogin">去登录</span>
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import url from "network/url";
import {getRequest, postRequest} from "network/request";

export default {
    components: {},
    data() {
        return {
            user: {
                username: "",
                password: "",
            },
            //注册的信息
            loginUser: {
                accountName: "",
                password: "",
                password2: "",
                name: "",
                isTeacher: true,
                school: "",
                studentId:null,
            },
            schoolLoading: true,
            isLogin: true,
            active: true,
            //学校搜索
            school: [],
            schoolOptions:[],
            //登录的表单验证
            rulesForIn: {
                username: [
                    {required: true, message: "不能为空", trigger: "blur"}
                ],
                password: [
                    {required: true, message: "不能为空", trigger: "blur"}
                ],
            },
            //注册的表单验证
            rulesForLogin: {
                accountName: [
                    {required: true, message: "不能为空", trigger: "blur"}
                ],
                password: [
                    {required: true, message: "不能为空", trigger: "blur"}
                ],
                password2: [
                    {required: true, message: "不能为空", trigger: "blur"},
                    {  validator: (rul, value, callback) => {
                            if (this.loginUser.password2!==this.loginUser.password) {
                                callback(new Error('两次输入的密码不能不相同！'))
                            } else {
                                callback()
                            }
                        }, trigger: "blur"}
                ],
                name: [
                    {required: true, message: "不能为空", trigger: "blur"},
                ],
                school: [
                    {required: true, message: "不能为空", trigger: "blur"}
                ],
                studentId:[
                    {require:true,message:"不能为空",trigger:"blur"}
                ]
            },
            // 初始化下次自动登录框状态
            autoLogin: false,
        };
    },
    computed: {},
    watch: {
      isLogin(newT){
        if (newT){
          window.removeEventListener("keydown", this.keyDown2, false);
          window.addEventListener("keydown", this.keyDownL);
          this.resetForm('loginUser')
        }
        else {
          window.removeEventListener("keydown", this.keyDownL, false);
          window.addEventListener("keydown", this.keyDown2);
          this.resetForm('user')
        }
      }
    },
    methods: {
        beTeacher() {
            this.active = true;
            this.loginUser.isTeacher = true;
        },
        beStudent() {
            this.active = false;
            this.loginUser.isTeacher = false;
        },
        querySchool(query){
            if (query !== '') {
                this.schoolLoading = true;
                setTimeout(() => {
                    this.schoolLoading = false;
                    this.schoolOptions = this.school.filter(item => {
                        return item.value.toLowerCase()
                            .indexOf(query.toLowerCase()) > -1;
                    });
                }, 200);
            } else {
                this.schoolOptions = [];
            }
        },
        checked(event) {
            if (event.target.checked) {
                this.$refs.autoLogin.style.color = "#4285f4";
            } else {
                this.$refs.autoLogin.style.color = "#2C3E50";
            }
        },
      keyDownL(e) {
        // 回车则执行登录方法 enter键的ASCII是13
        if (e.keyCode === 13) {
          this.login(); // 定义的登录方法
        }
      },
      keyDown2(e) {
        // 回车则执行登录方法 enter键的ASCII是13
        if (e.keyCode === 13) {
          this.loginAcc(); // 定义的登录方法
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 登录
        login() {
            this.$refs.user.validate().then(() => {
                getRequest(url.user.loginKtp, {
                    accountName: this.user.username,
                    password: this.user.password
                }).then(result => {
                    if (result.success) {
                        sessionStorage.setItem("accountName",this.user.username);
                        sessionStorage.setItem('heads', JSON.stringify([]));
                        this.$message({
                            type:"success",
                            message:"登录成功！"
                        });
                        this.$router.push({
                            path: "/main",
                        })
                    } else {
                        this.$message({
                            type:"error",
                            message:result.message
                        });
                    }
                })
            })

        },
        //注册
        loginAcc() {
            this.$refs.loginUser.validate().then(() => {
                postRequest(url.user.loginAccount, {}, {
                    accountName: this.loginUser.accountName,
                    password: this.loginUser.password,
                    name: this.loginUser.name,
                    role: this.loginUser.isTeacher ? 1 : 0,
                    school: this.loginUser.school,
                    userId:this.loginUser.studentId,
                }).then(result => {
                    console.log(result)
                    if (result.success) {
                        this.$message({
                            type:"success",
                            message:"创建成功"
                        })
                        window.location.reload();
                    }else{
                        this.$message({
                            type:"error",
                            message:result.message,
                        })
                        this.recover()
                    }
                })
            })
        },
        recover(){
            //注册的信息
            this.loginUser =  {
                accountName: "",
                    password: "",
                    password2: "",
                    name: "",
                    isTeacher: true,
                    school: "",
                    studentId:null,
            }
        },
        //学校搜索
        loadAll() {
            getRequest(url.school.getAllSchool,{}).then(result=>{
                let s = result.r;
                for (let i = 0; i < s.length; i++) {
                    this.school.push({value: s[i]})
                }
            })
        },
    },
    mounted() {
        this.loadAll();
      window.addEventListener("keydown", this.keyDownL);
    },
  destroyed() {
    // 销毁事件
    if (this.isLogin)
    window.removeEventListener("keydown", this.keyDownL, false);
    else
      window.removeEventListener("keydown", this.keyDown2, false);
  },
};
</script>
<!--给HTML的DOM节点加一个不重复data属性(形如：data-v-2311c06a)来表示他的唯一性-->
<!--为了使样式私有化（模块化），不对全局造成污染，可以在style标签上添加scoped属性以表示它的只属于当下的模块-->
<style scoped>
.el-form-item__content {
    margin-left: 0 !important;
}
>>>.el-select {
    width: 100%;
}
.font16 {
    font-size: 16px;
}

.view-register {
    display: flex;
    flex-direction: column;
    background-size: 100%;
    background-repeat: no-repeat;
    padding-top: 20px;
}

.view-login {
    position: relative;
    width: 100%;
    background: rgb(248, 249, 250) no-repeat;
    align-items: center;
    justify-content: center;
}

.view-register .view-logoBox {
    position: absolute;
    top: 48px;
    left: 62px;
    cursor: pointer;
}

.login-content {
    margin-top: 100px;
    margin-left: 40px;

    flex: 1 1 0;
    display: flex;
    align-items: center;
}

.login-content .left {
    margin-right: -100px;
}

.right {
    margin: 12px 0;
}

.view-login .login-content .right .right-content {
    width: 431px;
    padding: 0px 35px;
    background: rgb(255, 255, 255);
    border: 1px solid rgb(238, 238, 238);
    box-shadow: rgb(85 108 144 / 7%) 0px 0px 61px 0px;
}

.view-login .login-content .right .title {
    position: relative;
    padding: 18px 0px;
    text-align: center;
}

.view-login .login-content .right .login-tab {
    margin-top: 20px;
}

.login-input {
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dadce0;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 48px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;
}

.el-login-form {
    margin-bottom: 20px;
}


.el-form-input {
    display: inline-block;
    padding-left: 6px;

    height: 25px;
    line-height: 25px;

}

.el-form-forgetPassWord {
    font-size: 14px;
    color: rgb(116, 120, 124);
}

.el-form-btn {
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    background: rgb(255, 255, 255);
}

.view-login .login-content .right .form-bottom-box {
}

.form-bottom-box .loginBtn {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #4285f4;
    text-align: center;
    border-radius: 5px;
    border-color: white;
    color: #fff;
    font-size: 16px;
    /*margin-top: 13px;*/
    outline: none;
    cursor: pointer;
}

.loginBtn:hover {
    background-color: #689df6;
}

.font14 {
    font-size: 14px;
}

.text-right {
    text-align: right;
}

.main-color {
    color: #4285f4;
}

.view-login .login-content .right .qr-box {
    overflow: hidden;
    margin: 0 -35px 0;
}

.view-login .login-content .right .qr-box .qr-code {
    position: relative;
    height: 70px;
    width: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    /*background:  no-repeat 0 0/cover;*/
    transform: rotateY(180deg);
}

.font-bold {
    font-weight: 700;
}

.view-login .role-box {
    margin-top: 14px;

    display: flex;
    justify-content: space-between;
}

.role-box .item {
    display: flex;
    align-items: center;
    width: 172px;
    padding: 8px 16px;
    border: 1px solid #fff;
}

.item .name {
    /* font-size: 14px; */
    font-family: MicrosoftYaHei, serif;
    text-align: center;
    color: #3c4043;
    line-height: 24px;
    letter-spacing: 1px;
}

.item .icon {
    margin-right: 9px;
    display: block;
    width: 42px;
    height: 42px;
    border-radius: 50%;
}

.role-box .active {
    border: 1px solid #4285f4;
}

input[type=checkbox] {
    cursor: pointer;
    position: relative;
    width: 15px;
    height: 15px;
    font-size: 14px;
}

input[type=checkbox]::after {
    position: absolute;
    top: 0;
    color: #000;
    width: 15px;
    height: 15px;
    display: inline-block;
    visibility: visible;
    padding-left: 0px;
    text-align: center;
    content: ' ';
    border-radius: 3px
}

input[type=checkbox]:checked::after {
    content: "✓";
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    background-color: #4285f4;
}

input::-webkit-input-placeholder {
    color: #DCDFE9;
}
</style>