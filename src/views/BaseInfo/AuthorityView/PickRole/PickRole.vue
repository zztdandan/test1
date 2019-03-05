<template>
  <div class="flex-row">
    <div>选择一个角色</div>
    <div class="flex-column">
      <div class="flex-item-8">
        <lg-dashboard>
          <lg-simple-table
            :init-page-size="0"
            :init-data="roleList"
            :init-column="roleTableSetting"
            @select-row="handleroleSelect"
          ></lg-simple-table>
          <el-pagination
            :page-size="this.rolePageSize"
            :pager-count="5"
            @current-change="handleCurrChange"
            :current-page.sync="rolePageCount"
            layout="prev, pager, next"
            :total="roleTotalCount"
          ></el-pagination>
        </lg-dashboard>
      </div>
      <div class="flex-item-16">
        <lg-dashboard class="panel-mh">
          <lg-build-form :grow="1" :form_array="roleFormSet" :sync_data="roleData"></lg-build-form>
          <div class="button-group flex-md" v-if="roleData.roleName">
            <button
              v-for="item in actArr"
              :key="item.code"
              @click="handlePick(item.code)"
              :class="item.btn_class"
            >{{item.title}}</button>
          </div>
        </lg-dashboard>
      </div>
    </div>
  </div>
</template>

<script>
  import { baseLazyLoad } from "@/business_utils/lazyLoadPagination";
  import global_config from "@/global_config";
  import SimpleTable from "@/components/SimpleTable/main";
  import LgDashboard from "@/components/LgDashboard/main";
  import actDef from "./utils/pickActionDef";
  export default {
     name: "pick-role",
     components: {
        SimpleTable,
        LgDashboard
     },
     data: function() {
        //  debugger;
        return {
           roleTableSetting: [{ prop: "roleName", label: "角色名称" }],
           rolePageSize: 20,
           rolePageCount: 1,
           roleTotalCount: 0,
           roleList: [],
           roleData: {},
           roleFormSet: [
              { type: "text", label: "角色名称", id: "roleName", labelWidth: "4.5rem", line: 1, readonly: true },
              { type: "text", label: "角色注释", id: "remark", labelWidth: "4.5rem", line: 2, readonly: true }
           ],
           actArr: [actDef.Constant, actDef.Dept, actDef.Menu, actDef.Act, actDef.TableColumn]
        };
     },
     mounted: function() {
        //获取角色列表
        this.handleCurrChange(1);
     },
     methods: {
        handleCurrChange(curr_page) {
           baseLazyLoad(global_config.Role.RoleList, curr_page, this.rolePageSize).then(res => {
              // debugger;
              this.roleTotalCount = res.totalCount;
              this.roleList = res.list;
           });
        },
        handleroleSelect(role_data) {
           // debugger;
           this.roleData = role_data;
        },
        handlePick(type) {
           this.$emit("btn-pick-role", type, this.roleData);
        }
     }
  };
</script>

<style scoped>
.panel-mh {
   min-height: calc(100% - 0.7rem);
}
.mg-1 {
   margin: 0.25rem 0.5rem;
}
</style>