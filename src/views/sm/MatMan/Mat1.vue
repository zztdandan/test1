<template>
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
    <template slot="menuLeft" v-if="this.edit===true">
      <el-button size="mini" type="primary" @click="hOpenCpCreate">复制新增</el-button>
      <el-button size="mini" type="primary" @click="hOpenUpdate">编辑</el-button>
      <el-button size="mini" type="warning" @click="hViewDelList">删除选中</el-button>
    </template>
  </avue-crud>
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
    name: "mat-man",
    components: { LgDashboard },
    mixins: [pagiLazyMixin],
    props: {
      edit: {
        type: Boolean,
        default: true
      }
    },
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
          searchShow: true,
          searchBtn: false,
          searchMenuSpan: 6,
          selection: true,
          viewBtn: false,
          addBtn: false,
          editBtn: false,
          delBtn: false,
          menu: false,
          menuAlign: "center",
          column: [{ type: "text", label: "1", search: true }]
        },
        searchParams: {}
      };
    },
    created: async function() {
      let set = await viewEntity();
      this.$set(this.viewOption, "column", set);
      this.$set(this.viewOption, "addBtn", this.edit);
      this.doQuery(1, 20);
    },
    mounted: function() {},
    methods: {
      hOpenUpdate() {
        // debugger;
        if (this.ViewSelection && this.ViewSelection.length > 0) {
          this.$refs["crud"].rowEdit(this.ViewSelection[0]);
        } else {
          this.$message("没有选择列");
        }
      },
      hOpenCpCreate() {
        if (this.ViewSelection && this.ViewSelection.length > 0) {
          this.$refs["crud"].rowAdd();
          this.ViewData = this.ViewSelection[0];
        } else {
          this.$message("没有选择列");
        }
      },
      hViewSave: async function(data, index, done, loading) {
        try {
          await CRUD.createView(data);
          done();
          this.doQuery();
        } catch (error) {
          done();
          console.log(error);
        }
      },
      hViewUpdate: async function(data, index, done, loading) {
        try {
          await CRUD.updateView(data);
          done();
          this.doQuery();
        } catch (error) {
          done();
          console.log(error);
        }
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
        this.$emit("selection", list);
      },
      doQuery: async function(curr, size) {
        // debugger;
        curr = curr || 1;
        size = size || 20;
        let page_para = new pagiPara(curr, size);
        //  得到分页数据
        let res = await CRUD.queryViewLazy(this.searchParams, page_para);
        let pagiRes = new pagiClass(res);
        // debugger;
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
.mg {
  margin: 1rem;
  width: 75vw;
}
</style>