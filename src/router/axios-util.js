import { Loading, MessageBox, Notification } from "element-ui";

// loading加载
const loading = {
   open(fullscreen) {
      this.loadinginstace = Loading.service({ fullscreen }); // 请求打开loading
   },
   close() {
      if (this.loadinginstace) {
         this.loadinginstace.close();
         this.loadinginstace = null;
      }
   }
};
const isArray = function(a) {
   return Object.prototype.toString.apply(a) === "[object Array]";
};
const defaultSuccessCallback = function(successCallback) {
   if (successCallback === true) {
      return data => {
         Notification[successCallback]({
            title: "后台响应",
            message: "操作成功",
            duration: 3000
         });
      };
   } else {
      return 0;
   }
};
const defaultErrorCallback = function(errorCallback) {
   if (errorCallback !== false) {
      return err => {
         err = err || "未知错误";
         const msg = typeof err === "string" ? err : err.extMsg || err.msg || err.message || JSON.stringify(err);
         MessageBox[errorCallback](msg, "后台响应错误");
      };
   } else {
      return 0;
   }
};

const mergeOptions = function(options) {
   options.doneCallback = defaultSuccessCallback(options.useDefaultNotifySuccess);
   options.errorCallback = defaultErrorCallback(options.useDefaultNotifyError);
   return options;
};
export { loading, isArray, defaultSuccessCallback, defaultErrorCallback, mergeOptions };
