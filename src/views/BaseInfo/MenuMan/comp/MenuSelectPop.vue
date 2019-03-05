<template>
  <el-popover
    placement="left"
    title="选择菜单父项"
    width="300"
    trigger="click"
    v-model="parentSelectVisi"
  >
    <span slot="reference" class="moon-search mr-1 hv"></span>
    <el-tree ref="parent-select" :default-expand-all="false" :data="menuTree"></el-tree>
    <div class="button-group flex-md">
      <button @click="handleMenuConfirm" class="button button-small button-primary">确定</button>
      <button @click="handleCancel" class="button button-small">取消</button>
    </div>
  </el-popover>
</template>
<script>
  import menuEntity from "../utils/menu_entity";
  import actDef from "../utils/menuActionDefine";
  import { DelMenu, EditMenu, AddMenu, MenuListTree, MenuList } from "../utils/CRUD";
  export default {
     name: "menu-select-pop",
     components: {},
     data: function() {
        return {
           menuTree: [],
           parentSelectVisi: false
        };
     },
     created: function() {
        let that_vue = this;

        // 读取菜单树
        MenuListTree(that_vue)
           .then(result => {
              that_vue.menuTree = result;
           })
           .catch(err => {
              console.log(err);
           });
     },
     mounted: function() {},
     methods: {
        handleMenuConfirm() {
           let that_vue = this;
           let tmp_menu = that_vue.$refs["parent-select"].getCurrentNode();
           that_vue.parentSelectVisi = false;
           that_vue.$emit("btn-select-confirm", tmp_menu);
        },
        handleCancel() {
           let that_vue = this;
           that_vue.parentSelectVisi = false;
        }
     },
     watch: {}
  };
</script>
<style scoped>
.hv:hover {
   cursor: pointer;
}
.mr-1 {
   margin-right: 0.3rem;
}

</style>