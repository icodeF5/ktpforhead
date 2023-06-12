
<template>
    <div class="component-no_data">
        <div class="img-box">
            <img src="../assets/empty.png" alt="" class="no-data">
        </div>
        "暂无数据"
    </div>
</template>

<script>
export default {
    name:"NoData",
}
</script>

<style scoped>
 .component-no_data {
     margin: 100px 0 0;
     padding: 30px 0;
}
 .img-box{
     /*margin-bottom: 12px;*/
 }
 .no-data{
     width: 500px;
 }
</style>