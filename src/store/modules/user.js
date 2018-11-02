import { setToken, removeToken } from '@/util/auth'
import { setStore, getStore } from '@/util/store'
import { isURL } from '@/util/validate'
import { encryption } from '@/util/util'
import webiste from '@/const/website'
import { loginByUsername, getUserInfo, getTableData, getMenu, logout, getMenuAll } from '@/api/user'


function addPath(ele) {
    const propsConfig = webiste.menu.props;
    const propsDefault = {
        label: propsConfig.label || 'label',
        path: propsConfig.path || 'path',
        icon: propsConfig.icon || 'icon',
        children: propsConfig.children || 'children'
    }
    const isChild = ele[propsDefault.children] && ele[propsDefault.children].length !== 0;
    if (!isChild) return
    ele[propsDefault.children].forEach(child => {
        if (!isURL(child[propsDefault.path])) {
            child[propsDefault.path] = `${ele[propsDefault.path]}/${child[propsDefault.path]?child[propsDefault.path]:'index'}`
        }
        addPath(child);
    })
}
const user = {
    state: {
        userInfo: {},
        permission: {},
        roles: [],
        menu: getStore({ name: 'menu' }) || [],
        menuAll: [],
        token: getStore({ name: 'token' }) || '',
    },
    actions: {
        //根据用户名登录
        LoginByUsername({ commit }, userInfo) {
            const user = encryption({
                data: userInfo,
                type: 'Aes',
                key: 'avue',
                param: ['useranme', 'password']
            });
            return new Promise((resolve) => {
                loginByUsername(user.username, user.password, userInfo.code, userInfo.redomStr).then(res => {
                    const data = res.data;
                    commit('SET_TOKEN', data);
                    commit('DEL_ALL_TAG');
                    commit('CLEAR_LOCK');
                    setToken(data);
                    resolve();
                })
            })
        },
        //根据手机号登录
        LoginByPhone({ commit }, userInfo) {
            return new Promise((resolve) => {
                loginByUsername(userInfo.phone, userInfo.code).then(res => {
                    const data = res.data;
                    commit('SET_TOKEN', data);
                    commit('DEL_ALL_TAG');
                    commit('CLEAR_LOCK');
                    setToken(data);
                    resolve();
                })
            })
        },
        GetTableData(params, page) {
            return new Promise((resolve) => {
                getTableData(page).then(res => {
                    const data = res.data;
                    resolve(data);
                })
            })
        },
        GetUserInfo({ commit }) {
            return new Promise((resolve) => {
                getUserInfo().then((res) => {
                    const data = res.data;
                    commit('SET_USERIFNO', data.userInfo);
                    commit('SET_ROLES', data.roles);
                    commit('SET_PERMISSION', data.permission)
                    resolve(data);
                })
            })
        },
        //刷新token
        RefeshToken({ commit }) {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    commit('SET_TOKEN', new Date().getTime());
                    setToken();
                    resolve();
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 登出
        LogOut({ commit }) {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_MENU', [])
                    commit('SET_ROLES', [])
                    commit('DEL_ALL_TAG');
                    commit('CLEAR_LOCK');
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //注销session
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                commit('SET_MENU', [])
                commit('SET_ROLES', [])
                commit('DEL_ALL_TAG');
                commit('CLEAR_LOCK');
                removeToken()
                resolve()
            })
        },
        //获取系统菜单
        GetMenu({ commit }, parentId) {
            return new Promise(resolve => {
                getMenu(parentId).then((res) => {
                    const data = res.data
                    data.forEach(ele => {
                        addPath(ele);
                    })
                    commit('SET_MENU', data)
                    resolve(data)
                })
            })
        },
        //获取全部菜单
        GetMenuAll({ commit }) {
            return new Promise(resolve => {
                getMenuAll().then((res) => {
                    const data = res.data;
                    commit('SET_MENU_ALL', data);
                    resolve(data);
                })
            })
        },

    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
            setStore({ name: 'token', content: state.token, type: 'session' })
        },
        SET_USERIFNO: (state, userInfo) => {
            state.userInfo = userInfo;
        },
        SET_MENU: (state, menu) => {
            state.menu = menu
            setStore({
                name: 'menu',
                content: state.menu,
                type: 'session'
            })
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

}
export default user