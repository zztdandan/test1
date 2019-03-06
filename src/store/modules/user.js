import { setToken, removeToken } from "@/util/auth";
import { setStore, getStore } from "@/util/store";
import { isURL, validatenull } from "@/util/validate";
import { encryption, deepClone } from "@/util/util";
import webiste from "@/config/website";
import {
  loginByUsername,
  getUserInfo,
  getMenu,
  getTopMenu,
  logout,
  refeshToken
} from "@/api/user";

function addPath(ele, first) {
  const menu = webiste.menu;
  const propsConfig = menu.props;
  const propsDefault = {
    label: propsConfig.label || "label",
    path: propsConfig.path || "path",
    icon: propsConfig.icon || "icon",
    children: propsConfig.children || "children"
  };
  const icon = ele[propsDefault.icon];
  ele[propsDefault.icon] = validatenull(icon) ? menu.iconDefault : icon;
  const isChild =
    ele[propsDefault.children] && ele[propsDefault.children].length !== 0;
  if (!isChild && first && !isURL(ele[propsDefault.path])) {
    ele[propsDefault.path] = ele[propsDefault.path] + "/index";
  } else if (isChild) {
    ele[propsDefault.children].forEach(child => {
      if (!isURL(child[propsDefault.path])) {
        child[propsDefault.path] = `${ele[propsDefault.path]}/${
          child[propsDefault.path] ? child[propsDefault.path] : "index"
        }`;
      }
      addPath(child);
    });
  }
}
const user = {
  state: {
    userInfo: {},
    permission: {},
    roles: [],
    menu: getStore({ name: "menu" }) || [],
    menuAll: [],
    token: getStore({ name: "token" }) || ""
  },
  actions: {
    //根据用户名登录
    LoginByUsername({ commit }, userInfo) {
      const user = encryption({
        data: userInfo,
        type: "Aes",
        key: "avue",
        param: ["useranme", "password"]
      });
      return new Promise(resolve => {
        loginByUsername(
          user.username,
          /* user.password */ userInfo.password, //先不加密，TODO:后期优化使用加密
          userInfo.code,
          userInfo.redomStr
        ).then(res => {
          commit("SET_TOKEN", res.token);
          commit("DEL_ALL_TAG");
          commit("CLEAR_LOCK");
          resolve();
        });
      });
    },
    //根据手机号登录
    LoginByPhone({ commit }, userInfo) {
      return new Promise(resolve => {
        loginByUsername(userInfo.phone, userInfo.code).then(res => {
          const data = res.data.data;
          commit("SET_TOKEN", data);
          commit("DEL_ALL_TAG");
          commit("CLEAR_LOCK");
          resolve();
        });
      });
    },
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then(data => {
            //const data = res.data.data;
            commit("SET_USERIFNO", data.userInfo);
            commit("SET_ROLES", data.roles);
            commit("SET_PERMISSION", data.permission);
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    //刷新token
    RefeshToken({ state, commit }) {
      return new Promise((resolve, reject) => {
        refeshToken(state.refeshToken)
          .then(res => {
            const data = res.data.data;
            commit("SET_TOKEN", data);
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            commit("SET_TOKEN", "");
            commit("SET_MENU", []);
            commit("SET_ROLES", []);
            commit("DEL_ALL_TAG");
            commit("CLEAR_LOCK");
            removeToken();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    //注销session
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        commit("SET_MENU", []);
        commit("SET_ROLES", []);
        commit("DEL_ALL_TAG");
        commit("CLEAR_LOCK");
        removeToken();
        resolve();
      });
    },
    GetTopMenu() {
      return new Promise(resolve => {
        getTopMenu().then(data => {
          data = data || [];
          resolve(data);
        });
      });
    },
    //获取系统菜单
    GetMenu({ commit }, parentId) {
      return new Promise(resolve => {
        getMenu(parentId).then(data => {
          //const data = res.data.data;
          let menu = deepClone(data);
          menu.forEach(ele => {
            addPath(ele, true);
          });
          commit("SET_MENU", menu);
          resolve(menu);
        });
      });
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      setToken(token);
      state.token = token;
      setStore({ name: "token", content: state.token, type: "session" });
    },
    SET_USERIFNO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    SET_MENU: (state, menu) => {
      state.menu = menu;
      setStore({ name: "menu", content: state.menu, type: "session" });
    },
    SET_MENU_ALL: (state, menuAll) => {
      state.menuAll = menuAll;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_PERMISSION: (state, permission) => {
      state.permission = {};
      permission.forEach(ele => {
        state.permission[ele] = true;
      });
    }
  }
};
export default user;
