<template>
  <div class="flex-row m-height">
    <div class="flex-column flex-center flex-middle flex-between">
      <div class="mg-2">该角色的菜单权限</div>
      <button @click="handleSave" class="mg-2 button button-small button-primary">保存菜单权限</button>
      <button @click="handleCancelSave" class="mg-2 button button-small">撤除修改</button>
    </div>

    <el-tree ref="menu-tree" :default-expand-all="true" :data="menuTree" show-checkbox></el-tree>
  </div>
</template>

<script>
  // 角色对于目录的授权
  import { list_to_tree } from "@/utils/tree_convert";
  import global_config from "@/global_config";
  import { SimpleMessage, SimpleAlert,ErrConsole,SimpleNotify } from "@/business_utils/ele_alert";
  import { showListTree, saveRoleMenu,MenuListTree } from "./utils/CRUD";
  import { getRoleId } from "./utils/flux_api";
  export default {
     name: "auth-menu",
     data: function() {
        return {
           cName: "角色目录授权",
           menuTree: [],
           backTree: []
        };
     },
     created: function() {
        let role_id = getRoleId(this);
        MenuListTree(this, role_id).then(res => {
           this.menuTree=res;
        });
        
     },
     methods: {
        getCheckedNode() {
           //第一个参数代表只要叶子节点，第二个参数代表是否包含半选节点
           return this.$refs["menu-tree"].getCheckedNodes(false, true);
        },
        handleSave() {
           let that_vue = this;
           let checked_node = this.getCheckedNode();
           let key_list = checked_node.select(x => {
              return x.id;
           });
           console.log(key_list);
           saveRoleMenu(that_vue, key_list);
        },
        handleCancelSave() {
           this.menuTree = JSON.parse(JSON.stringify(this.backTree));
        }
     }
  };
</script>

<style scoped>
.m-height {
   min-height: 20rem;
}
.mg-2 {
   margin: 0rem 0.5rem;
}
</style>