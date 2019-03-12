<template>
  <el-dialog
    ref="dia"
    title="选择订单号(通过细则)"
    :visible.sync="dialogVisi"
    fullscreen
    @closed="hDialogClose"
  >
    <avue-form v-model="OSFObject" :option="OSFOpt" @submit="hSearchClick"></avue-form>
    <order-and-det-table :editable="false" ref="order-det"></order-and-det-table>
    <template slot="footer">
      <div class="flex-md">        
        <el-button size="mini" type="primary" @click="hSelectOrderNum" >确定</el-button>
        <el-button size="mini" @click="hCancel">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
  import BuildForm from "@/components/BuildForm/main";
  import OrderAndDetTable from "../OrderAndDetTable/OrderAndDetTable";
  import getOSBE from "./utils/OrderSearchBarEntity";
  import * as orderApis from "../apis/orderApi";
  export default {
    name: "order-search-dialog",
    components: { BuildForm, OrderAndDetTable },
    props: {
      flag: {
        type: String,
        default: "search"
      }
    },
    data: function() {
      return {
        dialogVisi: false,
        OSFObject: {},
        OSFOpt: {
          menuBtn: true,
          submitBtn: true,
          emptyBtn: true,
          submitText: "搜索",
          column: []
        },
        selectedON: ""
      };
    },
    created: async function() {
      let tmp_col = await getOSBE();

      this.$set(this.OSFOpt, "column", tmp_col);
    },

    computed: {
      calcFlag() {
        let tmp_a = this.flag;
        console.log("监测到props的变化——vcom");
        return tmp_a;
      }
    },
    mounted: function() {},
    methods: {
      hOpenDialog() {
        this.dialogVisi = true;
      },
      hSearchClick: function() {
        this.$refs["order-det"].hDoSearch(this.OSFObject);
      },
      hDialogClose: function() {
        this.$emit("dialog-close", this.selectedON);
      },
      hSelectOrderNum() {
        let tmp_search_res = this.$refs["order-det"].getSelection();
        let tmp_row =
          tmp_search_res.length > 0 ? tmp_search_res[0] : { orderNo: "" };
        this.selectedON = tmp_row.orderNo;
        this.dialogVisi=false;
      },
      hCancel() {
        this.selectedON = "";
            this.dialogVisi=false;
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