
<template>
  <lg-dashboard>
    <avue-crud
      :data="OrderTList"
      :option="option"
      :page="tablePage"
      v-model="OrderData"
      @row-save="hOrderSave"
      @row-update="hOrderUpdate"
      @row-del="hOrderDel"
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
  import * as OrderSettings from "./utils/OrderEntity.js";
  import { pagiLazyMixin, pagiMixin, pagiClass, pagiPara } from "@/business_utils/pagination";
  import * as CRUD from "./utils/CRUD";
  export default {
     components: { LgDashboard },
     mixins: [pagiMixin],
     data() {
        return {
           OrderData: {},
           OrderTList: [],
           searchParams: {},
           option: {
              menuType: "icon",
              title: "订单主档",
              page: false,
              align: "center",
              viewBtn: true,
              menuAlign: "center",
              column: OrderSettings.entity
           }
        };
     },
     created: async function() {},
     methods: {
        hOrderSave:async function(data, index, done, loading) {
         let a = await CRUD.createOrder(this.OrderData);
         done();
        },
        hOrderUpdate:async function(data, index, done, loading) {
         let a = await CRUD.updateOrder(this.OrderData);
         done();
        },
        hOrderDel:async function(data, index, done, loading) {
         try {
            let a = await this.$confirm("确认删除", "提示", { type: "warning" });            
            CRUD.deleteFunction([data]);
            done();
         } catch (err) {
            this.$message({ type: "info", message: "已取消删除" });
         }
         
        },
        hCloseDialog() {
           this.doQuery();
        },
        doQuery: 
async function() {
    let res = await CRUD.queryProvision(this.searchParams);
    this.OrderTList = res;
 },
        hSearch(params) {
           this.searchParams = params || {};
           this.doQuery();
        }
     }
  };
</script>

