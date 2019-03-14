<template>
  <div>
    <api-man :editable="false"></api-man>
  </div>
</template>
<script>
  import ApiMan from "./ApiMan";
  export default {
    name: "api-auth",
    components: { ApiMan },
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