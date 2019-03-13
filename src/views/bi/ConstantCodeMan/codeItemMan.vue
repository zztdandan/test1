
<template>
  <lg-dashboard>
    <avue-crud
      :data="codeItemTList"
      :option="option"
      :page="tablePage"
      v-model="codeItemData"
      @row-save="hcodeItemSave"
      @row-update="hcodeItemUpdate"
      @row-del="hcodeItemDel"
      @before-close="hCloseDialog"
      @refresh-change="hRefresh"
      @size-change="hSizeChange"
      @current-change="hCurrentChange"
      @search-change="hSearch"
    >

    </avue-crud>
  </lg-dashboard>
</template>


<script>
  import LgDashboard from "@/components/LgDashboard/main";
  import codeItemEntity from "./utils/codeItemEntity.js";
  import { pagiLazyMixin, pagiMixin, pagiClass, pagiPara } from "@/mixins/pagination";
  import * as CRUD from "./utils/CRUD";

  export default {
     name: "code-item-man",
     components: { LgDashboard },
     mixins: [pagiMixin],
     props: {
        codeClass: {
           type: String,
           default: ""
        }
     },
     data() {
        return {
           codeItemData: {},
           codeItemTList: [],
           codeItemSList: [],
           searchParams: {},
           option: {
              selection: true,
              menuType: "icon",
              page: false,
              align: "center",
              menuAlign: "center",
              column: []
           }
        };
     },
     created: async function() {
        this.option.column = await codeItemEntity();
     },
     methods: {
        hcodeItemSave: async function(data, index, done, loading) {
           let a = await CRUD.createCodeItem(this.codeItemData);
           done();
        },
        hcodeItemUpdate: async function(data, index, done, loading) {
           let a = await CRUD.updateCodeItem(this.codeItemData);
           done();
        },
        hcodeItemDel: async function(data, index, done, loading) {
           try {
              let a = await this.$confirm("确认删除", "提示", { type: "warning" });
              CRUD.deleteCodeItem([data]);
              done();
           } catch (err) {
              this.$message({ type: "info", message: "取消删除" });
           }
        },
        hCloseDialog() {
           this.doQuery();
        },
        doQuery: async function() {
           let res = await CRUD.queryCodeItem(this.searchParams);
           this.codeItemTList = res;
        },
        hcodeItemDelList: async function() {
           try {
              let a = await this.$confirm("确认删除选中所有项", "提示", { type: "warning" });
              CRUD.deleteCodeItem(this.codeItemSList);
              done();
           } catch (err) {
              this.$message({ type: "info", message: "取消删除" });
           }
        },
        hSearch(params) {
           this.searchParams = params || {};
           this.doQuery();
        }
     },
     watch: {
        //如果codeclass做更改，直接查询后台
        codeClass: {
           deep: true,
           handler: function(newval, oldval) {
              this.searchParams.classcode = newval;
              this.doQuery();
           }
        }
     }
  };
</script>

