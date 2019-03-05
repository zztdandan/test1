import api_config from "@/api_config.json";
import { SimpleMessage,  ErrNotify } from "@/business_utils/ele_alert";
import { postRequest, getRequest, deleteRequest, putRequest, getBodyRequest,postJsonRequest } from "@/plugins/axios_api/api_utils";
export const getCodeByClass = import("./getCodeByClass");

export async function queryCodeClass(params) {
   try {
      const url = api_config.bi.CodeMan.queryClass;
      const res = await getRequest(url, params);
      return res;
   } catch (err) {
      console.log("queryClass", err);
      throw new Error();
   }
}

export async function queryCodeClassLazy(params) {
   try {
      const url = api_config.bi.CodeMan.queryClass;
      const res = await getRequest(url, params);
      return res;
   } catch (err) {
      console.log("queryClassLazy", err);
      throw new Error();
   }
}

export async function createCodeClass(params) {
   try {
      const url = api_config.bi.CodeMan.createClass;

      const res = await postRequest(url, params);
      return res;
   } catch (err) {
      console.log("createClass", err);
      throw new Error();
   }
}

// 更新表格信息信息
export async function updateCodeClass(params) {
   try {
      const url = api_config.bi.CodeMan.updateClass;
      const res = await putRequest(url, params);
      SimpleMessage("更新成功");
      return res;
   } catch (err) {
      console.log(err);
      ErrNotify("更新错误");
   }
}
// updateClass END

export async function deleteCodeClass(params) {
   try {
      const url = api_config.bi.CodeMan.deleteClass;
      const res = await deleteRequest(url, params);
      SimpleMessage("删除成功");
      return res;
   } catch (err) {
      console.log(err);
      ErrNotify("删除出现错误");
   }
}
// deleteClass END

export async function queryCodeItem(params) {
   try {
      const url = api_config.bi.CodeMan.queryCodeByClass; // 不带code-class参数时即查询全部

      const res = await getRequest(url, params);
      return res;
   } catch (err) {
      console.log("queryClassItem", err);
      throw new Error();
   }
}

//
export async function createCodeItem(params) {
   try {
      const url = api_config.bi.CodeMan.createItem;
      const res = await postRequest(url, params);

      SimpleMessage("新增成功");
      return res;
   } catch (err) {
      console.log(err);
      ErrNotify("新增出现错误");
   }
}
// createItem END

// 更新更新字符集中字符信息
export async function updateCodeItem(params) {
   try {
      const url = api_config.bi.CodeMan.updateItem;
      const res = await postJsonRequest(url, params);
      SimpleMessage("更新成功");
      return res;
   } catch (err) {
      console.log(err);
      ErrNotify("更新错误");
   }
}
// updateItem END

export async function deleteCodeItem(params) {
    try {
       const url = api_config.bi.CodeMan.deleteItem;
       const res = await deleteRequest(url, params);
       SimpleMessage("删除成功");
       return res;
    } catch (err) {
       console.log(err);
       ErrNotify("删除出现错误");
    }
 }
 // deleteItem END