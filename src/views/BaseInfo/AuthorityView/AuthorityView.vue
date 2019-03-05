<template>
  <lg-dashboard>
    <template slot="title">
      <div class="dash-title-center">
        授权页面
      </div>
    </template>
    <hr class="pd-5" />
    <div class="flex-column flex-middle">
      <a
        class="button button-tiny button-primary mg-1"
        v-if="subPage!='pick-role'"
        @click="handleBackPick"
      >返回角色选择</a>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>角色选择</el-breadcrumb-item>
        <el-breadcrumb-item v-if="subPage!='pick-role'">{{calcAuthString}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <hr class="pd-5" />
    <div>
      <transition name="slide-fade">
        <pick-role
          v-if="subPage=='pick-role'"
          @btn-pick-role="handlepickRole"
        ></pick-role>
      </transition>
      <transition name="slide-fade">
        <auth-constant-code
          ref="auth-constant-code"
          :role-info="pickRole"
          v-if="subPage=='auth-constant-code'"
        >
        </auth-constant-code>
      </transition>
      <transition name="slide-fade">
        <auth-dept-man
          :role-info="pickRole"
          ref="auth-dept-man"
          v-if="subPage=='auth-dept-man'"
        ></auth-dept-man>
      </transition>
      <transition name="slide-fade">
        <auth-menu
          :role-info="pickRole"
          ref="auth-menu"
          v-if="subPage=='auth-menu'"
        ></auth-menu>
      </transition>
      <transition name="slide-fade">
        <auth-act
          :role-info="pickRole"
          ref="auth-act"
          v-if="subPage=='auth-act'"
        ></auth-act>
      </transition>
      <transition name="slide-fade">
        <auth-table-column
          :role-info="pickRole"
          ref="auth-table-column"
          v-if="subPage=='auth-table-column'"
        ></auth-table-column>
      </transition>
    </div>
  </lg-dashboard>
</template>

<script>
  import PickRole from "./PickRole/PickRole";
  import LgDashboard from "@/components/LgDashboard/main";
  import AuthAct from "./Detail/AuthAct";
  import AuthConstantCode from "./Detail/AuthConstantCode";
  import AuthDeptMan from "./Detail/AuthDeptMan";
  import AuthMenu from "./Detail/AuthMenu/AuthMenu";
  import AuthTableColumn from "./Detail/AuthTableColumn";
  import LgBreadCrumb from "@/components/LgBreadCrumb/main";
  export default {
     name: "auth-view",
     components: {
        PickRole,
        AuthConstantCode,
        AuthDeptMan,
        AuthMenu,
        AuthTableColumn,
        LgBreadCrumb,
        LgDashboard,
        AuthAct
     },
     data: function() {
        return {
           //选择一个角色
           pickRole: {},
           subPage: "pick-role"
        };
     },
     computed: {
        //一个虚伪计算
        calcAuthString: function() {
           switch (this.subPage) {
              case "auth-constant-code":
                 return "常数项配置授权";
                 break;
              case "auth-dept-man":
                 return "管理组织授权";
                 break;
              case "auth-menu":
                 return "菜单授权";
                 break;
              case "auth-act":
                 return "功能授权";
                 break;
              case "auth-table-column":
                 return "数据项授权";
                 break;
              default:
                 return "";
                 break;
           }
        }
     },
     methods: {
        handlepickRole(auth_type, role_info) {
          //  console.log(auth_type, role_info);
           this.subPage = auth_type;
           this.pickRole = role_info;
        },
        handleBackPick() {
           this.subPage = "pick-role";
        }
     }
  };
</script>

<style scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
   transition: all 0.3s ease;
}
.slide-fade-leave-active {
   transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
   transform: translateX(10px);
   opacity: 0;
}

.pd-all {
   margin: 0.5rem;
}
.mg-1 {
   margin: 0rem 0.25rem;
}
</style>