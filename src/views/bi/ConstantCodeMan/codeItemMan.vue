
<template>
  <lg-dashboard>
    <avue-crud
      ref="item-crud"
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
      <template slot="menuLeft">
        <el-button size="mini" type="primary" @click="hOpenCpCreate">复制新增</el-button>
        <el-button size="mini" type="primary" @click="hOpenUpdate">编辑</el-button>
        <el-button size="mini" type="warning" @click="hDelList">删除选中</el-button>
      </template>
    </avue-crud>
  </lg-dashboard>
</template>


<script>
  import LgDashboard from "@/components/LgDashboard/main";
  import codeItemEntity from "./utils/codeItemEntity.js";
  import { topCrud } from "@/mixins/crudFunction";
  import {
    pagiLazyMixin,
    pagiMixin,
    pagiClass,
    pagiPara
  } from "@/mixins/pagination";
  import * as CRUD from "./utils/CRUD";

  export default {
    name: "code-item-man",
    components: { LgDashboard },
    mixins: [pagiMixin, topCrud],
    props: {
      codeClass: {
        type: String,
        default: ""
      },
      editable: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        getEntity: codeItemEntity,
        createData: CRUD.createCodeItem,
        updateData: CRUD.updateCodeItem,
        deleteData: CRUD.deleteCodeItem,
        crudCompName: "item-crud",
      };
    },
    created: async function() {
      this.toggleEditable(this.editable);
    },
    methods: {
      hCloseDialog() {
        this.doQuery();
      },
      doQuery: async function() {
        let res = await CRUD.queryCodeItem(this.searchParams);
        this.totalData = res;
        this.skipPage();
      },
      toggleEditable(flag) {}
    },
    watch: {
      //如果codeclass做更改，直接查询后台
      codeClass: {
        deep: true,
        handler: function(newval, oldval) {
          this.searchParams.classcode = newval;
          this.doQuery();
        }
      }
    }
  };
</script>

