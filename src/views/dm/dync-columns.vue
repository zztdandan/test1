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
  name: "DyncColumns",
  components: {},
  props: {},
  data() {
    return {
      // path: this.$route.path,
      baseUrl: "/dm/user",
      data: [],
      row: {},
      option: {
        column: []
      }
    };
  },
  watch: {
    "this.$route.path": {
      handler(path, oldName) {
        path = path || this.$route.path;
        console.log("path changed2222", path);
        if (path && path.indexOf("/dm/user/column") === 0) {
          this.initColumn(path);
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    // this.initColumn();
    this.query();
  },
  methods: {
    callApi(method, url, data, done) {
      const self = this;
      this["$$" + method](url, data)
        .then(d => {
          typeof done === "function" && done();
          if (method === "get") {
            self.data = d;
          } else {
            self.query();
          }
        })
        .catch(err => self.$alert(err));
    },
    initColumn(path) {
      const self = this;
      this.$$get(path).then(d => {
        const data = [];
        Object.keys(d).forEach(k => data.push({ prop: k, label: d[k] }));
        self.option.column = data;
      });
    },
    query() {
      this.callApi("get", this.baseUrl + "/query", this.row);
    },
    searchChange(params) {
      this.row = params;
      this.query();
    },
    // add
    rowSave(row, done, loading) {
      this.callApi("post", this.baseUrl + "/create", row, done);
    },
    rowUpdate(row, index, done, loading) {
      this.callApi("put", this.baseUrl + "/update", row, done);
    },
    rowDel(row, index) {
      const self = this;
      this.$confirm("你确认要删除！？！", "删除确认").then(() => {
        self.callApi("deleteJson", self.baseUrl + "/delete", [row]);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
}
</style>
