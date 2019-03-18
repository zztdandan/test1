<template>
  <div>

    

    <el-tree
      :props="defaultProps"
      :data="deptTree"
      :load="loadLazyDept"
      lazy
      accordion
      @node-click="hHandleClick"
    ></el-tree>
  </div>
</template>
<script>
  import * as CRUD from "./utils/CRUD";
  export default {
     name: "dept-select",
     components: {},
     data: function() {
        return {
           defaultProps: {
              children: "children",
              label: "name"
           },
           deptTree: [],
           selectedDept: {}
        };
     },
     created: async function() {
        let res = await CRUD.queryDeptLazy({ pcode:"" });
        this.deptTree = this.deptTree.concat(res);
     },
     mounted: function() {},
     methods: {
        loadLazyDept: async function(node, resolve) {
         //   debugger;
           let res = await CRUD.queryDeptLazy({pcode:node.data.deptCode});
           resolve(res);
        },
        // 直接回传结果
        hHandleClick: async function(data) {

           this.selectedDept = data;
           this.$emit("dept-select", data);
        }
     },
     computed: {
        selectedText: function() {
           return this.selectedDept.deptName || "";
        }
     },
     watch: {}
  };
</script>
<style scoped>
</style>