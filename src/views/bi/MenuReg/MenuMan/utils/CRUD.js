import api_config from "@/api_config.json";
import {
    SimpleMessage,
    ErrNotify,
    SimpleNotify
} from "@/business_utils/ele_alert";
import LG_axios from "@/router/axios-wrap";
import { list_to_tree } from "@/util/tree_convert";

export async function queryMenuTree(params) {
    try {
        const url = api_config.bi.menuMan.queryMenu;

        const res = await LG_axios.get(url, params);
        const res1 = res.select(x => {
            x.pcode = x.viewCode;
            return x;
        });
        // debugger;
        const res2 = list_to_tree(res1, "id", "name", "parentId");
        //   debugger;
        return res2;
    } catch (err) {
        // debugger;
        SimpleNotify("查询出现错误", "目录管理");
        // console.log(err);
    }
}

export async function queryMenu(params) {
    try {
        const url = api_config.bi.menuMan.queryMenu;

        const res = await LG_axios.get(url, params);
        const res1 = res.select(x => {
            x.pcode = x.viewCode;
            return x;
        });
        //   debugger;
        return res1;
    } catch (err) {
        // debugger;
        SimpleNotify("查询出现错误", "目录管理");
        // console.log(err);
    }
}

// 添加一个目录项
export async function createMenu(menu) {
    try {
        const url = api_config.bi.menuMan.createMenu;
        const res = await LG_axios.post(url, menu);
        return res;
    } catch (err) {
        SimpleNotify("添加目录出错", "目录管理");
        console.log(err);
    }
}

// 修改一个目录项
export async function updateMenu(menu) {
    try {
        const url = api_config.bi.menuMan.updateMenu;
        const res = await LG_axios.post(url, menu);
        return res;
    } catch (err) {
        SimpleNotify("修改目录出错", "目录管理");
        console.log(err);
    }
}

// 删除目录
export async function deleteMenu(menu) {
    try {
        const url = api_config.bi.menuMan.deleteMenu;
        const res = await LG_axios.delete(url, menu);
        return res;
    } catch (err) {
        SimpleNotify("删除目录出错", "目录管理");
        console.log(err);
    }
}
