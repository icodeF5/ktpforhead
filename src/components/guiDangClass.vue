
<template>
    <div class="item flex-between" >
        <div class="left" :style="{
            'background-image':'url('+url+')'
        }" @click="toClassDetail">
            <span class="tag-flag">
                {{sClass.ownerId===accountName?'教':'学'}}
            </span>
            <p>加课码{{sClass.code}}</p>
        </div>
        <div class="right">
            <div class="header flex-align flex-between">
                <span>{{sClass.className}}</span>
                <el-dropdown trigger="click">
                    <el-icon class="el-icon-more" style="transform: rotate(90deg)"></el-icon>
                    <el-dropdown-menu>
                        <el-dropdown-item @click.native="noGuiDang">恢复</el-dropdown-item>
                        <el-dropdown-item @click.native="deleteClass">删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div class="name" @click="toClassDetail">
                {{sClass.name}}
            </div>
            <div class="bottom flex-align">
                成员{{sClass.personNum}}人
            </div>
        </div>
    </div>
</template>
<script >
import {getRequest} from "network/request";
import url from "network/url";

export default {
    name:"GuiDangClass",
    props:['sClass','type'],
    data(){
        return{
            accountName:sessionStorage.getItem("accountName"),
            url:require('../assets/bg/5.png')
        }
    },
    methods:{
        toClassDetail(){
            this.$bus.$emit("toClassDetail",this.sClass)//home组件
        },
        noGuiDang(){
            console.log("调用恢复方法！@")
            getRequest(url.course.noGuiDang,{
                code:this.sClass.code,
                type:this.type,
                accountName:this.accountName
            }).then(result=>{
                this.$message({
                    type:'success',
                    message:result.message
                })
                console.log(result.r)
                this.$bus.$emit('noGuiDang',this.sClass,this.type,result.r)//viewHome组件
            })
        },
        deleteClass(){

        }
    }
}
</script>
<style scoped>
.item {
    margin-bottom: 16px;
    width: 100%;
    height: 112px;
    padding: 16px;
    background: #fff;
    border: 1px solid #dadce0;
    border-radius: 4px;
}
.item .left {
    background: no-repeat 50%/cover;
    margin-right: 16px;
    position: relative;
    width: 96px;
    height: 80px;
    background: #faa723;
    border-radius: 8px 8px 0 0;
    cursor: pointer;
}
.item .left p {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 96px;
    height: 24px;
    background: rgba(0,0,0,.4);
    font-size: 12px;
    font-family: PingFangSC,PingFangSC-Semibold;
    font-weight: 600;
    text-align: center;
    color: #fff;
    line-height: 24px;
}
.item .left .tag-flag {
    position: absolute;
    top: 0;
    left: 8px;
}
.item .right {
    flex: 1;
}
 .item .right .name {
    margin-top: 4px;
    font-size: 18px;
    font-family: PingFangSC,PingFangSC-Medium;
    font-weight: 500;
    text-align: left;
    color: #333;
    line-height: 24px;
    cursor: pointer;
}
 .item .right .bottom {
    margin-top: 6px;
}
.tag-flag {
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
</style>