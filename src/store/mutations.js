import {USER, ROLE, STATE, TOKEN, AVATAR, UID, STATUS} from "@/store/mutation-type"
import Class from "components/class";
import fa from "element-ui/src/locale/lang/fa";

const mutations = {
    // 定义一个方法名为USER值的函数，方法名随着USER的变化而变化
    [USER](state, user) {
        // 通过.属性名的方式存储
        state.user = user
        // 存入游览器的存储容器
        window.localStorage.user = state.user
    },
    [ROLE](state, role) {
        role +=''
        state.role = role
        window.localStorage.role = state.role
    },
    [STATE](state, return_state) {
        state.return_state = return_state
        window.localStorage.state = return_state
    },
    [TOKEN](state, token) {
        state.token = token
        window.localStorage.token = token
    },
    [AVATAR](state, avatar) {
        state.avatar = avatar
        window.localStorage.avatar = state.avatar
    },
    [UID](state, uid) {
        state.uid = uid
        window.localStorage.uid = state.uid
    },
    [STATUS](state,status) {
        state.status = status
        window.localStorage.status = state.status
    },


}

export default mutations