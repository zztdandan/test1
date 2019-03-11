<template>
  <lg-dashboard>
    <template slot="title">菜单管理</template>

    <div class="flex-column">
      <div class="flex-item-8 main-height">
        <menu-tree ref="menu-tree" @menu-select="hMenuSelect"></menu-tree>
        <!-- 加载菜单树 -->
      </div>
      <div class="flex-item-16 main-height">
        <avue-crud
          :data="menuTList"
          :option="MenuOption"
          :page="tablePage"
          v-model="MenuData"
          @row-save="hMenuSave"
          @row-update="hMenuUpdate"
          :before-close="hCloseDialog"
          @refresh-change="hRefresh"
          @size-change="hSizeChange"
          @current-change="hCurrentChange"
          @search-change="hSearch"
          @selection-change="hSelectionChange"
        ></avue-crud>
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
  import MenuTree from "./MenuTree";
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
      LgDashboard
      //   BuildForm
    },
    mixins: [pagiMixin],
    data: function() {
      //  将MenuDef转化为数组

      return {
        mainMenuList: [],
        menuTList: [],
        MenuData: {},
        sMenuLabel: "",
        sMenuEntity: {}
      };
    },

    created: async function() {
      //  debugger;
      let that_vue = this;
      let res = await CRUD.queryMenu({});
      this.totalData = res;
      this.skipPage();
    },
    methods: {
      hMenuSelect(label, entity) {
        this.sMenuLabel = label;
        this.sMenuEntity = entity;
        this.hRefreshList(entity);
      },
      hRefreshList(entity) {
        let tmp_arr = [].concat(this.mainMenuList);
        this.menuList = tmp_arr.where(x => x.parentId == entity.id);
      },
      hCloseDialog() {},
      skipPage() {
        this.menuTList = this.calcShownData;
      },
      hMenuSave: async function(data, index, done, loading) {
        try {
          await CRUD.createMenu(data);
          done();
          this.doQuery();
        } catch (error) {
          done();
          console.log(error);
        }
      },
      hMenuUpdate: async function(data, index, done, loading) {
        try {
          await CRUD.updateMenu(data);
          done();
          this.doQuery();
        } catch (error) {
          done();
          console.log(error);
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