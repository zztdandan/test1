<template>
  <div class="wrapper">
    <avue-crud
      :data="data"
      :page="page"
      :option="option"
      @search-change="searchChange"
      @row-save="rowSave"
      @row-update="rowUpdate"
      @row-del="rowDel"
      @current-change="handlePage"
    />
  </div>
</template>

<script>
import * as CRUD from "./utils/CRUD";
import {
  pagiLazyMixin,
  pagiMixin,
  pagiClass,
  pagiClass1,
  pagiPara
} from "@/mixins/pagination";

export default {
  mixins: [pagiLazyMixin],
  data() {
    return {
      baseUrl: "/sm/mat",
      addBtn: false,
      editBtn: false,
      delBtn: false,
      page: {
        total: 0,
        totalRow: 0
      },
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
      },
      searchParams: {}
    };
  },
  created() {
    this.doQuery(1, 20);
  },
  methods: {
    async query() {
      // const self = this;
      const res = await this.$$get(this.baseUrl + "/page", {
        mat: this.row,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      });
      const pagiRes = new pagiClass(res);
      console.log(pagiRes);
      this.paginationSet(pagiRes.pageSize, pagiRes.totalRow);
      this.data = pagiRes.list; // 分页
      // this.totalData = res;  //不分页

      // this.skipPage();  //内部分页
    },
    async handlePage(page) {
      console.log(page);
      this.data = await this.$$get(this.baseUrl + "/page", {
        mat: this.row,
        pageNumber: page,
        pageSize: this.pageSize
      }).then(res => {
        const pagiRes = new pagiClass1(res);
        // debugger;
        this.paginationSet(
          pagiRes.pageSize,
          pagiRes.totalRow,
          pagiRes.pageNumber
        );
        this.data = pagiRes.list;
      });
      console.log(this.data);
    },
    hSearch(data) {
      this.searchParams = data || {};
      this.doQuery();
    },
    doQuery: async function(curr, size) {
      // debugger;
      curr = curr || 1;
      size = size || 20;
      const page_para = new pagiPara(curr, size);
      //  得到分页数据
      const res = await CRUD.queryViewLazy(this.searchParams, page_para);
      const pagiRes = new pagiClass1(res);
      // debugger;
      this.paginationSet(
        pagiRes.pageSize,
        pagiRes.totalRow,
        pagiRes.pageNumber
      );
      this.ViewTList = pagiRes.list;
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
