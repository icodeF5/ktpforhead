// cli的配置文件
const path = require('path');//引入path模块
function resolve(dir) {
  return path.join(__dirname, dir)//path.join(__dirname)设置绝对路径
}

const target=require('./src/config/apiConfig').target

module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
        // resolve.alias这个配置项相当于为文件目录配置一个别名
       // key、value 配置别名，在项目中可缩减引用路径
      .set('@', resolve('./src'))
      .set('components', resolve('./src/components'))
      .set('assets', resolve('./src/assets'))
      .set('commonjs', resolve('./src/common'))
      .set('network', resolve('./src/network'))
      .set('views', resolve('./src/views'))
  },
  // 前端应用和 后端API服务器没有运行在同一个主机上，需要将API请求 代理到 API服务器上
  devServer: {
    // // 该应用占用端口号
    port: 3000,
    // // 配置代理
    // proxy: {
    //   '/api': {
    //     target,
    //     changeOrigin: true,  // 是否改变域名
    //     pathRewrite: {
    //       '^/api': ''  // 这个意思就是以api开头的，定向到哪里, 如果你的后边还有路径的话， 会自动拼接上
    //     }
    //   }
    // },
    proxy:"http://localhost:8080/",
  }
}