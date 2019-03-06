<template>
  <div class="flex-md">
    <lg-dashboard class="order-form">
      <template slot="title">查询form</template>
    </lg-dashboard>
    <div class="order-search-dialog"></div>
    <lg-dashboard class="order-det-table">
      <template slot="title">细则table</template>
    </lg-dashboard>
    <lg-dashboard class="order-info-form">
      <template slot="title">订单信息form</template>
    </lg-dashboard>
    <hr>
    <lg-dashboard class="order-det-info-form">
      <template slot="title">订单细则信息form</template>
    </lg-dashboard>
    <lg-dashboard class="button-group-form">
      <template slot="title">按钮组</template>
    </lg-dashboard>
  </div>
</template>
<script>
  import LgDashboard from "@/components/LgDashboard/main";

  export default {
    name: "order-view",
    components: { LgDashboard },
    data: function() {
      return {};
    },
    created: function() {},
    mounted: function() {},
    methods: {},
    watch: {}
  };
</script>
<style scoped>
.flex-md {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
}
.order-form,
.order-det-table,
.order-info-form,
.order-det-info-form,
.button-group-form {
  width: 100%;
}
</style>