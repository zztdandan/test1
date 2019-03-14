"use strict";
const Mock = require("mockjs");
const path = require("path");
var fs = require("fs");

const API_PORT = process.env.PROXY_API_PORT || "80";
const API_IP = process.env.PROXY_API_IP || "172.16.4.146";
const API_URL = `http://${API_IP}:${API_PORT}`;
const API_PATH_REWRITE = process.env.API_PATH_REWRITE || "/";
const MOCK_URL = "http://localhost:" + process.env.PROXY_MOCK_PORT || "8080";

console.log(`***********************server run in ************************`);
console.log(`API_URL= ${API_URL}`);
console.log(`API_PATH_REWRITE= ${API_PATH_REWRITE}`);
console.log(`MOCK_URL= ${MOCK_URL}`);
console.log(`MOCK_LOGIN =${process.env.VUE_APP_MOCK_LOGIN}`);
console.log(`MOCK_MENU =${process.env.VUE_APP_MOCK_MENU}`);
console.log(`***********************server run in ************************`);
// 20190312，在mock文件中实现
// const loginMock = function(req, res) {
//   if (
//     process.env.MOCK_LOGIN === "true" &&
//     req.url.indexOf("/api/admin/login") === 0
//   ) {
//     res.json({
//       code: 0,
//       msg: "成功",
//       reqId: "dd" + new Date().getTime(),
//       data: {
//         token: "pw33test-@id()"
//       }
//     });
//     return true;
//   }
// };
const bypass = function(req, res) {
  // 该函数必须返回false或返回被部署的文件路径，返回false继续。
  const key = req.method.toUpperCase() + " " + req.url;
  const urlPath = req.url.split("?")[0];
  const mockPath = path.resolve(__dirname, "../mock/");
  const fileName = path.resolve(mockPath, "./" + urlPath + ".json");
  const jsFileName = path.resolve(mockPath, "./" + urlPath + ".js");
  console.log("----------------request----------------", key);
  // 是否需要本地模拟登陆
  // if (loginMock(req, res)) {
  //   console.log("-----------loginMock ok-------------");
  //   return true;
  // }

  // 是否存在json或者js文件
  if (fs.existsSync(fileName) || fs.existsSync(jsFileName)) {
    // 存在js文件，则require该文件后执行callback(req, res)
    // 否则读该json文件，并且JSON.parse,json文件只需返回data部分
    // 要求js文件一定要导出export callback函数，如exports.callback = (req, res) {...}
    const data = fs.existsSync(jsFileName)
      ? require(jsFileName).callback(req, res)
      : JSON.parse(fs.readFileSync(fileName, "utf8"));
    const mockData = Mock.mock(data);

    // 如果需要mock多行,即存在类似于data|30-50这种情况的
    const resData =
      Object.keys(data).some(k => /^data\|\d+/.test(k)) && "data" in mockData
        ? mockData.data
        : mockData;
    res.json({
      code: 0,
      reqId: "mock-" + new Date().getTime(),
      msg: "成功",
      data: resData
    });
    console.log(
      "-------mock ok-------,data=",
      JSON.stringify(resData, null, 4)
    );
    return true;
  }
  return false;
};

module.exports = {
  proxyTable: {
    "/api/": {
      // api表示当前项目请求使用该项可进入远程端访问
      target: API_URL, // 真正测试服务器路径
      // target: "http://127.0.0.1:8888", // 本地服务器路径，已取消，使用mock代替
      // target: 'http://172.16.4.194:8080/app/mock/21', //远端rap2模拟服务器路径
      pathRewrite: {
        "^/api/": API_PATH_REWRITE
      }, // 重写路径

      // changeOrigin: true,
      bypass: bypass
    },
    "/mock/": {
      // api表示当前项目请求使用该项可进入远程端访问
      // target: "http://172.16.4.194:8080/app/mock/21", // 本地理服务器路径
      target: MOCK_URL, // 本地理服务器路径
      // target: 'http://140.143.26.135:3000', //远端 代理服务器路径
      pathRewrite: {
        "^/mock/": "/"
      } // 重写路径
      //   changeOrigin: true
    }
  }
};
