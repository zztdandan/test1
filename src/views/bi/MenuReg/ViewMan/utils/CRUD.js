import api_config from "@/api_config.json";
import { SimpleMessage, ErrNotify } from "@/business_utils/ele_alert";
import LG_axios from "@/router/axios-wrap";

export const queryViewLazy = async function(param) {
    try {
        const url = api_config.bi.viewMan.queryViewLazy;
        const res = await LG_axios.get(url, param);
        SimpleMessage("查询资源成功");
        return res.data;
    } catch (error) {
        ErrNotify(error);
    }
};

export const createView = async function(param) {
    try {
        const url = api_config.bi.viewMan.createView;
        const res = await LG_axios.post(url, param);
        SimpleMessage("创建资源成功");
        return res.data;
    } catch (error) {
        ErrNotify(error);
    }
};

export const updateView = async function(param) {
    try {
        const url = api_config.bi.viewMan.updateView;
        const res = await LG_axios.put(url, param);
        SimpleMessage("修改成功");
        return res.data;
    } catch (error) {
        ErrNotify(error);
    }
};

export const deleteView = async function(param) {
    try {
        const url = api_config.bi.viewMan.deleteView;
        const res = await LG_axios.deleteJson(url, param);
        SimpleMessage("删除成功");
        return res.data;
    } catch (error) {
        ErrNotify(error);
    }
};
