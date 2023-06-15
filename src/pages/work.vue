<template>
    <div class="view-homework" v-show="isShow">
        <el-tabs v-model="activeName" @tab-click="handleClick" v-show="isOwner==='false'">
            <el-tab-pane label="详情" name="first">
                <div class="view-homework-detail">
                    <div class="header">
                        <div class="cmp-work-list-card">
                            <span class="Tips-posiion">作业</span>
                            <div class="layout-right margim-top">
                                <header class="flex-align">
                                    <div class="h-left">
                                        <div class="title flex-align">
                                            <h4>{{ homeWork.title }}</h4>
                                        </div>
                                    </div>
                                </header>
                                <div class="tags flex-align">
                                    <el-tag size="small">个人作业</el-tag>
                                    <el-tag size="small">
                                        提交起止时间
                                        {{ (new Date(homeWork.startTime).toLocaleDateString("zh-CN", timeOption)) }}
                                        -
                                        {{ (new Date(homeWork.endTime).toLocaleDateString("zh-CN", timeOption)) }}
                                    </el-tag>
                                    <el-tag type="info" size="small">{{ homeWork.allScore }}分</el-tag>
                                </div>
                                <div class="homework-description" v-html="homeWork.des" style="text-align:left;">
                                    <!--                                    {{ homeWork.des }}-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cmp-comment-list font-color">
                        <div class="comment-container">
                            <div class="cmp-comment-list">
                                <div class="comment-main flex-align">
                                    <div class="left">
                                        <img src="../assets/icon-student.png">
                                    </div>
                                    <div class="right">
                                        <el-input type="textarea" v-model="comment" style="width: 1100px"
                                                  placeholder="请输入评论"/>
                                    </div>
                                </div>
                                <div class="comment-tools font14 flex-align font-color">
                                    <el-button type="primary">发布评论</el-button>
                                </div>
                            </div>
                        </div>
                        <div class="comment-list">
                            <div class="font20 font-color flex-align">
                                全部评论
                            </div>
                            <NoData/>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="提交作业" name="second">
                <div class="cmps-student-submit">
                    <div class="detail-header">
                        <div class="cmp-work-list-card">
                            <div class="layout-left flex-align">
                                <img src="../assets/homeWork.png" width="40px">
                                <div class="another-name">
                                    <span class="lable-type">作业</span>
                                </div>
                            </div>
                            <div class="layout-right">
                                <header class="flex-align">
                                    <div class="h-left">
                                        <div class="title flex-align">
                                            <h4>{{ homeWork.title }}</h4>
                                        </div>
                                    </div>
                                </header>
                                <div class="tags flex-align">
                                    <el-tag size="small">个人作业</el-tag>
                                    <el-tag size="small">
                                        提交起止时间 ：
                                        {{ (new Date(homeWork.startTime).toLocaleDateString("zh-CN", timeOption)) }}
                                        -
                                        {{ (new Date(homeWork.endTime).toLocaleDateString("zh-CN", timeOption)) }}
                                    </el-tag>
                                    <el-tag type="info" size="small">100分</el-tag>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="el-divider el-divider--horizontal"></div>
                    <div v-show="!isSubmit" class="submit-box mb24">
                        <div class="flex-between mb24">
                            <div class="font20">
                                提交内容
                            </div>
                            <div>
                                <el-button type="primary" size="small" @click="submitWork">确认提交</el-button>
                            </div>
                        </div>
                        <div class="upload-box">
                            <div class="title font16" style="text-align:left;">
                                作业附件
                            </div>
                            <el-upload
                                class="upload-demo"
                                drag
                                action="http://localhost:8080/homeWork/upload"
                                :data="{
                                        accountName:accountName,
                                        id:homeWork.id
                                    }"
                                multiple
                                ref="upload"
                                :auto-upload="false">
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                <div class="el-upload__tip">
                                    支持各种类型文件，图片
                                </div>
                            </el-upload>
                            <div class="title font16 mb24" style="margin-top: 24px;text-align: left">
                                作业留言
                                <span class="font12 tip">选填</span>
                            </div>
                            <el-input type="textarea" style="width: 100%" placeholder="请输入留言"></el-input>
                        </div>
                    </div>
                    <div v-show="isSubmit" class="submit-content mb24">
                        <div class="mb24 flex-between">
                            <div class="font20">
                                提交内容
                                <el-button size="medium">
                                    <span>
                                        <i class="el-icon-alarm-clock"></i>
                                        提交历史
                                    </span>
                                </el-button>
                            </div>
                            <div>
                                <el-button size="medium" class="el-tooltip el-button--text">
                                    <i class="el-icon-alarm-clock"></i>
                                    重交作业
                                </el-button>
                                <el-button size="small" plain>
                                    查重结果
                                </el-button>
                                <el-button size="small">
                                    更新提交
                                </el-button>
                            </div>
                        </div>
                        <div class="content">
                            <div class="tea-comment flex-justify">
                                <div class="left">
                                    <p class="font16 mb16" style="text-align:left;">老师评语</p>
                                    <div class="tea-txt font14">
                                        暂无
                                    </div>
                                </div>
                                <div class="right">
                                    <p class="font24" style="color: rgb(66, 133, 244); margin-top: 40px;"> 已提交</p>
                                </div>
                            </div>
                            <div class="annex-box">
                                <div class="title font16 mb24" style="text-align: left">
                                    作业附件
                                    <span class="font12 tip">{{ 0 }}个</span>
                                </div>
                                <!--                                <div class="attachment flex-between mb16">-->
                                <!--                                    -->
                                <!--                                </div>-->
                            </div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
        <el-tabs v-show="isOwner==='true'" v-model="activeName2" @tab-click="handleClick2">
            <el-tab-pane label="详情" name="first">
                <div class="view-homework-detail">
                    <div class="header">
                        <div class="cmp-work-list-card">
                            <span class="Tips-posiion">作业</span>
                            <div class="layout-right margim-top">
                                <header class="flex-align">
                                    <div class="h-left">
                                        <div class="title flex-align">
                                            <h4>{{ homeWork.title }}</h4>
                                        </div>
                                    </div>
                                </header>
                                <div class="tags flex-align">
                                    <el-tag size="small">个人作业</el-tag>
                                    <el-tag size="small">
                                        提交起止时间
                                        {{ (new Date(homeWork.startTime).toLocaleDateString("zh-CN", timeOption)) }}
                                        -
                                        {{ (new Date(homeWork.endTime).toLocaleDateString("zh-CN", timeOption)) }}
                                    </el-tag>
                                    <el-tag type="info" size="small">{{ homeWork.allScore }}分</el-tag>
                                </div>
                                <div class="homework-description" v-html="homeWork.des" style="text-align:left;">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cmp-comment-list font-color">
                        <div class="comment-container">
                            <div class="cmp-comment-list">
                                <div class="comment-main flex-align">
                                    <div class="left">
                                        <img src="../assets/icon-student.png">
                                    </div>
                                    <div class="right">
                                        <el-input type="textarea" v-model="comment" style="width: 1100px"
                                                  placeholder="请输入评论"/>
                                    </div>
                                </div>
                                <div class="comment-tools font14 flex-align font-color">
                                    <el-button type="primary">发布评论</el-button>
                                </div>
                            </div>
                        </div>
                        <div class="comment-list">
                            <div class="font20 font-color flex-align">
                                全部评论
                            </div>
                            <NoData/>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="批阅" name="second">
                <div class="cmps-homework-review">
                    <div class="header">
                        <div class="header_title">
                            测试
                        </div>
                    </div>
                    <div class="top">
                        <div class="top-l">
                            <el-tag size="small">截止时间:
                                {{ (new Date(homeWork.endTime).toLocaleDateString("zh-CN", timeOption)) }}
                            </el-tag>
                            <el-tag type="info" size="small" class="ml8">个人作业</el-tag>
                        </div>
                        <div class="top_r">
                            <el-switch v-model="showGrade"></el-switch>
                            <span>对学生隐藏成绩</span>
                            <div class="top_ricon">
                                <i class="el-icon-download"></i>
                                <span>下载作业报表</span>
                            </div>
                        </div>
                    </div>
                    <el-divider class="el-divider--horizontal"></el-divider>
                    <div class="flex-between flex-align main">
                        <div class="title_list">
                            <el-button round size="medium" @click="checkStudentWork('all')"
                                       :type="studentStatus==='all'?'primary':'plain'">全部({{ studentForm.length }})
                            </el-button>
                            <el-button round size="medium" @click="checkStudentWork('noAlready')"
                                       :type="studentStatus==='noAlready'?'primary':'plain'">未批({{ status[1] }})
                            </el-button>
                            <el-button round size="medium" @click="checkStudentWork('already')"
                                       :type="studentStatus==='already'?'primary':'plain'">已批({{ status[0] }})
                            </el-button>
                            <el-button round size="medium" @click="checkStudentWork('noSub')"
                                       :type="studentStatus==='noSub'?'primary':'plain'">未交({{ status[2] }})
                            </el-button>
                        </div>
                        <div class="search-box">
                            <el-input class="search"
                                      placeholder="学生姓名搜索"
                                      autocomplete="off"
                                      v-model="searchName"
                                      size="small"
                                      suffix-icon="el-icon-search">
                            </el-input>
                        </div>
                    </div>
                    <div class="List-box">
                        <el-divider></el-divider>
                        <div class="flex-between">
                            <div>
                                <el-dropdown trigger="click">
                                    <el-button class="el-dropdown-link list-box-btn" plain size="small">
                                        批量给分<i class="el-icon-arrow-down el-icon--right"></i>
                                    </el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item @click.native="unifiedPoint">统一给分</el-dropdown-item>
                                        <el-dropdown-item @click.native="unifiedIntervalPoint">统一区间给分
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                                <el-button class="el-dropdown-link list-box-btn" plain size="small">
                                    下载作业文档
                                </el-button>
                            </div>
                            <div>
                                <el-button type="primary" size="small">
                                    一键催交
                                </el-button>
                            </div>
                        </div>
                        <el-divider></el-divider>
                        <el-table
                            ref="multipleTable"
                            :data="showStudentForm.filter(data => !searchName || data.user.name.includes(searchName)).slice((this.currentPage - 1) * this.pageSize, this.pageSize * this.currentPage)"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                            <el-table-column
                                type="selection"
                                width="55">
                            </el-table-column>
                            <el-table-column
                                label="姓名"
                                width="115"
                                sortable>
                                <template slot-scope="scope">
                                    <div class="cell el-tooltip">
                                        <span class="username common_block">
                                            {{ scope.row.user.name }}
                                        </span>
                                        <span class="common_block">
                                            {{ scope.row.user.accountName }}
                                        </span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="所属标签"
                                width="115"
                                sortable>
                                默认标签
                            </el-table-column>
                            <el-table-column label="相识度" width="115" sortable>
                                -
                            </el-table-column>
                            <el-table-column label="提交状态" width="200" sortable>
                                <template slot-scope="scope">
                                    <div class="cell">
                                        <span v-show="scope.row.annex.work==null" style="color: #ff0000">未交</span>
                                        <span v-show="scope.row.annex.work!=null" style="color: #4d90fe;">已交</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="字数" width="115" sortable>
                                -
                            </el-table-column>
                            <el-table-column label="批阅次数" width="120" sortable>
                                -
                            </el-table-column>
                            <!--                            prop="name"-->
                            <el-table-column
                                label="成绩"
                                width="200"
                                sortable>
                                <template slot-scope="scope">
                                    <div class="cell"
                                         v-if="scope.row.annex.score!=='未批'&&(isNum(scope.row.annex.score))">
                                        <el-input class="scoreinput" size="small"
                                                  v-model="scope.row.annex.score"
                                                  @blur="giveGrade(scope.row)">
                                        </el-input>
                                        /{{ homeWork.allScore }}
                                    </div>
                                    <div class="cell" v-else-if="scope.row.annex.work!==null">
                                        <el-input class="scoreinput" size="small"
                                                  placeholder="未批"
                                                  v-model="scope.row.annex.score"
                                                  @blur="giveGrade(scope.row)">
                                        </el-input>
                                        /{{ homeWork.allScore }}
                                    </div>
                                    <div class="cell" v-else>
                                        <span style="color: #ff0000">未交</span>
                                    </div>
                                </template>
                            </el-table-column>
                            <!--                            prop="address"-->
                            <el-table-column
                                label="操作"
                                width="115"
                                show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <div class="cell">
                                        <el-button v-if="scope.row.annex.work==null" type="text"
                                                   style="font-size: 16px;color: #4d90fe;" @click="cuijiao(scope.row)">
                                            催交
                                        </el-button>
                                        <el-button v-if="scope.row.annex.work!=null" type="text" @click="openNew(scope.row.user.name,scope.row)"
                                                   style="font-size: 16px;color: #4d90fe;">
                                            进入批阅
                                        </el-button>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="pagination">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[5, 10,15, 20]"
                        :page-size="pageSize"
                        background
                        layout="total, sizes, prev, pager, next"
                        :total="studentForm.length">
                    </el-pagination>
                </div>
                <el-dialog
                    title="批量给分选中学生"
                    :visible.sync="unifiedPoints"
                    width="25%">
                    <el-divider></el-divider>
                    <div class="points-content">
                        你好
                    </div>
                    <el-divider></el-divider>
                    <span slot="footer" class="dialog-footer">
                         <el-button @click="unifiedPoints = false;" size="small">取消</el-button>
                        <el-button type="primary" @click="surePoint" :disabled="uPoints===''" size="small">确定</el-button>
                    </span>
                </el-dialog>
                <el-dialog
                    title="按“分数区间”随机给分"
                    :visible.sync="unifiedIntervalPoints"
                    width="25%">
                    <el-divider></el-divider>
                    <div class="points-content">
                        你好
                    </div>
                    <el-divider></el-divider>
                    <span slot="footer" class="dialog-footer">
                         <el-button @click="unifiedIntervalPoints = false" size="small">取消</el-button>
                        <el-button type="primary" @click="sureIntervalPoint"
                                   :disabled="uIntervalPointMin===''||uIntervalPointMax===''" size="small">确定</el-button>
                    </span>
                </el-dialog>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import NoData from "components/NoData.vue";
import axios from "axios";
import {isObject} from "element-ui";
import {getRequest, postRequest} from "network/request";
import url from "network/url";
import {mapGetters} from "vuex";

export default {
    name: "Work",
    components: {NoData},
    props: ['showClassCode', 'homeWorkId', 'submit', 'isOwner'],//从header接收参数
    data() {
        return {
            isSubmit: false,//是否已经提交了
            isShow: false,
            homeWork: {},
            comment: "",
            activeName: this.submit === 'true' ? "second" : "first",
            activeName2: sessionStorage.getItem("tea-tab") || "first",
            //隐藏成绩
            showGrade: false,
            //学生信息
            studentForm: [],
            //要展示的学生2
            showStudentForm: [],
            searchName: "",
            accountName: sessionStorage.getItem('accountName'),
            //状态
            status: [],
            //当前的页数
            currentPage: 1,
            //每页显示的条数
            pageSize: 5,
            //时间规则
            timeOption: {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            },
            //选择的学生的状态
            studentStatus: sessionStorage.getItem("studentStatus") || "all",
            //被勾选中的学生
            checkedStu: [],
            //统一给分对话框
            unifiedPoints: false,
            uPoints: "",
            //统一区间给分对话框
            unifiedIntervalPoints: false,
            uIntervalPointMin: "",
            uIntervalPointMax: "",
        }
    },
    methods: {
        handleClick(tabs) {

        },
        handleSelectionChange(val) {
            this.checkedStu = val
            console.log(val)
        },
        handleClick2(tabs) {
            sessionStorage.setItem("tea-tab", tabs.name)
        },
        //页底
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
      //进入批阅
      openNew: function (name, stu) {
        console.log(stu)
        let post1 = JSON.stringify(stu)
        let post2 = JSON.stringify(this.homeWork)
        let routeData = this.$router.resolve({
          path: "/PreviewJob",
          query: {
            stu: encodeURIComponent(post1),
            homeWork: encodeURIComponent(post2)
          }
        });
        window.open(routeData.href, '_blank');
      },
        //提交作业
        submitWork() {
            this.$refs.upload.submit();
            window.location.reload()
        },
        //催交作业s
        cuijiao(data){
            postRequest(url.homeWork.cuijiao,{},{
                type:"教学活动",
                label:"催交",
                info:"快交作业！！！！",
                sendId:sessionStorage.getItem("accountName"),
                receiveId:data.user.accountName,
                jumpId:this.homeWorkId,
            }).then(result=>{
                this.$message({
                    type:result.r,
                    message:result.message
                })
            })
        },
        //修改成绩
        giveGrade(data) {
            let score = data.annex.score
            if (score === '') {
                data.annex.score = '未批'
                postRequest(url.homeWork.setGrades, {
                    workId: this.homeWork.id
                }, [
                    data
                ]).then(result => {
                    this.$message({
                        type: "success",
                        message: "修改成功！"
                    })
                })
                return;
            }
            if (!this.isNum(score)) {
                this.$message({
                    type: "error",
                    message: "请输入正确的分数"
                })
                return;
            }
            if (Number.parseFloat(score) >= this.homeWork.allScore) {
                this.$message({
                    type: "error",
                    message: "请输入正确范围的分数"
                })
                return;
            }
            postRequest(url.homeWork.setGrades, {
                workId: this.homeWork.id
            }, [
                data
            ]).then(result => {
                this.$message({
                    type: "success",
                    message: "修改成功成功！"
                })
            })
        },
        isNum(data) {
            return /^\d+$/.test(data)
        },
        //统一给分
        unifiedPoint() {
            if (this.checkCheckedStu()) {
                this.unifiedPoints = true
            }
        },
        surePoint() {

        },
        //统一区间给分
        unifiedIntervalPoint() {
            if (this.checkCheckedStu()) {
                this.unifiedIntervalPoints = true
            }
        },
        sureIntervalPoint() {

        },
        //判断是否有选中的学生
        checkCheckedStu() {
            if (this.checkedStu.length === 0) {
                this.$message({
                    type: "warning",
                    message: "请先选中学生"
                })
                return false;
            }
            return true;
        },
        //选择不同提交状态的学生
        checkStudentWork(status) {
            this.studentStatus = status;
            sessionStorage.setItem("studentStatus", status)
            this.currentPage = 1
            this.setShowStudentForm(status)
        },
        setShowStudentForm(status){
            console.log("设置状态")
            if (status === 'all') {
                this.showStudentForm = this.studentForm
            } else if (status === 'noAlready') {
                this.showStudentForm = this.studentForm.filter(data => data.annex.work !== null)
            } else if (status === 'already') {
                this.showStudentForm = this.studentForm.filter(data => data.annex.score !== '未批')
            } else {
                this.showStudentForm = this.studentForm.filter(data => data.annex.work === null)
            }
        },
        iniAllForStu() {
            getRequest(url.homeWork.isSubmit, {
                accountName: sessionStorage.getItem("accountName"),
                id: this.homeWorkId
            }).then(result => {
                this.isSubmit = !result.r
                this.isShow = true
            })
        },
        iniAllForTea() {
            getRequest(url.homeWork.getAllStudent, {
                id: this.homeWorkId
            }).then(result => {
                this.studentForm = result.r == null ? [] : result.r;
                this.showStudentForm = this.studentForm;
            })

            getRequest(url.homeWork.status, {
                id: this.homeWorkId
            }).then(result => {
                this.status = result.r
                this.isShow = true
            })
           setTimeout(()=>{
               this.setShowStudentForm(this.studentStatus)
           },500)
        },
    },
    mounted() {
        this.$store.dispatch("setShowClass", this.showClassCode)
        getRequest(url.homeWork.getById, {
            workId: this.homeWorkId
        }).then(result => {
            this.homeWork = result.r
        })
        if (this.isOwner === 'false') {
            this.iniAllForStu()
        }
        if (this.isOwner === 'true') {
            this.iniAllForTea()
        }
    }
}
</script>
<style scoped>
>>> .el-dialog__body {
    padding: 0;
}
>>> .el-dialog__body .el-divider--horizontal {
    margin: 10px 0;
}
>>> .el-divider--horizontal {
    margin: 18px 0;
}

>>> .el-dialog__header {
    padding: 10px 10px 5px 10px;
    text-align: left;
}

>>> .el-dialog__footer {
    text-align: center;
}

>>> .el-tabs__header {
    padding-left: 15px;
}

.el-dropdown-link {
    margin-left: 20px;
}

.list-box-btn {
    display: inline-block;
    color: #4285f4;
    width: 104px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    margin-left: 24px;
    padding: 0;
    background: #fff;
}

.el-icon-arrow-down {
    font-size: 12px;
}

.demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
}

.scoreinput /deep/ .el-input__inner {
    border: none;
}

.el-table .cell.el-tooltip {
    white-space: nowrap;
    min-width: 50px;
}

.cmps-homework-review .username {
    text-align: left;
    font-size: 14px;
    font-weight: 700;
    color: #2d2d2d;
}

.common_block {
    display: block;
}

.cmps-homework-review .scoreinput {
    width: 80px;
    border: none;
    color: #5a5a5a;
    border-bottom: 1px solid #818181;
    font-size: 18px;
    cursor: text;
    text-align: center;
    background: transparent;
}

.el-table td div {
    box-sizing: border-box;
}

.cmps-homework-review .common {
    color: #4d90fe;
}

.el-table .cell {
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
    line-height: 23px;
    padding-right: 10px;
}

.cmps-student-submit .submit-content .content .annex-box .attachment {
    height: 72px;
}

.cmps-student-submit .attachment {
    height: 72px;
    padding: 16px;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #dadce0;
}

.cmps-student-submit .submit-content .content .tea-comment .left .tea-txt {
    width: 840px;
    background: #fff;
    border-radius: 8px;
    padding: 16px;
    white-space: pre-wrap;
}

.cmps-student-submit .submit-content .content .tea-comment .right {
    width: 260px;
    text-align: center;
    line-height: 36px;
}

.cmps-student-submit .submit-content .content .tea-comment .left {
    flex: 1;
}

.cmps-student-submit .submit-content .content .annex-box {
    padding: 24px;
}

.cmps-student-submit .submit-content .content .tea-comment {
    padding: 24px;
    display: flex;
    background: #f8f9fa;
}

.flex-justify {
    display: flex;
    justify-content: center;
}

.cmps-student-submit .submit-content .content {
    border: 1px solid #dadce0;
    overflow: hidden;
    border-radius: 8px;
}

.cmps-homework-review .pagination {
    margin: 24px 0;
}

.cmps-homework-review .main .title_list .el-button {
    width: 100px;
}

.cmps-homework-review .top .top_r {
    display: block;
    flex-direction: row;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: left;
    color: #4285f4;
    line-height: 8px;
}

.cmps-homework-review .main {
    padding: 5px 0;
}

.cmps-homework-review .top .top_r .top_ricon {
    display: inline-block;
    margin-left: 12px;
    cursor: pointer;
}

.cmps-homework-review .top {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    margin-bottom: 15px;
}

.cmps-homework-review .header .header_title {
    font-size: 20px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    text-align: left;
    color: #3c4043;
}

.cmps-homework-review .header {
    display: flex;
    justify-content: space-between;
}

.cmps-homework-review {
    min-width: 1024px;
    max-width: 1224px;
    margin: 0 auto;
    font-size: 12px;
    background-color: #fff;
}

>>> .el-upload-dragger {
    width: 100%;
}

>>> .el-upload {
    width: 100%;
}

.cmps-student-submit .upload-box .contain .icon {
    font-size: 50px;
    cursor: pointer;
}

.font_family {
    font-family: font_family !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.cmps-student-submit .tip {
    color: #74787c;
    margin-left: 8px;
}

.cmps-student-submit .upload-box .contain {
    padding: 40px;
    background: #f8f9fa;
    height: 200px;
    text-align: center;
    color: #4285f4;
    cursor: pointer;
}

.cmps-student-submit .upload-box .title {
    margin-bottom: 16px;
}

.cmps-student-submit .upload-box {
    border: 1px solid #dadce0;
    border-radius: 8px;
    padding: 24px;
    position: relative;
}

.cmps-student-submit .mb24 {
    margin-bottom: 24px;
}

.cmp-work-list-card .layout-right {
    width: 100%;
}

.cmp-work-list-card .layout-left {
    flex-direction: column;
    min-width: 55px;
    margin-right: 16px;
    font-size: 12px;
}

.cmps-student-submit .detail-header {
    position: relative;
}

.cmps-student-submit {
    width: 1224px;
    margin: 0 auto;
    font-size: 12px;
}

.cmp-comment-list .comment-list {
    margin-top: 12px;
}

.view-homework {
    background-color: #fff;
    margin: 0 64px;
}

>>> .el-tabs__nav-wrap::after {
    position: static !important;
}

/deep/ .el-tabs__item {
    /* 修改为您想要的文字大小 */
    font-size: 18px !important;
}

.view-homework-detail {
    width: 1224px;
    margin: 0 auto;
    padding-top: 12px;
    padding-bottom: 40px;
}

.view-homework-detail .header {
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 12px;
}

.cmp-comment-list {
    overflow: auto;
    color: #3c4043;
    background: #fff;
}

.cmp-work-list-card {
    width: 100%;
    display: flex;
    position: relative;
}

.cmp-work-list-card .Tips-posiion {
    position: absolute;
    background: #31ccd2;
    color: #fff;
    font-size: 14px;
    left: -12px;
    top: -12px;
    border-bottom-right-radius: 4px;
    text-align: center;
    padding: 8px;
}

.cmp-work-list-card .layout-right {
    width: 100%;
}

.margim-top {
    margin-top: 30px;
}

.cmp-work-list-card .layout-right header .title {
    line-height: 20px;
}

element.style {
}

.cmp-work-list-card .layout-right header .title h4 {
    font-size: 16px;
    font-weight: 500;
    margin-right: 5px;
    max-width: 670px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.cmp-work-list-card .layout-right .tags {
    padding: 8px 0;
}

.cmp-work-list-card .layout-right .tags .el-tag {
    margin-right: 6px;
}

.homework-description {
    font-size: 18px;
    line-height: 20px;
}

.homework-description ol {
    list-style-type: decimal;
}

.cmp-comment-list {
    overflow: auto;
    color: #3c4043;
    background: #fff;
}

.font-color {
    color: #3c4043;
}

.cmp-comment-list .comment-container .comment-main {
    margin-top: 24px;
    padding: 12px;
    border-bottom: 2px solid #4285f4;
    background: #f8f9fa;
}

.cmp-comment-list .comment-container .comment-tools {
    margin: 16px 0;
    justify-content: flex-end;
}
</style>