<template>
  <el-form-item
    :label="(this.long_label)?'':this.Info.label"
    :label-width="(this.long_label)?'0rem':labelWidth"
  >
    <div v-if="this.long_label" class="sub-title">{{this.Info.label}}</div>
    <el-input
      v-model="input_value"
      :size="this.size"
      :name="this.Info.id"
      :readonly="this.readonly"
      @change="handleChange"
    >
      <template slot="suffix">
        <slot :name="append"></slot>
      </template>
    </el-input>
  </el-form-item>
</template>

<script>
  //字符串形式

  export default {
     name: "append-text-input",
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
           type: [String, Number],
           default: "",
           required: true
        }
     },
     methods: {
        // 用这个函数向上级返回值，不通过input_value，不进行监视
        handleChange(value) {
           this.$emit("update:value", { id: this.Info.id, value: value });
        }
     },
     data: function() {
        // console.log("组件渲染开始 ");
        return {
           input_value: "",
           labelWidth: "5rem",
           append: "defalut_name",
           readonly: false,
           addon: ""
        };
     },
     watch: {
        value: {
           handler: function(n, o) {
              if (n) {
                 this.input_value = n;
              }
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
        // 初始化一些变量
        this.append = this.Info.append ? this.Info.append : "defalut-append";
        this.readonly = this.Info.readonly ? true : false;
        this.labelWidth = this.Info.labelWidth ? this.Info.labelWidth : "5rem";
        this.input_value = this.value ? this.input_value : "";
     }
  };
</script>

<style scoped>
.sub-title {
   text-align: center;
   color: #606266;
   font-size: 1rem;
}
</style>


