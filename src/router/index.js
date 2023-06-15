import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "views/Login";
import Home from "@/pages/home";
import ClassDetail from "@/pages/classDetail";
import ViewHome from "components/viewHome.vue";
import Task from "@/pages/Task.vue";
import Work from "@/pages/work.vue";
import ClassMember from "@/pages/ClassMember.vue";
import PreviewJob from "@/pages/PreviewJob";


Vue.use(VueRouter)

const router = new VueRouter({
    // /*
    // * 例如：
    //    histroy:
    //    localhost:8080/user/list
    //    hash:
    //    localhost:8080/#/user/list*/


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
                    props($route){
                        return{
                            showClassCode:$route.query.showClassCode,
                        }
                    },
                },
                {
                    path:"",
                    component:ViewHome,
                },
                {
                    path:"task",
                    component:Task,
                },
                {
                    path:"homeWork",
                    component:Work,
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
                    props($route){
                        return{
                            showClassCode:$route.query.showClassCode,
                        }
                    }
                }
            ]
        }
    ]
})

// 导航守卫: 路由拦截，防止恶意绕开权限通过url访问
// router.beforeEach((to, from, next) => {
//     /* from: 上一个页面*/
//     /* to: 下一个页面*/
//
//     if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
//         if (window.localStorage.state !== undefined && window.localStorage.state === "true") {
//             // token有效
//             const role = to.meta.role.filter(el => el === window.localStorage.role) // 遍历其中数组的每一个
//             if (role.length !== 0) {
//                 next()
//             } else {
//                 // 回上一个页面
//                 router.back()
//             }
//         } else {
//             // token无效或者过期
//             next({
//                 path: '/'
//             })
//         }
//     } else {
// 不是访问博客链接的话或者访问博客链接该值为false时，则直接进入下面的内容，如果不调用Next则页面会卡住
//         next()
//     }
// })

export default router
