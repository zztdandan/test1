<template>
 <div class="wrapper">
    <avue-crud
      :data="data" :option="option"
      @search-change="searchChange"
      @row-save="rowSave"
      @row-update="rowUpdate"
      @row-del="rowDel"
    />
  </div>
</template>

<script>
export default {
   name: "ORDERENTER",
   components: {},
   props: {},
   data() {
      return {
         baseUrl: "//ORDERENTER",
         data: [],
         row: {},
         option: {
            column: []
            }
          };
        },
   computed: {},
   watch: {},
   created() {
      this.query();
        },
   methods: {
      callApi(method, url, data, done) {
       const self = this;
       this[
      "$$" + method
    ](url, data)
          .then(d => {
             typeof done === "function" && done();
             if (method === "get") {
                self.data = d;
      } else {
                self.query();
      }
    })
          .catch(err => self.alert(err));
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
       this.confirm("你确认要删除！？！","删除确认").then(() => {
          self.callApi("deleteJson", self.baseUrl + "/delete",
      [row]);
    });
  }
        }
      };
</script>
<style lang="scss" scoped>
.wrapper {}
</style>