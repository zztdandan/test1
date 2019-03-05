// 搜索语句
import global_config from "@/global_config";
import { SimpleMessage, ErrConsole, SimpleNotify, ErrNotify } from "@/business_utils/ele_alert";
import { postRequest, postRequestFormData, uploadFileRequest, getRequest, deleteRequest, putRequest, getBodyRequest } from "@/plugins/axios_api/api_utils";
// 设定一个用户的统一页大小
const userPageSize = 20;

export async function userUpdate(user_entity) {
   try {
      const url = global_config.User.Update;
      const res = await putRequest(url, user_entity);
      SimpleMessage("用户修改成功");
   } catch (error) {
      ErrNotify(error);
   }
}

export async function userCreate(user_entity) {
   try {
      const url = global_config.User.Add;
      const res = postRequestFormData(url, user_entity);
      SimpleMessage("用户添加成功");
   } catch (err) {
      ErrNotify(err);
   }
}

export async function userDelete(user_entity) {
   try {
      const url = global_config.User.Delete;
      const res = deleteRequest(url, user_entity);
      SimpleMessage("用户删除成功");
   } catch (err) {
      ErrNotify(err);
   }
}
/**
 *
 * @param {Object} page_para 分页相关参数，将填入query中
 * @param {Object} params 搜索相关参数，将填入query中
 */
export async function userQueryPagi(params, page_para) {
   try {
      const url = global_config.User.Query;
      params = Object.assign(params, page_para);
      const res = await getRequest(url, params);
      return res;
   } catch (err) {
      SimpleNotify("用户查询错误");
   }
}

/**
 * 不分页查询的端口
 * @param {Object} params 查询参数
 */
export async function userQuery(params) {
   try {
      const url = global_config.User.Query;
      const res = await getRequest(url, params);
      return res;
   } catch (err) {
      SimpleNotify("用户查询错误");
   }
}
