
<template>
  <lg-dashboard>
    <avue-crud
      :data="OrderDetTList"
      :option="option"
      :page="tablePage"
      v-model="OrderDetData"
      @row-save="hOrderDetSave"
      @row-update="hOrderDetUpdate"
      @row-del="hOrderDetDel"
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
  import * as OrderDetSettings from "./utils/OrderDetEntity.js";
  import {
    pagiLazyMixin,
    pagiMixin,
    pagiClass,
    pagiPara
  } from "@/mixins/pagination";
  import * as CRUD from "./utils/CRUD";
  export default {
    components: { LgDashboard },
    mixins: [pagiMixin],
    data() {
      return {
        OrderDetData: {},
        OrderDetTList: [],
        searchParams: {},
        option: {
          menuType: "icon",
          title: "订单明细",
          align: "center",
          viewBtn: true,
          menuAlign: "center",
          column: OrderDetSettings.entity
        }
      };
    },
    created: async function() {},
    methods: {
      hOrderDetSave: async function(data, index, done, loading) {
        let a = await CRUD.createorderDet(this.OrderDetData);
        done();
      },
      hOrderDetUpdate: async function(data, index, done, loading) {
        let a = await CRUD.updateOrderDet(this.OrderDetData);
        done();
      },
      hOrderDetDel: async function(data, index, done, loading) {
        try {
          let a = await this.$confirm("确认删除", "提示", { type: "warning" });
          // CRUD.deleteFunction([data]);
          done();
        } catch (err) {
          this.$message({ type: "info", message: "已取消删除" });
        }
      },
      hCloseDialog() {
        this.doQuery();
      },
      doQuery: async function() {
        let res = await CRUD.queryOrderDet(this.searchParams);
        this.OrderDetTList = res;
      },
      hSearch(params) {
        this.searchParams = params || {};
        this.doQuery();
      }
    }
  };
</script>

