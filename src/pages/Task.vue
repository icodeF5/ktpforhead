<template>
    <div class="task-management-box">
        <h6 class="list-title">
            任务列表
            <span class="font12 font-color--tip">共{{ tasks.length }}个</span>
        </h6>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="'队列中('+this.queue_task+')'" name="first">
                <NoData v-show="queue_task===0"/>
            </el-tab-pane>
            <el-tab-pane :label="'进行中('+this.ing_task+')'" name="second">
                <NoData v-show="ing_task===0"/>
            </el-tab-pane>
            <el-tab-pane :label="'已完成('+this.completed_task+')'" name="third">
                <NoData v-show="completed_task===0"/>
            </el-tab-pane>
            <el-tab-pane :label="'异常任务('+this.try_task+')'" name="fourth">
                <NoData v-show="try_task===0"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import NoData from "components/NoData.vue";

export default {
    name: "Task",
    components: {NoData},
    data() {
        return {
            tasks: [],
            activeName: "first",
        }
    },
    computed: {
        ing_task() {
            return this.cnt("ing")
        },
        queue_task() {
            return this.cnt("queue")
        },
        completed_task() {
            return this.cnt("completed")
        },
        try_task() {
            return this.cnt("try")
        }
    },
    methods: {
        handleClick(tabs) {

        },
        cnt(circumstance) {
            let ans = 0;
            for (let tasksKey in this.tasks) {
                if (tasksKey.circumstance === circumstance) {
                    ans++;
                }
            }
            return ans;
        }
    }
}
</script>
<style scoped>
.task-management-box {
    width: 900px;
    margin: 0 auto;
}

.task-management-box .list-title {
    text-align: left;
    font-size: 20px;
    padding: 16px 0;
}

</style>