import api_config from "@/api_config.json";
import { SimpleMessage, ErrNotify } from "@/business_utils/ele_alert";
import { postRequest, getRequest, deleteRequest, putRequest,postJsonRequest } from "@/plugins/axios_api/api_utils";

//
export async function createRoleMan(params) {
   try {
      const url = api_config.bi.RoleMan.createRoleMan;
      const res = await postJsonRequest(url, params);

      SimpleMessage("新增成功");
      return res;
   } catch (err) {
      console.log(err);
      ErrNotify("新增出现错误");
   }
}
// createRoleMan END

export async function deleteRoleMan(params) {
   try {
      const url = api_config.bi.RoleMan.deleteRoleMan;
      const res = await deleteRequest(url, params);
      SimpleMessage("删除成功");
      return res;
   } catch (err) {
      console.log(err);
      ErrNotify("删除出现错误");
   }
}
// deleteRoleMan END

// 查询角色信息列表.支持模糊查询
export async function queryLazyRoleMan(params, page_para) {
   try {
      const url = api_config.bi.RoleMan.queryRoleMan;
      params = Object.assign(params, page_para);
      const res = await getRequest(url, params);

      SimpleMessage("查询成功");
      return res;
   } catch (err) {
      console.log(err);
      ErrNotify("查询出错");
   }
}
// queryRoleMan END

// 更新表格信息信息
export async function updateRoleMan(params) {
   try {
      const url = api_config.bi.RoleMan.updateRoleMan;
      const res = await postJsonRequest(url, params);
      SimpleMessage("更新成功");
      return res;
   } catch (err) {
      console.log(err);
      ErrNotify("更新错误");
   }
}
// updateRoleMan END
