import api_config from "@/api_config.json";
import { SimpleMessage, ErrConsole, SimpleNotify, ErrNotify } from "@/business_utils/ele_alert";
import { postRequest, postRequestFormData, uploadFileRequest, getRequest, deleteRequest, putRequest, getBodyRequest } from "@/plugins/axios_api/api_utils";

// 新增表格信息
export async function createTableMan(params) {
   try {
      const url = api_config.bi.TableMan.createTableMan;
      const res = await postRequest(url, params);
     
      SimpleMessage("新增表格信息成功");
      return res;
   } catch (err) {
      console.log(err);
      ErrNotify("新增表格信息出现错误");
   }
}
// createTableMan END

// 删除表格信息信息
export async function deleteTableMan(params) {
   try {
      const url = api_config.bi.TableMan.deleteTableMan;
      const res = await deleteRequest(url, params);
      SimpleMessage("删除表格信息信息成功");
      return res;
   } catch (err) {
      console.log(err);
      ErrNotify("删除表格信息信息出现错误");
   }
}
// deleteTableMan END

// 查询表格信息列表.支持模糊查询
export async function queryTableMan(params) {
   try {
      const url = api_config.bi.TableMan.queryTableMan;
   let res=await getRequest(url, params)

     
      SimpleMessage("查询表格信息列表，成功");
      return res;
   } catch (err) {
      console.log(err);
      ErrNotify("查询表格信息列表");
   }
}
// queryTableMan END

// 更新表格信息信息
export async function updateTableMan(params) {
   try {
      const url = api_config.bi.TableMan.updateTableMan;
      const res = await putRequest(url, params);
      SimpleMessage("更新表格信息信息成功");
      return res;
   } catch (err) {
      console.log(err);
      ErrNotify("更新表格信息信息出现错误");
   }
}
// updateTableMan END
