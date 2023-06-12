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

export default {
    name: "Home",
    data() {
        return {
            heads: JSON.parse(sessionStorage.getItem('heads'))
        }
    },
    components: {
        ViewHome,
        Header,
    },
    computed: {
        // ...mapState(['heads'])
    },
    methods: {
        toClassDetail(sClass) {
            let flag = false;
            let value = '课程内容'
            sessionStorage.removeItem("classDetail")
            if (!this.contains(this.heads, value)) {
                this.heads.push(value);
                sessionStorage.setItem('heads', JSON.stringify(this.heads))
            } else {
                let index = this.heads.indexOf(value);
                this.heads.splice(index + 1);
                flag = true
                sessionStorage.setItem('heads', JSON.stringify(this.heads))
            }
            this.$router.push({
                path: "/main/classDetail",
                query: {
                    showClassCode: sClass.code,
                }
            })
            if(this.heads[this.heads.length-1]==='课程内容'&&flag){
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
            this.heads.push(value)
            sessionStorage.setItem('heads', JSON.stringify(this.heads))
        },
        headsSplice(index) {
            this.heads.splice(index);
            sessionStorage.setItem('heads', JSON.stringify(this.heads))
        },
        reStart() {
            this.heads = []
            sessionStorage.setItem('heads', JSON.stringify(this.heads))
        }

    },
    mounted() {
        this.$bus.$on("toClassDetail", this.toClassDetail);
        this.$bus.$on("headsPush",this.headsPush);
        this.$bus.$on("headsSplice",this.headsSplice);
        this.$bus.$on("reStart",this.reStart);
    },
    beforeDestroy() {
        this.$bus.$off("toClassDetail");
        this.$bus.$off("headsPush");
        this.$bus.$off("headsSplice");
        this.$bus.$off("reStart");
    }
}
</script>
<style>
</style>