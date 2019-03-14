<template>
  <div>
    <menu-tree ref="menu-tree"></menu-tree>
  </div>
</template>
<script>
  import MenuTree from "./MenuTree";
  import * as CURD from './utils/CRUD';
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
    methods: {},
    watch: {
      roleId: {
        deep: true,
        handler: async function(newval, oldval) {
          if (newval) {
            // debugger;
            let list = await CRUD.queryAuthMenu({ roleId: newval });
            let apiman = this.$refs["menu-tree"];
            apiman.setTreeKey(list);
          }
        }
      }
    }
  };
</script>
<style scoped>
</style>