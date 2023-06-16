
<template>
    <div class="item red-circle" @click="jump">
        <div class="top">
            <span class="font-color">【{{message.type}}】</span>
            <span>{{message.info}}</span>
        </div>
        <div class="bottom flex-between">
            <span class="ins">发布人:{{message.sendName}}</span>
            <span class="time">{{message.time}}</span>
        </div>
    </div>
</template>
<script>
import {getRequest} from "network/request";
import url from "network/url";

export default {
    name:"MiniMessage",
    props:['message'],
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
        }
    }
}
</script>
<style scoped>
.component-notice .item {
    cursor: pointer;
    padding: 16px 0 16px 10px;
    border-bottom: 1px solid #dadce0;
    position: relative;
}
.font-color {
    color: #3c4043;
}
.component-notice .item .top {
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    white-space: normal;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-size: 14px;
    font-weight: 400;
    text-align: left;
    line-height: 20px;
}
.component-notice .item .bottom {
    text-indent: 7px;
    margin-top: 10px;
    font-size: 12px;
    color: #74787c;
}
.component-notice .item.red-circle:before {
    position: absolute;
    left: 0;
    top: 24px;
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: red;
}
</style>