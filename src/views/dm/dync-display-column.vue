<template>
  <div class="wrapper">
    <avue-form
      :option="option"
      ref="form"
      v-model="form"
    ></avue-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        text1: 0,
        text2: "文本2"
      },
      option: {
        column: [
          {
            label: "内容1",
            prop: "text1",
            type: "radio",
            dicData: [
              {
                label: "隐藏",
                value: 0
              },
              {
                label: "显示",
                value: 1
              }
            ]
          },
          {
            label: "内容2",
            prop: "text2",
            display: true
          }
        ]
      }
    };
  },
  watch: {
    "form.text1"() {
      const column = this.option.column[1];
      column.display = this.form.text1 === 0;
    }
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
}
</style>
