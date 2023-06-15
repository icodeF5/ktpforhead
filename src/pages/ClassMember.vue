<script>
import Class from "components/class.vue";

import {getRequest} from "network/request";
import url from "network/url";
import NoData from "components/NoData.vue";

export default {
  name: "ClassMember",
  components: {NoData, Class},
  props: ['showClassCode'],
  data() {
    return {
      input: '',
      activeName: 'first',
      isOpen: false,
      showTeacherTable: true,
      showStudentTable: false,
      showGroupTable: false,
      showSearchTable: false,
      showActive: false,
      currentPage: 4,
      tableData: [],
      searchData: [],
      teacherData: [],
      showTable: {
        name: '教师团队',
        data: [this.teacherData]
      },
      pageInfo: {
        currentPage: 1,
        pageSize: 50,
        pageTotal: 1
      },
      teaFlag: '1',
    }
  },

  methods: {
    handleClick(tab, event) {
      if (tab.name === 'second'){
        this.showGroup()
      }else if (this.teaFlag === '1') {
        this.showTeacher()
      } else {
        this.showStudent()
      }
    },

    formatter(row, column) {
      return row.address;
    },

    showTeacher() {
      this.teaFlag = '1'
      this.showStudentTable = false
      this.showTeacherTable = true
      this.showGroupTable = false
      this.showActive = false
      this.showSearchTable = false
      this.showTable.name = '教师团队'
      this.showTable.data = this.teacherData;
      this.pageInfo.pageTotal = this.showTable.data.length
    },

    showStudent() {
      this.teaFlag = '0'
      this.showTeacherTable = false
      this.showSearchTable = false
      this.showActive = false
      this.showGroupTable = false
      this.showStudentTable = true
      this.showTable.name = '全部学生'
      this.showTable.data = this.tableData;
      this.pageInfo.pageTotal = this.showTable.data.length

    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      let that = this
      that.pageInfo.pageSize = val
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      let that = this
      that.pageInfo.currentPage = val
    },

    findStudent() {
      var that = this
      getRequest(url.course.findPerson, {
        code: that.showClassCode
      }).then(result => {
        that.tableData = result.r;
        console.log(that.tableData)
        that.formatDate()
      })
    },

    findTeacher() {
      var that = this
      getRequest(url.course.getByCode, {
        code: that.showClassCode
      }).then(result => {
        that.teacherData.push(result.r);
      })
    },

    formatDate() {
      for (let i = 0; i < this.tableData.length; i++) {
        let date = this.tableData[i].joinTime
        let timeStr = date.slice(0, 4) + '/';
        timeStr += date.slice(5, 7) + '/';
        timeStr += date.slice(8, 10) + ' ';
        timeStr += date.slice(11, 16);
        this.tableData[i].joinTime = timeStr;
      }
    },

    inputChange() {
      if (this.input === '') {
        if (this.teaFlag === '1') {
          this.showTeacher()
        } else {
          this.showStudent()
        }
      } else {
        this.searchData = this.tableData.filter(data => !this.input || data.name.includes(this.input))
        this.showTable.name = '搜索结果'
        this.showTable.data = this.searchData;
        this.showTeacherTable = false
        this.showStudentTable = false
        this.showSearchTable = true
      }
    },

    showGroup(){
      this.showTeacherTable = false
      this.showStudentTable = false
      this.showSearchTable = false
      this.showGroupTable = true
    }
  },

  created() {
    this.findStudent()
    this.findTeacher()
  },

}
</script>

<template>

  <div class="view-member">
    <div class="viewHeader">
      <div class="le"></div>
      <div class="ri" v-show="!showGroupTable">
        <div class="session_search">
          <el-input
              v-model="input"
              @change="inputChange"
              clearable
              placeholder="搜索姓名、学号"
              suffix-icon="el-icon-search">
          </el-input>

        </div>
      </div>
    </div>

    <div class="viewCon">
      <div class="le" style="position: absolute; top: unset;">
        <el-tabs v-model="activeName" @tab-click="handleClick" stretch style="height: 500px;">
          <el-tab-pane label="全部成员" style="font-size: 17px;" name="first">
            <div class="list" >
              <div class="teacher" @click="showTeacher" :class="{
                teacherTeamActive:this.showTeacherTable
              }">教师团队
              </div>

              <div class="all_student_item" @click="showStudent" :class="{
                     teacherTeamActive:this.showStudentTable
                   }">
                <span style="cursor: pointer; font-size: 17px; line-height: 40px;">
                  全部学生（{{ tableData.length }}）
                </span>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="学生分组" name="second" style="font-size: 17px;" >
              <div class="list" >

                <div style="display: flex;flex-direction: row;align-items: center;width: 300px" class="teacher"
                     @click="showActive=true" :class="{
                teacherTeamActive:this.showActive,

              }">
                  <i class="el-icon-caret-right" @click="showActive=true" :class="{ img:this.showActive}"/>
                  班级固定分组
                  <el-tag effect="dark" class="classTeam">固定组</el-tag>
                </div>
              </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="ri">
        <div class="tab_view">
          <div class="member-list">
            <div class="head" v-show="!showGroupTable">
              <div class="classRom">
                <div class="title-box flex-align flex-between">
                  <div class="left">
                    <span class="name">{{ showTable.name }}</span>
                    <span style="margin-left: 10px"> 共{{ showTable.data.length }}人 </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab_view">
              <el-table
                  :header-cell-style="{background:'rgb(244,244,244)'}"
                  v-show="showSearchTable"
                  :data="searchData.slice((pageInfo.currentPage-1)*pageInfo.pageSize,pageInfo.currentPage*pageInfo.pageSize)"
                  style="width: 100%"
                  max-height="700px"
                  :default-sort="{prop: 'userId', order: 'descending'
                  }"
              >
                  <el-table-column
                      label="全部成员"
                      sortable
                      width="180">
                    <div class="cell" slot-scope="scope">
                      <div class="avatar-box">
                        <img src="../assets/icon-student.png" alt="" style="width: 25px; margin-right: 10px">
                        <div>{{scope.row.name}}</div>
                      </div>
                    </div>
                  </el-table-column>
                <el-table-column
                    prop="userId"
                    label="学号"
                    sortable
                    width="130">
                </el-table-column>
                <el-table-column
                    prop="accountName"
                    label="账号"
                    width="190"
                >
                </el-table-column>

                <el-table-column
                    prop="joinTime"
                    label="加入时间"
                    width="180"
                    sortable
                >
                </el-table-column>

                <el-table-column
                    width="150">
                  <div class="cell">
                  <span class="opt-btn mgr-16">
                    <i class="el-icon-chat-line-round font_family" style="font-size: 25px"></i>
                    私聊
                  </span>
                  </div>
                </el-table-column>
              </el-table>
              <el-table
                  v-show="showTeacherTable"
                  :data="teacherData.slice((pageInfo.currentPage-1)*pageInfo.pageSize,pageInfo.currentPage*pageInfo.pageSize)"
                  style="width: 100%"
                  max-height="700px"
                  :header-cell-style="{background:'rgb(244,244,244)'}"
                  :default-sort="{prop: 'ownerName', order: 'descending'}"
              >

                    <el-table-column
                        label="全部成员"
                        sortable
                        width="300">
                      <div class="cell" slot-scope="scope">
                        <div class="avatar-box">
                          <img src="../assets/icon-teacher.png" alt="" style="width: 25px; margin-right: 10px">
                          <div>{{scope.row.ownerName}}</div>
                        </div>
                      </div>
                    </el-table-column>

                <el-table-column
                    prop="ownerId"
                    label="账号"
                    width="140"
                >
                </el-table-column>

                <el-table-column
                    label="身份"
                    width="100"
                >老师
                </el-table-column>

                <el-table-column
                    width="293">
                  <div class="cell">
                  <span class="opt-btn mgr-16">
                    <i class="el-icon-chat-line-round font_family" style="font-size: 25px"></i>
                    私聊
                  </span>
                  </div>
                </el-table-column>

              </el-table>
              <el-table
                  :header-cell-style="{background:'rgb(244,244,244)'}"
                  v-show="showStudentTable"
                  :data="tableData.slice((pageInfo.currentPage-1)*pageInfo.pageSize,pageInfo.currentPage*pageInfo.pageSize)"
                  style="width: 100%"
                  max-height="700px"
                  :default-sort="{prop: 'userId', order: 'descending'
                  }"
              >
                <el-table-column
                    label="全部成员"
                    sortable
                    width="180">
                  <div class="cell" slot-scope="scope">
                    <div class="avatar-box">
                      <img src="../assets/icon-student.png" alt="" style="width: 25px; margin-right: 10px">
                      <div>{{scope.row.name}}</div>
                    </div>
                  </div>
                </el-table-column>
                <el-table-column
                    prop="userId"
                    label="学号"
                    sortable
                    width="130">
                </el-table-column>
                <el-table-column
                    prop="accountName"
                    label="账号"
                    width="190"
                >
                </el-table-column>

                <el-table-column
                    prop="joinTime"
                    label="加入时间"
                    width="180"
                    sortable
                >
                </el-table-column>

                <el-table-column
                    width="150">
                  <div class="cell">
                  <span class="opt-btn mgr-16">
                    <i class="el-icon-chat-line-round font_family" style="font-size: 25px"></i>
                    私聊
                  </span>
                  </div>
                </el-table-column>
              </el-table>
              <div class="block" v-show="!showGroupTable">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageInfo.currentPage"
                    :page-sizes="[50, 100, 150, 200]"
                    :page-size="pageInfo.pageSize"
                    layout="total, sizes, prev, pager, next"
                    :total="pageInfo.pageTotal" style="display: flex; justify-content: left">
                </el-pagination>
              </div>
            </div>
          </div>
        </div>

        <div class="group_view">
          <div class="head" v-show="showActive">
            <div class="classRom">
              <span class="name">固定组：班级固定分组</span>
               <span class="count" style="display: flex;justify-content: left">共0组，
                  <span style="display: flex;justify-content: left">未进组人数：{{tableData.length}} </span>
               </span>
            </div>
          </div>
          <div class="groupSamll" v-show="showActive">
            <span class="group-title"></span>
            <div class="add_itemview"></div>
          </div>
          <div class="tab_smallview">
            <el-table
                v-show="showGroupTable"
                :header-cell-style="{background:'rgb(244,244,244)'}"
                style="width: 100%"
                max-height="700px"
                height="450px"
                is-leaf
            >
              <el-table-column
                  label="全部成员"
                  width="220">
                <div class="cell" slot-scope="scope">
                  <div class="avatar-box">
                    <img src="../assets/icon-student.png" alt="" style="width: 25px; margin-right: 10px">
                    <div>{{scope.row.name}}</div>
                  </div>
                </div>
              </el-table-column>
              <el-table-column
                  label="学号"
                  is-leaf
                  width="240">
              </el-table-column>
              <el-table-column
                  label="账号"
                  width="150"
                  is-leaf
              >
              </el-table-column>
              <el-table-column
                  label="身份"
                  is-leaf
                  width="100"
              >
              </el-table-column>
              <el-table-column
                  is-leaf
                  width="143">
                <div class="cell">
                  <span class="opt-btn mgr-16">
                    <i class="el-icon-chat-line-round font_family" style="font-size: 25px"></i>
                    私聊
                  </span>
                </div>
              </el-table-column>


              <template slot="empty" >
                <NoData />
              </template>

            </el-table>
            <div class="block" v-show="showGroupTable">
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="pageInfo.currentPage"
                  :page-sizes="[50, 100, 150, 200]"
                  :page-size="pageInfo.pageSize"
                  layout="total, sizes, prev, pager, next"
                  :total="1" style="display: flex; justify-content: left">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<style scoped>

.data, .component-no_data .img-box {
  padding-bottom: 12px;
}

.no_data {
  height: max-content;
  padding-top: 100px;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  color: #74787c;
  line-height: 24px;
}

.empty-text {
  line-height: 60px;
  width: 50%;
  color: #909399;
}

.empty-block {
  min-height: 60px;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-table td, .el-table th.is-leaf {
  border-bottom: 1px solid #dcdcdc;
}

.group_view .tab_smallview {
  position: relative;
}

.group_view .groupSamll {
  border-top: 1px solid #dadce0;
  margin: 0 24px;
  padding: 15px 0;
  display: flex;
  justify-content: space-between;
}

.group_view .head .classRom .count {
  color: #5f6368;
  font-size: 12px;
}

.group_view .head .classRom .name {
  font-size: 20px;
  color: #3c4043;
  font-weight: 700;
  margin-bottom: 8px;
}

.group_view .head .classRom {
  display: flex;
  flex-direction: column;
}

.group_view .head {
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}

.classTeam{
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(.83);
  margin-left: 8px;
  font-size: 12px;
  color: #fff;
  height: 20px;
  line-height: 20px;
  text-align: center;
  width: 44px;
  background: #4285f4;
  border-radius: 8px;
}

.avatar-box {
  display: flex;
  align-items: center;
  font-size: 12px;
  font-family: PingFangSC,PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #5f6368;
}

.cell {
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
  line-height: 23px;
  padding-right: 10px;
}

.opt-btn {
  cursor: pointer;
  color: #606266;
}

.mgr-16 {
  margin-right: 16px;
}

.member-list .head {
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.view-member .viewCon .studentTeam {
  cursor: pointer;
  height: 40px;
  line-height: 50px;
  padding-left: 12px;
  color: #3c4043;
  font-weight: 700;
  font-size: 14px;
}

.view-member .viewHeader, .view-member .viewHeader .le {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.viewHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.view-member .viewHeader .ri .session_search i {
  cursor: pointer;
}

.view-member .viewHeader .ri {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

>>> .el-input__inner {
  -webkit-appearance: none;
  background-color: #FFF;
  background-image: none;
  border-radius: 30px;
  border: 1px solid #DCDFE6;
  box-sizing: border-box;
  color: #111213;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  width: 100%;
}

.view-member .viewCon {
  margin-top: 20px;
  display: flex;
}

.view-member .viewHeader .ri .session_search input {
  color: #5f6368;
  font-size: 12px;
  outline: none;
}


.view-member .viewCon .le .all_student_item {
  cursor: pointer;
  color: #3c4043;
  font-weight: 700;
  padding-right: 68px;
  width: 275px;
  font-size: 17px;
  height: 40px;
  line-height: 40px;
}

.view-member .viewCon .le .teacher {
  cursor: pointer;
  width: 280px;
  padding-right: 120px;
  height: 40px;
  line-height: 40px;
  color: #3c4043;
  font-weight: 700;
  font-size: 17px;
}

>>> .el-tabs__content {
  height: 300px;
  overflow: hidden;
  position: relative;
}

.teacherTeamActive {
  background: #e8f0ff;
}

.img{
  -moz-transform:rotate(90deg);
  -webkit-transform:rotate(90deg);

}

.member-list .head .classRom {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: #5f6368;
  width: 100%;
}

.studentLists li {
  height: 40px;
  padding-left: 32px;
  color: #5f6368;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 15px;
}


.studentLists .liActive {
  background: #e8f0ff;
}

span {
  outline: none;
}


.view-member {
  width: 1150px;
  margin: 0 auto;


}

.view-member .viewCon .le {
  flex: 0 0 270px;
  width: 270px;
  height: min-content;
  border-radius: 8px;
  border: 1px solid #dadce0;
  margin-right: 25px;
  padding-bottom: 25px;
  position: absolute;
}

li, ul {
  list-style-type: none;
}

.view-member .viewCon .studentLists li span {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}


.view-member .viewCon .studentLists li {
  height: 40px;
  padding-left: 32px;
  color: #5f6368;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 15px;
}


.view-home .view-home-content .class-chapter .class-handle {
  display: flex;
  justify-content: space-between;
  flex-flow: nowrap;
  /*line-height: 23px;*/
  /*height: 23px;*/
}

.view-home .common-border {
  border-width: 1px;
  border-style: solid;
  border-color: rgb(218, 220, 224);
  border-image: initial;
  border-radius: 8px;
  padding: 18px;
}

.view-home .view-home-content .class-chapter {
  margin-bottom: 24px;
  background: rgb(248, 249, 250);
}

.view-home .home-content .class-box > div {
  margin: 11px;
}


.view-member .viewCon .le .list {
  min-height: 400px;
}

.member-list .head .classRom .name {
  font-size: 20px;
  color: #202124;
  display: inline-block;
//margin-right: 12px; font-weight: 700; margin-bottom: 8px;
}

.view-member .viewCon .ri {
  flex: 1;
  border-radius: 8px;
  border: 1px solid #dadce0;
  width: 850px;
  margin-left: 295px;
}

.member-list .tab_view {
  position: relative;
  padding-left: 10px;
  padding-right: 10px;
}

>>> .el-tabs__item {
  padding: 0 0;
  height: 40px;
  box-sizing: border-box;
  line-height: 40px;
  display: inline-block;
  list-style: none;
  font-size: 18px;
  font-weight: 500;
  color: #303133;
  position: relative;
}

>>> .el-tabs__nav-wrap::after {
  position: static !important;
}

>>> .el-table .el-table__header-wrapper th, .el-table .el-table__header-wrapper tr {
  background-color: transparent;
}


>>> .el-table th, .el-table tr {
  background-color: #fff0;
}


>>> .el-table thead {
  color: #909399;
  font-weight: 500;
  border: 1px solid #dcdcdc;
  background:#F6F6F6 ;
}

>>> .el-table thead tr th .cell {
  color: #2d2d2d;
  font-size: 14px;
  font-weight: 700;
}



</style>