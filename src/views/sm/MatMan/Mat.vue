<template>
  <lg-dashboard>
    <avue-crud
      ref="mat-crud"
      :data="dataTList"
      :option="crudOption"
      :page="tablePage"
      v-model="crudData"
      @row-save="hSave"
      @row-update="hUpdate"
      :before-close="hCloseDialog"
      @size-change="hSizeChange"
      @current-change="hCurrentChange"
      @selection-change="hSelectionChange"
      @search-change="hSearch"
      @search-reset="searchReset"
    >
      <template slot="menuLeft">
        <el-button
          size="mini"
          type="primary"
          @click="hOpenCpCreate"
        >复制新增</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="hOpenUpdate"
        >编辑</el-button>
        <el-button
          size="mini"
          type="warning"
          @click="hDelList"
        >删除选中</el-button>
      </template>
      <!-- 暂时不做资源计划绑定，做资源计划绑定 -->
      <!-- <template slot-scope="scope" slot="menu">
        <el-button size="small">绑定资源计划</el-button>
      </template>-->
    </avue-crud>
  </lg-dashboard>
</template>

<script>
import getRep from "./utils/viewEntity.js";
import LgDashboard from "@/components/LgDashboard/main";
import {
  pagiLazyMixin,
  pagiMixin,
  pagiClass,
  pagiClass1,
  pagiPara
} from "@/mixins/pagination";
import { topCrud } from "@/mixins/crudFunction";

import * as CRUD from "./utils/CRUD";
export default {
  name: "ResPlan",
  components: { LgDashboard },
  mixins: [pagiLazyMixin, topCrud],
  data() {
    return {
      getEntity: getRep,
      createData: CRUD.createresPlanMan,
      updateData: CRUD.updateresPlanMan,
      deleteData: CRUD.deleteresPlanMan,
      crudCompName: "mat-crud",
      crudOption: {
        searchShow: true,
        column: [{ prop: "1", label: "2", search: true }]
      },
      row: {},
      searchParams: {}
    };
  },

  methods: {
    doQuery: async function(curr, size) {
      curr = curr || 1;
      size = size || 20;
      // pagiPara(curr, size, para, orderby, desc)  //当前页，每页条数，条件参数,排序参数，排序方式
      const page_para = new pagiPara(curr, size, this.row);
      //  得到分页数据
      try {
        const res = await CRUD.queryLazyresPlanMan(
          this.searchParams, // 传入查询参数
          page_para
        );

        const pagiRes = new pagiClass1(res);
        debugger;
        this.paginationSet(
          pagiRes.pageSize,
          pagiRes.totalRow,
          pagiRes.pageNumber
        );
        this.dataTList = pagiRes.list; // 分页
        // this.totalData = res;  //不分页
        this.$refs["mat-crud"].selectClear();
        // this.skipPage();  //内部分页
      } catch (err) {
        console.log("doquery err", err);
      }
    },

    hSearch(params) {
      // 将查询条件赋值给row
      this.row = params;
      // if (params.createDate) {
      //   params.startTime = params.createDate[0].substr(0, 8) + "000000";
      //   params.endTime = params.createDate[1].substr(0, 8) + "235959";
      // }
      // if (params.matNo) {
      params["startTime"] = "20190101000000";
      params["endTime"] = dayjs().format("YYYYMMDD") + "235959";
      // }
      const a = JSON.parse(JSON.stringify(params));
      // delete a.matNo; //删除json中不需要的key
      this.searchParams = a || {}; // 将查询参数赋值给 searchParams

      this.doQuery();
    },

    searchReset(params) {
      this.search = {};
      // this.$message.success("清空回调");
    }
  }
};
</script>
