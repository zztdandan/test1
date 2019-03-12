<template>
  <el-dialog :visible.sync="dialogVisi">
    <menu-tree :select="true" @menu-confirm="hMenuConfirm"></menu-tree>
  </el-dialog>
</template>
<script>
  import MenuTree from "./MenuTree";
  export default {
    name: "menu-select-dialog",
    components: {MenuTree},
    data: function() {
      return {
        dialogVisi: false
      };
    },
    created: function() {},
    mounted: function() {},
    methods: {
      hMenuConfirm(text, entity) {
        this.$emit("menu-confirm", text, entity);
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