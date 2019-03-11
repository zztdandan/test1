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
  
        const res1 = list_to_tree(res, "id","label", "parentId");
      //   debugger;
        return res1;
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
  
       
      //   debugger;
        return res;
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
        const res = await LG_axios.post(url, menu, true);
        // debugger;
        // console.log("添加目录回调", res);
        if (res.code == 0) {
            SimpleMessage("添加成功");
            return true;
        } else {
            // debugger;
            const s =
                "添加错误:" + res.msg + "——" + (res.extMsg ? res.extMsg : "");
            SimpleNotify(s, "目录管理");
        }
    } catch (err) {
        console.log(err);
    }
}


// 修改一个目录项
export async function updateMenu(menu) {
    try {
        const url = api_config.bi.menuMan.updateMenu;
        const res = await LG_axios.post(url, menu, true);
        // debugger;
        // console.log("添加目录回调", res);
        if (res.code == 0) {
            SimpleMessage("添加成功");
            return true;
        } else {
            // debugger;
            const s =
                "添加错误:" + res.msg + "——" + (res.extMsg ? res.extMsg : "");
            SimpleNotify(s, "目录管理");
        }
    } catch (err) {
        console.log(err);
    }
}
