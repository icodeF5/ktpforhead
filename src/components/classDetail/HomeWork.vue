<template>
    <div class="card-layout-box" v-show="isShow">
        <div class="layout-left flex-align">
            <img src="../../assets/homeWork.png">
            <div class="another-name">
                <span class="lable-type">作业</span>
            </div>
        </div>
        <div class="layout-right flex-baseline">
            <div class="layout-right-info">
                <h6 class="info-title" @click='showWork'>{{ work.title }}</h6>
                <div class="status-bar">
                    提交截止时间：{{(new Date(work.endTime).toLocaleDateString("zh-CN",timeOption))}}
                    <div class="el-divider el-divider--vertical"></div>
                    <span>已结束</span>
                    <div class="el-divider el-divider--vertical"></div>
                    <span>个人作业</span>
                </div>
                <p class="learning-state" v-show="!isOwner">
                    <span>未提交</span>
                </p>
            </div>
            <div class="layout-right-functional">
                <el-button type="primary" plain @click="submitWork" v-show="!isOwner">提交</el-button>
                <div class="learning-situation" v-show="isOwner">
                    <span class="item-info">
                        <i class="font-color--main">{{status[0]}}</i>
                        <i class="pt-text">已批完</i>
                    </span>
                    <span class="item-info">
                        <i class="font-color--main">{{status[1]}}</i>
                        <i class="pt-text">未批完</i>
                    </span>
                    <span class="item-info">
                        <i class="font-color--main">{{status[2]}}</i>
                        <i class="pt-text">未交</i>
                    </span>
                </div>
                <el-dropdown v-show="isOwner" @command="cm"  trigger="click">
                    <i class="el-icon-more"></i>
                    更多
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">编辑</el-dropdown-item>
                        <el-dropdown-item command="b">移动到章节</el-dropdown-item>
                        <el-dropdown-item command="c">保存到备课区</el-dropdown-item>
                        <el-dropdown-item command="d">删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";

export default {
    name: "HomeWork",
    props: ["work","isOwner"],
    data(){
        return{
            timeOption:{
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            },
            isShow:!this.isOwner,
            status:[],
        }
    },
    methods: {
        submitWork() {
            this.$bus.$emit("setHomeWork", this.work.id,true,this.isOwner)
            this.$bus.$emit("show", '作业详细')
        },
        showWork() {
            this.$bus.$emit("setHomeWork", this.work.id,false,this.isOwner)//传给header
            this.$bus.$emit("show", '作业详细')//传给header

        },
        cm(command){

        },
        iniAll(){
            this.isShow = false
            axios.get("http://localhost:8080/homeWork/status?id="+this.work.id).then(
                response=>{
                    this.status = response.data.r;
                    this.isShow = true
                },
                error=>{
                    this.$message({
                        type:"error",
                        message:"错误"
                    })
                }
            )
        }
    },
    mounted() {
        if(this.isOwner){
            this.iniAll()
        }
    }
}
</script>
<style scoped>
.card-layout-box .layout-right-functional .learning-situation .item-info i {
    display: block;
    font-size: 20px;
}
.font-color--main {
    color: #4285f4;
}
.card-layout-box .layout-right-functional .learning-situation .item-info .pt-text {
    font-size: 12px;
    color: #202124;
}
.card-layout-box .layout-right-functional .learning-situation .item-info {
    text-align: center;
    cursor: pointer;
    overflow: hidden;
    min-width: 72px;
}
.card-layout-box .layout-right-functional .learning-situation {
    display: flex;
    justify-content: center;
    border-right: 1px solid #e7ebf0;
}
.card-layout-box {
    width: 100%;
    background: #fff;
    display: flex;
    position: relative;
}

.card-layout-box .layout-left {
    flex-direction: column;
    min-width: 85px;
    margin-right: 16px;
    font-size: 12px;
}

.lable-type {
    margin-top: 10px;
    color: #3c4043;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 65px;
    max-height: 30px;
    line-height: 15px;
    word-break: break-all;
    display: inline-block;
    text-align: center;
}

.another-name {
    position: relative;
    margin-top: 5px;
    line-height: 13px;
    display: inline-block;
    width: 85px;
    text-align: center;
    max-height: 31px;
    margin-bottom: 2px;
}

.layout-right-info {
    text-align: left;
}

.card-layout-box .layout-right {
    width: 100%;
    border-bottom: 1px solid #eee;
    padding: 0 0 4px;
    font-size: 14px;
}

.card-layout-box .layout-right-functional {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1;
    font-size: 12px;
}

.card-layout-box .layout-right-info .info-title {
    font-size: 16px;
    margin-bottom: 12px;
    max-width: 500px;
    cursor: pointer;
    color: #212121;
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    white-space: normal;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}

.card-layout-box .layout-right-info .learning-state {
    font-size: 12px;
    padding-top: 8px;
}

.card-layout-box .layout-right-info .status-bar {
    color: #5f6368;
    font-size: 12px;
}
</style>