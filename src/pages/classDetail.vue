<template>
    <div class="view-class-detail">
        <HeaderTop :showClassCode="showClassCode"/>
    </div>
</template>

<script>
import HeaderTop from "components/classDetail/HeaderTop.vue";
import {getRequest} from "network/request";
import url from "network/url";

export default {
    name:"ClassDetail",
    props:['showClassCode'],
    components: {HeaderTop},
}

</script>

<style scoped>
.view-class-detail{
    width: 1310px;
    margin: auto;
}
</style>