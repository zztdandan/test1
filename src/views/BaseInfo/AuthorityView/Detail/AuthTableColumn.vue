<template>
  <div>
    <el-button></el-button>
  </div>
</template>

<script>
  // 对于角色可以看哪个表中哪些列的授权
  export default {
     name: "auth-table-column",
     data: function() {
        return {
           cName: "角色目录及功能授权"
        };
     }
  };
</script>

<style scoped>
</style>