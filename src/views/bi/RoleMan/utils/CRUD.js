import api_config from "@/api_config.json";
import { SimpleMessage, ErrNotify } from "@/business_utils/ele_alert";
import LG_axios from "@/router/axios-wrap";


// create
export async function createRoleMan(params) {
   try {
      const url = api_config.bi.RoleMan.createRoleMan;
      const res = await LG_axios.post(url, params);

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
      const res = await LG_axios.delete(url, params);
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
      const url = api_config.bi.RoleMan.queryRoleManPagi;
      params = Object.assign(params, page_para);
      const res = await LG_axios.get(url, params);

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
      const res = await LG_axios.postJson(url, params);
      SimpleMessage("更新成功");
      return res;
   } catch (err) {
      console.log(err);
      debugger;
      ErrNotify("更新错误");
   }
}
// updateRoleMan END

// 强制查询全部role的查询
export async function queryAllRoleMan(params) {
   try {
      const url = api_config.bi.RoleMan.queryRoleMan;
      const res = await LG_axios.get(url,params);

      SimpleMessage("查询成功");
      return res;
   } catch (err) {
      console.log(err);
      ErrNotify("查询出错");
      return [];
   }
}
