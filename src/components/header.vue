<template xmlns="">
    <div class="component-header">
        <div class="header-content" v-show="heads.length===0">
            <img src="../assets/img/logo_blue.png" alt="" class="header-left">
            <div class="font14 home-font" @click="toMain">
                我的课堂
            </div>
            <div class="header-right">
                <i class="el-icon-document renwu-icon"  @click="show('任务列表')"></i>
               <el-badge :value="message.length" class="item2">
                   <el-popover
                       placement="bottom"
                       width="420"
                       trigger="click"
                       @show="showMessage">
                       <div class="component-notice">
                           <el-tabs v-model="messageActive" @tab-click="messageHandleClick">
                               <el-tab-pane label="全部活动" name="1">
                                   <MiniMessage v-for="item in message" :key="message.id" :message="item"></MiniMessage>
                                    <div class="text-center" v-show="message.length===0">暂无数据</div>
                               </el-tab-pane>
                               <el-tab-pane label="教学活动" name="2">
                                   <MiniMessage v-for="item in message" :key="message.id" :message="item"></MiniMessage>
                                    <div class="text-center" v-show="message.length===0">暂无数据</div>
                               </el-tab-pane>
                               <el-tab-pane label="教务通知" name="3">
                                   <div class="text-center">暂无数据</div>
                               </el-tab-pane>
                               <el-tab-pane label="系统通知" name="4">
                                   <div class="text-center">暂无数据</div>
                               </el-tab-pane>
                           </el-tabs>
                           <div class="handle flex-between">
                               <div class="btn" @click="readAll">
                                   <el-icon class="el-icon-check"></el-icon>
                                   一键标记为已读
                               </div>
                               <div class="btn" @click="checkAll">
                                   <el-icon class="el-icon-view"></el-icon>
                                   查看全部
                               </div>
                           </div>
                       </div>
                       <i class="el-icon-bell renwu-icon" slot="reference"></i>
                   </el-popover>
               </el-badge>
                <el-dropdown @command="handleCommand">
                    <div class="userinfo">
                        <img alt="" src="../assets/icon-student.png" class="avatar">
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="1">机构认证</el-dropdown-item>
                        <el-dropdown-item command="2">开通vip</el-dropdown-item>
                        <el-dropdown-item command="3">设置</el-dropdown-item>
                        <el-dropdown-item command="4" @click.native="toLogin">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="header-content" v-show="heads.length!==0">
            <div class="header-left">
                <img src="../assets/img/icon-lie.png" style="width: 30px" @click="drawer = true">
            </div>
            <div class="h-hamburger">
                <span @click="toMain">我的课堂</span>
                <span v-for="(c,index) in heads" :key="index">
                        >
                        <span @click="show(c)">{{ c }}</span>
                    </span>
            </div>
            <div class="header-right">
                <i class="el-icon-document renwu-icon" @click="show('任务列表')"></i>
                <el-badge :value="message.length" class="item2">
                    <el-popover
                        placement="bottom"
                        width="420"
                        trigger="click"
                        @show="showMessage">
                        <div class="component-notice">
                            <el-tabs v-model="messageActive" @tab-click="messageHandleClick">
                                <el-tab-pane label="全部活动" name="1">
                                    <MiniMessage v-for="item in message" :key="message.id" :message="item"></MiniMessage>
                                    <div class="text-center" v-show="message.length===0">暂无数据</div>
                                </el-tab-pane>
                                <el-tab-pane label="教学活动" name="2">
                                    <MiniMessage v-for="item in message" :key="message.id" :message="item"></MiniMessage>
                                    <div class="text-center" v-show="message.length===0">暂无数据</div>
                                </el-tab-pane>
                                <el-tab-pane label="教务通知" name="3">
                                    <div class="text-center">暂无数据</div>
                                </el-tab-pane>
                                <el-tab-pane label="系统通知" name="4">
                                    <div class="text-center">暂无数据</div>
                                </el-tab-pane>
                            </el-tabs>
                            <div class="handle flex-between">
                                <div class="btn" @click="readAll">
                                    <el-icon class="el-icon-check"></el-icon>
                                    一键标记为已读
                                </div>
                                <div class="btn" @click="checkAll">
                                    <el-icon class="el-icon-view"></el-icon>
                                    查看全部
                                </div>
                            </div>
                        </div>
                        <i class="el-icon-bell renwu-icon" slot="reference"></i>
                    </el-popover>
                </el-badge>
                <el-dropdown @command="handleCommand">
                    <div class="userinfo">
                        <img alt="" src="../assets/icon-student.png" class="avatar">
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="1">机构认证</el-dropdown-item>
                        <el-dropdown-item command="2">开通vip</el-dropdown-item>
                        <el-dropdown-item command="3">设置</el-dropdown-item>
                        <el-dropdown-item command="4" @click.native="toLogin">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <el-drawer
            size="24%"
            :visible.sync="drawer"
            :direction="direction"
            :before-close="handleClose">
                <span class="dra-tomain" @click="toMain">
                    我的课堂
                </span>
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="我教的课程" name="0" v-show="isTeacher">
                    <MiniClass v-for="c in teachClass2" :key="c.code" :showClass="c"></MiniClass>
                </el-collapse-item>
                <el-collapse-item title="我学的课程" name="1">
                    <MiniClass v-for="c in Class2" :key="c.code" :showClass="c"></MiniClass>
                </el-collapse-item>
                <el-collapse-item title="我协助的课程" name="2">
                </el-collapse-item>
            </el-collapse>
            <template slot="title">
                <div class="logo">
                    <img src="../assets/img/logo_blue.png" style="width: 95px">
                </div>
            </template>
        </el-drawer>
    </div>
</template>
<script>
import {mapState} from "vuex";
import MiniClass from "components/miniClass.vue";
import axios from "axios";
import he from "element-ui/src/locale/lang/he";
import fa from "element-ui/src/locale/lang/fa";
import {getRequest} from "network/request";
import url from "network/url";
import MiniMessage from "components/notification/miniMessage.vue";
import Vue from "vue";

export default {
    name: "Header",
    components: {MiniMessage, MiniClass},
    props: ['heads'],
    data() {
        return {
            drawer: false,
            direction: 'ltr',
            activeNames: [],
            //信息active
            messageActive:"1",
            message:[],
            //作业
            homeWorkId:"",
            //是否是通过提交按钮进入
            submit:false,
            //是否是自己发布的作业
            isOwner:false,
            // 通知跳转的code
            code:"",

            Class2:[],
            teachClass2:[],
        }
    },
    computed: {
        ...mapState(['isTeacher','showClass']),
    },
    methods: {
        //消息tab
        messageHandleClick(val){
            console.log(val)
        },
        //已读所有消息
        readAll(){
            this.$store.dispatch("readAll")
            this.message = []
        },
        //查看所有消息
        checkAll(){
           this.show("通知")
        },
        //设置弹窗
        setMessage(){
            this.$bus.$emit("setMessage",this.message);
        },
        // 忽略信息
        ignoreMessage(message){
          for(let i = 0;i<this.message.length;i++){
              if(this.message[i].id===message.id){
                  this.message.splice(i,1)
                  break;
              }
          }
        },
        toMain() {
            this.drawer = false;
            this.$router.push({
                path: "/main",
            })
        },
        toLogin() {
            this.$confirm('确定退出登录吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '退出成功!'
                });
                sessionStorage.removeItem("accountName");
                sessionStorage.removeItem("heads");
                sessionStorage.removeItem('classTab');
                sessionStorage.removeItem('classDetail');
                sessionStorage.removeItem('tea-tab');
                sessionStorage.removeItem('heads');
                localStorage.removeItem("autoLogin")
                this.$router.push({
                    path: "/login",
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消退出'
                });
            });

        },
        handleChange(val) {

        },
        handleCommand(command) {

        },
        showMessage() {
            console.log("展示信息")
        },
        show(value) {
            if (value === '课程内容') {
                this.$router.push({
                    path: "/main/classDetail",
                    query: {
                        showClassCode: this.showClass.code,
                    }
                })
            } else if (value === '任务列表') {
                this.$router.push({
                    path: "/main/task"
                })
            } else if (value === '作业详细') {
                this.$router.push({
                    path: "/main/homeWork",
                    query: {
                        homeWorkId: this.homeWorkId,
                        showClassCode:this.showClass.code||this.code,
                        submit:this.submit,
                        isOwner:this.isOwner
                    }
                })
            } else if(value==='成员'){
                this.$router.push({
                    path:"/main/classMember",
                    query:{
                        showClassCode:this.showClass.code,
                    }
                })
            }else if(value==='通知'){
                this.$router.push({
                    path:"/main/notification"
                })
            }
        },
        contains(arr, value) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === value) {
                    return true;
                }
            }
            return false;
        },
        handleClose(done) {
            done();
        },
        changeDrawer() {
            this.drawer = false;
        },
        setHomeWork(value,submit,isOwner,code) {
            this.homeWorkId = value
            this.submit = submit
            this.isOwner = isOwner
            this.code = code
        },
        iniALL(){
            axios.all([
                axios({
                    url: "http://localhost:8080/user/getJoinClass",
                    params: {
                        accountName: sessionStorage.getItem("accountName"),
                        isGuiDang:null,
                    }
                }),
                axios({
                    url: "http://localhost:8080/user/getCreatClass",
                    params: {
                        accountName: sessionStorage.getItem("accountName"),
                        isGuiDang:null,
                    }
                }),
                axios({
                    url: "http://localhost:8080/user/isTeacher",
                    params: {
                        accountName: sessionStorage.getItem("accountName")
                    }
                }),
            ]).then(axios.spread((res1,res2,res3)=>{
                this.Class2 = res1.data.r==null?[]:res1.data.r;
                this.teachClass2 = res2.data.r==null?[]:res2.data.r;
                this.$store.state.isTeacher = res3.data.r;
            }))
            getRequest(url.message.getNoRead,{
                accountName:sessionStorage.getItem("accountName")
            }).then(result=>{
                this.message = result.data.r
                this.setMessage()
            })
        }
    },
    mounted() {
        this.$bus.$on("changeDrawer", this.changeDrawer);
        this.$bus.$on("show", this.show);
        this.$bus.$on("setHomeWork", this.setHomeWork);
        this.$bus.$on("ignoreMessage",this.ignoreMessage);//给Message组件使用
        this.$bus.$on("readAll",this.readAll);//给viewHome使用
        this.iniALL();
    },
}
</script>
<style scoped>
.item2{
    margin-right: 5px;
}
>>>.el-badge__content.is-fixed {
    position: absolute;
    top: 6px;
    right: 16px;
    transform: translateY(-50%) translateX(100%);
}
>>>.el-tabs__nav-wrap::after {
    position: static !important;
}

.component-notice {
    padding: 0 24px;
}
.component-notice .handle {
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    color: #4285f4;
    line-height: 20px;
}
.component-notice .handle .btn {
    cursor: pointer;
    width: 50%;
    height: 50px;
    line-height: 50px;
}
.component-header {
    height: 64px;
    width: 100%;
    margin-bottom: 12px;
    box-sizing: border-box;
    box-shadow: 0 0 10px #ccc;
}
.renwu-icon{
    line-height: 35px;
    margin-right: 10px;
    font-size: 20px;
    cursor: pointer;
}
.component-header .header-content {
    position: fixed;
    background-color: #fff;
    top: 0;
    left: 0;
    height: 64px;
    width: 100%;
    z-index: 1000;
    /*padding: 0 28px;*/
    /*margin: 0 28px;*/
    min-width: 900px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 1px 0 0 #dfdfdf;
}

.component-header .header-content .header-left {
    max-height: 27px;
    cursor: pointer;
    margin-left: 20px;
}

.component-header .header-content .header-right {
    display: flex;
    justify-content: space-between;
}

.font16 {
    font-size: 16px;
}

.home-font {
    padding: 0 22px;
    color: #4285f4;
    cursor: pointer;
    height: 60px;
    width: 100px;

    text-align: center;
    line-height: 60px;
    border-bottom: 3px solid #4285f4;
}

.icon-lingdang, .icon-renwu {
    font-size: 20px;
    margin-right: 15px;
    cursor: pointer;
    width: 24px;
}

.header-content .header-right .head-imag {
    cursor: pointer;
    border-radius: 50%;
    background-color: grey;
    width: 35px;
    height: 35px;
    text-align: center;
    line-height: 35px;
    margin-right: 40px;
}

.icon-lingdang, .icon-renwu {
    font-size: 20px;
    margin-right: 15px;
    cursor: pointer;
}

.component-header .header-content .header-right .userinfo {
    cursor: pointer;
    margin-right: 12px;
    display: inline-block;
    position: relative;
}

.component-header .header-content .header-right .userinfo .avatar {
    display: block;
    width: 32px;
    height: 32px;
    border-radius: 50%;
}

.component-header .header-content .h-hamburger {
    flex: 1;
    padding: 0 42px;
    text-align: left;
}

.h-hamburger span {
    cursor: pointer;
}

.h-hamburger span:hover {
    font-family: 黑体, serif;
}

.el-drawer__header > :first-child {
    flex: 1;
}

.el-drawer__header > :first-child {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
}

.dra-tomain {
    display: block;
    width: 100%;
    height: 50px;
    text-align: left;
    line-height: 50px;
    font-size: 16px;
    padding: 0 12px;
    cursor: pointer;
}

.dra-tomain:hover {
    background-color: #ECF3FE;
}

/deep/ .el-collapse-item__header {
    font-size: 16px;
    padding: 0 12px;
}
</style>