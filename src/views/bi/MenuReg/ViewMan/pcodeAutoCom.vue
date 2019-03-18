
<template>
  <el-autocomplete
    class="wd"
    name="pcode"
    v-model="data1"
    :fetch-suggestions="hQueryView"
    placeholder="请输入内容"
    @select="hSelect"
  ></el-autocomplete>
</template>

<script>
  import "linqjs";
  import * as viewCRUD from "../ViewMan/utils/CRUD";
  export default {
    name: "pcode-auto-com",
    data() {
      return {
        data1: ""
      };
    },
    methods: {
      hQueryView: async function(qString, cb) {
        try {
          if (qString && qString != "") {
            let res = await viewCRUD.queryViewFilter({
              code: qString,
              label: qString
            });

            cb(
              res.select(x => {
                return { value: x.id +","+x.code+ "," + x.label };
              })
            );
          } else {
            return cb([]);
          }
        } catch (error) {}
      },
      hSelect({ value }) {
        // debugger;
        let [id,code, name] = value.split(",");
        this.data1 = code;
        this.$emit("pcode-select", id,code, name);
      }
    }
  };
</script>
<style scoped>
.wd {
  width: 100%;
}
</style>
