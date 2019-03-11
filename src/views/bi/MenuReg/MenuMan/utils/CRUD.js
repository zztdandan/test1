import api_config from "@/api_config.json";
import {
    SimpleMessage,
    ErrNotify,
    SimpleNotify
} from "@/business_utils/ele_alert";
import LG_axios from "@/router/axios-wrap";
import { list_to_tree } from "@/util/tree_convert";

export async function queryMenu(params) {
    try {
        const url = api_config.bi.menuMan.queryMenu;

        const res = await LG_axios.get(url, params);

        const res1 = list_to_tree(res, "code", "parentCode");
        debugger;
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
        const url = global_config.Menu.Add;
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

// export async function EditMenu(that_vue, menu) {
//    try {
//       const url = global_config.Menu.Edit;
//       const res = await postRequest(url, menu, true);
//       // console.log("添加目录回调", res);
//       if (res.code == 0) {
//          SimpleMessage("修改成功");
//          return true;
//       } else {
//          const s = "修改错误:" + res.msg + "——" + (res.extMsg ? res.extMsg : "");

//          SimpleNotify(s, "目录管理");
//          return false;
//       }
//    } catch (err) {
//       console.log(err);
//    }
// }

// export async function DelMenu(that_vue, menu) {
//    try {
//       const url = global_config.Menu.Del;
//       const res = await postRequest(url, menu, true);
//       // debugger;
//       // console.log("添加目录回调", res);
//       if (res.code == 0) {
//          SimpleMessage("删除成功");
//          return true;
//       } else {
//          const s = "删除错误:" + res.msg + "——" + (res.extMsg ? res.extMsg : "");
//          SimpleNotify(s, "目录管理");
//          return false;
//       }
//    } catch (err) {
//       console.log(err);
//    }
// }
