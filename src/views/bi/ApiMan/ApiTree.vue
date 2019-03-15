<template>
  <div>
    <div v-if="this.select" class="flex-md">
      <el-input size="mini" class="span8" :readonly="true" v-model="selected"></el-input>
      <el-button size="mini" type="primary" @click="hApiClick">选择</el-button>
      <el-button size="mini" type="primary" @click="hRefresh">刷新</el-button>
    </div>
    <el-tree
      ref="api-tree"
      :show-checkbox="this.check"
      :default-expand-all="true"
      :check-on-click-node="this.editable"
      :data="apiTree"
      node-key="id"
      check-strictly
      @node-click="hNodeClick"
      @check-change="hCheckChange"
    ></el-tree>
  </div>
</template>
<script>
  import { list_to_tree, tree_to_list } from "@/util/tree_convert";
  import * as CRUD from "./utils/CRUD";

  export default {
    name: "api-tree",
    props: {
      check: {
        type: Boolean,
        default: true
      },
      select: {
        type: Boolean,
        default: false
      },
      editable: {
        type: Boolean,
        default: true
      }
    },
    components: {},
    data: function() {
      return {
        selected: "",
        selectedNode: {},
        selectedChildNode: [],
        apiTree: [],
        clickNode: {}
      };
    },
    created: async function() {
      let that_vue = this;
      if (this.select) {
        this.hDoQuery();
      }
    },
    mounted: function() {},
    methods: {
      hApiClick() {
        this.$emit("api-confirm", this.selected, this.selectedNode);
      },
      hDoQuery: async function() {
        let that_vue = this;
        let tree = await CRUD.queryApiTree();
        this.apiTree = tree;
      },
      hNodeClick(api_entity, node_entity, vue_node) {
        if (this.editable==false) {
          this.clickNode = api_entity;
          this.$emit("api-click",api_entity)
        }
      },
      hRefresh() {
        this.hDoQuery();
      },
      hCheckChange(entity, isChecked) {
        if (isChecked) {
          this.selected = entity.name;
          this.selectedNode = entity;
          if (entity.children) {
            this.selectedChildNode = entity.children;
          } else {
            this.selectedChildNode = [];
          }

          this.$emit("api-select", this.selectedNode, this.selectedChildNode);
        }
      },
      setTree(data) {
        this.apiTree = data;
        this.$refs["api-tree"].setCheckedKeys([]);
      },
      setTreeKey(list) {
        this.$refs["api-tree"].setCheckedKeys(list);
      },
      getSelectKey() {
        let a = this.$refs["api-tree"].getCheckedKeys();
        return a;
      },
      getAllKey() {
        // debugger;
        let tmpTree = JSON.parse(JSON.stringify(this.apiTree));
        let list = tree_to_list(tmpTree, "children");
        return list.select(x => {
          return x.id;
        });
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

v