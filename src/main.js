// 全局文件
import Vue from 'vue'
import App from './App.vue'
/*导入路由*/
import router from './router'
// 引入富文本组件
import QuillEditor from 'vue-quill-editor'
// 引入富文本组件样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

//websocket
import websocket from 'vue-native-websocket';

/*导入vuex*/
import store from './store'
/*导入ElementUI*/
import ElementUI, {Message, MessageBox} from 'element-ui'
/*导入css*/
import 'element-ui/lib/theme-chalk/index.css'
/*导入表单验证的js文件*/
import myModule from './modules/myModule.js'

import target from './config/apiConfig'
import VueRouter from "vue-router";
import Vuex from "vuex";
import axios from "axios";

/*阻止启动生产消息*/
Vue.config.productionTip = false
/*使用elementUI*/
Vue.use(ElementUI)
// 注册为全局组件
Vue.use(QuillEditor)

Vue.use(VueRouter)
Vue.use(Vuex)
/*在原型上定义变量可以在每个vue实例上使用它*/
Vue.prototype.$module = myModule;

Vue.prototype.$target = target;
//将token添加到axios请求头部
axios.interceptors.request.use(
    config => {
        let token = localStorage.getItem('access-admin')
        if (token) {
            config.headers.token = token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(response => {
        return response
    },
    error => {
        console.log(error)
        console.log("进入响应拦截器")
        if(error.response){
            switch (error.response.status){
                case 401:
                    Message({
                        message: "账号信息已过期，请重新登录",//弹出失败原因
                        type: 'error'
                    })
                    router.push({
                        path: "/login"
                    })
            }
        }
        return Promise.reject(error);
    })

Vue.use(websocket, '', {
  connectManually: true, // 手动连接
  format: 'json', // json格式
  reconnection: true, // 是否自动重连
  reconnectionAttempts: 5, // 自动重连次数
  reconnectionDelay: 2000, // 重连间隔时间
});

new Vue({
    // 在全局文件中注册路由
    router,
    // 注册vuex
    store,
    /*h即为createElement，是 Vue.js中里的一个函数、这个函数的作用就是生成一个VNode节点，render函数得到这个VNode节点之后，
    返回给Vue.js的mount函数，渲染成真实DOM节点，并挂载到根节点上*/
    /*引入：vnode是一个普通的js对象，如果我们用这个js对象来描述真实DOM元素的话，那么VNode对象上存在这所有该DOM元素对应的属性，
    * 简单来说，vnode可以理解成节点描述对象*/
    render: h => h(App),  // render: (h) => { return h(App)}

    beforeCreate() {
        Vue.prototype.$bus = this;
    }
}).$mount('#app')






