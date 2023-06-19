<template>
    <div id="mainBox">
        <Header :heads="heads"/>
        <router-view></router-view>
    </div>
</template>
<script>
import Header from "components/header";
import ViewHome from "components/viewHome";
import {mapState} from "vuex";
import Message from "components/notification/Message.vue";

export default {
    name: "Home",
    data() {
        return {
            heads: JSON.parse(sessionStorage.getItem('heads'))||[],
            emailDialog:false,
            message:[],
        }
    },
    components: {
        Message,
        ViewHome,
        Header,
    },
    computed: {
        // ...mapState(['heads'])
    },
    methods: {
        toClassDetail(sClass,flag) {
            this.$router.push({
                path: "/main/classDetail",
                query: {
                    showClassCode: sClass.code,
                }
            })
            if (flag){
                window.location.reload()
            }
        },
        contains(arr, value) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] === value) {
                    return true;
                }
            }
            return false;
        },
        headsPush(value) {
            if(value==='通知'||value==='课程内容'||value==='任务管理'){
                this.heads.splice(0,this.heads.length)
            }
            this.heads.push(value)
        },
        headsSplice(index) {
            this.heads.splice(index);
        },
        reStart() {
            this.heads = []
        }

    },
    watch:{
      $route(to,from){
          let value = to.name;
          console.log("跳转到"+value)
          if(value==='我的课堂'){
              this.reStart()
              console.log("回主页")
              return;
          }
          if (!this.contains(this.heads, value)) {
              console.log("添加")
              this.headsPush(value)
          } else {
              let index = this.heads.indexOf(value);
              console.log("移除")
              this.headsSplice(index+1)
          }
      }
    },
    created() {
        this.$bus.$on("toClassDetail", this.toClassDetail);
        window.addEventListener('beforeunload',(event)=>{
            sessionStorage.setItem("heads",JSON.stringify(this.heads))
        })
    },
    beforeDestroy() {
        this.$bus.$off("toClassDetail");
    }
}
</script>
<style scoped>
</style>