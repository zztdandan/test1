<template>
  <div>
    <div v-if="this.select" class="flex-md">
      <el-input size="mini" class="span8" :readonly="true" v-model="selected"></el-input>
      <el-button size="mini" type="primary" @click="hMenuClick">选择</el-button>
      <el-button size="mini" type="primary" @click="hRefresh">刷新</el-button>
    </div>
    <el-tree
      ref="menu-tree"
      :show-checkbox="this.check"
      :default-expand-all="true"
      :check-on-click-node="true"
      :data="menuTree"
      check-strictly
      @check-change="hCheckChange"
    ></el-tree>
  </div>
</template>
<script>
  import { list_to_tree } from "@/util/tree_convert";
  import menuEntity from "./utils/menuEntity";
  import * as CRUD from "./utils/CRUD";
  export default {
    name: "menu-tree",
    props: {
      check: {
        type: Boolean,
        default: true
      },
      select: {
        type: Boolean,
        default: false
      }
    },
    components: {},
    data: function() {
      return {
        selected: "",
        selectedNode: {},
        menuTree: []
      };
    },
    created: async function() {
      let that_vue = this;
      let res = await CRUD.queryMenuTree({});
      this.menuTree = res;
    },
    mounted: function() {},
    methods: {
      hMenuClick() {
        this.$emit("menu-confirm", this.selected, this.selectedNode);
      },
      hRefresh: async function() {
        let res = await CRUD.queryMenuTree({});
        this.menuTree = res;
      },
      hNodeClick(menu_entity, node_entity, vue_node) {
        // this.selectedNode = menu_entity;
        // this.selected = menu_entity.label;
      },
      hCheckChange(entity, isChecked) {
        if (isChecked) {
          this.selected = entity.label;
          this.selectedNode = entity;
          this.$emit("menu-select", this.selected, this.selectedNode);
        }
      }
    },
    watch: {}
  };
</script>
<style scoped>
.span8 {
  width: 33% !important;
  margin-right: 1rem;
}
</style>