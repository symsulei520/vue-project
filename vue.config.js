// vue.config.js
module.exports = {
  lintOnSave: false, // 屏蔽eslint语法检测
  // vue项目打包 process.env.NODE_ENV === 'production'？ '生产环境'：'开发环境',
  // 在生产环境中访问目录 http://192.168.0.104:8081/yuguo/Login  本机端口
  // 在开发环境中访问目录 http://192.168.0.104:8080/symsym/Login
  publicPath: process.env.NODE_ENV === 'production' ? '/yuguo/' : '/symsym/',
  outputDir: 'dist', // 编译打包输出文件路径
  assetsDir: 'assets', // 静态资源路径
}
