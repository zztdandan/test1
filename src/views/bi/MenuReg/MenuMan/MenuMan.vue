<template>
  <lg-dashboard>
    <template slot="title">菜单管理</template>

    <div class="flex-column">
      <div class="flex-item-8 main-height">
        <!-- 加载菜单树 -->
        <el-tree ref="menu-tree" :default-expand-all="true" :data="menuTree"></el-tree>
      </div>
      <div class="flex-item-16 main-height"></div>
    </div>
  </lg-dashboard>
</template>
<script>
  import LgDashboard from "@/components/LgDashboard/main";
  import { list_to_tree } from "@/util/tree_convert";
  import menuEntity from "./utils/menuEntity";
  import * as CRUD from "./utils/CRUD";
  export default {
    name: "menu-man",
    components: {
      LgDashboard
      //   BuildForm
    },
    data: function() {
      //  将actDef转化为数组

      return {
        menuTree: []
      };
    },

    created: async function() {
      //  debugger;
      let that_vue = this;
      let res = await CRUD.queryMenu({});
    },
    methods: {}
  };
</script>
<style scoped>
</style>