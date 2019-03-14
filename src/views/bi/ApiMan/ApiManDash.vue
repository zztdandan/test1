<template>
  <lg-dashboard title="api管理">
    <api-man :editable="true"> </api-man>
  </lg-dashboard>
</template>
<script>
  import LgDashboard from "@/components/LgDashboard/main";
  import ApiMan from "./ApiMan";
  export default {
    name: "api-man-dash",
    components: { ApiMan, LgDashboard },
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