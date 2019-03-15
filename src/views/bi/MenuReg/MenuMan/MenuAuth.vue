<template>
  <div>
    <!-- <el-button class="mg1" size="mini" type="primary" @click="hConfirmAuth">确定授权</el-button> -->
    <menu-tree ref="menu-tree"></menu-tree>
  </div>
</template>
<script>
  import MenuTree from "./MenuTree";
  import * as CRUD from "./utils/CRUD";
  import "linqjs";
  export default {
    name: "menu-auth",
    components: { MenuTree },
    props: {
      roleId: {
        default: null
      }
    },
    data: function() {
      return {};
    },
    created: function() {},
    mounted: function() {},
    methods: {
      hRefreshAuth: async function() {
        // debugger;
        let list = await CRUD.queryAuthMenu({ roleId: this.roleId });
        let menutree = this.$refs["menu-tree"];
        menutree.setTreeKey(list.select(x => x.menuId));
      },
      hConfirmAuth: async function() {
        let selectKey = this.$refs["menu-tree"].getSelectKey();
        let fullKey = this.$refs["menu-tree"].getAllKey();
        let param = { roleId: this.roleId, fullIds: fullKey, ids: selectKey };
        let res = await CRUD.setAuthMenu(param);
      }
    },
    watch: {
      roleId: {
        deep: true,
        handler: async function(newval, oldval) {
          if (newval) {
            // debugger;
            let list = await CRUD.queryAuthMenu({ roleId: newval });
            let menutree = this.$refs["menu-tree"];
            menutree.setTreeKey(list.select(x => x.menuId));
          }
        }
      }
    }
  };
</script>
<style scoped>
.mg1 {
  margin: 1rem;
}
</style>