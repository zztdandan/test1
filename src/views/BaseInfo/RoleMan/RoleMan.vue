
<template>
  <lg-dashboard>
    <avue-crud
      :data="RoleManTList"
      :option="option"
      :page="tablePage"
      v-model="RoleManData"
      @row-save="hRoleManSave"
      @row-update="hRoleManUpdate"
      @row-del="hRoleManDel"
      @before-close="hCloseDialog"
      @refresh-change="hRefresh"
      @size-change="hSizeChange"
      @current-change="hCurrentChange"
      @search-change="hSearch"
      @selectionChange="hSelectChange"
    >
      <template slot="menuLeft">
        <el-button type="danger" size="small" @click="hRoleManDelList()">删除选中</el-button>
      </template>
      <!-- 暂时不做角色用户绑定，做用户角色绑定 -->
      <!-- <template slot-scope="scope" slot="menu">
        <el-button size="small">绑定角色用户</el-button>
      </template> -->
    </avue-crud>
  </lg-dashboard>
</template>


<script>
  import LgDashboard from "@/components/LgDashboard/main";
  import RoleManEntity from "./utils/RoleManEntity.js";
  import { pagiLazyMixin, pagiMixin, pagiClass, pagiPara } from "@/business_utils/pagination";
  import * as CRUD from "./utils/CRUD";
  export default {
     name: "table-man",
     components: { LgDashboard },
     mixins: [pagiLazyMixin],
     data() {
        return {
           RoleManData: {},
           RoleManTList: [],
           RoleManSList: [],
           searchParams: {},
           option: {
              selection: true,
              title: "角色信息维护",
              page: true,
              align: "center",
              menuAlign: "center",
              menuWidth: "360",
              column: RoleManEntity
           }
        };
     },
     created: function() {
        this.doQuery(this.tablePage.currentPage, this.tablePage.pageSize);
     },
     methods: {
        hRoleManSave: async function(data, index, done, loading) {
           let a = await CRUD.createRoleMan(this.RoleManData);
           done();
        },
        hRoleManUpdate: async function(data, index, done, loading) {
           let a = await CRUD.updateRoleMan(this.RoleManData);
           done();
        },
        hRoleManDel: async function(data, index, done, loading) {
           try {
              let a = await this.$confirm("确认删除", "提示", { type: "warning" });
              CRUD.deleteRoleMan([data]);
              done();
           } catch (err) {
              this.$message({ type: "info", message: "取消删除" });
           }
        },
        hCloseDialog() {
           this.doQuery(pagiRes.pageNumber, pagiRes.pageSize);
        },
        doQuery: async function(curr, size) {
           curr = curr || 1;
           size = size || 20;
           let page_para = new pagiPara(size, curr);
           //  得到分页数据
           let res = await CRUD.queryLazyRoleMan(this.searchParams, page_para);
           //   debugger;
           let pagiRes = new pagiClass(res);
           this.paginationSet(pagiRes.pageSize, pagiRes.totalRow);
           this.RoleManTList = pagiRes.list;
        },
        hRoleManDelList: async function() {
           try {
              let a = await this.$confirm("确认删除选中所有项", "提示", { type: "warning" });
              CRUD.deleteRoleMan(this.RoleManSList);
              done();
           } catch (err) {
              this.$message({ type: "info", message: "取消删除" });
           }
        },

        hSearch(params) {
           this.searchParams = params || {};
           this.doQuery();
        },
        hSelectChange(dataList) {
           this.RoleManSList = dataList;
        }
     }
  };
</script>

