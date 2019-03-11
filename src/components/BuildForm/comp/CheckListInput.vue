<template>
  <div>
    <el-checkbox v-if="showFull"
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
    >全选</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="input_value" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="item in valueList" :label="item" :key="item">{{item}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>
<script>
  export default {
     name: "check-list-input",
     props: {
        Info: {
           type: Object,
           default: "",
           required: true
        },
        value: {
           type: String,
           default: []
        }
     },
     components: {},
     data: function() {
        return {
           input_value: [],
           labelWidth: "5rem",
           valueList: [],
           showFull: false,
           checkAll:false,
           isIndeterminate:false
        };
     },
     created: function() {
        this.showFull = this.Info.showfull ? this.Info.showfull : false;
     },
     mounted: function() {},
     methods: {
        handleCheckAllChange(val) {
           this.input_value = val ? this.valueList : [];
        },
        handleCheckedCitiesChange(value) {
           let checkedCount = value.length;
           this.checkAll = checkedCount === this.cities.length;
           this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        }
     },
     watch: {}
  };
</script>
<style scoped>
</style>