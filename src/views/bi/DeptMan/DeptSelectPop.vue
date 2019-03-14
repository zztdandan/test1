<template>
  <el-popover placement="left" title="选择部门" width="300" trigger="click">
    <span slot="reference" class="moon-search mr-1 hv"></span>
    <div class="flex-column">
      <el-input readonly v-model="deptName"></el-input>
      <el-button @click="hDeptConfirm" type="primary" size="small">确认</el-button>
    </div>
    <dept-select @dept-select="hDeptSelect"></dept-select>
  </el-popover>
</template>
<script>
  import DeptSelect from "./DeptSelect";
  export default {
     name: "name",
     components: { DeptSelect },
     data: function() {
        return {
           deptName: "",
           deptData: {}
        };
     },
     created: function() {},
     mounted: function() {},
     methods: {
        hDeptSelect(data) {
           this.deptName = data.name;
           this.deptData = data;
        },
        hDeptConfirm() {
           this.$emit("dept-confirm", this.deptData);
        }
     },
     watch: {}
  };
</script>
<style scoped>
.hv:hover {
   cursor: pointer;
}
.mr-1 {
   margin-right: 0.3rem;
}
</style>