<template>
  <lg-dashboard title="权限管理">
    <div class="flex-md">
      <div class="w50">
        <div class="rl">
          <role-man
            :editable="false"
           
            @role-selection="hRoleSelection"
          />
        </div>
      </div>
      <div class="w50">
        <div class="p2">
          <p>选择的角色:{{calcRoleName}}</p>
          <el-tabs class v-model="activeTab">
            <el-tab-pane label="Api授权" name="api">
              <api-auth  :roleId="calcRoleId"></api-auth>
            </el-tab-pane>
            <el-tab-pane label="目录授权" name="menu">配置管理</el-tab-pane>
            <el-tab-pane label="功能授权" name="act">角色管理</el-tab-pane>
            <el-tab-pane label="列授权" name="column">定时任务补偿</el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </lg-dashboard>
</template>
<script>
  import LgDashboard from "@/components/LgDashboard/main";
  import RoleMan from "@/views/bi/RoleMan/RoleMan.vue";
  import ApiAuth from "../ApiMan/ApiAuth";
  export default {
    name: "auth-man",
    components: { LgDashboard, RoleMan, ApiAuth },
    data: function() {
      return {
        activeTab: "api",
        roleSelect: {}
      };
    },
    created: function() {},
    mounted: function() {},
    computed: {
      calcRoleName() {
        if (this.roleSelect.roleName) {
          return this.roleSelect.roleName;
        } else {
          return "";
        }
      },
      calcRoleId(){
          if (this.roleSelect.roleId) {
          return this.roleSelect.roleId;
        } else {
          return "";
        }
      }
    },
    methods: {
      hRoleSelection(list) {
        // debugger;
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
.rl {
  border-right: solid 1px #201f1d;
  padding: 0.2rem;
  min-height: 100vh;
}
.p2 {
  padding: 0.2rem;
}
</style>