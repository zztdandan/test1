<template>
  <div class="wrapper">
    <avue-crud
      :data="data"
      :option="option"
      @search-change="searchChange"
      @row-save="rowSave"
      @row-update="rowUpdate"
      @row-del="rowDel"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseUrl: "/sm/mat",
      addBtn: false,
      editBtn: false,
      delBtn: false,
      data: [],
      row: {},
      option: {
        column: [
          {
            type: "text",
            prop: "stockCode",
            label: "库区",
            search: true,
            labelWidth: "120"
          },
          {
            type: "text",
            prop: "matNo",
            label: "材料号",
            search: true,
            labelWidth: "120"
          },
          {
            type: "text",
            prop: "sgSing",
            label: "牌号",
            search: true,
            labelWidth: "120"
          },
          {
            type: "text",
            prop: "matThick",
            label: "厚度",
            search: true,
            labelWidth: "120"
          },
          {
            type: "text",
            prop: "matWidth",
            label: "宽度",
            labelWidth: "120"
          },
          {
            type: "text",
            prop: "matLength",
            label: "长度",
            labelWidth: "120"
          }
        ]
      }
    };
  },
  created() {
    this.query();
  },
  watch: {
    data(d) {
      this.page.total = d.length;
    }
  },
  methods: {
    async query() {
      this.data = await this.$$get(this.baseUrl + "/query", this.row);
    },
    searchChange(params) {
      this.row = params;
      this.query();
    },
    // add
    async rowSave(row, done, loading) {
      await this.$$post(this.baseUrl + "/create", row, done);
      // this.query();
    },
    async rowUpdate(row, index, done, loading) {
      this.$$put(this.baseUrl + "/update", row, done);
      // this.query();
    },
    async rowDel(row, index) {
      const self = this;
      this.$confirm("你确认要删除！？！", "删除确认").then(() => {
        self.$$deleteJson(self.baseUrl + "/delete", [row]).then(d => {
          this.query();
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
}
</style>
