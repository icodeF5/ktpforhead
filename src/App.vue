<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script>
import Header from "components/header";

export default {
    name: "App",
    components: {Header},
    mounted() {
        // this.$router.push("/login")
    },

}
</script>
<style>
body{

}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100%;
    text-align: center;

    color: #2c3e50;
}

a, article, aside, body, button, dd, details, div, dl, dt, figcaption,
figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, img, input,
li, menu, nav, ol, p, section, select, table, tbody, td, textarea, th, tr, ul, video {
    margin: 0;
    padding: 0;
    border: 0;
    outline: none;
    font: inherit;
    font-weight: 400;
    vertical-align: baseline;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

* {
    margin: 0;
    padding: 0;
    border: 0;
    outline: none;
    /*zoom: 1.005;*/
    box-sizing: border-box;
}
.flex-between {

    display: flex;
    align-items: center;
    justify-content: space-between;
}
.text-center {
    text-align: center;
}
.font-color--main {
    color: #4285f4;
}
html, body, #app {
    width: 100%;
}

ol,ul{
    list-style: none;
}
li,ul{
    list-style-type: none;
}
a {
    text-decoration: none;
}

.flex-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.flex-align {
    display: flex;
    align-items: center;
}
.flex-baseline {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
}

.view-home .el-button {
    margin-left: 12px;
    padding: 10px 20px;
}

.view-home .home-content .class-chapter .class-handle .el-button {
    padding-top: 0;
    padding-bottom: 0;
}
.font16{
    font-size: 16px;
}
.font14 {
    font-size: 14px;
}
.font24{
    font-size: 24px;
}
.font12{
    font-size: 12px;
}
.head-tip {
    align-items: center;
    padding: 10px 0 0;
}
.font-color--tip {
    color: #74787c;
}
.tip{
    font-size: 14px;
}
.font20{
    font-size: 20px;
}
.mb24{
    margin-bottom: 24px;
}
.mb16{
    margin-bottom: 16px;
}
.ml8{
    margin-left: 8px;
}

</style>
