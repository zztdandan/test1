// 将目录管理的CRUD先引入进来
import { list_to_tree } from "@/utils/tree_convert";
import global_config from "@/global_config";
export  { DelMenu, EditMenu, AddMenu, MenuListTree, MenuList } from '@/views/BaseInfo/MenuMan/utils/CRUD'
/**
 * 返回某个权限组所可以查看的目录列表
 * @param {*} that_vue
 * @param {*} role_id
 */
export async function showList(that_vue, role_id) {
   try {
      const url = global_config.Auth.Menu.ShowList;
      // debugger;
      const res = await that_vue.$get(`${url}/${role_id}`, {});
      return res;
   } catch (err) {
      that_vue.$log(err);
   }
}

/**
 * 返回某个权限组所可以查看的目录列表
 * @param {*} that_vue
 * @param {*} role_id
 */
export async function showListTree(that_vue, role_id) {
   try {
      const url = global_config.Auth.Menu.ShowList;
      // debugger;
      const res = await that_vue.$get(`${url}/${role_id}`, {});
      const res1 = res.where(x => x.type == 0);
      // debugger;

      const tree = list_to_tree(res1, "menuCode", "name", "parentCode");
      return tree;
   } catch (err) {
      that_vue.$log(err);
   }
}

// 保存目录
export async function saveRoleMenu(that_vue, key_list) {
   try {
      const res = await this.$post(global_config.Auth.Menu.Save, key_list, true);
      that_vue.$message("成功保存");
      return true;
   } catch (err) {
      that_vue.$log(err);
   }
}
