<template>
  <el-form-item :label="this.Info.label">
    <el-date-picker
      :readonly="readonly"
      :size="this.size"
      v-model="input_value"
      type="datetime"
      placeholder="选择日期时间"
    ></el-date-picker>
  </el-form-item>
</template>

<script>
  //字符串形式
  import dayjs from "dayjs";
  export default {
     name: "date-input",
     props: {
        Info: {
           type: Object,
           default: {},
           required: true
        },
        value: {
           type: String,
           default: "",
           required: true
        },
        size: {
           type: String,
           default: "medium"
        }
     },

     data: function() {
        // console.log("组件渲染开始 ");
        return {
           input_value: this.value,
           labelWidth: "5rem",
           readonly: false
        };
     },
     watch: {
        //手动实现与Props的同步
        input_value: function(newval, oldval) {
           if (newval) {
              this.$emit("update:value", { id: this.Info.id, value: dayjs(newval).format("YYYY-MM-DD HH:mm:ss") });
           }
        },
        value: function(newval, oldval) {
           // console.log("检测到输入数据的改动");
           if (newval) {
              this.input_value = newval;
           }
        }
     },
     computed: {
        //判断label是否过长
        long_label() {
           try {
              let label_length = parseInt(this.labelWidth);
              if (label_length > 8) {
                 return true;
              } else {
                 return false;
              }
           } catch (e) {
              return false;
           }
        }
     },

     created: function() {       
        this.readonly = this.Info.readonly ? true : false;
        this.labelWidth = this.Info.labelWidth ? this.Info.labelWidth : "5rem";
         this.input_value = this.input_value ? this.input_value : "";
        if (this.value) {
           this.input_value = value;
        }
     }
  };
</script>

<style scoped>
.sub-title {
   text-align: center;
   color: #606266;
   font-size: 1rem;
}
.el-date-picker {
   width: 100% !important;
}
</style>


