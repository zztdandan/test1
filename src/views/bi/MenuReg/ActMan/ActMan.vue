<template>
  <lg-dashboard title="权限注册">
    <el-collapse :accordion="false" v-model="activeList">
      <el-collapse-item title="选择一个画面" name="1">
        <view-man :edit="false" @selection="hViewSelection"></view-man>
      </el-collapse-item>
      <el-collapse-item title="管理画面所属权限" name="2">
        <avue-crud
          ref="act-crud"
          :data="actListShown"
          :option="actOption"
          :page="tablePage"
          v-model="actData"
          @row-save="hactSave"
          @row-update="hactUpdate"
          :before-close="hCloseDialog"
          @refresh-change="hRefresh"
          @size-change="hSizeChange"
          @current-change="hCurrentChange"
          @search-change="hSearch"
          @selection-change="hSelectionChange"
        >
          <template slot="pcodeForm">
            <pcode-auto-com style="width:100%" @pcode-select="hpcodeSelect"></pcode-auto-com>
          </template>
          <template slot="menuLeft">
            <el-button size="mini" type="primary" @click="hOpenCpCreate">复制新增</el-button>
            <el-button size="mini" type="primary" @click="hOpenUpdate">编辑</el-button>
            <el-button size="mini" type="warning" @click="hactDelList">删除选中</el-button>
          </template>
        </avue-crud>
      </el-collapse-item>
    </el-collapse>
  </lg-dashboard>
</template>
<script>
  import ViewMan from "../ViewMan/ViewMan";
  import LgDashboard from "@/components/LgDashboard/main";
  import actEntity from "./utils/actEntity";
  import PcodeAutoCom from "./pcodeAutoCom.vue";
  import * as CRUD from "./utils/CRUD";
  import {
    pagiLazyMixin,
    pagiMixin,
    pagiClass,
    pagiPara
  } from "@/mixins/pagination";
  import { constants } from "fs";
  export default {
    name: "act-man",
    components: { LgDashboard, ViewMan, PcodeAutoCom },
    mixins: [pagiMixin],
    data: function() {
      return {
        activeList: ["1", "2"],
        actTList: [],
        actListShown: [],
        actData: {},
        actSelection: [],
        actOption: {
          menuType: "icon",
          align: "center",
          size: "mini",
          refreshBtn: false,
          columnBtn: false,
          selection: true,
          actBtn: false,
          editBtn: false,
          delBtn: false,
          menu: false,
          menuAlign: "center",
          column: []
        },
        searchParams: {}
      };
    },
    created: async function() {
      let set = await actEntity();
      this.$set(this.actOption, "column", set);
    },
    mounted: function() {},
    methods: {
      hpcodeSelect(code, name) {
        this.actData.pcode = code;
        this.actData.viewLabel = name;
      },
      hViewSelection(list) {
        if (list.length > 0) {
          this.searchParams = { code: list[0].code };
          this.doQuery();
        }
      },
      hOpenUpdate() {
        if (this.actSelection && this.actSelection.length > 0) {
          this.$refs["act-crud"].rowEdit(this.actSelection[0]);
        } else {
          this.$message("没有选择列");
        }
      },
      hOpenCpCreate() {
        if (this.actSelection && this.actSelection.length > 0) {
          this.$refs["act-crud"].rowAdd();
          this.actData = this.actSelection[0];
        } else {
          this.$message("没有选择列");
        }
      },
      hactSave: async function(data, index, done, loading) {
        try {
          await CRUD.createAct(data);
          done();
          this.doQuery();
        } catch (error) {
          done();
          console.log(error);
        }
      },
      hactUpdate: async function(data, index, done, loading) {
        try {
          await CRUD.updateAct(data);
          done();
          this.doQuery();
        } catch (error) {
          done();
          console.log(error);
        }
      },
      hactDel: async function(data) {},
      hactDelList: async function() {
        try {
          let a = await this.$confirm("确认删除", "提示", { type: "warning" });
          await CRUD.deleteAct(this.actSelection);
        } catch (err) {
          this.$message({ type: "info", message: "已取消删除" });
        }
      },
      hCloseDialog() {},
      hSearch(data) {
        this.searchParams = data || {};
        this.doQuery();
      },
      hSelectionChange(list) {
        this.actSelection = list;
      },
      doQuery: async function() {
        //  得到分页数据
        let res = await CRUD.queryAct(this.searchParams);
        this.totalData = res;
        this.skipPage();
      },
      skipPage() {
        this.actTList = this.calcShownData;
      }
    },
    watch: {}
  };
</script>
<style scoped>
.mg {
  margin: 1rem;
  width: 75vw;
}
</style>