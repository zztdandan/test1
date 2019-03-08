<template>
  <div>
    <avue-crud
      :data="ODTList"
      :option="ODTOpt"
      @row-click="hSingleSelect"
      :page="tablePage"
      @selection-change="hSelectionChange"
    >
      <template slot="menuLeft">
        <el-button v-if="editable" type="primary" size="small" @click="hAddClick">新增</el-button>
      </template>
      <template slot-scope="scope" slot="menu">
        <div class="flex-column flex-between">
          <el-button v-if="editable" type="primary" size="small" @click="hEditClick(scope)">编辑</el-button>
          <el-button v-if="editable" type="danger" size="small" @click="hDeleteClick(scope)">删除</el-button>
        </div>
      </template>
    </avue-crud>
  </div>
</template>
<script>
  import "linqjs";
  import getODTEntity from "./utils/ODTEntity";
  import {
    pagiLazyMixin,
    pagiMixin,
    pagiClass,
    pagiPara
  } from "@/business_utils/pagination";
  import * as orderApis from "../apis/orderApi";
  export default {
    name: "order-det-table",
    mixins: [pagiLazyMixin],
    components: {},
    props: {},
    data: function() {
      return {
        ODTList: [],
        ODTOpt: {
          menu: false,
          addBtn: false,
           sortable: true,
          editBtn: false,
          delBtn: false,
          selection: true,
          menuWidth:"240",
          columnBtn: false,
          refreshBtn: false,
          column: []
        },
        searchParams: {},
        selectedObj: {},
        selectionArr: [],
        editable: false
      };
    },
    created: async function() {
      let tmp_col = await getODTEntity();
      this.$set(this.ODTOpt, "column", tmp_col);
    },
    mounted: function() {},

    methods: {
      setData(data) {
        this.ODTList = data;
      },
      getData() {
        return this.ODTList;
      },
      getSelection() {
        return this.selectionArr.length == 0 && this.selectedObj.orderNo
          ? [this.selectedObj]
          : this.selectionArr;
      },
      clearSelection() {
        this.selectionArr = [];
      },
      hSingleSelect(data) {
        this.selectedObj = data;
        this.$emit("single-selected", data);
      },
      getSelected() {
        return this.selectedObj;
      },
      hAddClick() {
        this.$emit("odt-add");
      },
      hEditClick({ row }) {
        this.$emit("odt-edit", row);
      },
      hViewClick({ row }) {
        this.$emit("odt-view", row);
      },
      hDeleteClick: async function({ row }) {
        let that_vue = this;
        try {
          let a = await this.$confirm("确认删除", "提示", { type: "warning" });
          that_vue.ODTList.remove(that_vue.ODTList.find(x=>x===row));
          that_vue.$emit("odt-del");
        } catch (err) {
          debugger;
          that_vue.$message({ type: "info", message: "已取消删除" });
        }
      },
      hDoSearch(params) {
        this.searchParams = params || {};
        this.doQuery(this.tablePage.currentPage, this.tablePage.pageSize);
      },
      doQuery: async function(curr, size) {
        curr = curr || 1;
        size = size || 20;
        let page_para = new pagiPara(curr, size);
        //  得到分页数据
        let res = await orderApis.queryOrderNumberLazy(
          this.searchParams,
          page_para
        );
        let pagiRes = new pagiClass(res);
        this.paginationSet(
          pagiRes.pageSize,
          pagiRes.totalRow,
          pagiRes.pageNumber
        );
        this.ODTList = pagiRes.list;
      },

      hConfirmAddList(data) {
        this.ODTList.push(data);
      },
      hConfirmEditList(newdata) {
        this.ODTList = this.ODTList.map(x => {
          return x.id === newdata.id ? newdata : x;
        });
      },
      hSelectionChange(data) {
        this.selectionArr = data;
      },
      toggleEditable(flag) {
        let tmp_editable = !this.editable;
        if (typeof flag != undefined) {
          tmp_editable = flag;
        }
        this.editable = tmp_editable;
        this.ODTOpt.menu = tmp_editable;
      }
    },
    watch: {}
  };
</script>
<style scoped>
</style>