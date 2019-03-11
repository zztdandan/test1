<template>
  <lg-dashboard title="画面资源管理">
    <view-man :edit="true"></view-man>
  </lg-dashboard>
</template>
<script>
  import LgDashboard from "@/components/LgDashboard/main";

  import ViewMan from "./ViewMan";
  export default {
    name: "view-man-dash",
    components: { ViewMan, LgDashboard },
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
</style>