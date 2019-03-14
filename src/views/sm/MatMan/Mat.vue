<template>
  <lg-dashboard>
    <avue-crud
      ref="resplan-crud"
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
      crudCompName: "resplan-crud",
      crudOption: {
        searchShow: true,
        column: [{ prop: "1", label: "2", search: true }]
      }
    };
  },

  methods: {
    doQuery: async function(curr, size) {
      alert(curr);
      alert(size);
      curr = curr || 1;
      size = size || 20;
      const page_para = new pagiPara(curr, size);
      //  得到分页数据
      try {
        const res = await CRUD.queryLazyresPlanMan(
          this.searchParams,
          page_para
        );

        const pagiRes = new pagiClass1(res);
        debugger;
        this.paginationSet(pagiRes.pageSize, pagiRes.totalRow);
        this.dataTList = pagiRes.list; // 分页
        // this.totalData = res;  //不分页
        this.$refs["resplan-crud"].selectClear();
        // this.skipPage();  //内部分页
      } catch (err) {
        console.log("doquery err", err);
      }
    },

    hSearch(params) {
      if (params.createDate) {
        params.startTime = params.createDate[0].substr(0, 8) + "000000";
        params.endTime = params.createDate[1].substr(0, 8) + "235959";
      }
      const a = JSON.parse(JSON.stringify(params));
      delete a.createDate;
      this.searchParams = a || {};
      this.doQuery();
    },

    searchReset(params) {
      this.search = {};
      // this.$message.success("清空回调");
    }
  }
};
</script>
