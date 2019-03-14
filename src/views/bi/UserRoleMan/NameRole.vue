<template>
  <el-dialog fullscreen title="用户角色绑定" :visible.sync="dialogVisi">
    <name-role-trans :roleList="roleIdList" @update:setted-list="hUpdateList"></name-role-trans>
    <el-button type="primary" @click="hConfirmroleId"></el-button>
  </el-dialog>
</template>
<script>
  import NameRoleTrans from "./NameRoleTrans.vue";
  export default {
     name: "name",
     components: {},
     data: function() {
        return {
           dialogVisi: false,
           roleIdList: [],
           saveList: [],
           userData: {}
        };
     },
     created: function() {},
     mounted: function() {},
     methods: {
        hOpenDialog(ud) {
           this.userData = ud;
           this.dialogVisi = true;
        },
        hUpdateList(data) {
           this.saveList = data;
        },
        hConfirmroleId() {
           let new_list = [].concat(this.saveList);
           new_list = new_list.select(x => x.roleId);
           this.$emit("role-list-confirm", new_list);
        }
     },
     watch: {}
  };
</script>
<style scoped>
</style>