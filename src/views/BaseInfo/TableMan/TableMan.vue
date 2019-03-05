
<template>
  <lg-dashboard>
    <avue-crud
      :data="TableManTList"
      :option="option"
      :page="tablePage"
      v-model="TableManData"
      @row-save="hTableManSave"
      @row-update="hTableManUpdate"
      @row-del="hTableManDel"
      @before-close="hCloseDialog"
      @refresh-change="hRefresh"
      @size-change="hSizeChange"
      @current-change="hCurrentChange"
      @search-change="hSearch"
    ></avue-crud>
  </lg-dashboard>
</template>


<script>
  import LgDashboard from "@/components/LgDashboard/main";
  import TableManEntity from "./utils/TableManEntity.js";
  import { pagiLazyMixin, pagiMixin, pagiClass, pagiPara } from "@/business_utils/pagination";
  import * as CRUD from "./utils/CRUD";
  export default {
     name:"table-man-view",
     components: { LgDashboard },
     mixins: [pagiMixin],
     data() {
        return {
           TableManData: {},
           TableManTList: [],
           searchParams: {},
           option: {
              menuType: "icon",
              title: "表格信息维护页面",
              page: false,
              align: "center",
              viewBtn: true,
              menuAlign: "center",
              column: TableManEntity
           }
        };
     },
     created: async function() {
        this.doQuery();
     },
     methods: {
        hTableManSave: async function(data, index, done, loading) {
           let a = await CRUD.createTableMan(this.TableManData);
           done();
        },
        hTableManUpdate: async function(data, index, done, loading) {
           let a = await CRUD.updateTableMan(this.TableManData);
           done();
        },
        hTableManDel: async function(data, index, done, loading) {
           try {
              let a = await this.$confirm("确认删除", "提示", { type: "warning" });
              CRUD.deleteTableMan([data]);
              done();
           } catch (err) {
              this.$message({ type: "info", message: "删除出现错误" });
           }
        },
        hCloseDialog() {
           this.doQuery();
        },
        doQuery: async function() {
           let res = await CRUD.queryTableMan(this.searchParams);

           this.TableManTList = res;
        },
        hSearch(params) {
           this.searchParams = params || {};
           this.doQuery();
        }
     }
  };
</script>

