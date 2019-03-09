<template>
  <lg-dashboard>页面资源管理
    <avue-crud
      ref="crud"
      :data="ViewTList"
      :option="viewOption"
      :page="tablePage"
      v-model="ViewData"
      @row-save="hViewSave"
      @row-update="hViewUpdate"
      :before-close="hCloseDialog"
      @refresh-change="hRefresh"
      @size-change="hSizeChange"
      @current-change="hCurrentChange"
      @search-change="hSearch"
      @selection-change="hSelectionChange"
    >
      <template slot="menuLeft">
        <el-button size="mini" type="primary" @click="hOpenUpdate">编辑</el-button>
        <el-button size="mini" type="warning" @click="hViewDelList">删除选中</el-button>
      </template>
    </avue-crud>
  </lg-dashboard>
</template>
<script>
  import LgDashboard from "@/components/LgDashboard/main";
  import viewEntity from "./utils/viewEntity";
  import * as CRUD from "./utils/CRUD";
  import {
    pagiLazyMixin,
    pagiMixin,
    pagiClass,
    pagiPara
  } from "@/mixins/pagination";
  export default {
    name: "view-man",
    components: { LgDashboard },
    mixins: [pagiLazyMixin],
    data: function() {
      return {
        ViewTList: [],
        ViewData: {},
        ViewSelection: [],
        viewOption: {
          menuType: "icon",
          align: "center",
          size: "mini",
          refreshBtn: false,
          columnBtn: false,
          selection: true,
          viewBtn: false,
          editBtn: false,
          delBtn: false,
          menu: false,
          menuAlign: "center",
          column: []
        },
        searchParams: {}
      };
    },
    created: async function() {
      let set = await viewEntity();
      this.$set(this.viewOption, "column", set);
      this.doQuery(1, 20);
    },
    mounted: function() {},
    methods: {
      hOpenUpdate() {
        debugger;
        if (this.ViewSelection && this.ViewSelection.length >= 0) {
          this.$refs["crud"].rowEdit(this.ViewSelection[0]);
        } else {
          this.$alert("没有选择列");
        }
      },
      hViewSave: async function(data) {
        await CRUD.createView(data);
      },
      hViewUpdate: async function(data) {
        await CRUD.updateView(data);
      },
      hViewDel: async function(data) {},
      hViewDelList: async function() {
        try {
          let a = await this.$confirm("确认删除", "提示", { type: "warning" });
          await CRUD.deleteView(this.ViewSelection);
        } catch (err) {
          this.$message({ type: "info", message: "已取消删除" });
        }
      },
      hCloseDialog() {},
      hSearch(data) {
        this.searchParams = data || {};
        this.doQuery();
      },
      hSelectionChange(list) {
        this.ViewSelection = list;
      },
      doQuery: async function(curr, size) {
        curr = curr || 1;
        size = size || 20;
        let page_para = new pagiPara(curr, size);
        //  得到分页数据
        let res = await CRUD.queryViewLazy(this.searchParams, page_para);
        let pagiRes = new pagiClass(res);
        this.paginationSet(
          pagiRes.pageSize,
          pagiRes.totalRow,
          pagiRes.pageNumber
        );
        this.ViewTList = pagiRes.list;
      }
    },
    watch: {}
  };
</script>
<style scoped>
</style>