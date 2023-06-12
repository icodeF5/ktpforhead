<template>
    <div class="mini-class" @click="toClassDetail">
        <img src="../assets/bg/5.png" class="head-avatar">
        <div class="m">
            <p class="mini-class-title">{{showClass.name}}</p>
            <p class="mini-class-name">{{showClass.className}}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: "miniClass",
    props:['showClass'],
    methods:{
        toClassDetail(){
            this.$bus.$emit("changeDrawer");
            // this.$router.push({
            //     path:"/main"
            // })
            this.$bus.$emit("toClassDetail",this.showClass);
        }
    }
}
</script>
<style scoped>
.mini-class{
    cursor: pointer;
    padding: 12px 12px 0;
    display: flex;
    align-items: center;
}
.head-avatar{
    display: block;
    width: 48px;
    height: 48px;
    margin-right: 16px;
    border-radius: 50%;
}
.mini-class-title{
    font-size: 16px;
    font-weight: 500;
    color: #3c4043;
    line-height: 24px;
    text-align: left;
}
.mini-class-name{
    font-size: 14px;
    font-family: PingFangSC,PingFangSC-Regular,serif;
    font-weight: 400;
    color: #74787c;
    line-height: 22px;
    text-align: left;
}
.m{

}
</style>