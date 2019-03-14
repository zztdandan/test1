import api_config from "@/api_config.json";
import {
    SimpleMessage,
    ErrNotify
} from "@/business_utils/ele_alert";
import LG_axios from "@/router/axios-wrap";
//
export async function createresPlanMan(params) {
    try {
        const url = api_config.rm.ResourcePlan.create;
        params.createDate = dayjs().format("YYYYMMDDHHmmss");
        const res = await LG_axios.post(url, params);
        SimpleMessage("新增成功");
        return res;
    } catch (err) {
        console.log(err);
        ErrNotify("新增出现错误");
    }
}
// createresPlanMan END

export async function deleteresPlanMan(params) {
    try {
        const url = api_config.rm.ResourcePlan.delete;
        const res = await LG_axios.deleteJson(url, params);
        SimpleMessage("删除成功");
        return res;
    } catch (err) {
        console.log(err);
        ErrNotify("删除出现错误");
    }
}
// deleteresPlanMan END

// 查询角色信息列表.支持模糊查询
export async function queryLazyresPlanMan(params, page_para) {
    try {
        // console.log(api_config);
        const url = "/sm/mat/page";
        // console.log("params", params);
        params = Object.assign(params, page_para);
        const res = await LG_axios.get(url, params);
        // console.log("res11111", res);
        SimpleMessage("查询成功");
        return res;
    } catch (err) {
        console.log(err);
        ErrNotify("查询出错");
    }
}
// queryresPlanMan END

// 更新表格信息信息
export async function updateresPlanMan(params) {
    try {
        const url = api_config.rm.ResourcePlan.update;
        const res = await LG_axios.put(url, params);
        SimpleMessage("更新成功");
        return res;
    } catch (err) {
        console.log(err);
        ErrNotify("更新错误");
    }
}
// updateresPlanMan END
