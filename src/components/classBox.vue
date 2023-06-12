<template>
    <div class="common-border class-chapter">
        <div class="class-handle">
            <p class="left" style="cursor: pointer;line-height: 37px" @click="isOpen=!isOpen">
                {{sClass[0].startTime}}-{{sClass[0].endTime}}&nbsp;{{sClass[0].season===1?'第一学期':'第二学期'}}
            </p>
            <div class="right">
                <div id="btnBox" @click="isOpen=!isOpen">
                    <el-button type="text" v-show="!isOpen">
                        <i class="el-icon-caret-bottom"></i>
                        <span>展开</span>
                    </el-button>
                    <el-button v-show="isOpen" type="text">
                        <i class="el-icon-caret-top"></i>
                        <span>收起</span>
                    </el-button>
                </div>
            </div>
        </div>
        <div class="class-box">
            <el-collapse-transition>
                <div v-show="isOpen">
                    <Class v-for="c in sClass" :key="c.code" :sClass="c" :top="top"/>
                </div>
            </el-collapse-transition>
        </div>
    </div>
</template>

<script>
import Class from "components/class.vue";
import {mapState} from "vuex";
export default {
    //sClass是属于同一学期的课程
    //isTeach是判断是否是自己教学的课程
    props:['sClass','top'],
    name:"ClassBox",
    components: {Class},
    data(){
        return {
            isOpen:false,
        }
    },
    mounted() {
    }
}

</script>

<style scoped>
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
.view-home .home-content .class-box>div {
    margin: 11px;
}
.class-box {
    margin: 8px -10px 0;
    display: flex;
    flex-flow: row wrap;
    overflow-y: auto;
}
</style>