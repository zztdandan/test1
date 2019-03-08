import api_config from "@/api_config.json";
import { SimpleMessage, ErrNotify } from "@/business_utils/ele_alert";
import LG_axios from "@/router/axios-wrap";

export const queryOrderNumberLazy = async function(params, pagi_para) {
    try {
        const url = api_config.om.OrderView.querySearchOrderDet;
        const tmp_para = Object.assign(params, pagi_para);
        const res = await LG_axios.get(url, tmp_para);
        return res;
    } catch (error) {
        ErrNotify("queryOrderNumberLazy出现错误");
    }
};

export const queryOrderDetByON = async function(params, pagi_para) {
    try {
        const url = api_config.om.OrderView.queryOrderDetByON;
        const tmp_para = Object.assign(params, pagi_para);
        const res = await LG_axios.get(url, tmp_para);
        return res;
    } catch (error) {
        ErrNotify("queryOrderNumberLazy出现错误");
    }
};

export const mesCheckOrderDet = async function(obj) {
    try {
        const url = api_config.om.OrderView.mesCheckOrderDet;
        const res = await LG_axios.post(url, obj);
        SimpleMessage("MES验证通过");
        return res;
    } catch (error) {
        ErrNotify("mesCheckOrderDet出现错误");
        throw new Error();
    }
};

export const postOrder = async function(obj) {
    try {
        const url = api_config.om.OrderView.postOrder;
        const res = await LG_axios.post(url, obj);
        SimpleMessage("添加成功");
        return res;
    } catch (error) {
        ErrNotify("mesCheckOrderDet出现错误");
        throw new Error();
    }
};