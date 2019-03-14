<template>
  <el-dialog :visible.sync="dialogVisi">
    <api-tree :select="true" @api-confirm="hApiConfirm"></api-tree>
  </el-dialog>
</template>
<script>
  import ApiTree from "./ApiTree";
  export default {
    name: "api-select-dialog",
    components: {ApiTree},
    data: function() {
      return {
        dialogVisi: false
      };
    },
    created: function() {},
    mounted: function() {},
    methods: {
      hApiConfirm(text, entity) {
        this.$emit("api-confirm", text, entity);
        this.dialogVisi = false;
      },
      hOpen() {
        this.dialogVisi = true;
      }
    },
    watch: {}
  };
</script>
<style scoped>
</style>