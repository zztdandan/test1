
<template>
  <lg-dashboard>
    <avue-crud
      :data="codeClassTList"
      :option="option"
      :page="tablePage"
      v-model="codeClassData"
      @row-save="hcodeClassSave"
      @row-update="hcodeClassUpdate"
      @row-del="hcodeClassDel"
      :before-close="hCloseDialog"
      @refresh-change="hRefresh"
      @size-change="hSizeChange"
      @current-change="hCurrentChange"
      @search-change="hSearch"
      @current-row-change="hCurrentRowChange"
    ></avue-crud>
  </lg-dashboard>
</template>


<script>
  import LgDashboard from "@/components/LgDashboard/main";
  import codeClassEntity from "./utils/codeClassEntity.js";
  import { pagiLazyMixin, pagiMixin, pagiClass, pagiPara } from "@/business_utils/pagination";
  import * as CRUD from "./utils/CRUD";
  export default {
     name: "code-class-man",
     components: { LgDashboard },
     mixins: [pagiMixin],
     data() {
        return {
           codeClassData: {},
           codeClassTList: [],
           codeClassSList: [],
           searchParams: {},
           option: {
              highlightCurrentRow: true,
              menuType: "icon",
              title: "代码大类维护",
              page: false,
              align: "center",
              menuAlign: "center",
              column: []
           }
        };
     },
     created: async function() {
        this.option.column = await codeClassEntity();
        this.doQuery();
     },
     methods: {
        hCurrentRowChange: function(data) {
           this.$emit("code-class-change", data);
        },
        hcodeClassSave: async function(data, index, done, loading) {
           let a = await CRUD.createCodeClass(this.codeClassData);
           done();
        },
        hcodeClassUpdate: async function(data, index, done, loading) {
           let a = await CRUD.updateCodeClass(this.codeClassData);
           done();
        },
        hcodeClassDel: async function(data, index, done, loading) {
           try {
              let a = await this.$confirm("确认删除", "提示", { type: "warning" });
              CRUD.deleteCodeClass([data]);
              done();
           } catch (err) {
              this.$message({ type: "info", message: "取消删除" });
           }
        },
        hCloseDialog() {
         //   console.log("12312")
           this.doQuery();
        },
        doQuery: async function() {
           let res = await CRUD.queryCodeClass(this.searchParams);

           this.codeClassTList = res;
        },
        hcodeClassDelList: async function() {
           try {
              let a = await this.$confirm("确认删除选中所有项", "提示", { type: "warning" });
              CRUD.deleteCodeClass(this.codeClassSList);
              done();
           } catch (err) {
              this.$message({ type: "info", message: "取消删除" });
           }
        },
        hSearch(params) {
           this.searchParams = params || {};
           this.doQuery();
        }
     }
  };
</script>

