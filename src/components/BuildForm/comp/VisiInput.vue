<template>

  <el-form-item style="display:none" :label="(this.long_label)?'':this.Info.label" :label-width="(this.long_label)?'0rem':labelWidth" >
    <div v-if="this.long_label" class="sub-title">{{this.Info.label}}</div>
    <el-input v-model="input_value" :name="this.Info.id" :readonly="this.Info.readonly">
      <template v-if="this.addon" slot="append">{{addon}}</template>
    </el-input>
  </el-form-item>

</template>

<script>
  //字符串形式

  export default {
    name: "visi-input",
    props: {
      Info: {
        type: Object,
        default: {},
        required: true
      },
      value: {}
    },

    data: function() {
      // console.log("组件渲染开始 ");
      return {
        input_value: this.value,
        labelWidth: "5rem",
        addon: null
      };
    },
    watch: {
      //手动实现与Props的同步
      input_value: function(newval, oldval) {
        // console.log("检测到内部input_value的改动");
        this.$emit("update:value", newval);
      },
      value: function(newval, oldval) {
        // console.log("检测到输入数据的改动");
        this.input_value = newval;
      }
    },
    computed: {
      //判断label是否过长
      long_label() {
        let label_length = parseInt(this.labelWidth);
        if (label_length > 6) {
          return true;
        } else {
          return false;
        }
      }
    },
    created: function() {
      let that_labelWidth = "";
      if (this.Info.labelWidth) {
        this.labelWidth = this.Info.labelWidth;
      } else {
        this.labelWidth = (this.Info.label.length+1)+"rem";
      }
      if (this.Info.addon) {
        this.addon = this.Info.addon;
      }
    }
  };
</script>

<style scoped>
.sub-title{
  text-align: center;
color: #606266;
    font-size: 1rem;

}
</style>


