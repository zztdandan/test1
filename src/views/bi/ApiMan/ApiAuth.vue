<template>
  <div>
    <el-button size="mini" type="primary" @click="hConfirmAuth">确定授权</el-button>
    <api-man ref="api-man" :editable="false"></api-man>
  </div>
</template>
<script>
  import ApiMan from "./ApiMan";
  import * as CRUD from "./utils/CRUD";
  export default {
    name: "api-auth",
    components: { ApiMan },
    props: {
      roleId: {
        type: Number,
        default: null
      }
    },
    data: function() {
      return {};
    },
    created: function() {},
    mounted: function() {},
    methods: {
      hConfirmAuth:async function() {
        let selectKey = this.$refs["api-man"].getSelectKey();
        let fullKey = this.$refs["api-man"].getAllKey();
        let param = { roleId: this.roleId, fullIds: fullKey, ids: selectKey };
        let res=await CRUD.setAuthApi(param)
      }
    },
    watch: {
      roleId: {
        deep: true,
        handler: async function(newval, oldval) {
          if (newval) {
            // debugger;
            let list = await CRUD.queryAuthApi({ roleId: newval });
            let apiman = this.$refs["api-man"];
            apiman.setTreeKey(list);
          }
        }
      }
    }
  };
</script>
<style scoped>
</style>