<template>
  <div>
    <!-- <el-button class="mg1" size="mini" type="primary" @click="hConfirmAuth">确定授权</el-button> -->
    <act-man ref="act-man" :editable="false"></act-man>
  </div>
</template>
<script>
  import ActMan from "./ActMan";
  import * as CRUD from "./utils/CRUD";
  export default {
    name: "act-auth",
    components: { ActMan },
    props: {
      roleId: {
        default: null
      }
    },
    data: function() {
      return {};
    },
    created: function() {},
    mounted: function() {},
    methods: {
      hConfirmAuth: async function() {
        let actman = this.$refs["act-man"];
        let id = actman.getActSelection();
        let fullid = actman.getActAll();
        // debugger;
        let param = { fullIds: fullid, ids: id, roleId: this.roleId };
        await CRUD.setAuthAct(param);
      },
      hRefreshAuth: async function() {
        let list = await CRUD.queryAuthAct({ roleId: this.roleId });
        let actman = this.$refs["act-man"];
        actman.setSelection(list.select(x => x.id));
      }
    },
    watch: {
      roleId: {
        deep: true,
        handler: async function(newval, oldval) {
          if (newval) {
            // debugger;
            let list = await CRUD.queryAuthAct({ roleId: newval });
            let actman = this.$refs["act-man"];
            actman.setSelection(list.select(x => x.id));
          }
        }
      }
    }
  };
</script>
<style scoped>
.mg1 {
  margin: 1rem;
}
</style>