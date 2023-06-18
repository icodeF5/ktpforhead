
<template>
    <div class="component-notification" @click="jump">
        <div class="flex-between">
            <div class="flex-align h-info">
                <el-icon class="el-icon-info h-icon"></el-icon>
                <span class="h-type" :class="{
                    'no-read':!message.isRead
                }">{{message.type}}</span>
            </div>
        </div>
        <div class="flex-between item-content">
            <div class="left">
                <span class="font-color--main font12">#{{message.label}}#</span>
                {{message.info}}
            </div>
        </div>
        <div class="bottom">
            来自
            <span class="class">{{message.comeName}}</span>
            <span class="end-time">{{message.time}}</span>
        </div>
        <div class="right-btnbox" v-show="!message.isRead" @click.stop="ignore">
            <div class="btn">
                忽略
            </div>
        </div>
    </div>
</template>
<script>
import {getRequest} from "network/request";
import url from "network/url";

export default {
    props:['message'],
    name:"Message",
    data(){
        return{

        }
    },
    methods:{
        jump(){
            if(this.message.type==='教学活动'){
                getRequest(url.homeWork.getById,{
                    workId:this.message.jumpId
                }).then(result=>{
                    console.log(result.r.code)
                    this.$bus.$emit('setHomeWork',this.message.jumpId,false,false,result.r.code)
                    this.$bus.$emit('show','作业详细')
                })
            }
        },
        ignore(){
            getRequest(url.message.readMessage,{
                messageId:this.message.id
            }).then(result=>{
                this.message.isRead = true
                this.$bus.$emit("ignoreMessage",this.message);
                this.$message({
                    type:result.r,
                    message:result.message
                })
            })
        }
    }
}
</script>
<style scoped>
.component-notification {
    cursor: pointer;
    position: relative;
    margin-top: 16px;
    padding: 12px;
    background: #fff;
    border: 1px solid #dadce0;
}
.component-notification .bottom .class{
    margin-left: 8px;
    color: #4285f4;
}
.component-notification .bottom .end-time {
    margin-left: 48px;
    color: #74787c;
}
.component-notification .bottom {
    margin-top: 10px;
    font-size: 12px;
    font-family: PingFangSC,PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    line-height: 16px;
}
.component-notification .item-content {
    margin-top: 6px;
}
.component-notification .item-content .left {
    font-size: 14px;
    font-weight: 700;
    text-align: left;
    color: #3c4043;
    line-height: 20px;
}
.component-notification .h-info .h-icon {
    display: block;
    border-radius: 50%;
    width: 24px;
    line-height: 24px;
    text-align: center;
    height: 24px;
    margin-right: 8px;
    color: #ff6000;
    font-size: 20px;
}
.component-notification .h-info .h-type {
    font-size: 14px;
    font-weight: 500;
    color: #575a5b;
    line-height: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 75px;
}
.component-notification .h-info .no-read:after {
    position: absolute;
    right: 0px;
    top: -2px;
    content: "";
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: red;
}
.component-notification .right-btnbox {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
}
.component-notification .right-btnbox .btn {
    margin-left: 12px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;
    color: #3c4043;
    line-height: 12px;
}
</style>