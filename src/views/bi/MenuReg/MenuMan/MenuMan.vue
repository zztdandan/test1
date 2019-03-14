<template>
  <lg-dashboard>
    <template slot="title">菜单管理</template>
    <div class="flex-md">
      <div class="flex-item-8 main-height">
        <menu-tree ref="menu-tree" @menu-select="hMenuSelect"></menu-tree>
        <!-- 加载菜单树 -->
      </div>
      <div class="flex-item-16 main-height">
        <avue-crud
          ref="menu-crud"
          :data="dataTList"
          :option="crudOption"
          :page="tablePage"
          v-model="crudData"
          @row-save="hSave"
          @row-update="hUpdate"
          :row-class-name="colorful1stRow"
          :before-close="hCloseDialog"
          @size-change="hSizeChange"
          @current-change="hCurrentChange"
          @selection-change="hSelectionChange"
        >
          <template slot="pcodeForm">
            <pcode-auto-com style="width:100%" @pcode-select="hFormPcodeSelect"></pcode-auto-com>
          </template>
          <template slot="parentForm">
            <el-button size="mini" @click="hFormOpenMenuSelect">选择</el-button>
          </template>
          <template slot="menuLeft">
            <el-button size="mini" type="primary" @click="hOpenCpCreate">复制新增</el-button>
            <el-button size="mini" type="primary" @click="hOpenUpdate">编辑</el-button>
            <el-button size="mini" type="warning" @click="hDelList">删除选中</el-button>
          </template>
        </avue-crud>
        <menu-select-dialog ref="menu-dialog" @menu-confirm="hFormMenuConfirm"></menu-select-dialog>
      </div>
    </div>
  </lg-dashboard>
</template>
<script>
  import "linqjs";
  import LgDashboard from "@/components/LgDashboard/main";
  import { list_to_tree } from "@/util/tree_convert";
  import menuEntity from "./utils/menuEntity";
  import * as CRUD from "./utils/CRUD";
  import PcodeAutoCom from "../ViewMan/pcodeAutoCom.vue";
  import MenuTree from "./MenuTree";
  import MenuSelectDialog from "./MenuSelectDialog";
  import { topCrud } from "@/mixins/crudFunction";
  import {
    pagiLazyMixin,
    pagiMixin,
    pagiClass,
    pagiPara
  } from "@/mixins/pagination";
  export default {
    name: "menu-man",
    components: {
      MenuTree,
      LgDashboard,
      PcodeAutoCom,
      MenuSelectDialog
      //   BuildForm
    },
    mixins: [pagiMixin, topCrud],
    data: function() {
      return {
        getEntity: menuEntity,
        createData: CRUD.createMenu,
        updateData: CRUD.updateMenu,
        deleteData: CRUD.deleteMenu,
        crudCompName: "menu-crud",
        mainMenuList: []
      };
    },

    created: async function() {
      //  debugger;
      let that_vue = this;
      let res = await CRUD.queryMenu({});
      this.mainMenuList = res;
    },
    methods: {
      hMenuSelect(label, entity) {
        this.sMenuLabel = label;
        this.sMenuEntity = entity;
        this.showSelectedMenu(entity);
      },

      showSelectedMenu(entity) {
        let tmp_arr = [].concat(this.mainMenuList);
        this.totalData = tmp_arr.where(x => x.parentId == entity.id);
        this.totalData.unshift(entity);
        // debugger;
        this.skipPage();
      },
      hCloseDialog() {
        let that_vue = this;
        this.crudData = {};
        this.$refs["menu-tree"].hRefresh();
        CRUD.queryMenu({}).then(res => {
          that_vue.mainMenuList = res;
          // that_vue.hRefreshList();
        });
      },
      hFormPcodeSelect(id,code, name) {
          this.crudData.viewId = id;
        this.crudData.pcode = code;
        this.crudData.viewLabel = name;
      },
      hFormOpenMenuSelect() {
        this.$refs["menu-dialog"].hOpen();
      },
      hFormMenuConfirm(text, entity) {
        this.crudData.parentName = entity.name;
        this.crudData.parentId = entity.id;
      },
      colorful1stRow({ row, rowIndex }) {
        // debugger
        if (rowIndex == 0) {
          return "color-row";
        } else {
          return "";
        }
      }
    }
  };
</script>
<style scoped>
.flex-item-8 {
  width: 33.3%;
}
.flex-item-16 {
  width: 66.6%;
}
</style>
<style>
.color-row {
  background-color: #ffdfdf !important;
}
</style>
