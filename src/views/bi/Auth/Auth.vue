<template>
  <lg-dashboard title="权限管理">
    <el-collapse v-model="activeList">
      <el-collapse-item name="1" title="选择角色">
        <role-man :editable="false" @role-selection="hRoleSelection"/>
      </el-collapse-item>
      <el-collapse-item name="2" title="管理权限">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="Api授权" name="api">用户管理</el-tab-pane>
          <el-tab-pane label="目录授权" name="menu">配置管理</el-tab-pane>
          <el-tab-pane label="功能授权" name="act">角色管理</el-tab-pane>
          <el-tab-pane label="列授权" name="column">定时任务补偿</el-tab-pane>
        </el-tabs>
      </el-collapse-item>
    </el-collapse>
  </lg-dashboard>
</template>
<script>
  import LgDashboard from "@/components/LgDashboard/main";
  import RoleMan from "@/views/bi/RoleMan/RoleMan.vue";
  export default {
    name: "name",
    components: { LgDashboard, RoleMan },
    data: function() {
      return {
        activeList: ["1"],
        roleSelect: {}
      };
    },
    created: function() {},
    mounted: function() {},
    methods: {
      hRoleSelection(list) {
        if (list.length != 0) {
          this.roleSelect = list[0];
          this.activeList = ["2"];
        }
      }
    },
    watch: {}
  };
</script>
<style scoped>
</style>