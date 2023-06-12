<template>
    <div class="component-home_card">
        <span v-show="sClass.isMix" class="tag-flag-pattern bg-y ">混合</span>
        <div class="header-info" :style="{backgroundImage:`url(${bcImg})`}" @click="toClassDetail">
            <p class="time">
                {{ sClass.startTime }}-{{ sClass.endTime }}学期
            </p>
            <h3 class="name text_overflow1">{{ sClass.name }}</h3>
            <p class="classname text_overflow1">{{ sClass.className }}</p>
            <div class="qrcode">
                <img alt="" src="../assets/img/addCode.png">
                <span style="font-size: 14px">课程码：{{ sClass.code }}</span>
            </div>
        </div>
        <div class="content-info">
        </div>
        <div class="user-info">
            <div class="left">
                <span class="tag-flag role-t" v-show="isOwner">教</span>
                <span class="tag-flag role-s" v-show="!isOwner">学</span>
                <span style="cursor:pointer;" v-show="!isOwner">负责人：{{ sClass.ownerName }}</span>
                <span style="cursor:pointer;" v-show="isOwner">成员：{{ sClass.personNum }}</span>
            </div>
            <div class="right">
                <div class="set-top" v-show="!isTop" @click="setTop">
                    <img alt="" src="../assets/set-top.png" style="width: 14px">
                    <span>置顶</span>
                </div>
                <div v-show="isTop" class="set-top" @click="deleteTop">
                    取消置顶
                </div>
                <el-dropdown @command="handleCommand" trigger="click" placement="top-start" v-show='!isOwner'>
                    <img alt="" src="../assets/zankai.png" style="width: 14px;margin-left: 5px">
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a1">归档</el-dropdown-item>
                        <el-dropdown-item command="b1">退课</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown @command="handleCommand2" v-show="isOwner" trigger="click" placement="top-start">
                    <img alt="" src="../assets/zankai.png" style="width: 14px;margin-left: 5px">
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">删除</el-dropdown-item>
                        <el-dropdown-item command="b">编辑</el-dropdown-item>
                        <el-dropdown-item command="c">归档管理</el-dropdown-item>
                        <el-dropdown-item command="d">复制成新课程</el-dropdown-item>
                        <el-dropdown-item command="e">复制到已有课程</el-dropdown-item>
                        <el-dropdown-item command="f">打包下载</el-dropdown-item>
                        <el-dropdown-item command="g">复制到教研室</el-dropdown-item>
                        <el-dropdown-item command="h">转让</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from "vuex";
import axios from "axios";

export default {
    name: "Class",
    props: ['sClass', "top"],
    data() {
        return {
            bcImg: require("../assets/bg/5.png"),
            isTop: this.contains(this.top, this.sClass),
            isOwner: this.sClass.ownerId === sessionStorage.getItem("accountName"),
        }
    },
    methods: {
        handleCommand2(command) {

        },
        //退课方法
        handleCommand(command) {
            if (command === 'b1') {
                this.$confirm('此操作将退出该课程, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.get("http://localhost:8080/course/outClass?accountName=" + sessionStorage.getItem("accountName") +
                        "&code=" + this.sClass.code).then(
                        response => {
                            window.location.reload();
                        },
                        error => {
                            this.$message("错误")
                        }
                    )
                    this.$message({
                        type: 'success',
                        message: '退课成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消退课'
                    });
                });
            }
        },
        setTop() {
            this.$bus.$emit("setTop", {
                accountName: sessionStorage.getItem("accountName"),
                sClass: this.sClass
            })//发到viewHome组件处理
        },
        deleteTop() {
            this.$bus.$emit("deleteTop", {
                accountName: sessionStorage.getItem("accountName"),
                sClass: this.sClass
            })//发送到viewHome组件处理
        },
        toClassDetail() {
            this.$bus.$emit("toClassDetail", this.sClass);
        },
        contains(arr, value) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].name === value.name &&
                    arr[i].isMix === value.isMix &&
                    arr[i].personNum === value.personNum &&
                    arr[i].className === value.className &&
                    arr[i].endTime === value.endTime &&
                    arr[i].startTime === value.startTime &&
                    arr[i].ownerId === value.ownerId &&
                    arr[i].ownerName === value.ownerName &&
                    arr[i].code === value.code) {
                    return true;
                }
            }
            return false;
        },
    },
    mounted() {

    }
}
</script>
<style scoped>
.view-home .tag-flag.role-s {
    background-color: #fff;
    border: 1px solid #4285f4;
    color: #4285f4;
}

.view-home .tag-flag.role-t {
    background-color: #4285f4;
    border: 1px solid #4285f4;
}

.view-home .tag-flag {
    min-width: 20px;
    max-width: 50px;
    height: 18px;
    line-height: 15px;
    display: inline-block;
    border-radius: 2px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    margin-right: 8px;
}

img {
    border: none;
}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}

.el-icon-arrow-down {
    font-size: 12px;
}

.component-home_card .user-info .right .set-top {
    cursor: pointer;
    display: flex;
    align-items: center;
}

.component-home_card {
    display: inline-block;
    margin-left: 20px;
    width: 255px;
    height: 234px;
    background: #fff;
    border: 1px solid #e2e6ed;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
}

.component-home_card .header-info {
    /*background-image: url("../assets/bg/icon-renwu.png");*/
    cursor: pointer;
    padding: 18px 24px;
    height: 152px;
    color: #fff;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    background-color: #3367d5;
}

.component-home_card .header-info .time {
    opacity: .6;
    font-size: 12px;
}

.component-home_card .header-info .name {
    margin-top: 3px;
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Medium, serif;
    font-weight: 500;
    text-align: left;
    color: #fff;
    line-height: 32px;
}

.text_overflow1, .text_overflow2 {
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    white-space: normal;
    -webkit-box-orient: vertical;
}

.component-home_card .header-info .chapter,
.component-home_card .header-info .classname {
    font-family: PingFangSC, PingFangSC-Medium, serif;
    font-weight: 500;
    text-align: left;
    color: #fff;
    line-height: 24px;
}

.component-home_card .header-info .classname {
    font-size: 12px;
}

.component-home_card .header-info .qrcode {
    margin-top: 18px;
    display: flex;
    position: relative;
    font-size: 12px;
    font-family: PingFangSC, PingFangSC-Medium, serif;
    font-weight: 500;
    text-align: left;
    color: #fff;
    line-height: 16px;
}

.component-home_card .content-info {
    cursor: pointer;
    height: 40px;
    padding: 0 20px 16px 20px;
}

.component-home_card .user-info {
    display: flex;
    justify-content: space-between;
    height: 40px;
    padding: 8px 14px 12px;
    font-size: 12px;
    line-height: 16px;
}

.component-home_card .content-info .des p,
.component-home_card .user-info {
    font-family: PingFangSC, PingFangSC-Regular, serif;
    font-weight: 400;
    text-align: left;
    color: #3c4043;
}

.component-home_card .user-info .left,
.component-home_card .user-info .right {
    display: flex;
    align-items: center;
}

.component-home_card .user-info .right .set-top {
    cursor: pointer;
    display: flex;
    align-items: center;
}

.bg-y {
    background: linear-gradient(270deg, #fac966 0, #ffe1ad);
    color: #6b512e;
}

.component-home_card .tag-flag-pattern {
    position: absolute;
    top: 0;
    right: 0;
    width: 62px;
    height: 26px;
    border-radius: 0 0 0 8px;
    border-bottom: 2px solid #fff;
    border-left: 2px solid #fff;
    /*color: #ffefe5;*/
    line-height: 26px;
    font-size: 14px;
    text-align: center;
}

span {
    outline: none;
}
</style>