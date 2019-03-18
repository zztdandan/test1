// 搜索语句
import api_config from "@/api_config";
// import { SimpleMessage, ErrConsole, SimpleNotify, ErrNotify } from "@/business_utils/ele_alert";
import LG_axios from "@/router/axios-wrap";

// 设定一个用户的统一页大小
const userPageSize = 20;

export async function userUpdate(user_entity) {
    try {
        const url = api_config.bi.userMan.userUpdate;
        const res = await LG_axios.put(url, user_entity);
        SimpleMessage("用户修改成功");
    } catch (error) {
        ErrNotify(error);
    }
}

export async function userCreate(user_entity) {
    try {
        const url = global_config.User.Add;
        const res = LG_axios.post(url, user_entity);
        SimpleMessage("用户添加成功");
    } catch (err) {
        ErrNotify(err);
    }
}

export async function userDelete(user_entity) {
    try {
        const url = global_config.User.Delete;
        const res = LG_axios.delete(url, user_entity);
        SimpleMessage("用户删除成功");
    } catch (err) {
        ErrNotify(err);
    }
}
/**
 *
 * @param {Object} page_para 分页相关参数，将填入query中
 * @param {Object} params 搜索相关参数，将填入query中
 */
export async function userQueryPagi(params, page_para) {
    try {
        const url = api_config.bi.userMan.userQueryPagi;
        params = Object.assign(params, page_para);
        const res = await LG_axios.get(url, params);
        return res;
    } catch (err) {
        SimpleNotify("用户查询错误");
    }
}

/**
 * 不分页查询的端口
 * @param {Object} params 查询参数
 */
export async function userQuery(params) {
    try {
        const url = global_config.User.Query;
        const res = await LG_axios.get(url, params);
        return res;
    } catch (err) {
        SimpleNotify("用户查询错误");
    }
}
