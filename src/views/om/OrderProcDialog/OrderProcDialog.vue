<template>
  <el-dialog title="待排产订单明细" :visible.sync="dialogVisi" fullscreen @closed="hDialogClose">
    <order-and-det-table :editable="false" ref="order-and-det"></order-and-det-table>
    <template slot="footer">
      <div class="flex-md">
        <el-button size="mini" type="primary" @click="hSelectOrderNum">确定排产</el-button>
        <el-button size="mini" @click="hCancel">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import BuildForm from "@/components/BuildForm/main";
import OrderAndDetTable from "../OrderAndDetTable/OrderAndDetTable";
import * as orderApis from "../apis/orderApi";
export default {
  name: "order-proc-dialog",
  components: { BuildForm, OrderAndDetTable },
  props: {
    orderProc: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data: function() {
    return {
      dialogVisi: false,
      selectedON: ""
    };
  },
  created: function() {},

  computed: {},
  mounted: function() {},
  methods: {
    hOpenDialog: async function(olistno) {
      this.dialogVisi = true;
      let res = await orderApis.queryOrderDetByList(olistno);
      this.$refs["order-and-det"].setData(res);
    },

    hDialogClose: function() {},
    hSelectOrderNum() {
      //   let tmp_search_res = this.$refs["order-and-det"].getSelection();
      //   let tmp_row =
      //     tmp_search_res.length > 0 ? tmp_search_res[0] : { orderNo: "" };
      //   this.selectedON = tmp_row.orderNo;
      //   this.dialogVisi = false;
    },
    hCancel() {
      //   this.selectedON = "";
        this.dialogVisi = false;
    }
  },
  watch: {
    flag: {
      deep: true,
      handler: function(newval, oldval) {
        console.log("监测到props的变化——vwatch");
      }
    }
  }
};
</script>





<style scoped>
.flex-md {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  width: 40%;
  margin: auto;
}
</style>
