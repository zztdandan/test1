<template>
  <lg-dashboard title="部门管理">
    <div class="flex-md">
      <div class="w33">
        <dept-select @dept-select="hHandleSelect"></dept-select>
      </div>
      <div class="w66">
        <avue-crud
          :data="deptManTList"
          :option="option"
          v-model="deptManData"
          @row-save="hdeptManSave"
          @row-update="hdeptManUpdate"
          @row-del="hdeptManDel"
        >
          <template slot="parentCodeForm">
            <el-tag>{{deptManData.parentCode}}</el-tag>
          </template>
        </avue-crud>
      </div>
    </div>
  </lg-dashboard>
</template>

<script>
  import LgDashboard from "@/components/LgDashboard/main";
  import deptManEntity from "./utils/deptManEntity.js";
  import DeptSelect from "./DeptSelect";
  import {
    pagiLazyMixin,
    pagiMixin,
    pagiClass,
    pagiPara
  } from "@/mixins/pagination";
  import * as CRUD from "./utils/CRUD";

  export default {
    name: "dept-man",
    components: { LgDashboard, DeptSelect },
    mixins: [],
    data: function() {
      return {
        deptManData: {},
        deptManTList: [],
        deptManSList: [],
        searchParams: {},
        option: {
          selection: false,
          refreshBtn: false,
          columnBtn: false,
          align: "center",
          menuAlign: "center",
          menuWidth: "240",
          column: deptManEntity
        }
      };
    },
    methods: {
      hHandleSelect(data) {
        let that_vue = this;
        async function doList() {
          let res = await CRUD.queryDeptLazy({ pcode: data.deptCode });
          debugger;
          that_vue.deptManTList = [data].concat(res);
        }
        doList();
      },
      hdeptManSave(data) {},
      hdeptManUpdate(data) {},
      hdeptManDel(data) {}
    }
  };
</script>

<style scoped>
.w33 {
  width: 33%;
}
.w66 {
  width: 66%;
}
</style>