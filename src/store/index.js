
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from '@/store/mutations'
import axios from "axios";
import {getRequest} from "network/request";
import url from "network/url";

// vue使用了vuex 用来保存全局共享的状态值，保存在state中 ，存值、取值：this.$store.state.属性名
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        showClass:{},
        isTeacher: false,
    },
    // mutations: 专门书写方法,用来更新 state 中的值
    mutations,
    actions: {
        //初始化
        iniRole(context,value){
            getRequest(url.user.isTeacher,{
                accountName:sessionStorage.getItem("accountName")
            }).then(result=>{
                context.state.isTeacher = result.r;
                let classTab = sessionStorage.getItem("classTab");
                value.activeName = classTab==null?result.r?'third':"second":classTab;
                value.guiDangActiveName = result.r?'first':'second';
            })
        },
        setShowClass(context,value){
            getRequest(url.course.getByCode,{
                code:value
            }).then(result=>{
                context.state.showClass = result.r
            })
        },
        readAll(context,value){
            getRequest(url.message.readAllMessage,{
                accountName:sessionStorage.getItem("accountName"),
            }).then(result=>{
            })
        }
    },
    modules: {}
})

