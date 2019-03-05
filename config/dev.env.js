"use strict";
const Mock = require("mockjs");
const path = require("path");
var fs = require("fs");

console.log("process.env.mockLogin", process.env.mockLogin, 33);
const loginMock = function(req, res) {
  if (process.env.mockLogin && req.url.indexOf("/api/admin/sys/login") === 0) {
    res.json({
      code: 0,
      msg: "成功",
      reqId: "dd" + new Date().getTime(),
      data: {
        token: "pw33test-@id()"
      }
    });
    return true;
  }
};
module.exports = {
  NODE_ENV: '"development"',
  BASE_API: '"https://vue-admin"',
  proxyTable: {
    "/api/": {
      // api表示当前项目请求使用该项可进入远程端访问
      target: "http://172.16.4.146", // 真正测试服务器路径
      // target: "http://127.0.0.1:8888", // 本地服务器路径，已取消，使用mock代替
      // target: 'http://172.16.4.194:8080/app/mock/21', //远端rap2模拟服务器路径
      pathRewrite: {
        // "^/api/": "/",
      }, // 重写路径

      // changeOrigin: true,
      bypass(req, res, proxyOptions) {
        // 该函数必须返回false或返回被部署的文件路径，返回false继续。
        const key = req.method.toUpperCase() + " " + req.url;
        const urlPath = req.url.split("?")[0];
        const mockPath = path.resolve(__dirname, "../mock/");
        const fileName = path.resolve(mockPath, "./" + urlPath + ".json");
        console.log("----------------request----------------", key);
        // 是否需要本地模拟登陆
        if (loginMock(req, res)) {
          return true;
        }
        if (fs.existsSync(fileName)) {
          var data = fs.readFileSync(fileName, "utf8"),
            json = JSON.parse(data),
            mockData = Mock.mock(json);
          mockData.reqId = "mock-" + new Date().getTime();
          console.log(
            "--------------------mock----------------------\n",
            fileName,
            "mockData",
            mockData
          );
          res.json(mockData);
          return true;
        }
        return false;
      }
    },
    "/mockxx/": {
      // api表示当前项目请求使用该项可进入远程端访问
      // target: "http://172.16.4.194:8080/app/mock/21", // 本地理服务器路径
      target: "http://localhost:8080", // 本地理服务器路径
      // target: 'http://140.143.26.135:3000', //远端 代理服务器路径
      pathRewrite: {
        "^/mockxx/": "/"
      } // 重写路径
      //   changeOrigin: true
    }
  },
  proxyTableLocal: {
    "/api/": {
      // api表示当前项目请求使用该项可进入远程端访问
      // target: "http://172.16.4.146", // 真正测试服务器路径
      target: "http://127.0.0.1:8080", // 本地服务器路径，已取消，使用mock代替
      // target: 'http://172.16.4.194:8080/app/mock/21', //远端rap2模拟服务器路径
      pathRewrite: {
        "^/api/": "/"
      }, // 重写路径

      // changeOrigin: true,
      bypass(req, res, proxyOptions) {
        // 该函数必须返回false或返回被部署的文件路径，返回false继续。
        const key = req.method.toUpperCase() + " " + req.url;
        const urlPath = req.url.split("?")[0];
        const mockPath = path.resolve(__dirname, "../mock/");
        const fileName = path.resolve(mockPath, "./" + urlPath + ".json");
        console.log("----------------request----------------", key);
        // 是否需要本地模拟登陆
        if (loginMock(req, res)) {
          return true;
        }
        if (fs.existsSync(fileName)) {
          var data = fs.readFileSync(fileName, "utf8"),
            json = JSON.parse(data),
            mockData = Mock.mock(json);
          mockData.reqId = "mock-" + new Date().getTime();
          console.log(
            "--------------------mock----------------------\n",
            fileName,
            "mockData",
            mockData
          );
          res.json(mockData);
          return true;
        }
        return false;
      }
    },
    "/mockxx/": {
      // api表示当前项目请求使用该项可进入远程端访问
      // target: "http://172.16.4.194:8080/app/mock/21", // 本地理服务器路径
      target: "http://localhost:8080", // 本地理服务器路径
      // target: 'http://140.143.26.135:3000', //远端 代理服务器路径
      pathRewrite: {
        "^/mockxx/": "/"
      } // 重写路径
      //   changeOrigin: true
    }
  },
  proxyTableLocal8888: {
    "/api/": {
      // api表示当前项目请求使用该项可进入远程端访问
      // target: "http://172.16.4.146", // 真正测试服务器路径
      target: "http://127.0.0.1:8888", // 本地服务器路径，已取消，使用mock代替
      // target: 'http://172.16.4.194:8080/app/mock/21', //远端rap2模拟服务器路径
      pathRewrite: {
        "^/api/": "/"
      }, // 重写路径

      // changeOrigin: true,
      bypass(req, res, proxyOptions) {
        // 该函数必须返回false或返回被部署的文件路径，返回false继续。
        const key = req.method.toUpperCase() + " " + req.url;
        const urlPath = req.url.split("?")[0];
        const mockPath = path.resolve(__dirname, "../mock/");
        const fileName = path.resolve(mockPath, "./" + urlPath + ".json");
        console.log("----------------request----------------", key);
        // 是否需要本地模拟登陆
        if (loginMock(req, res)) {
          return true;
        }
        if (fs.existsSync(fileName)) {
          var data = fs.readFileSync(fileName, "utf8"),
            json = JSON.parse(data),
            mockData = Mock.mock(json);
          mockData.reqId = "mock-" + new Date().getTime();
          console.log(
            "--------------------mock----------------------\n",
            fileName,
            "mockData",
            mockData
          );
          res.json(mockData);
          return true;
        }
        return false;
      }
    },
    "/mockxx/": {
      // api表示当前项目请求使用该项可进入远程端访问
      // target: "http://172.16.4.194:8080/app/mock/21", // 本地理服务器路径
      target: "http://localhost:8080", // 本地理服务器路径
      // target: 'http://140.143.26.135:3000', //远端 代理服务器路径
      pathRewrite: {
        "^/mockxx/": "/"
      } // 重写路径
      //   changeOrigin: true
    }
  }
};
