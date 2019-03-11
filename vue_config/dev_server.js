const config = {
  open: true, // 启动服务后是否打开浏览器
  port: 9528, // 服务端口
  https: false,
  hotOnly: false,
  proxy: {
    "/api": {
      // api表示当前项目请求使用该项可进入远程端访问
      target: "http://172.16.4.194:8080/app/mock/17", // 本地理服务器路径
      // target: 'http://140.143.26.135:3000', //远端 代理服务器路径
      pathRewrite: { "^/api": "/" }, // 重写路径
      changeOrigin: true
    }, // 设置代理
    before: app => {
      console.log("代理跳转",app);
    }
  }
};
module.exports= config;
