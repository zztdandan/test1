import Vue from "vue";
import axios from "./router/axios";
import LG_axios from "./router/axios-wrap";
import VueAxios from "vue-axios";
import App from "./App";
import router from "./router/router";
import "./permission"; // 权限
import "./error"; // 日志
import store from "./store";
import { loadStyle } from "./util/util";
import * as urls from "@/config/env";
import Element from "element-ui";
import { iconfontUrl, iconfontVersion } from "@/config/env";
import i18n from "./lang"; // Internationalization
import "@/asset/css/buttons.css";

import "./styles/common.scss";
import "@/asset/moon-icon/style.css";

import basicContainer from "./components/basic-container/main";

import "@/asset/css/common.css";

Vue.use(router);
Vue.use(VueAxios, axios);
Vue.use(LG_axios);
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
});
Vue.use(window.AVUE, {
  i18n: (key, value) => i18n.t(key, value)
});
// 注册全局容器
Vue.component("basicContainer", basicContainer);
// 加载相关url地址
Object.keys(urls).forEach(key => {
  Vue.prototype[key] = urls[key];
});
// 动态加载阿里云字体库
iconfontVersion.forEach(ele => {
  loadStyle(iconfontUrl.replace("$key", ele));
});

Vue.config.productionTip = false;

window.$$appVue = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
