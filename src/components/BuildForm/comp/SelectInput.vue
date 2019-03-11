<template>
  <el-form-item :label="this.Info.label" :label-width="labelWidth">
    <el-select :size="this.size" v-model="input_value" placeholder="请选择" @change="handleChange">
      <el-option
        v-for="item in valueList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </el-form-item>
</template>

<script>
  export default {
     name: "select-input",
     props: {
        Info: {
           type: Object,
           default: {},
           required: true
        },
        size: {
           type: String,
           default: "medium"
        },
        value: {
           type: String,
           default: ""
        }
     },
     data: function() {
        // console.log("组件渲染开始 ");
        return {
           input_value: "",
           labelWidth: "5rem",
           valueList: [],
           full: true
           //格式:[{value:,label:},{value:,label:}]
        };
     },
     methods: {
        handleChange(value) {
           // 不去监视value防止重复工作，直接回调参数值
           this.$emit("update:value", { id: this.Info.id, value: value });
        }
     },
     watch: {
        value: function(newval, oldval) {
           if (newval) {
              this.input_value = newval.value;
           }
           // console.log("检测到输入数据的改动");
        }
     },
     created: function() {
        // 初始化一些变量
        this.readonly = this.Info.readonly ? true : false;
        this.labelWidth = this.Info.labelWidth ? this.Info.labelWidth : "5rem";
        this.input_value = this.input_value ? this.input_value : "";
        //设置数值列表
        this.valueList = this.Info.value_list;

        this.valueList = this.Info.value_list;
        if (this.value) {
           this.input_value = this.value;
        }
     }
  };
</script>

<style scoped>
.el-select {
   width: 100% !important;
}
</style>