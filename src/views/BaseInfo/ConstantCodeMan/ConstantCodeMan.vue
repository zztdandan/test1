<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="代码大类" name="class">
        <code-class-man @code-class-change="hChangeCodeClass"></code-class-man>
      </el-tab-pane>
      <el-tab-pane label="代码常量" name="item">
        <code-item-man ref="code-item" :codeClass="codeClassSelection"></code-item-man>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import codeClassMan from "./codeClassMan.vue";
  import codeItemMan from "./codeItemMan";
  export default {
     name: "constant-code-man",
     components: {
        codeClassMan,
        codeItemMan
     },
     data: function() {
        return {
           activeName: "class",
           codeClassSelection: ""
        };
     },
     created: function() {},
     methods: {
        hChangeCodeClass(data) {
           try {
              this.codeClassSelection = data.code;
           } catch (error) {
              console.log("hChangeCodeClass", error);
           }
        }
     },
     watch: {}
  };
</script>
<style scoped>
</style>