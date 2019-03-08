<template>
  <lg-dashboard>页面资源管理
    <avue-crud
      :data="ViewTList"
      :option="viewOption"
      :page="tablePage"
      v-model="ViewData"
      @row-save="hViewSave"
      @row-update="hViewUpdate"
      @row-del="hViewDel"
      :before-close="hCloseDialog"
      @refresh-change="hRefresh"
      @size-change="hSizeChange"
      @current-change="hCurrentChange"
      @search-change="hSearch"
    ></avue-crud>
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
    components: {},
    mixins: [pagiLazyMixin],
    data: function() {
      return {
        ViewTList: [],
        ViewData: {},
        viewOption: {
          menuType: "icon",
          align: "center",
          viewBtn: true,
          menuAlign: "center",
          column: viewEntity
        },
        searchParams: {}
      };
    },
    created: function() {},
    mounted: function() {},
    methods: {
      hViewSave: async function(data) {
        await CRUD.createView(data);
      },
      hViewUpdate: async function(data) {
        await CRUD.updateView(data);
      },
      hViewDel: async function(data) {
        await CRUD.deleteView(data);
      },
      hCloseDialog() {},
      hSearch(data) {
        this.searchParams = data || {};
        this.doQuery();
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