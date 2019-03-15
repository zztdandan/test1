<template>
  <lg-dashboard title="权限管理">
    <div class="flex-cd">
      <div :class="calcDBClass">
        <lg-dashboard class="h100">
          <template slot="title">
            <div class="ml">
              <el-button
                v-if="!collapse"
                size="mini"
                type="primary"
                icon="el-icon-minus"
                @click="toggleCollapse(true)"
                circle
              ></el-button>
              <el-button
                v-if="collapse"
                size="mini"
                type="primary"
                icon="el-icon-plus"
                @click="toggleCollapse(false)"
                circle
              ></el-button>
            </div>
          </template>
          <role-man :class="calcDisClass" :editable="false" @role-selection="hRoleSelection"/>
        </lg-dashboard>
      </div>
      <div :class="calcWClass">
        <div class="p2">
          <div class="flex-cd1">
            <div>选择的角色:{{calcRoleName}}</div>
            <div class="flex-cd">
              <el-button class="ml" size="mini" type="success" @click="hRefreshAuth">刷新角色权限状态</el-button>
              <el-button class="ml" size="mini" type="success" @click="hConfirmAuth">确定授权</el-button>
            </div>
          </div>

          <el-tabs class v-model="activeTab">
            <el-tab-pane label="Api授权" name="api">
              <api-auth ref="api" :roleId="calcRoleId"></api-auth>
            </el-tab-pane>
            <el-tab-pane label="目录授权" name="menu">
              <menu-auth ref="menu" :roleId="calcRoleId"></menu-auth>
            </el-tab-pane>
            <el-tab-pane label="功能授权" name="act">
              <act-auth ref="act" :roleId="calcRoleId"></act-auth>
            </el-tab-pane>
            <el-tab-pane label="列授权" name="column">列授权页面</el-tab-pane>
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
  import ActAuth from "../MenuReg/ActMan/ActAuth";
  import MenuAuth from "../MenuReg/MenuMan/MenuAuth";
  export default {
    name: "auth-man",
    components: { LgDashboard, RoleMan, ApiAuth, MenuAuth, ActAuth },
    data: function() {
      return {
        activeTab: "api",
        roleSelect: {},
        collapse: false
      };
    },
    created: function() {},
    mounted: function() {},
    computed: {
      calcWClass() {
        return this.collapse ? "w100" : "w50";
      },
      calcDBClass() {
        return this.collapse ? "w1" : "w50";
      },
      calcDisClass() {
        return this.collapse ? "dn" : "dt";
      },
      calcRoleName() {
        if (this.roleSelect.roleName) {
          return this.roleSelect.roleName;
        } else {
          return "";
        }
      },
      calcRoleId() {
        if (this.roleSelect.roleId) {
          return this.roleSelect.roleId;
        } else {
          return "";
        }
      }
    },
    methods: {
      hConfirmAuth() {
        this.$refs[this.activeTab].hConfirmAuth();
      },
      hRefreshAuth() {
        this.$refs[this.activeTab].hRefreshAuth();
      },
      hRoleSelection(list) {
        // debugger;
        if (list.length != 0) {
          this.roleSelect = list[0];
          this.activeList = ["2"];
        }
      },
      toggleCollapse(flag) {
        this.collapse = flag;
      }
    },
    watch: {}
  };
</script>
<style scoped>
.rl {
  padding: 0.2rem;
  min-height: 100vh;
}
.p2 {
  padding: 0.2rem;
}
.ml {
  margin-left: 0.4rem;
  margin-right: 0.4rem;
}
.w1 {
  width: 3rem;
}
.dn {
  display: none;
}
.dt {
  display: block;
}
.flex-cd {
  display: flex;
  flex-direction: row;
}
.h100 {
  min-height: 100% !important;
}
.flex-cd1 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>