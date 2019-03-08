<template>
  <el-form-item  label-width="0rem">
    <a @click="handleClick" class="button" :class="button_class">{{button_text}}</a>
  </el-form-item>
</template>

<script>
  export default {
    name: "button-input",
    props: {
      Info: {
        type: Object,
        default: {},
        required: true
      }
    },

    data: function() {
      // console.log("组件渲染开始 ");

      return {
        button_class: "",
        button_text: "确认",
        labelWidth: "5rem"
      };
    },
    watch: {},
    created: function() {
      if (this.Info.class) {
        this.button_class = this.Info.class;
      }
      if (this.Info.label) {
        this.button_text = this.Info.label;
      }
    },
    methods: {
      handleClick() {
        this.$emit("btnClick", this.Info.emit);
      }
    }
  };
</script>

<style scoped>
.button{
  width: 100%!important;
}
</style>