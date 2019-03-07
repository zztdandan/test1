<template>
  <div class="md">
    <lg-dashboard>
      <template slot="title">订单页面</template>
      <div class="order-form">
        <!-- <template slot="title">查询form</template> -->
        <build-form
          ref="sf"
          :sync-data.sync="OData"
          :form-array="OSearchOpt"
          init-size="mini"
          @search-click="hOrderSearch"
        >
          <template slot="s-icon">
            <div class="mr-2">
              <a class="hv moon-search" @click="hOpenOSDDialog"></a>
            </div>
          </template>
        </build-form>
      </div>
      <div class="order-search-dialog">
        <order-search-dialog ref="osd" @dialog-close="hOSDCloseDialog" :flag="globalStatus"></order-search-dialog>
      </div>

      <div class="order-det-table">
        <!-- <template slot="title">细则table</template> -->
        <order-det-table
          ref="odt"
          @single-selected="hODTSingleSelect"
          @odt-view="hODTSingleSelect"
          @odt-edit="hODTPreEdit"
          @odt-add="hODTPreAdd"
        ></order-det-table>
      </div>
      <div class="order-info-form">
        <!-- <template slot="title">订单信息form</template> -->
        <order-info-form ref="oif"></order-info-form>
      </div>
      <hr>
      <div class="order-det-info-form">
        <!-- <template slot="title">订单细则信息form</template> -->
        <order-det-info-form
          ref="odif"
          @confirm-add="hODIFConfirmAdd"
          @confirm-edit="hODIFConfirmEdit"
          @confirm-cancel="hODIFCancel"
        ></order-det-info-form>
      </div>
      <div class="button-group-form">
        <!-- <template slot="title">按钮组</template> -->
        <div class="flex-md-6">
          <el-button type="primary" v-if="globalStatus=='search'" @click="doAddOrder">添加订单</el-button>
          <el-button type="primary" v-if="globalStatus!='search'" @click="doSubmitOrder">提交新增订单</el-button>
          <el-button type="primary" v-if="globalStatus!='search'">取消新增订单模式</el-button>
          <el-button type="primary">打印</el-button>
        </div>
      </div>
    </lg-dashboard>
  </div>
</template>
<script>
  import LgDashboard from "@/components/LgDashboard/main";
  import BuildForm from "@/components/BuildForm/main";
  import OrderDetTable from "../OrderDetTable/OrderDetTable";
  import OrderInfoForm from "../OrderInfoForm/OrderInfoForm";
  import OrderSearchDialog from "../OrderSearchDialog/OrderSearchDialog";
  import OrderDetInfoForm from "../OrderDetInfoForm/OrderDetInfoForm";
  import * as orderApis from "../apis/orderApi";
  // 设定各模式下子组件的可编辑性
  const statusSetting = {
    search: {
      "s-btn": true,
      odt: false,
      oif: false,
      odif: false,
      "odif-btn-type": ""
    },
    "pre-edit": {
      "s-btn": false,
      odt: true,
      oif: true,
      odif: false,
      "odif-btn-type": ""
    },
    edit: {
      "s-btn": false,
      odt: false,
      oif: true,
      odif: true,
      "odif-btn-type": "edit"
    },
    add: {
      "s-btn": false,
      odt: false,
      oif: true,
      odif: true,
      "odif-btn-type": "add"
    }
  };

  export default {
    name: "order-view",
    components: {
      LgDashboard,
      OrderDetTable, //ref odt
      OrderInfoForm, //ref oif
      OrderDetInfoForm, //ref odif
      BuildForm,
      OrderSearchDialog //ref osd
    },
    data: function() {
      return {
        OData: {},
        OSearchOpt: [],
        globalStatus: "search",
        templateODStore: {}
      };
    },
    created: function() {},
    mounted: function() {
      this.tGlobalStatus("search");
    },
    methods: {
      // 计算搜索表单的列表
      calcOSOption(flag) {
        let tmp_flag = false;
        if (typeof flag != "undefined") {
          tmp_flag = flag;
        }

        let tmp_res = [
          {
            id: "orderNumber",
            type: "append-text",
            append: "s-icon",
            label: "订单号",
            readonly: false
          }
        ];
        if (tmp_flag == true) {
          tmp_res = tmp_res.concat({
            id: "btn-sc",
            type: "button",
            class: "button button-primary button-small",
            label: "搜索",
            emit: "search-click"
          });
        }
        return tmp_res;
      },
      hOrderSearch: async function() {
        let res = await orderApis.queryOrderDetByON(this.OData);
        this.$refs["odt"].setData(res.orderDet);
        this.$refs["oif"].setData(res.order);
        // 设置全局status为search
        this.tGlobalStatus("search");
      },
      // 开关搜索界面的回调
      hOpenOSDDialog() {
        this.$refs["osd"].hOpenDialog();
      },
      hOSDCloseDialog(ON) {
        this.$refs["sf"].setData({ orderNumber: ON });
        if (ON != "") {
          this.hOrderSearch();
        }
      },
      // 点击odt栏目的回调。如果处于pre-edit或search模式，会刷掉下面的表单，如果其他模式，不刷掉表单
      hODTSingleSelect(data) {
        if (this.globalStatus == "search" || this.globalStatus == "pre-edit") {
          this.$refs["odif"].setData(data);
        }
      },
      // 从预编辑模式进入真编辑模式
      hODTPreEdit(data) {
        this.$set(this.templateODStore, data);
        this.$refs["odif"].setData(data);
        this.tGlobalStatus("edit");
      },
      hODTPreAdd(data) {
        this.tGlobalStatus("add");
      },
      // 编辑完成，从编辑模式退回预编辑模式
      hODIFConfirmAdd(data) {
        this.$refs["odt"].hConfirmAddList(data);
        this.tGlobalStatus("pre-edit");
      },
      hODIFConfirmEdit(data) {
        this.$refs["odt"].hConfirmEditList(data);
        this.tGlobalStatus("pre-edit");
      },
      // 取消添加或编辑，直接退回预编译模式
      hODIFCancel() {
        this.tGlobalStatus("pre-edit");
      },
      // 点击添加订单，进入预编辑模式
      doAddOrder() {
        this.tGlobalStatus("pre-edit");
      },

      //确认新增订单的一系列编辑，并提交post
      doSubmitOrder() {

         this.tGlobalStatus("search");
      },

      // 转换模式函数
      tGlobalStatus(status) {
        let tmp_status = "search";
        if (typeof status != "undefined") {
          tmp_status = status;
        }
        this.globalStatus = tmp_status;

        //一系列切换的操作
        this.OSearchOpt = this.calcOSOption(statusSetting[status]["s-btn"]);
        this.$refs["odt"].toggleEditable(statusSetting[status]["odt"]);
        this.$refs["oif"].toggleEditable(statusSetting[status]["oif"]);
        this.$refs["odif"].toggleEditable(statusSetting[status]["odif"]);
        this.$refs["odif"].toggleBtnType(statusSetting[status]["odif-btn-type"]);
      }
    },
    watch: {}
  };
</script>
<style scoped>
.md {
  padding: 1rem 1rem;
}
.order-form,
.order-det-table,
.order-info-form,
.order-det-info-form,
.button-group-form {
  width: 100%;
}
.mr-2 {
  margin-right: 0.2rem;
}
.hv:hover {
  cursor: pointer;
}
.flex-md-6 {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  /* width: 40%; */
  /* margin: auto; */
}
</style>