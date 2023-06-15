<template>
  <div class="allOfitem" style="height: 100%">
  <div class="top">
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
        <i class="el-icon-download"></i>
    </div>
    <div class="inRight">
      <div class="rebackhomework " data-tipinfo="打回" style="display: inline-block;margin-right: 20px" >打回作业</div>
      <div class="edstate">
        <label style="line-height: 2.5;margin-left: 20px">成绩：</label>
        <input type="text" v-model="score" @blur="giveGrade()" placeholder="" class="nihao" placeHolder="未批">
      </div>
      <div class="action" style="margin-right: 20px;width: 55px">
        <a href="javascript:;" class="prev disabled" title="上一个学生">〈&nbsp;</a>
        <a href="javascript:;" class="next disabled" title="下一个学生">&nbsp;〉</a>
      </div>
    </div>
  </div>
    <iframe :src=url class="fileHH">
    </iframe>
  </div>
</template>

<script>
import {getRequest, postRequest} from "network/request";
import url from "network/url";

export default {
  name: "PreviewJob",
  data(){
    return{
      stuName:"",
      url:"http://localhost:8080/homeWork/getTest",
      score:"未批",
      homeWork:{},
      stu:{}
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
  },
  mounted(){
    let f=decodeURIComponent(this.$route.query.stu)
    this.stu=JSON.parse(f)
    this.stuName = this.stu.user.name
    let f2=decodeURIComponent(this.$route.query.homeWork)
    this.homeWork=JSON.parse(f2)
  }
}
</script>
<style scoped>
.top{
  height: 73px;
  display: flex;
  justify-content: space-between;
  background-color: black;
  color: #eeeeee;
}
.onLeft{
  padding: 12px 32px;
}
p{
  text-align: left;
  padding-top: 7px;
}
i{
  font-size: 25px;
  margin-right: 38px;
}
.option{
  line-height: 5.5;
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
a{
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
  height: 100%;
}
</style>