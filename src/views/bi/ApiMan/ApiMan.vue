<template>
  <div>
    <avue-form ref="sf" :option="apiSFormSet" v-model="searchParams">
      <template slot="sbtn">
        <a class="button button-primary button-block button-small" @click="hApiSearch">搜索</a>
      </template>
    </avue-form>

    <div class="flex-md">
      <div :class="treeClass">
        <api-tree
          ref="api-tree"
          :editable="this.editable"
          @api-select="hApiSelect"
          @api-click="hApiClick"
        ></api-tree>
      </div>
      <div v-if="this.editable!=true" class="w50">
        <avue-form ref="apiform" v-model="selectedApi" :option="showOption"></avue-form>
      </div>
      <div v-if="this.editable==true" class="w66">
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
            <el-button size="mini" @click="hFormPidSelect">选择父级画面</el-button>
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
  </div>
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
  const formSet1 = {
    size: "mini",
    menuBtn: false,
    column: [
      {
        type: "text",
        label: "子系统",
        prop: "subsys",
        labelWidth: "60",
        span: 12
      },
      {
        type: "text",
        label: "子模块",
        prop: "submodule",
        labelWidth: "60",
        span: 12
      },
      {
        type: "text",
        label: "api名称",
        prop: "apiname",
        labelWidth: "60",
        span: 12
      },
      {
        label: "",
        labelWidth: "1",
        prop: "sbtn",
        formslot: true,
        labelWidth: "60",
        span: 12
      }
    ]
  };
  export default {
    name: "api-man",
    props: {
      editable: {
        type: Boolean,
        default: true
      }
    },
    components: { LgDashboard, ApiTree, ApiSelectDialog, BuildForm },
    mixins: [pagiMixin, topCrud],
    data: function() {
      return {
        treeClass: "w33",
        apiSData: {},
        apiSFormSet: formSet1,
        getEntity: apiEntity,
        createData: CRUD.createApi,
        updateData: CRUD.updateApi,
        deleteData: CRUD.deleteApi,
        crudCompName: "api-crud",
        selectedApi: {},
        showOption: {
          readonly: true,
          column: [],
          menuBtn: false,
          submitBtn: false
        }
      };
    },
    created: async function() {
      this.toggleEditable(this.editable);
      this.showOption.column = await apiEntity();
    },
    mounted: function() {},
    methods: {
      toggleEditable(flag) {
        if (flag) {
          this.treeClass = "w33";
        } else {
          this.treeClass = "w50";
        }
      },
      hApiSelect(entity, list) {
        // debugger;
        this.totalData = [entity].concat(list);
        this.skipPage();
      },
      hApiClick(entity) {
        // debugger
        let that_vue = this;
        let tmp_entity = JSON.parse(JSON.stringify(entity));
        if (this.editable === false) {
          // this.$set(this, "selectedApi", tmp_entity);
          this.$refs["apiform"].form = {};
          this.$nextTick(function() {
            that_vue.$refs["apiform"].form = tmp_entity;
          });
          // this.$set(this.selectedApi, "id", entity.id);
        }
      },
      hCloseDialog() {
        let that_vue = this;
        this.crudData = {};
        this.dataTList = [];
        this.doQuery();
      },
      hApiSearch() {
        // debugger;
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
      },
      setTreeKey(list) {
        // debugger;
        this.$refs["api-tree"].setTreeKey(list);
      },
      getSelectKey() {
        return this.$refs["api-tree"].getSelectKey();
      },
      getAllKey() {
        return this.$refs["api-tree"].getAllKey();
      }
    },
    watch: {}
  };
</script>
<style scoped>
</style>