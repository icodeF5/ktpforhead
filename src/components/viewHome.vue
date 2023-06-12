<template>
    <div class="view-home-box" v-if="status.isShow">
        <div class="view-home">
            <div class="view-home-content">
                <div class="hasborder header-common-border" v-show="topClass.length!==0">
                    <div class="top-handler">
                        <h2 class="left">置顶课程</h2>
                        <div class="right">
                            <button class="el-btn el-button--primary el-button--medium" @click="open"
                                    v-show="!isTeacher">
                                <span style="font-size: 20px;color: white">+</span>
                                <span>加入课程</span>
                            </button>
                            <el-col :span="12" v-show="isTeacher">
                                <el-dropdown trigger="click">
                                    <el-button type="primary" size="medium">创建/加入课程</el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item @click.native="open">加入课程</el-dropdown-item>
                                        <el-dropdown-item @click.native="create">创建课程</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </el-col>
                        </div>
                    </div>
                    <div v-show="topClass.length" class="class-box">
                        <Class v-for="c in topClass" :key="c.code" :sClass="c" :top="topClass"/>
                    </div>
                </div>
                <div v-show="topClass.length===0" class="header-common-border">
                    <div class="top-handler">
                        <h2 class="left"></h2>
                        <div class="right">
                            <button class="el-btn el-button--primary el-button--medium" @click="open"
                                    v-show="!isTeacher">
                                <span style="font-size: 20px;color: white">+</span>
                                <span>加入课程</span>
                            </button>
                            <el-col :span="12" v-show="isTeacher">
                                <el-dropdown trigger="click">
                                    <el-button type="primary" size="medium">创建/加入课程</el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item @click.native="open">加入课程</el-dropdown-item>
                                        <el-dropdown-item @click.native="create">创建课程</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </el-col>
                        </div>
                    </div>
                </div>
                <div class="other-header flex-between">
                    <el-tabs v-model="active.activeName" @tab-click="handleClick" v-show="!isTeacher">
                        <el-tab-pane label="我加入的" name="second">
                        </el-tab-pane>
                        <el-tab-pane label="我协助的" name="first">
                        </el-tab-pane>
                    </el-tabs>
                    <el-tabs v-model="active.activeName" @tab-click="handleClick" v-show="isTeacher">
                        <el-tab-pane label="我教学的" name="third">
                        </el-tab-pane>
                        <el-tab-pane label="我加入的" name="second">
                        </el-tab-pane>
                        <el-tab-pane label="我协助的" name="first">
                        </el-tab-pane>
                    </el-tabs>
                    <div class="left flex-between">
                        <el-button @click="guidang">归档管理</el-button>
                        <el-input
                            placeholder="请输入关键字搜索"
                            suffix-icon="el-icon-search"
                            style="margin-left: 20px;border-radius: 25px"
                            v-model="scout">
                        </el-input>
                    </div>
                </div>
                <div v-show="active.activeName==='third'">
                    <ClassBox v-for="c in teachClass" :key="c.code" :sClass="c" :top="topClass"
                              v-show="teachClass.length!==0&&scout===''"/>
                    <div class="class-box" v-show="scout!==''">
                        <Class v-for="c in  noGroupTeachClass.filter(data=>scoutClass(data))" :key="c.code" :sClass="c"
                               :top="topClass"/>
                    </div>
                    <div
                        v-show="teachClass.length===0||(teachClass.filter(data=>findClass(data).length===0)&&scout!=='')">
                        <NoData/>
                    </div>
                </div>
                <!--                展示加入课堂页面-->
                <div v-show="active.activeName==='second'">
                    <ClassBox v-for="c in Class" :key="c.code" :sClass="c" :top="topClass"
                              v-show="Class.length!==0&&scout===''"/>
                    <div class="class-box" v-show="scout!==''">
                        <Class v-for="c in  noGroupClass.filter(data=>scoutClass(data))" :key="c.code" :sClass="c"
                               :top="topClass"/>
                    </div>
                    <div v-show="Class.length===0">
                        <NoData/>
                    </div>
                </div>
                <!--                展示协作的课堂页面-->
                <div v-show="active.activeName==='first'">
                    <NoData/>
                </div>
            </div>
            <el-dialog title="创建课程" :visible.sync="createDialog" width="70%" :close-on-click-modal="false">
                <el-tabs v-model="creatActiveName" @tab-click="handleClick2">
                    <el-tab-pane label="基本信息(必填)" name="first">
                        <el-form :model="newClass" :rules="rules" ref="newClass">
                            <el-form-item label="课程名称" :label-width="width"
                                          class="margin-bottom-20 cus-formitem el-form-item--feedback"
                                          size="medium" prop="name">
                                <el-input v-model="newClass.name" autocomplete="off" maxlength="50" minlength="0">
                                    <template slot="suffix">
                                        {{ newClass.name.length }}/50
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="教学班级" :label-width="width"
                                          class="margin-bottom-20 cus-formitem el-form-item--feedback"
                                          size="medium" prop="className">
                                <el-input v-model="newClass.className" autocomplete="off" maxlength="30"
                                          minlength="0">
                                    <template slot="suffix">
                                        {{ newClass.className.length }}/30
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item label=" 选择学年-学期" :label-width="'120px'"
                                          class="margin-bottom-20 el-form-item--feedback" size="medium"
                                          style="margin-top: 40px" prop="time">
                                <div class="flex-between el-row">
                                    <el-select v-model="newClass.time" placeholder="请选择学年"
                                               :popper-append-to-body="false">
                                        <el-option v-for="items in timeOption" :value="items.label"
                                                   :key="items.value" :label="items.label"></el-option>
                                    </el-select>
                                    <el-select v-model="newClass.season" placeholder="请选择学期">
                                        <el-option v-for="items in seasonOption" :value="items.label"
                                                   :key="items.value" :label="items.label"></el-option>
                                    </el-select>
                                </div>
                            </el-form-item>
                            <el-form-item label="是否混合" :label-width="width"
                                          class="margin-bottom-20 cus-formitem el-form-item--feedback"
                                          size="medium" style="margin-top: 30px">
                                <div class="flex-align" style="height: 36px">
                                    <el-switch v-model="newClass.isMix" active-text="混合"
                                               style="margin-right: 100px"></el-switch>
                                    <el-switch v-model="newClass.isTop" active-text="置顶"></el-switch>
                                </div>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
                <div slot="footer" class="dialog-footer">
                    <el-button @click.native="cancelCreate">取 消</el-button>
                    <el-button type="primary" @click.native="creatClass">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog :visible.sync="guiDang" class="guidang-dialog" width="884px" :close-on-click-modal="false" title="归档管理" top="7vh">
                <div class="file-header flex-between">
                    <el-tabs class="left" v-model="active.guiDangActiveName" @tab-click="guiDangTabClick">
                        <el-tab-pane :label="'我教的('+countGuiDang(guiDangCreateClass)+')'" name="first" v-show="isTeacher"></el-tab-pane>
                        <el-tab-pane :label="'我学的('+countGuiDang(guiDangJoinClass)+')'" name="second"></el-tab-pane>
                        <el-tab-pane label="我协助的(0)" name="3"></el-tab-pane>
                    </el-tabs>
                    <div class="flex-between">
                        <el-input
                            placeholder="请输入关键字搜索"
                            suffix-icon="el-icon-search"
                            style="margin-left: 20px;border-radius: 25px"
                            v-model="guiDangScout">
                        </el-input>
                    </div>
                </div>
                <div class="file-box flex-between" v-show="active.guiDangActiveName==='first'">
                    <div class="semester">
                        <p class="item" v-for="(item,index) in guiDangCreateClass" :key="index" :class="{
                            active : index = guiDangIndex
                        }" @click="guiDangIndex = index">
                            {{item[0].startTime}}-{{item[0].endTime}}&nbsp;{{item[0].season===1?'第一学期':'第二学期'}}
                        </p>
                    </div>
                    <div class="list-box">
                        <gui-dang-class v-for="item in guiDangCreateClass[guiDangIndex-1]" :ke="item.code" :sClass="item" :type="'create'">
                        </gui-dang-class>
                        <div class="component-no_data" v-show="guiDangCreateClass.length===0">
                            <div class="img-box">
                                <img src="../assets/empty.png" alt="" class="no-data">
                            </div>
                            "暂无数据"
                        </div>
                    </div>
                </div>
                <div class="file-box flex-between" v-show="active.guiDangActiveName==='second'">
                    <div class="semester">
                        <p class="item" v-for="(item,index) in guiDangJoinClass" :key="index" :class="{
                            active:index===guiDangIndex
                        }" @click="guiDangIndex = index">
                            {{item[0].startTime}}-{{item[0].endTime}}&nbsp;{{item[0].season===1?'第一学期':'第二学期'}}
                        </p>
                    </div>
                    <div class="list-box">
                        <gui-dang-class v-for="(item,index) in guiDangJoinClass[guiDangIndex]" :ke="item.code" :sClass="item" :type="'join'">
                        </gui-dang-class>
                        <div class="component-no_data" v-show="guiDangJoinClass.length===0">
                            <div class="img-box">
                                <img src="../assets/empty.png" alt="" class="no-data">
                            </div>
                            "暂无数据"
                        </div>
                    </div>
                </div>
                <div class="file-box flex-between" v-show="active.guiDangActiveName==='3'">
                    <div class="semester"></div>
                    <div class="list-box">
                        <div class="component-no_data">
                            <div class="img-box">
                                <img src="../assets/empty.png" alt="" class="no-data">
                            </div>
                            "暂无数据"
                        </div>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="guiDang = false">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import ClassBox from "components/classBox";
import Class from "components/class";
import {mapState} from "vuex";
import ar from "element-ui/src/locale/lang/ar";
import NoData from "components/NoData.vue";
import axios from "axios";
import fa from "element-ui/src/locale/lang/fa";
import da from "element-ui/src/locale/lang/da";
import {getRequest, postRequest} from "network/request";
import url from "network/url";
import GuiDangClass from "components/guiDangClass.vue";

export default {
    name: "ViewHome",
    components: {GuiDangClass, NoData, Class, ClassBox},
    computed: {
        ...mapState(['isTeacher']),
    },
    data() {
        return {
            active: {
                activeName: sessionStorage.getItem("classTab") ,
                guiDangActiveName:sessionStorage.getItem("guiDangTab"),
            },
            joining: [],//加入的课程的code
            Class: [],//分组后加入的课程
            noGroupClass: [],
            teachClass: [],//分组后教学的课程
            noGroupTeachClass: [],
            topClass: [],//置顶的课程
            status: {
                isShow: false
            }, //等待请求返回数据后再渲染页面
            joinClass: false,
            //搜索课程
            scout: "",
            createDialog: false,
            //创建的class对象
            newClass: {
                name: "",
                className: "",
                time: "",
                season: "",
                ownerId: sessionStorage.getItem("accountName"),
                personNum: 0,
                isTop: false,
                isMix: false,
            },
            creatActiveName: 'first',
            width: '85px',
            //表单验证
            rules: {
                name: [
                    {required: true, message: "请输入课堂名称", trigger: "blur"}
                ],
                className: [
                    {required: true, message: "请输入班级名称", trigger: "blur"}
                ],
                time: [
                    {required: true, message: "必选项", trigger: "blur"}
                ]
            },
            //学期选项
            timeOption: [
                {value: "选项2", label: "2021-2022"},
                {value: "选项3", label: "2022-2023"},
                {value: "选项4", label: "2023-2024"},
                {value: "选项5", label: "2024-2025"},
                {value: "选项6", label: "2025-2026"},
            ],
            //学期选项
            seasonOption: [
                {value: "选项1", label: "第一学期"},
                {value: "选项2", label: "第二学期"},
            ],
            //     归档
            guiDang: false,
            // (this.isTeacher?'first':'second')
            guiDangJoinClass:[],
            guiDangCreateClass:[],
            guiDangScout:"",
            guiDangIndex:1,
        }
    },
    methods: {
        findClass(data) {
            let ans = []
            for (let i = 0; i < data.length; i++) {
                for (let q = 0; q < data[i].length; q++) {
                    ans.push(data[i][q])
                }
            }
            return ans;
        },
        // 归档管理
        guidang() {
            this.guiDang = true
            getRequest(url.user.getGroupCreateClass,{
                accountName:sessionStorage.getItem("accountName"),
                isGuiDang:true
            }).then(result=>{
                console.log(result.r)
                this.guiDangCreateClass = result.r
            })
            getRequest(url.user.getGroupJoinClass,{
                accountName:sessionStorage.getItem("accountName"),
                isGuiDang:true
            }).then(result=>{
                console.log(result.r)
                this.guiDangJoinClass = result.r
            })
        },
        guiDangTabClick(tab){
            sessionStorage.setItem("guiDangTab",tab.name)
            this.guiDangIndex = 1;
        },
        countGuiDang(arr){
            let cnt = 0;
            for(let i = 0;i<arr.length;i++){
                cnt+=arr[i].length;
            }
            return cnt;
        },
        //搜索
        scoutClass(data) {
            return !!(data.ownerName.includes(this.scout) || data.name.includes(this.scout) || data.code.includes(this.scout));
        },
        handleClick(tab, event) {
            this.scout = "";
            sessionStorage.setItem("classTab",tab.name)
        },
        handleClick2(tab) {

        },
        //创建课程的方法
        create() {
            this.createDialog = true;
        },
        creatClass() {
            this.createDialog = false;
            let time = this.newClass.time.split("-")
            postRequest(url.course.createClass, {
                accountName: sessionStorage.getItem("accountName")
            }, {
                name: this.newClass.name,
                className: this.newClass.className,
                startTime: Number.parseInt(time[0]),
                endTime: Number.parseInt(time[1]),
                ownerId: this.newClass.ownerId,
                personNum: this.newClass.personNum,
                isTop: this.newClass.isTop,
                isMix: this.newClass.isMix,
                season:this.newClass.season==='第一学期'?1:2,
            }).then(result => {
                this.$message({
                    type: "success",
                    message: "创建成功"
                })
                window.location.reload();
            })
        },
        cancelCreate() {
            this.createDialog = false;
            this.newClass = {
                name: "",
                className: "",
                time: "",
                season: "",
                ownerId: sessionStorage.getItem("accountName"),
                personNum: 0,
                isTop: false,
                isMix: false,
            }
        },
        //加入课程需要的方法
        open() {
            this.$prompt('课程码', '加入课程', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /[^\s\r\n]{1,100}/,
                inputErrorMessage: '输入内容不能为空',
            }).then(({value}) => {
                this.iniJoinClass();
                if (this.contains(this.joining, value)) {
                    this.$message({
                        type: "error",
                        message: "已加入该课程"
                    })
                } else {
                    getRequest(url.course.joinClass, {
                        accountName: sessionStorage.getItem("accountName"),
                        code: value
                    }).then(result => {
                        this.$message({
                            type: "success",
                            message: result.message,
                        })
                        window.location.reload();
                    })
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            });
        },
        contains(arr, value) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === value) {
                    return true;
                }
            }
            return false;
        },
        iniJoinClass() {
            for (let i = 0; i < this.Class.length; i++) {
                for (let q = 0; q < this.Class[i].length; q++) {
                    this.joining.push(this.Class[i][q].code);
                }
            }
        },
        iniALL() {
            axios.all([axios({
                url: "http://localhost:8080/user/getGroupJoinClass",
                params: {
                    accountName: sessionStorage.getItem("accountName"),
                    isGuiDang: false,
                }
            }), axios({
                url: "http://localhost:8080/user/getGroupCreateClass",
                params: {
                    accountName: sessionStorage.getItem("accountName"),
                    isGuiDang: false,
                }
            }), axios({
                url: "http://localhost:8080/user/getTopClass",
                params: {
                    accountName: sessionStorage.getItem("accountName")
                }
            })]).then(axios.spread((res1, res2, res3) => {
                this.Class = res1.data.r == null ? [] : res1.data.r;
                this.noGroupClass = this.findClass(this.Class)

                this.teachClass = res2.data.r == null ? [] : res2.data.r;
                this.noGroupTeachClass = this.findClass(this.teachClass)

                this.topClass = res3.data.r == null ? [] : res3.data.r;

                this.$store.dispatch("iniRole", this.active);

                this.status.isShow = true;

            }))
        },
        setTop(value) {
            this.status.isShow = false;
            getRequest(url.course.setTop, {
                accountName: value.accountName,
                code: value.sClass.code
            }).then(result => {
                this.topClass.push(value.sClass);
                this.status.isShow = true;
            })
        },
        deleteTop(value) {
            this.status.isShow = false;
            getRequest(url.course.deleteTop, {
                accountName: value.accountName,
                code: value.sClass.code
            }).then(result => {
                for (let i = 0; i < this.topClass.length; i++) {
                    if (this.topClass[i].code === value.sClass.code) {
                        this.topClass.splice(i, 1);
                        break;
                    }
                }
                this.status.isShow = true;
            })
        },
        noGuiDang(sClass,type,isTop){
            console.log(sClass)
            console.log(type)
            console.log(isTop)
            if(isTop){
                this.topClass.push(sClass)
            }
            if(type==='join'){
                for(let i = 0;i<this.Class.length;i++){
                    if(this.Class[i][0].startTime===sClass.startTime&&
                        this.Class[i][0].endTime===sClass.endTime&&
                        this.Class[i][0].season===sClass.season){
                        this.Class[i].push(sClass)
                    }
                }
                for (let i = 0; i < this.guiDangJoinClass.length; i++) {
                    if (this.guiDangJoinClass[i].code === sClass.code) {
                        this.guiDangJoinClass.splice(i, 1);
                        break;
                    }
                }
            }else{
                for(let i = 0;i<this.teachClass.length;i++){
                    if(this.teachClass[i][0].startTime===sClass.startTime&&
                        this.teachClass[i][0].endTime===sClass.endTime&&
                        this.teachClass[i][0].season===sClass.season){
                        this.teachClass[i].push(sClass)
                    }
                }
                for (let i = 0; i < this.guiDangCreateClass.length; i++) {
                    if (this.guiDangCreateClass[i].code === sClass.code) {
                        this.guiDangCreateClass.splice(i, 1);
                        break;
                    }
                }
            }
        }
    },
    mounted() {
        this.$bus.$on("setTop", this.setTop);//给class组件用
        this.$bus.$on("deleteTop", this.deleteTop);//给class组件用
        this.$bus.$on('noGuiDang',this.noGuiDang)//给guiDangClass组件用
        this.iniALL();
        console.log(this.isTeacher)
    }
}
</script>
<style scoped>
>>> .el-dialog__header {
    padding: 20px 20px 10px;
    text-align: left;
    font-weight: bold;
    border-bottom: 1px solid #dadce0;
}

>>> .el-dialog__footer {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, .1);
}

>>>.el-dialog__body .el-tabs__nav-wrap::after {
    position: static !important;
}
>>> .el-dialog__headerbtn .el-dialog__close {
    font-size: 26px;
    font-weight: bold;
    color: black;
}

>>> .el-dialog__body {
    height: 505px;
    display: flex;
    flex-flow: column nowrap;
    padding: 20px 15px 15px 15px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
}
>>>.file-header .el-tabs__item {
    padding: 0 20px;
    height: 40px;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: 16px;
    font-weight: 500;
    //color: #303133;
    position: relative;
}
 .file-box {
    align-items: normal;
    flex: 1;
}
 .file-box .semester {
    border-right: 1px solid #dadce0;
    flex: 1 1 30%;
    max-height: 400px;
    overflow-x: auto;
}
.file-box .semester .item {
    cursor: pointer;
    padding: 24px;
    font-size: 14px;
    text-align: left;
    color: #3c4043;
    line-height: 16px;
    border-left: 2px solid transparent;
}
.file-box .semester .active {
    background: #e8f0ff;
    color: #4285f4;
    border-left-color: #4285f4;
}
.file-box .list-box {
    padding-left: 24px;
    padding-top: 24px;
    flex: 1 1 70%;
    overflow: auto;
    height: 400px;
}
.component-no_data {
}
.img-box{
    /*margin-bottom: 12px;*/
}
.no-data{
    width: 350px;
}
.file-header{
    padding-bottom: 24px;
    border-bottom: 1px solid #dadce0;
}
.el-input__suffix {
    right: 5px;
    transition: all .3s;
}

.el-input__prefix, .el-input__suffix {
    position: absolute;
    top: 0;
    -webkit-transition: all .3s;
    height: 100%;
    color: #c0c4cc;
    text-align: center;
}

.el-input__suffix, .el-tree.is-dragging .el-tree-node__content * {
    pointer-events: none;
}

.el-form-item__content {
    line-height: 40px;
    position: relative;
    font-size: 14px;
}

.el-form-item__content {
    margin-left: 100px !important;
}

.view-home .rule-form .cus-formitem {
    display: flex;
    align-items: center;
}

.view-home .rule-form .el-form-item {
    border-radius: 4px 4px 0 0;
}

.view-home .margin-bottom-20 {
    margin-bottom: 40px;
}

.el-row {
    box-sizing: border-box;
}

.view-home .rule-form .el-form-item .el-form-item__label {
    padding-left: 16px;
    font-size: 12px;
    font-family: PingFangSC, PingFangSC-Medium, serif;
    font-weight: 500;
    text-align: left;
}

.view-home-box {
    max-width: 1150px;
    margin: 0 auto;
}

.class-box {
    margin: 8px -10px 0;
    display: flex;
    flex-flow: row wrap;
    overflow-y: auto;
}

.view-home {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
}

.view-home .hasborder {
    border: 1px solid #dadce0;
    padding: 18px;
}

.view-home .view-home-content {
    flex: 1;
}

.view-home .header-common-border {
    border-radius: 8px;
    padding-top: 18px;
    padding-bottom: 8px;
}

.view-home .top-handler {
    display: flex;
    justify-content: space-between;
}

.view-home .top-handler .left {
    font-size: 20px;
    font-family: PingFangSC, PingFangSC-Medium, serif;
    color: #575a5b;
    font-weight: 500;
}

.view-home .top-handler .right {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-family: PingFangSC, PingFangSC-Medium, serif;
    font-weight: 500;
    color: #4285f4;
}

.el-btn {
    padding: 10px 20px;
    margin-left: 12px;
    display: inline-block;
}

.el-button--primary {
    color: #fff;
    background-color: #4285f4;
    border-color: #4285f4;
    cursor: pointer;
}

.el-button--primary:hover {
    background-color: #689df6;
}

.el-button--medium {
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 4px;
}


.view-home .view-home-content .other-header {
    padding-top: 12px;
    padding-bottom: 12px;
    font-size: 20px;
    color: #575a5b;
    line-height: 24px;
}


.component-no_data {
    height: max-content;
    padding-top: 100px;
    font-size: 16px;
    font-weight: 500;
    text-align: center;
    color: #74787c;
    line-height: 24px;
}

.component-no_data, .component-no_data .img-box {
    padding-bottom: 12px;
}
</style>