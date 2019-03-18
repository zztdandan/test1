


<template>
  <div>
    <lg-dashboard>
      <el-button type="primary" size="mini" @click="hOpenOPDDialog">排产</el-button>
    </lg-dashboard>
    <order-proc-dialog ref="opd"></order-proc-dialog>
  </div>
</template>
<script>
import LgDashboard from "@/components/LgDashboard/main";
import OrderProcDialog from "@/views/om/OrderProcDialog/OrderProcDialog";
export default {
  name: "order-manage",
  components: {
    LgDashboard,
    OrderProcDialog
  },
  data: function() {
    return {
      olistno: [201901211, 2301321, 2131214]
    };
  },
  created: function() {},
  mounted: function() {},
  methods: {
    hOpenOPDDialog() {
      this.$refs["opd"].hOpenDialog(this.olistno);
    }
  },
  watch: {}
};
</script>
<style scoped>
</style>