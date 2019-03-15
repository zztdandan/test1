<template>
  <lg-dashboard>
    <el-collapse :accordion="false" v-model="activeList">
      <el-collapse-item title="选择一个View" name="1">
        <view-man :edit="false" @selection="hViewSelection"></view-man>
      </el-collapse-item>
      <el-collapse-item title="所属权限" name="2">
        <avue-crud
          ref="act-crud"
          :data="actTList"
          :option="actOption"
          :page="tablePage"
          v-model="actData"
          @row-save="hActSave"
          @row-update="hActUpdate"
          :before-close="hCloseDialog"
          @size-change="hSizeChange"
          @current-change="hCurrentChange"
          @search-change="hSearch"
          @selection-change="hSelectionChange"
        >
          <template slot="pcodeForm">
            <pcode-auto-com style="width:100%" @pcode-select="hpcodeSelect"></pcode-auto-com>
          </template>
          <template v-if="editable" slot="menuLeft">
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
  import PcodeAutoCom from "../ViewMan/pcodeAutoCom.vue";
  import * as CRUD from "./utils/CRUD";
  import {
    pagiLazyMixin,
    pagiMixin,
    pagiClass,
    pagiPara
  } from "@/mixins/pagination";
  export default {
    name: "act-man",
    components: { LgDashboard, ViewMan, PcodeAutoCom },
    mixins: [pagiMixin],
    props: {
      editable: {
        type: Boolean,
        default: true
      }
    },
    data: function() {
      return {
        activeList: ["1", "2"],
        actTList: [],
        actData: {},
        actSelection: [],
        actOption: {
          menuType: "icon",
          align: "center",
          size: "mini",
          refreshBtn: false,
          columnBtn: false,
          selection: true,
          addBtn: true,
          selectClearBtn: false,
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
      this.toggleEditable(this.editable);
    },
    mounted: function() {},
    methods: {
      hpcodeSelect(id, code, name) {
        this.actData.viewId = id;
        this.actData.pcode = code;
        this.actData.viewName = name;
      },
      hViewSelection(list) {
        if (list.length > 0) {
          // 使用viewCode查询
          this.searchParams = { viewCode: list[0].code };
          this.activeList = ["2"];
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
      hActSave: async function(data, index, done, loading) {
        try {
          await CRUD.createAct(data);
          done();
          this.doQuery();
        } catch (error) {
          done();
          console.log(error);
        }
      },
      hActUpdate: async function(data, index, done, loading) {
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
        debugger;
        this.tablePage.total = this.totalData.length;
        this.actTList = this.calcShownData;
      },
      toggleEditable(flag) {
        this.actOption.addBtn = flag;
      },
      getActSelection() {
        let tmp_list = [].concat(this.actSelection).select(x => x.id);
        return tmp_list;
      },
      getActAll() {
        let all_list = [].concat(this.actTList).select(x => x.id);
        return all_list;
      },
      setSelection(list) {
        let that_vue = this;
        that_vue.$refs["act-crud"].$children[3].clearSelection();
        that_vue.$nextTick(function() {
          for (let element of list) {
            // debugger;
            let entity = that_vue.actTList.find(x => x.id == element);
            that_vue.$refs["act-crud"].$children[3].toggleRowSelection(entity);
          }
        });
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