
<template>
    <div class="view-notification">
        <div class="todo-content">
            <div class="flex-between tabs-box">
                <ul class="tabs">
                    <li v-for="(item,index) in tab" :key="index" :class="{
                        active:index===checkIndex,
                        item:true,
                    }" @click="changeIndex(index)">
                        {{item}}
                        <span class="tab-info" v-show="index===1&&noRead!==0">{{noRead}}</span>
                    </li>
                </ul>
                <div class="font-color--main font12 common_pointer" @click="readAll">
                    <el-icon class="el-icon-check"></el-icon>
                    一键标记为已读
                </div>
            </div>
            <div class="card-box" v-show="checkIndex===0||checkIndex===1">
                <Message v-for="item in message" :key="item.id" :message="item"></Message>
            </div>
            <el-pagination
                v-show="message.length!==0 && (checkIndex===0 || checkIndex ===1)"
                :page-size="10"
                :pager-count="7"
                layout="prev, pager, next"
                :total="message.length">
            </el-pagination>
            <NoData v-show="message.length===0||(checkIndex!==0&&checkIndex!==1)"></NoData>
        </div>
    </div>
</template>
<script >
import {getRequest} from "network/request";
import url from "network/url";
import Message from "components/notification/Message.vue";
import NoData from "components/NoData.vue";


export default {
    name:"Notification",
    components: {NoData, Message},
    data(){
        return{
            tab:['全部','教学活动','教务通知','系统通知'],
            checkIndex:0,
            message:[],
        }
    },
    methods:{
        changeIndex(index){
            this.checkIndex = index
        },
        readAll(){
            this.$store.dispatch('readAll')
            for(let i = 0;i<this.message.length&&!this.message[i].isRead;i++){
                this.message[i].isRead = true;
            }
        },
        iniAll(){
            getRequest(url.message.getAll,{
                accountName:sessionStorage.getItem("accountName")
            }).then(result=>{
                this.message = result.r
            })
        },
    },
    computed:{
      noRead(){
          return this.message.filter(data=> !data.isRead).length
      }
    },
    mounted() {
        this.iniAll()
    }
}
</script>
<style scoped>
>>>.el-pagination {
    padding: 2px 5px;
    color: #303133;
    font-weight: 700;
    margin-top: 24px;
    text-align: left;
}
.view-notification {
    width: 900px;
    margin: 0 auto;
}
.view-notification .todo-content {
    margin-top: 12px;
    background: #f8f9fa;
    border-radius: 8px;
    padding: 12px;
}

.view-notification .todo-content .tabs-box .tabs {
    display: flex;
    flex-flow: row nowrap;
}
.view-notification .todo-content .tabs-box .tabs .item:not(:last-child) {
    margin-right: 62px;
}

.view-notification .todo-content .tabs-box .tabs .active {
    border-bottom: 2px solid #4285f4;
    font-size: 18px !important;
    line-height: 24px !important;
    font-family: PingFangSC,PingFangSC-Medium !important;
    font-weight: 500 !important;
    text-align: center !important;
    color: #1967d2 !important;
}
.view-notification .todo-content .tabs-box .tabs .item {
    cursor: pointer;
    height: 32px;
    font-size: 14px;
    line-height: 24px;
    font-family: PingFangSC,PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    color: #3c4043;
    transition: all .1s ease-out;
    position: relative;
}
.common_pointer {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
}
.view-notification .todo-content .tabs-box .tabs .item .tab-info {
    position: absolute;
    right: -14px;
    top: -4px;
    display: inline-block;
    width: 18px;
    height: 18px;
    background: #eb5050;
    border-radius: 7px;
    font-size: 12px;
    font-family: PingFangSC,PingFangSC-Semibold;
    font-weight: 600;
    text-align: center;
    color: #fff;
    line-height: 18px;
    transform: scale(.83);
}
</style>