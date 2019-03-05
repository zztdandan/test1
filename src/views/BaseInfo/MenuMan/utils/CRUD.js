import global_config from "@/global_config";
import { list_to_tree } from "@/utils/tree_convert";
import { SimpleMessage, ErrConsole, SimpleNotify } from "@/business_utils/ele_alert";
import { postRequest, postRequestFormData, uploadFileRequest, getRequest, deleteRequest, putRequest } from "@/plugins/axios_api/api_utils";

export async function MenuList(that_vue) {
   try {
      const url = global_config.Menu.AllList;
      // debugger;
      const res = await getRequest(url, {});
      return res;
   } catch (err) {
      SimpleNotify("查询出现错误", "目录管理");

      // console.log(err);
   }
}

export async function MenuListTree(that_vue) {
   try {
      const url = global_config.Menu.AllList;
      const res = await getRequest(url, {});
      const res1 = res.where(x => x.type == 0);
      // debugger;
      const tree = list_to_tree(res1, "menuCode", "name", "parentCode");
      return tree;
   } catch (err) {
      SimpleNotify("查询出现错误", "目录管理");
   }
}

export async function AddMenu(that_vue, menu) {
   try {
      const url = global_config.Menu.Add;
      const res = await postRequest(url, menu, true);
      // debugger;
      // console.log("添加目录回调", res);
      if (res.code == 0) {
         SimpleMessage("添加成功");
         return true;
      } else {
         // debugger;
         const s = "添加错误:" + res.msg + "——" + (res.extMsg ? res.extMsg : "");
         SimpleNotify(s, "目录管理");
      }
   } catch (err) {
      console.log(err);
   }
}

export async function EditMenu(that_vue, menu) {
   try {
      const url = global_config.Menu.Edit;
      const res = await postRequest(url, menu, true);
      // console.log("添加目录回调", res);
      if (res.code == 0) {
         SimpleMessage("修改成功");
         return true;
      } else {
         const s = "修改错误:" + res.msg + "——" + (res.extMsg ? res.extMsg : "");

         SimpleNotify(s, "目录管理");
         return false;
      }
   } catch (err) {
      console.log(err);
   }
}

export async function DelMenu(that_vue, menu) {
   try {
      const url = global_config.Menu.Del;
      const res = await postRequest(url, menu, true);
      // debugger;
      // console.log("添加目录回调", res);
      if (res.code == 0) {
         SimpleMessage("删除成功");
         return true;
      } else {
         const s = "删除错误:" + res.msg + "——" + (res.extMsg ? res.extMsg : "");
         SimpleNotify(s, "目录管理");
         return false;
      }
   } catch (err) {
      console.log(err);
   }
}
