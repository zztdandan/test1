import api_config from "@/api_config.json";
import { SimpleMessage, ErrNotify } from "@/business_utils/ele_alert";
import LG_axios from "@/router/axios-wrap";

export const queryAct = async function(param) {
    try {
        const url = api_config.bi.actMan.queryActByView;
        let res = await LG_axios.get(url, param);
        res = res.select(x => {
            x.pcode = x.viewCode;
            return x;
        });
        // SimpleMessage("查询资源成功");
        return res;
    } catch (error) {
        // debugger;
        ErrNotify(error);
    }
};

export const createAct = async function(param) {
    try {
        const url = api_config.bi.actMan.createAct;
        param.viewCode = param.pcode;
        const res = await LG_axios.postJson(url, param);
        SimpleMessage("创建资源成功");
        return res;
    } catch (error) {
        ErrNotify(error);
    }
};

export const updateAct = async function(param) {
    try {
        const url = api_config.bi.actMan.updateAct;
        param.viewCode = param.pcode;
        const res = await LG_axios.postJson(url, param);
        SimpleMessage("修改成功");
        return res;
    } catch (error) {
        ErrNotify(error);
    }
};

export const deleteAct = async function(param) {
    try {
        const url = api_config.bi.actMan.deleteAct;
        param.forEach(element => {
            element.viewCode = element.pcode;
        });
        const res = await LG_axios.deleteJson(url, param);
        SimpleMessage("删除成功");
        return res;
    } catch (error) {
        ErrNotify(error);
    }
};

