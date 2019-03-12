/**
 * ajax工具包
 * 返回axiosWrap对象，共有两组函数，分别是form-data和json方式，
 * form-data方式：get, post, put, delete, patch
 * json方式：getJson, postJson, putJson, deleteJson, patchJson
 *
 * 为了统一习惯，所有这些函数的参数均是(url,data,successs,error,options)，除了url必填外，其它可不提供，如果提供options则传递到底层axios的options中
 * 其中successs和error可以分别是数组，如this.$$get(url,data,[fn1,fn2],...)
 * 返回的是Promise对象，可以使用then和catch，如this.$$get(url).then(fn)或者this.$$get(url,data,[fn1,fn2],[fn3,fn4]).then(fn).catch(err)
 *
 *
 * 为了便于使用，分别在window和vue上绑定这些函数，分别是
 * window.LG_axios = axiosWrap;
 * Vue.prototype["$$" + method]=fn,其中是上面提到的get, post, put, delete, patch及getJson, postJson, putJson, deleteJson, patchJson
 * 使用方法是：
 * 同一个window下，直接使用，如LG_axios.get(url,data,successs,error,options)
 * 在Vue组件内，使用this调用,如this.$$get(url,data,successs,error,options),这个特别要注意，使用箭头函数时this不在指向Vue实例
 *
 */
import axios from "axios";
import changeUrl from "./change-url";
import qs from "qs";
import { getToken, TokenKey } from "@/util/auth";
// import { Loading, MessageBox, Notification } from "element-ui";
import { isArray, loading, mergeOptions } from "./axios-util";

const service = axios.create({
    timeout: process.env.NODE_ENV === "production" ? 1000 * 60 * 10 : 1000 * 30, // 请求超时时间,正式环境10分钟，测试环境30s
    headers: {
        // axio默认使用json格式，这里改为form-data格式
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
});

// request拦截器
service.interceptors.request.use(
    config => {
        if (typeof config.Loading !== "undefined") {
            loading.open(!!config.Loading); // 请求打开loading
        }
        config.headers[TokenKey] = getToken() || "";

        return config;
    },
    error => Promise.reject(error)
);

// response 拦截器
// service.interceptors.response.use(
//   response => {
//     try {
//       loading.close(); // 响应成功关闭loading
//       const data = response.data;
//       // 返回值符合标准格式的，即同时包含code,reqId
//       if (typeof data.code === "number" && "reqId" in data) {
//         // 处理成功，code===0表示成功
//         if (
//           data.code ===
//           0 /* && (data.msg === "处理成功" || data.msg === "成功")*/
//         ) {
//           return data.data || {};
//         } else {
//           // data.code!==0,业务出错
//           return Promise.reject(data);
//         }
//       } else {
//         return data;
//       }
//     } catch (e) {
//       console.log("errrrrrrrrrrr", e);
//       Promise.reject(e);
//     }
//   },
//   error => {
//     loading.close();
//     console.log("errrrrrrrrrrr222222", error);
//     Promise.reject(error);
//   }
// );
const methods = ["get", "post", "put", "delete", "patch"];
const axiosWrap = {};
axiosWrap.originAxios = axios;

/**
 * 预处理返回值，如果是标准格式{包含code/reqId/data}，并且code===0，则：
 * 如果存在tails，则将tails里的属性扩展到data里；
 * 然后直接返回业务数据data
 * 如果code！==0的，
 * 不是标准格式的，直接返回response.data
 */
const checkResponse = response => {
  const data = response.data;
  // 返回值符合标准格式的，即同时包含code,reqId
  if (typeof data.code === "number" && "reqId" in data) {
    // 处理成功，code===0表示成功
    if (
      data.code === 0 /* && (data.msg === "处理成功" || data.msg === "成功")*/
    ) {
      // /////////tails内容放到bean里去，使得bean是个扩展的对象，其属性与tails内的属性同级/////////////////
      let arrData = data.data || {};
      if (Array.isArray(arrData)) {
        // 数组结构
        arrData = arrData.map(d => Object.assign(d, d.tails));
      } else {
        // 单个对象结构
        Object.assign(arrData, arrData.tails);
      }
      return arrData;
      // end tails处理
    } else {
      // data.code!==0,业务出错
      throw Error(`业务出错:${data.extMsg || data.msg}`);
    }
};
// 生成axios的快捷方法，"get", "post", "put", "delete", "patch"，加前缀$$,提交数据格式为application/x-www-form-urlencoded,
// 如果是json格式，则后缀为Json，如$$postJson
const registerMethod = function(method, prefix, isJson) {
  axiosWrap[/* prefix +  */ method + (isJson ? "Json" : "")] = async function(
    url,
    data,
    successCallback,
    errorCallback,
    options = {}
  ) {
    options = mergeOptions(options);
    if (!isArray(successCallback)) {
      successCallback = [successCallback];
    }
    if (errorCallback) {
      errorCallback = [errorCallback];
    }
    try {
      const response = await service({
        ...options,
        url: changeUrl(url),
        method: method,
        data: isJson ? data : qs.stringify(data),
        params: method === "get" ? data : {},
        headers: {
          "Content-Type": isJson
            ? "application/json"
            : "application/x-www-form-urlencoded",
          [TokenKey]: getToken() || ""
        }
      });
      loading.close(); // 响应成功关闭loading
      const responseData = checkResponse(response);
      [...successCallback, options.doneCallback].forEach(fn => {
        typeof fn === "function" && fn(responseData);
      });
      return responseData;
    } catch (err) {
      loading.close(); // 响应成功关闭loading
      [...errorCallback, options.errorCallback].forEach(fn => {
        typeof fn === "function" && fn(err);
      });
      throw err;
    }
  };
};
// 初始化
(function init() {
    methods.forEach(method => {
        registerMethod(method, "$$", false);
        registerMethod(method, "$$", true);
    });
})();
axiosWrap.install = function(Vue, options) {
    Vue.prototype.$defaultAxios = axios;
    Vue.prototype.$axios = service;
    Vue.prototype.$qs = qs;
    if (typeof window !== "undefined") {
        window.LG_axios = axiosWrap;
    }
    methods.forEach(method => {
        Vue.prototype["$$" + method] = axiosWrap[/* "$$" +  */ method];
        Vue.prototype["$$" + method + "Json"] =
            axiosWrap[/* "$$" +  */ method + "Json"];
    });
};
export default axiosWrap;
