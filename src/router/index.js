import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "views/Login";
import Home from "@/pages/home";
import ClassDetail from "@/pages/classDetail";
import ViewHome from "components/viewHome.vue";
import Task from "@/pages/Task.vue";
import Work from "@/pages/work.vue";
import Notification from "@/pages/Notification.vue";
import ClassMember from "@/pages/ClassMember.vue";
import PreviewJob from "@/pages/PreviewJob";
import axios from "axios";
import {Message} from "element-ui";


Vue.use(VueRouter)

const router = new VueRouter({
    // /*
    // * 例如：
    //    histroy:
    //    localhost:8080/user/list
    //    hash:
    //    localhost:8080/#/user/list*/
    mode:'history',

    // mode: 'history', /*默认 hash 模式，使用 URL 的 hash 来模拟一个完整的 URL，于是当URL改变时，页面不会重新加载*/
    // base: process.env.BASE_URL, /*应用的基路径*/
    routes:[
        {
          path:"/",
          redirect:"/login"
        },
        {
            path:"/login",
            component:Login,
        },
        {
            path:"/PreviewJob",
            component:PreviewJob
        },
        {
            path:"/main",
            component:Home,
            children:[
                {
                    path:"classDetail",
                    component:ClassDetail,
                    name:"课程内容",
                    props($route){
                        return{
                            showClassCode:$route.query.showClassCode,
                        }
                    },
                },
                {
                    path:"",
                    component:ViewHome,
                    name:"我的课堂",
                },
                {
                    path:"task",
                    component:Task,
                    name:"任务管理",
                },
                {
                    path:"homeWork",
                    component:Work,
                    name:"作业详细",
                    props($router){
                        return{
                            showClassCode:$router.query.showClassCode,
                            homeWorkId:$router.query.homeWorkId,
                            submit:$router.query.submit,
                            isOwner:$router.query.isOwner,
                        }
                    }
                },
                {
                    path:"classMember",
                    component:ClassMember,
                    name:"成员",
                    props($route){
                        return{
                            showClassCode:$route.query.showClassCode,
                        }
                    }
                },
                {
                    path:"notification",
                    component:Notification,
                    name:"通知"
                }
            ]
        }
    ]
})


let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写VueRouter.prototype身上的push方法了
VueRouter.prototype.push = function(location, resolve, reject) {
    //第一个形参：路由跳转的配置对象（query|params）
    //第二个参数：undefined|箭头函数（成功的回调）
    //第三个参数:undefined|箭头函数（失败的回调）
    if (resolve && reject) {
        //push方法传递第二个参数|第三个参数（箭头函数）
        //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
        originPush.call(this, location, resolve, reject);
    } else {
        //push方法没有产地第二个参数|第三个参数
        originPush.call(
            this,
            location,
            () => {},
            () => {}
        );
    }
};
//重写VueRouter.prototype身上的replace方法了
VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(
            this,
            location,
            () => {
            },
            () => {
            }
        );
    }
};

// 导航守卫: 路由拦截，防止恶意绕开权限通过url访问
router.beforeEach((to, from, next) => {
    /* from: 上一个页面*/
    /* to: 下一个页面*/

    if (to.path.startsWith('/login')) {
        window.localStorage.removeItem('access-admin')
        next()
    } else {
        let admin = window.localStorage.getItem('access-admin')
        if (!admin) {
            Message({
                type:"error",
                message:"登录身份已过期，请重新登录！"
            })
            next({path:'/login'})
        }
        else {
            next()
        }
    }
})

export default router
