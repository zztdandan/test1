<template>
  <div class="fm-block">
    <making-form ref="fm-make" generate-json  preview>
      <template slot="action">
        <div class="button-group bg-1">
          <button class="button button-primary button-small button-rounded">生成crud-json</button>
          <button class="button button-primary button-small button-rounded">预览表单</button>
        </div>
      </template>
    </making-form>
  </div>
</template>
<script>
  import { GenerateForm, MakingForm } from "form-making";
  import "form-making/dist/FormMaking.css";
  export default {
     name: "form-making-page",
     components: {
        MakingForm
     },
     data: function() {
        return {};
     },
     created: function() {},
     mounted: function() {
        this.$refs["fm-make"].advanceComponents = [];
        this.$refs["fm-make"].layoutComponents = [];
     },
     methods: {},
     watch: {}
  };
</script>
<style>
.fm-block {
   width: 100%;
   height: 100%;
   position: absolute;
   top: 0px;
   left: 0px;
}
.bg-1 {
   margin-left: 0.5rem;
   width: 100%;
   height: 100%;
   display: flex;
   flex-direction: row;
   justify-content: flex-start;
   align-items: center;
}
main.el-main.config-content {
   padding: 0.2rem 0.5rem;
}
</style>