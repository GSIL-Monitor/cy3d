module.exports = {
  //开发环境请求地址
  baseURL: "/api/",
  proxy: {
    //代理配置
    "/api/*": {
      // target: 'http://xxx.xxx.xxx.xxx:8080',
      target: "http://127.0.0.1:3002",
      secure: true,
      changeOrigin: true
    }
  },
  //端口号
  port: 5055,
  //mock 数据服务器端口号
  MockPort: 3002,
  // 延时返回mock数据
  MockTimeOut: 500
};
