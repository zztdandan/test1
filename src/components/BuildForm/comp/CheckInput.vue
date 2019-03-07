<template>

  <el-form-item
    :label="this.Info.label"
    :label-width="labelWidth"
  >
    <el-switch
      :size="this.size"
      v-model="input_value"
      active-color="#13ce66"
      inactive-color="#ff4949"
      :disabled="this.Info.readonly"
    >
    </el-switch>
  </el-form-item>
</template>

<script>
  export default {
    name: "check-input",
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
        type: Boolean,
        default: true
      }
    },

    data: function() {
      // console.log("组件渲染开始 ");

      return {
        input_value: true,
        labelWidth: "5rem"
      };
    },
    watch: {
      //手动实现与Props的同步
      input_value: function(newval, oldval) {
        // console.log("检测到内部input_value的改动");
        if (newval) {
          this.$emit("update:value", { id: this.Info.id, value: newval });
        }
      },
      value: function(newval, oldval) {
        // console.log("检测到输入数据的改动");
        if (newval) {
          this.input_value = newval;
        }
      }
    },
    created: function() {
         // 初始化一些变量
        this.readonly = this.Info.readonly ? true : false;
        this.labelWidth = this.Info.labelWidth ? this.Info.labelWidth : "5rem";
 this.input_value = this.value ? this.value : "";
    }
  };
</script>

<style scoped>
</style>