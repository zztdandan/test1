<template>
  <lg-dashboard title="Api管理">
    <div>
      <build-form
        ref="sf"
        :sync-data.sync="searchParams"
        :form-array="apiSFormSet"
        init-size="mini"
        @btn-s-click="hApiSearch"
      ></build-form>
    </div>
    <div class="flex-md">
      <div class="w33">
        <api-tree ref="api-tree" @api-select="hApiSelect"></api-tree>
      </div>
      <div class="w66">
        <avue-crud
          ref="api-crud"
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
        >
          <template slot="pidForm">
            <el-button size="mini" @click="hFormPidSelect">选择</el-button>
          </template>
          <template slot="menuLeft">
            <el-button size="mini" type="primary" @click="hOpenCpCreate">复制新增</el-button>
            <el-button size="mini" type="primary" @click="hOpenUpdate">编辑</el-button>
            <el-button size="mini" type="warning" @click="hDelList">删除选中</el-button>
          </template>
        </avue-crud>
      </div>
      <api-select-dialog ref="api-dialog" @api-confirm="hFormApiConfirm"></api-select-dialog>
    </div>
  </lg-dashboard>
</template>
<script>
  import "linqjs";
  import BuildForm from "@/components/BuildForm/main";
  import LgDashboard from "@/components/LgDashboard/main";
  import { list_to_tree } from "@/util/tree_convert";
  import ApiTree from "./ApiTree";
  import apiEntity from "./utils/apiEntity";
  import * as CRUD from "./utils/CRUD";
  import { topCrud } from "@/mixins/crudFunction";
  import ApiSelectDialog from "./ApiSelectDialog";
  import {
    pagiLazyMixin,
    pagiMixin,
    pagiClass,
    pagiPara
  } from "@/mixins/pagination";

  const formSet = [
    {
      type: "text",
      id: "subsys",
      label: "子系统",
      labelWidth: "4rem"
    },
    {
      type: "text",
      id: "submodule",
      label: "子模块",
      labelWidth: "4rem"
    },
    {
      type: "text",
      id: "apiname",
      label: "api名称",
      labelWidth: "4rem"
    },
    {
      type: "button",
      id: "btn_s",
      label: "搜索",
      class: "button button-primary button-small",
      emit: "btn-s-click"
    }
  ];

  export default {
    name: "api-man",
    components: { LgDashboard, ApiTree, ApiSelectDialog, BuildForm },
    mixins: [pagiMixin, topCrud],
    data: function() {
      return {
        apiSData: {},
        apiSFormSet: formSet,
        getEntity: apiEntity,
        createData: CRUD.createApi,
        updateData: CRUD.updateApi,
        deleteData: CRUD.deleteApi,
        crudCompName: "api-crud"
      };
    },
    created: async function() {},
    mounted: function() {},
    methods: {
      hApiSelect(entity, list) {
        // debugger;
        this.totalData = [entity].concat(list);
        this.skipPage();
      },
      hCloseDialog() {
        let that_vue = this;
        this.crudData = {};
        this.dataTList = [];
        this.doQuery();
      },
      hApiSearch() {
        this.doQuery();
      },
      doQuery: async function() {
        let res = await CRUD.queryApiTree(this.searchParams);
        this.$refs["api-tree"].setTree(res);
      },
      hFormPidSelect() {
        this.$refs["api-dialog"].hOpen();
      },
      hFormApiConfirm(text, entity) {
        this.crudData.parentName = entity.name;
        this.crudData.parentId = entity.id;
      }
    },
    watch: {}
  };
</script>
<style scoped>
</style>