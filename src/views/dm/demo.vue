<template>
  <div class="wrapper">
    <avue-crud
      :option="option"
      :data="data"
      @filter-change="filterChange"
    ></avue-crud>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          text1: "内容1-1",
          text2: "内容1-2"
        },
        {
          text1: "内容2-1",
          text2: "内容2-2"
        }
      ],
      option: {
        align: "center",
        addBtn: false,
        menu: false,
        column: [
          {
            label: "列内容1",
            prop: "text1"
          },
          {
            label: "列内容2",
            prop: "text2"
          }
        ]
      }
    };
  },
  methods: {
    filterChange(result) {
      this.$message.success("过滤器" + JSON.stringify(result));
    }
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
}
</style>