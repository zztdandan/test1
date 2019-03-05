<template>
  <lg-dashboard>
     
    <avue-crud
      :data="userTList"
      :option="option"
      :page="tablePage"
      v-model="userData"
      @row-save="hUserSave"
      @row-update="hUserUpdate"
      @row-del="hUserDel"
      @before-close="hCloseDialog"
      @refresh-change="hRefresh"
      @size-change="hSizeChange"
      @current-change="hCurrentChange"
      @search-change="hSearch"
    >
      <template slot-scope="scope" slot="menu">
        <el-button @click="hUserRole(scope)" size="small" type="info">用户分配角色</el-button>
      </template>
    </avue-crud>
<user-role-dialog ref="dialog"></user-role-dialog>
  </lg-dashboard>
</template>
<script>
  import LgDashboard from "@/components/LgDashboard/main";
  import userEntity from "./utils/userEntity";
  import { pagiLazyMixin, pagiMixin, pagiClass, pagiPara } from "@/business_utils/pagination";
  import * as CRUD from "./utils/CRUD";
  import UserRoleDialog from '../UserRole/UserRoleDialog';
  export default {
     name:"user-man",
     components: { LgDashboard,UserRoleDialog },
     mixins: [pagiLazyMixin],
     data() {
        return {
           userData: {},
           userTList: [],
           searchParams: {},
           option: {
              menuType: "icon",
              title: "用户管理",
              page: false,
              menuWidth: "360",
              align: "center",
              viewBtn: true,
              menuAlign: "center",
              column: userEntity
           }
        };
     },
     created: async function() {
        this.doQuery()
     },
     methods: {
        hUserSave(data) {
           CRUD.userCreate(this.userData);
        },
        hUserRole({row}) {
         this.$refs.dialog.hOpenDialog(row,row.roleIdList)
        },
        hUserUpdate(data) {},
        hUserDel: async function(data) {
           try {
              let a = await this.$confirm("确认删除", "提示", { type: "warning" });

              CRUD.userDelete(this.userData);
           } catch (err) {
              this.$message({ type: "info", message: "已取消删除" });
           }
        },
        hCloseDialog() {
           this.doQuery();
        },
        doQuery: async function(curr, size) {
           curr = curr || 1;
           size = size || 20;
           let page_para = new pagiPara(size, curr);
           //  得到分页数据
           let res = await CRUD.userQueryPagi(this.searchParams, page_para);
           let pagiRes = new pagiClass(res);
           this.paginationSet(pagiRes.pageSize, pagiRes.totalRow, pagiRes.pageNumber);
           this.userTList = pagiRes.list;
        },
        hSearch(params) {
           this.searchParams = params || {};
           this.doQuery();
        }
     }
  };
</script>
