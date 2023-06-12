const url = {
    school:{
        getAllSchool:"/school/getAllSchool"
    },
    course:{
        setTop:"/course/setTop",
        deleteTop:"/course/deleteTop",
        outClass:"/course/outClass",
        joinClass:"/course/joinClass",
        createClass:"/course/createClass",
        getAllStudent:"/course/getAllStudent",
        getByCode:"/course/getByCode",
        noGuiDang:"/course/noGuiDang",
    },
    user:{
        loginKtp:"/user/loginKtp",
        loginAccount:"/user/loginAccount",
        isTeacher:"/user/isTeacher",
        getGroupJoinClass:"/user/getGroupJoinClass",
        getGroupCreateClass:"/user/getGroupCreateClass",
        getJoinClass:"/user/getJoinClass",
        getCreateClass:"/user/getCreateClass",
        getTopClass:"/user/getTopClass"
    },
    homeWork:{
        publishWork:"/homeWork/publishWork",
        getAllWork:"/homeWork/getAllWork",
        upload:"/homeWork/upload",
        status:"/homeWork/status",
        isSubmit:"/homeWork/isSubmit",
        getAllStudent:"/homeWork/getAllStudent",
        getById:"/homeWork/getById",
        setGrades:"/homeWork/setGrades",
    }
}

export default url