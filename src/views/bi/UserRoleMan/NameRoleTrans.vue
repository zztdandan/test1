<template>
  <el-transfer
    filterable
    :filter-method="filterMethod"
    filter-placeholder="请输入角色名称"
    v-model="settedIdList"
    :data="totalList"
  ></el-transfer>
</template>
<script>
  // 用户角色绑定 穿梭框
  import * as RoleCRUD from "../RoleMan/utils/CRUD";
  import 'linqjs';
  export default {
     name: "name-role-trans",
     props: {
        roleIdList: {
           type: Array,
           default: () => []
        }
     },
     components: {},
     data: function() {
        return {
           settedIdList: [],
           totalList: []
        };
     },
     methods: {
        setData(setted_list,all_list){
           
           this.settedIdList=setted_list;
           this.totalList=all_list
        },
        filterMethod(data){

        }
     },
     watch: {
     }
  };
</script>
<style scoped>
</style>