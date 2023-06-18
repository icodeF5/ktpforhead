<template>
    <div>
        <header>
            <div class="head-layout">
                <img src="../.././assets/theme/29.png" alt="" class="bg">
                <div class="head-top">
                    <div class="left">
                        <h1>{{ showClass.name }}</h1>
                        <h2>{{ showClass.className }}</h2>
                        <div class="class-message">
                            <span class="class-code">
                                <img alt="" src="../../assets/img/addCode.png">
                                <span style="font-size: 14px">课程码：{{ showClass.code }}</span>
                            </span>
                            <span style="font-size: 16px;cursor:pointer;" @click="showClassMember">
                                已有{{ showClass.personNum }}人加入
                            </span>
                        </div>
                    </div>
                    <div class="right">
                        <div v-show="isOwner">
                            <span class="change" style="margin-right: 8px">
                                <i class="el-icon-setting"></i>
                                课程设置
                            </span>
                            <span class="change" style="margin-right: 8px">
                                <i class="el-icon-edit-outline"></i>
                                课堂评价
                            </span>
                            <span class="packdownload" style="margin-right: 8px">
                                <i class="el-icon-document-copy"></i>
                                打包下载
                            </span>
                            <span class="change" style="margin-right: 8px" @click="showClassMember">
                                <i class="el-icon-user"></i>
                                成员管理
                            </span>
                            <span style="cursor:pointer;">
                                <i class="el-icon-sell"></i>
                                更换皮肤
                            </span>
                        </div>
                        <div class="flex-align group">
                            <span style="cursor:pointer;margin-right: 20px" v-show="isOwner">
                                <i class="el-icon-view"></i>
                                学生视角
                            </span>
                            <span style="cursor:pointer;" v-show="isOwner">
                                <i class="el-icon-share"></i>
                                分享&评审
                            </span>
                            <el-button round style="color: #df5000" v-show="isOwner">
                                <i class="el-icon-video-play" style="margin-right: 20px"></i>
                                开始上课
                            </el-button>
                            <el-button round disabled v-show="!isOwner">
                                <i class="el-icon-video-play" style="margin-right: 20px"></i>
                                暂无课堂
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="head-bottom flex-align">
                <div class="bar flex-align">
                    <div class="bar-item" :class="{active:active===1}" @click="active=1">课程学习</div>
                    <div class="bar-item" :class="{active:active===2}" @click="active=2">学情分析</div>
                    <div class="bar-item" :class="{active:active===3 }" @click="active=3">成绩管理</div>
                    <div class="bar-item" :class="{active:active===4}" @click="active=4">课程介绍</div>
                </div>
            </div>
        </header>
        <div class="component-layout">
            <div class="study-content" v-show="active===1">
                <div class="tabs-contain">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="目录" name="MuLu">
                            <div class="mulu">
                                <div class="flex-between head-tip">
                                    <div class="tip">
                                        <span>共0个章节</span>
                                        <span class="ml-8">共0个活动</span>
                                    </div>
                                </div>
                                <NoData/>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="互动课件" name="KeJian">
                            <div class="kejian">
                                <div class="flex-between head-tip">
                                    <div class="tip">
                                        <span>共0个活动</span>
                                    </div>
                                </div>
                                <NoData/>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="作业" name="ZuoYe">
                            <div class="zuoye" v-show="isShow">
                                <div class="flex-between head-tip" v-show="!isOwner">
                                    <div class="tip">
                                        <span>共{{ homeWork.length }}个活动</span>
                                    </div>
                                </div>
                                <div v-show="isOwner" class="head-box flex-between">
                                    <h3>
                                        <span>共{{ homeWork.length }}个活动</span>
                                    </h3>
                                    <div class="flex-align">
                                        <el-button round type="success" size="medium" @click="dialog = true">
                                            <i class="el-icon-plus"></i>
                                            <span>添加作业</span>
                                        </el-button>
                                    </div>
                                </div>
                                <NoData v-show="homeWork.length===0"/>
                                <div v-show="homeWork.length!==0">
                                    <ul class="course-list-box">
                                        <li v-for="(h,index) in homeWork" :key="index" class="flex-between">
                                            <HomeWork :work="h"/>
                                        </li>
                                    </ul>
                                </div>
                                <el-dialog title="新建作业" :visible.sync="dialog" width="60%"
                                           :close-on-click-modal="false">
                                    <el-form :model="newWork" red="newWork" :rules="newWorksRule">
                                        <el-form-item label="作业标题" :label-width="labelWidth"
                                                      size="medium" prop="title">
                                            <el-input v-model="newWork.title" autocomplete="off" maxlength="70"
                                                      minlength="0">
                                                <template slot="suffix">
                                                    {{ newWork.title.length }}/70
                                                </template>
                                            </el-input>
                                        </el-form-item>
                                        <quill-editor v-model="newWork.des" style="margin-bottom: 25px"></quill-editor>
                                        <el-form-item label="选择时间" :label-width="labelWidth" size="medium"
                                                      prop="time">
                                            <el-date-picker
                                                style="float: left"
                                                v-model="newWork.time"
                                                type="daterange"
                                                range-separator="至"
                                                start-placeholder="开始日期"
                                                end-placeholder="结束日期"
                                                dataformatas="yyyy-MM-dd">
                                            </el-date-picker>
                                        </el-form-item>
                                        <el-form-item label="总分" :label-width="labelWidth" size="medium" prop="score">
                                            <el-input v-model="newWork.score" placeholder="不限制" maxlength="10"
                                                      style="width: 200px;float:left;"
                                                      oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+2)}">
                                            </el-input>
                                        </el-form-item>
                                    </el-form>
                                    <div slot="footer" class="dialog-footer">
                                        <el-button @click.native="cancelCreate">取消</el-button>
                                        <el-button type="primary" @click.native="createWork">确定</el-button>
                                    </div>
                                </el-dialog>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="测试" name="CeShi">
                            <div class="ceshi">
                                <div class="flex-between head-tip">
                                    <div class="tip">
                                        <span>共0个活动</span>
                                    </div>
                                </div>
                                <NoData/>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="资料" name="ZiLiao">
                            <div class="ziliao">
                                <div class="flex-between head-tip">
                                    <div class="tip">
                                        <span>共0个活动</span>
                                    </div>
                                </div>
                                <el-tabs v-model="activeName2" @tab-click="handleClick2">
                                    <el-tab-pane label="学习资料" name="study">
                                        <NoData/>
                                    </el-tab-pane>
                                    <el-tab-pane label="慕课资料" name="muke">
                                        <NoData/>
                                    </el-tab-pane>
                                    <el-tab-pane label="录屏录像" name="luping">
                                        <NoData/>
                                    </el-tab-pane>
                                    <el-tab-pane label="直播录像" name="zhibo">
                                        <NoData/>
                                    </el-tab-pane>
                                </el-tabs>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="腾讯会议" name="HuiYi">
                            <div class="huiyi">
                                <div class="flex-between head-tip">
                                    <div class="tip">
                                        <span>共0个活动</span>
                                    </div>
                                </div>
                                <NoData/>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="公告" name="GongGao">
                            <div class="gonggao">
                                <div class="flex-between head-tip">
                                    <div class="tip">
                                        <span>共0个活动</span>
                                    </div>
                                </div>
                                <NoData/>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="话题" name="HuaTi">
                            <div class="huati">
                                <div class="tool-bar flex-align">
                                    <div class="left" style="margin-top: 10px">
                                        <span>共0个活动</span>
                                    </div>
                                    <div class="right flex-align">
                                        <el-button type="success" round>添加话题</el-button>
                                    </div>
                                </div>
                                <NoData/>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="互动答题" name="HuDong">
                            <div class="hu-dong">
                                <div class="flex-between head-tip">
                                    <div class="tip">
                                        <span>共0个活动</span>
                                    </div>
                                </div>
                                <NoData/>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from "vuex";
import {getRequest, postRequest} from "network/request";
import url from "network/url";
import NoData from "components/NoData.vue";
import HomeWork from "components/classDetail/HomeWork.vue";
import axios from "axios";

export default {
    name: 'HeaderTop',
    components: {HomeWork, NoData},
    props: ['showClassCode'],
    data() {
        return {
            active: 1,
            //学情分析
            activeName: sessionStorage.getItem("classDetail") || "MuLu",
            activeName2: "study",
            //作业
            homeWork: [],
            isOwner: true,
            //作业
            labelWidth: "85px",
            dialog: false,
            newWork: {
                title: "",
                des: "",
                time: "",
                allScore: 0,
            },
            newWorksRule: {
                title: [
                    {required: true, message: "请输入作业标题", trigger: "blur"}
                ],
                time: [
                    {required: true, message: "不能为空", trigger: "blur"}
                ],
                score: [
                    {required: true, message: "不能为空", trigger: "blur"}
                ],
            },
            isShow: false,
        }
    },
    computed: {
        ...mapState(['showClass'])
    },
    methods: {
        //学情分析
        handleClick(tab, e) {
            sessionStorage.setItem("classDetail", tab.name)
        },
        handleClick2(tab, e) {
        },
        cancelCreate() {
            this.dialog = false;
        },
        showClassMember(){
            this.$bus.$emit("show",'成员')
        },
        //删除作业
        deleteHomework(work){
            for(let i =0;i<this.homeWork.length;i++){
                if(work.id===this.homeWork[i].id){
                    this.homeWork.splice(i,1)
                    break;
                }
            }
        },
        createWork() {
            this.dialog = false;
            postRequest(url.homeWork.publishWork, {
                accountName:sessionStorage.getItem("accountName")
            }, {
                title: this.newWork.title,
                allScore: Number.parseFloat(this.newWork.allScore),
                des: this.newWork.des,
                startTime: this.newWork.time[0],
                endTime: this.newWork.time[1],
                code: this.showClass.code
            }).then(result => {
                this.$message({
                    type: 'success',
                    message: "发布成功"
                })
                window.location.reload()
            })
        },
        iniAll() {
            getRequest(url.homeWork.getAllWork, {
                code: this.showClassCode
            }).then(result => {
                this.isShow = false
                this.homeWork = result.r == null ? [] : result.r;
                this.isShow = true;
            })
            getRequest(url.course.getByCode, {
                code: this.showClassCode
            }).then(result => {
                this.isShow = false
                this.$store.state.showClass = result.r
                this.isOwner = result.r.ownerId === sessionStorage.getItem("accountName")
                this.showClass = true
                this.isShow = true
            })
        }
    },
    mounted() {
        this.$bus.$on("deleteHomework",this.deleteHomework)//给HomeWork组件使用
        this.iniAll()
    }
}
</script>
<style scoped>
>>> .ql-editor {
    min-height: 150px;
}

.view-class-detail .head-layout .head-top {
    position: absolute;
    width: 1309px;
    height: 200px;
    left: 0;
    top: 0;
    padding: 24px;
    color: #fff;
    display: flex;
}

.view-class-detail .head-layout .head-top .left {
    flex: 1;
}

.view-class-detail .head-layout .head-top .right .packdownload {
    cursor: pointer;
    margin-right: 10px;
}

.view-class-detail .head-layout .head-top .right .change {
    cursor: pointer;
    align-self: flex-end;
}

.view-class-detail .head-layout .head-top .right .group {
    position: absolute;
    right: 24px;
    bottom: 24px;
}

.view-class-detail .head-layout .head-top .right {
    display: flex;
    flex-direction: column;
    font-size: 14px;
}

h1, h2 {
    text-align: left;
}

h1 {
    font-size: 36px;
}

h2 {
    font-size: 20px;
    line-height: 32px;
    font-weight: 400;
}

.view-class-detail .head-layout {
    position: relative;
    background: #e8f0ff;
    border-radius: 8px 8px 0 0;
    height: 200px;
}

.view-class-detail .head-bottom {
    width: 1309px;
    height: 64px;
    color: #3c4043;
    font-size: 14px;
    font-weight: 400;
    justify-content: center;
    background: #fff;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
}


.view-class-detail .head-layout .bg {
    border-radius: 8px 8px 0 0;
    width: 1309px;
    height: 200px;
    background-color: #3367d5;
}

.view-class-detail .head-layout .head-top {
    position: absolute;
    width: 1296px;
    height: 200px;
    left: 0;
    top: 0;
    padding: 24px;
    color: #fff;
}

.head-layout .class-message {
    margin-top: 55px;
    font-size: 14px;
    font-weight: 400;
    text-align: left;
}

.class-code {
    margin-right: 20px;
    font-size: 16px;
    cursor: pointer;
}

.btn {
    position: absolute;
    bottom: 20px;
    right: 20px;
}

.bar .bar-item {
    cursor: pointer;
    height: 40px;
    line-height: 40px;
    margin: 0 24px;
    text-align: center;
    font-size: 20px;
    padding-left: 5px;
    padding-right: 5px;
}

a {
    display: block;
    color: black;
}

.active {
    background: #e8f0ff;
    color: #4285f4;
    border-radius: 10px;
}

.view-class-detail .component-layout {
    margin: 10px 0 0 0;
}

.tabs-contain >>> .el-tabs__nav-wrap::after {
    position: static !important;
}

.study-content {
    min-height: 500px;
}

.tabs-contain {
    position: relative;
}

.plugins-coursetab-box {
    margin: 12px 0;
    background-color: #fff;
}

.tool-bar {
    justify-content: space-between;
    font-size: 14px;
}

.flex-align {
    display: flex;
    align-items: center;
}

.ml-8 {
    margin-left: 8px;
}

.cmp-work-edit-dialog {
    font-size: 12px;
}

.cmp-work-edit-dialog .body .title-txt {
    width: 80px;
    line-height: 30px;
    font-weight: 700;
}

.head-box {
    align-items: center;
    margin-top: 10px;
}

.course-list-box {
    border: 1px solid #e7ebf0;
    border-radius: 8px;
    margin-top: 8px;
    margin-bottom: 10px;
}

.course-list-box > li {
    padding: 10px 16px 0 16px;
    background: #fff;
    overflow: hidden;
}
</style>