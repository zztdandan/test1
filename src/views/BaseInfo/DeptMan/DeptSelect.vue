<template>
  <div>
    <el-tree :props="defaultProps" :load="loadNode1" lazy></el-tree>
  </div>
</template>
<script>
  export default {
     name: "dept-select",
     components: {},
     data: function() {
        return {
           defaultProps: {
              children: "children",
              label: "label"
           }
        };
     },
     created: function() {},
     mounted: function() {},
     methods: {
        loadNode1: function(node, resolve) {
           
        }
     },
     watch: {}
  };
</script>
<style scoped>
</style>