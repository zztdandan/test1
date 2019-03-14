<template>
  <el-transfer
    filterable
    :filter-method="filterMethod"
    filter-placeholder="请输入角色名称"
    v-model="settedList"
    :data="unsettedList"
  ></el-transfer>
</template>
<script>
  // 用户角色绑定 穿梭框
  import * as RoleCRUD from "../RoleMan/utils/CRUD";
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
           settedList: [],
           unsettedList: [],
           totalList: []
        };
     },
     created: async function() {
        this.totalList = await RoleCRUD.queryAllRoleMan();
        this.setSettedList(this.roleIdList);
     },
     updated() {
        this.setSettedList(this.roleIdList);
     },
     methods: {
        setSettedList(idList) {
           this.totalList.forEach(element => {
              element.label = element.roleName;
              element.key = element.roleId;
              if (idList.indexOf(element.roleId) >= 0) {
                 settedList.push(element);
              } else {
                 unsettedList.push(element);
              }
           });
        }
     },
     watch: {
        settedList: {
           deep: true,
           handler: function(newval, oldval) {
              this.$emit("update:setted-list", newval);
           }
        }
     }
  };
</script>
<style scoped>
</style>