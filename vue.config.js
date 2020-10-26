
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}


module.exports = {

  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    open: true,
    // proxy: {
    //   '/api': {
    //     target: 'http://jghr.com/',
    //     // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
    //     changeOrigin: true,
    //     ws: true,
    //     pathRewrite: {
    //       // 替换target中的请求地址，也就是说以后你在请求http://api.jisuapi.com/XXXXX这个地址的时候直接写成/api即可
    //       '^/api': '/'
    //     }
    //   },
    // },
    // before: require('./mock/mock-server.js')
  },
  chainWebpack(config){

    // config.entry('main').add('babel-polyfill') // main是入口js文件

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    
  }

}