<template>
    <div style="width: 100%;" v-show="isShow">
        <div class="card-layout-box" v-show="isOwner">
            <div class="layout-left flex-align">
                <img src="../../assets/homeWork.png">
                <div class="another-name">
                    <span class="lable-type">作业</span>
                </div>
            </div>
            <div class="layout-right flex-baseline">
                <div class="layout-right-info">
                    <h6 class="info-title" @click='showWork'>{{ work.title }}</h6>
                    <div class="status-bar" v-if="nowTime>workStartDate">
                        提交截止时间：{{(workEndDate.toLocaleDateString("zh-CN",timeOption))}}
                        <div class="el-divider el-divider--vertical"></div>
                        <span>个人作业</span>
                    </div>
                    <div v-else class="status-bar">
                        <span class="font-color--warning">将于{{workStartDate.toLocaleDateString("zh-CN",timeOption)}}开始</span>
                        <div class="el-divider el-divider--vertical"></div>
                        <span>个人作业</span>
                    </div>
                </div>
                <div class="layout-right-functional">
                    <div class="learning-situation" v-show="nowTime>workStartDate">
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
                    <el-dropdown  @command="cm"  trigger="click">
                   <span class="more-but">
                       <i class="el-icon-more t"></i>
                       <i class="text">更多</i>
                   </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="a">编辑</el-dropdown-item>
                            <el-dropdown-item command="b">移动到章节</el-dropdown-item>
                            <el-dropdown-item command="c">保存到备课区</el-dropdown-item>
                            <el-dropdown-item command="d" @click.native="delete2">删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
        <div class="card-layout-box" v-show="!isOwner && nowTime>workStartDate">
            <div class="layout-left flex-align">
                <img src="../../assets/homeWork.png">
                <div class="another-name">
                    <span class="lable-type">作业</span>
                </div>
            </div>
            <div class="layout-right flex-baseline" >
                <div class="layout-right-info">
                    <h6 class="info-title" @click='showWork'>{{ work.title }}</h6>
                    <div class="status-bar">
                        提交截止时间：{{workEndDate.toLocaleDateString("zh-CN",timeOption)}}
                        <div class="el-divider el-divider--vertical"></div>
                        <span>{{nowTime>workEndDate?'已结束':'未结束'}}</span>
                        <div class="el-divider el-divider--vertical"></div>
                        <span>个人作业</span>
                    </div>
                    <p class="learning-state">
                        <span class="font-color--warning" v-show="!submit">未提交</span>
                        <span v-show="submit&&work22.annex.score==='未批'">已提交</span>
                        <span class="font-color--main" v-show="work22.annex.score!=='未批'">已批改{{work22.annex.score}}分</span>
                    </p>
                </div>
                <div class="layout-right-functional">
                    <el-button type="primary"  @click="submitWork" v-show="!submit">提交作业</el-button>
                    <el-button  plain @click="submitWork" v-show="submit && work22.annex.score==='未批'">已提交</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {getRequest} from "network/request";
import url from "network/url";
import {mapState} from "vuex";

export default {
    name: "HomeWork",
    props: ["work"],
    data(){
        return{
            timeOption:{
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            },
            // 是否是该班级的老师
            isOwner:false,
            // 是否展示
            isShow:false,
            status:[],
        //     现在的时间
            nowTime: new Date(),
            // 作业截止时间
            workEndDate:new Date(this.work.endTime),
            workStartDate:new Date(this.work.startTime),
        //     是否提交该作业
            submit:false,
            work22:{
                user:{},
                annex:{}
            },
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
        delete2(){
            this.$confirm('是否删除该作业？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                getRequest(url.homeWork.delete,{
                    id:this.work.id
                }).then(result=>{
                    this.$message({
                        type: result.r,
                        message: result.message
                    });
                })
                this.$bus.$emit('deleteHomework',this.work)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        cm(command){

        },
        iniTeaAll(){
            getRequest(url.homeWork.status,{
                id:this.work.id
            }).then(result=>{
                this.status = result.r;
                console.log("获取作业状态")
                console.log(result.r)
                this.isShow = true
            })
        },
        iniStuAll(){
            getRequest(url.homeWork.isSubmit, {
                accountName: sessionStorage.getItem("accountName"),
                id: this.work.id
            }).then(result => {
                this.work22 = result.r
                this.submit = result.r.annex.work!==null
                this.isShow = true
            })
        },
        iniAll(){
            this.isShow = false
            getRequest(url.course.getByCode,{
                code:this.work.code,
            }).then(result=>{
                this.isOwner = result.r.ownerId===sessionStorage.getItem("accountName")
                console.log(this.isOwner)
                if(this.isOwner){
                    console.log("老师")
                    this.iniTeaAll()
                }else{
                    console.log("学生")
                    this.iniStuAll()
                }
            })
        }
    },
    mounted() {
        this.iniAll()
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

.card-layout-box .layout-right-functional .more-but {
    text-align: center;
    cursor: pointer;
    display: block;
    min-width: 72px;
}
.t:hover{
    color: #409EFF;
}
.card-layout-box .layout-right-functional .more-but .text {
    display: block;
    padding-top: 3px;
    padding-bottom: 3px;
    color: #202124;
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