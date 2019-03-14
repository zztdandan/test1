import api_config from "@/api_config.json";
import { SimpleMessage, ErrNotify, SimpleNotify } from "@/business_utils/ele_alert";
import LG_axios from "@/router/axios-wrap";

/**
 * 按照懒加载方式加载树形menu的方法
 * @param {Object} params 查询参数
 */
export async function queryDeptLazy(params) {
   try {
      if (params.pcode==""||params.pcode) {
         const url = api_config.bi.deptMan.queryDeptLazy;
        
         const res = await LG_axios.get(url, params);
         return res;
      } else {
         // debugger;
         return [];
      }
   } catch (err) {
      SimpleNotify("部门懒加载查询错误");
   }
}

export async function deleteDept(params) {
   try {
      const url = api_config.bi.deptMan.deleteDept;
      //   const id = params.deptId;
      const res = await LG_axios.delete(url, params);
      return res;
   } catch (err) {
      debugger;
      SimpleNotify("部门懒加载删除错误");
   }
}
