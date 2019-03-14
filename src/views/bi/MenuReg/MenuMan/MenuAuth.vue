<template>
  <div>
    <el-button size="mini" type="primary" @click="hConfirmAuth">确定授权</el-button>
    <menu-tree ref="menu-tree"></menu-tree>
  </div>
</template>
<script>
  import MenuTree from "./MenuTree";
  import * as CURD from "./utils/CRUD";
  export default {
    name: "menu-auth",
    components: { MenuTree },
    props: {
      roleId: {
        type: Number,
        default: null
      }
    },
    data: function() {
      return {};
    },
    created: function() {},
    mounted: function() {},
    methods: {
      hConfirmAuth: async function() {
        let selectKey = this.$refs["menu-tree"].getSelectKey();
        let fullKey = this.$refs["menu-tree"].getAllKey();
        let param = { roleId: this.roleId, fullIds: fullKey, ids: selectKey };
        let res = await CRUD.setMenuApi(param);
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
            menutree.setTreeKey(list);
          }
        }
      }
    }
  };
</script>
<style scoped>
</style>