<template>
  <div>
    <el-collapse v-model="activeList">
      <el-collapse-item title="代码大类" name="class">
        <code-class-man @code-class-change="hChangeCodeClass"></code-class-man>
      </el-collapse-item>
      <el-collapse-item title="代码常量" name="item">
        <code-item-man ref="code-item" :codeClass="codeClassSelection"></code-item-man>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
  import codeClassMan from "./codeClassMan";
  import codeItemMan from "./codeItemMan";
  export default {
     name: "constant-code-man",
     components: {
        codeClassMan,
        codeItemMan
     },
     data: function() {
        return {
           activeList: ["class", "item"],
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