import api_config from "@/api_config.json";
import { SimpleMessage, ErrNotify } from "@/business_utils/ele_alert";
import LG_axios from "@/router/axios-wrap";
import { list_to_tree } from "@/util/tree_convert";
export const queryApi = async function(param) {
    try {
        const url = api_config.bi.apiMan.queryApi;
        const res = await LG_axios.get(url, param);
        // SimpleMessage("查询资源成功");
        return res;
    } catch (error) {
        // debugger;
        ErrNotify(error);
    }
};

export const queryApiTree = async function(param) {
    try {
        const url = api_config.bi.apiMan.queryApi;
        const res = await LG_axios.get(url, param);

        const res1 = list_to_tree(res, "id", "name", "parentId", 0);
        // SimpleMessage("查询资源成功");
        return res1;
    } catch (error) {
        // debugger;
        ErrNotify(error);
    }
};

export const createApi = async function(param) {
    try {
        param.id = 0;
        const url = api_config.bi.apiMan.createApi;
        const res = await LG_axios.postJson(url, param);
        SimpleMessage("创建api成功");
        return res;
    } catch (error) {
        ErrNotify(error);
    }
};

export const updateApi = async function(param) {
    try {
        const url = api_config.bi.apiMan.updateApi;
        const res = await LG_axios.postJson(url, param);
        SimpleMessage("修改api成功");
        return res;
    } catch (error) {
        ErrNotify(error);
    }
};

export const deleteApi = async function(param) {
    try {
        const url = api_config.bi.apiMan.deleteApi;
        const res = await LG_axios.deleteJson(url, param);
        SimpleMessage("删除api成功");
        return res;
    } catch (error) {
        ErrNotify(error);
    }
};

export const queryAuthApi = async function({ roleId }) {
    try {
        const param = { roleId: roleId };
        const url = api_config.bi.security.api.queryAuth;
        const res = await LG_axios.get(url, param);
        SimpleMessage("查询权限成功");
        return res;
    } catch (error) {
        ErrNotify(error);
        throw new Error();
    }
};



export const setAuthApi = async function({ roleId,fullIds,ids }) {
    try {
        const param = { roleId: roleId,fullIds:fullIds,ids:ids };
        const url = api_config.bi.security.api.setAuth;
        const res = await LG_axios.postJson(url, param);
        SimpleMessage("设置权限成功");
        return res;
    } catch (error) {
        ErrNotify(error);
        throw new Error();
    }
};
