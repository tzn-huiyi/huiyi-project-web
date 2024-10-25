const { defineConfig } = require('@vue/cli-service');

//本地ip
const myLocalIp = process.env.MY_LOCAL_IP;
//服务器ip
const myRemoteIp = process.env.MY_REMOTE_IP;

//判断是用本地还是远程地址
/* 
  NODE_ENV 是 Node.js 中常用的环境变量，用于区分不同的运行环境。通常有以下几种值：
  development：表示开发环境
  production：表示生产环境
  test：表示测试环境

*/

const useRemote = process.env.NODE_ENV === 'production' //在生产环境下使用远程地址
// const useRemote = 'production' //若本地运行调用服务器接口，则用此项
const actualUseIp = useRemote ? myRemoteIp : myLocalIp;

console.log(`实际使用的ip为---API: ${actualUseIp}`);

module.exports = defineConfig({
  transpileDependencies: true
  ,  
  devServer: {
    proxy: {
      '/api': {
        target: `http://${actualUseIp}:8180`, // 后端服务器地址
        changeOrigin: true,
        pathRewrite: { '^/api': '' } 
      },
      '/auth': {
        target: `http://${actualUseIp}:8180`, // 后端服务器地址
        changeOrigin: true,
        pathRewrite: { '^/auth': '' } 
      },
      '/msg': {
        target: `http://${actualUseIp}:8180`, // 后端服务器地址
        changeOrigin: true,
        pathRewrite: { '^/msg': '' } 
      }
    }
  }
})
