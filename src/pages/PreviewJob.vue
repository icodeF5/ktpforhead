<template>
  <div class="allOfitem" style="height: 100%">
  <el-header class="top">
    <div class="onLeft">
      <p class="name">{{stuName}}</p>
      <div class="item2">
        标题
        <span>1/1</span>
      </div>
    </div>
    <div class="option">
        <i class="el-icon-share"></i>
        <i class="el-icon-chat-line-square" ></i>
        <i class="el-icon-download" @click="putDown"><a :href=urls id="down" :download=fileName></a></i>
    </div>
    <div class="inRight">
      <div class="rebackhomework " data-tipinfo="打回" style="display: inline-block;margin-right: 20px" >打回作业</div>
      <div class="edstate">
        <label style="line-height: 2.5;margin-left: 20px">成绩：</label>
        <input type="text" v-model="score" @blur="giveGrade()" placeholder="" class="nihao" placeHolder="未批">
      </div>
      <div class="action" style="margin-right: 20px;width: 55px">
        <i class="el-icon-arrow-left" id="last" title="上一个学生"/>
        <i class="el-icon-arrow-right" id="next" title="下一个学生"/>
      </div>
    </div>
  </el-header>
    <el-main class="showFile">
    <iframe v-if="fileType!=='application/octet-stream'" :src="urls"  class="fileHH"/>
    <div class="fileHH" v-if="fileType==='application/octet-stream'">
      <img src="../assets/fileicons/zip.png">
      <a :href=urls :download=fileName>{{fileName}}</a>
    </div>
    </el-main>
  </div>
</template>

<script>
import {getRequest, postRequest} from "network/request";
import url from "network/url";
import axios from "axios";

export default {
  name: "PreviewJob",
  data(){
    return{
      stuName:"",
      url:"http://localhost:8080/homeWork/check",
      score:"未批",
      homeWork:{},
      stu:{},
      urls:"",
      fileType:"",
      fileName:""
    }
  },
  methods:{
    //修改成绩
    giveGrade() {
      if (this.score === '') {
        this.score = '未批'
        this.stu.annex.score = this.score
        postRequest(url.homeWork.setGrades, {
          workId: this.homeWork.id
        }, [
          this.stu
        ]).then(result => {
          this.$message({
            type: "success",
            message: "修改成功！"
          })
        })
        return;
      }
      if (!this.isNum(this.score)) {
        this.$message({
          type: "error",
          message: "请输入正确的分数"
        })
        return;
      }
      if (Number.parseFloat(this.score) >= this.homeWork.allScore) {
        this.$message({
          type: "error",
          message: "请输入正确范围的分数"
        })
        return;
      }
      this.stu.annex.score = this.score
      console.log(this.stu)
      console.log(this.homeWork.id)
      postRequest(url.homeWork.setGrades, {
        workId: this.homeWork.id
      }, [
        this.stu
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
    getFiles(){
      axios({
        url:this.url,
        method:'GET',
        responseType:'blob',
        params:{
          workId:this.homeWork.id,
          accountName:this.stu.user.accountName
        }
      }).then(
          response=>{
            console.log(response.data)
            this.urls = window.URL.createObjectURL(response.data)
            this.fileType = response.data.type
            console.log(this.urls)
          },
          error=>{
            console.log(error)
            return null
          }
      )
    },
    putDown(){
      document.getElementById('down').click()
    }
  },
  mounted(){
    let f=decodeURIComponent(this.$route.query.stu)
    this.stu=JSON.parse(f)
    this.stuName = this.stu.user.name
    let f2=decodeURIComponent(this.$route.query.homeWork)
    this.homeWork=JSON.parse(f2)
    this.getFiles()
    this.fileName = this.stu.annex.work.split('.')[1]+'.'+this.stu.annex.work.split('.')[2]
  }
}
</script>
<style scoped>
.top{
    width: 100%;
    position: fixed;
  height: 73px;
  display: flex;
  justify-content: space-between;
  background-color: black;
  color: #eeeeee;
}
.onLeft{
  padding: 12px 32px;
  line-height: 1;
}
p{
  text-align: left;
  padding-top: 7px;
}
.el-icon-download,.el-icon-chat-line-square,.el-icon-share{
  font-size: 25px;
  margin-right: 38px;
}
.option{
  line-height: 4.5;
  left: 8%;
  position: relative;
}
.inRight{
  display: flex;
  line-height: 4;
}
.nihao{
  width: 42px;
  height: 39px;
  top: 0%;
  position: relative;
}
.edstate{
  display: flex;
  width: 132px;
  height: 39px;
  margin-right: 20px;
  color: black;
  position: relative;
  top: 20%;
  background-color: rgb(255, 255, 255);
}
#next,#last{
  background-color: #ffffff;
  display: inline-block;
  width: 25px;
  height: 39px;
  line-height: 2;
  border: #cac3c3 solid 0.1mm;
  color: #171616;
}
.fileHH{
  width: 75%;
  height: 99%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  background-color: #f5f7fa;
    margin-top: 60px;
}
.showFile{
  height: 100%;
}
</style>