<template>
  <basic-container>
    <avue-crud :option="option" :page="page" :data="data" ref="crud1">
      <template slot-scope="scope" slot="menuLeft">
        <el-button
          type="primary"
          icon="moon-plus"
          size="small"
          plain
          @click="handleDialog('add')"
        >新增</el-button>
      </template>
    </avue-crud>

    <el-dialog
      title
      :visible.sync="dialog.visible"
      width="80%"
      :fullscreen="true"
      :before-close="handleClose"
    >
      <div>
        <avue-form :option="dialog.formOption" v-model="dialog.form"></avue-form>
        
        <el-checkbox-group v-model="steelGradeCL"></el-checkbox-group>
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="steelGradeCheckAll"
          @change="steelGradeHandleCheckAllChange"
        >全选</el-checkbox>
        <el-checkbox-group v-model="specCL"></el-checkbox-group>
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="specCheckAll"
          @change="specHandleCheckAllChange"
        >全选</el-checkbox>
        <el-checkbox-group v-model="provinceCL"></el-checkbox-group>
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="provinceCheckAll"
          @change="provinceHandleCheckAllChange"
        >全选</el-checkbox>
        <el-checkbox-group v-model="cityCL"></el-checkbox-group>
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="cityCheckAll"
          @change="cityHandleCheckAllChange"
        >全选</el-checkbox>
      </div>
    </el-dialog>
  </basic-container>
</template>

<script>

export default {
  data() {
    return {
      market_date: false,
      dialog: {
        visible: false,
        form: { prodCategories: "" },
        formOption: {
          labelWidth: 100,
          emptyBtn: false,
          submitBtn: false,
          column: [
            {
              label: "产品大类",
              prop: "prodCategories",
              type: "select",
              props: {
                label: "prodCategories",
                value: "id"
              },
              dicUrl: "/bd/product-categories/query",
              rules: [
                {
                  required: true,
                  message: "请选择产品大类 ",
                  trigger: "blur"
                }
              ]
            }
          ]
        }
      },

      page: {
        total: 0
      },
      data: [],
      option: {
        addBtn: false,
        editBtn: false,
        index: true,
        indexLabel: "序号",
        column: [
          {
            label: "产品大类",
            prop: "productCategories",
            span: 14,
            row: true
          },
          {
            label: "产品名称",
            prop: "productName",
            span: 14,
            row: true
          },
          {
            label: "牌号",
            prop: "steelGrade",
            span: 14,
            row: true
          },
          {
            label: "规格",
            prop: "specifications",
            span: 14,
            row: true
          },
          {
            label: "省份",
            prop: "province",
            span: 14,
            row: true
          },
          {
            label: "市区",
            prop: "city",
            span: 14,
            row: true
          },
          {
            label: "倒推天数",
            prop: "delayDays",
            span: 14,
            row: true
          },
          {
            label: "开始日期",
            prop: "beginDate",
            span: 14,
            row: true
          },
          {
            label: "结束日期",
            prop: "endDate",
            span: 14,
            row: true
          }
        ]
      }
    };
  },
  created() {
    this.query();
  },
  computed: {},
  watch: {
    data(d) {
      this.page.total = d.length;
    }
  },
  methods: {
    handleDialog(v) {
      this.dialog.visible = true;
    },
    handleClose() {
      this.dialog.visible = false;
    },
    query: async function() {
      this.data = await this.$$get("/pm/delay-days/query");
    }
  }
};
</script>

<style>
iframe {
  display: block; /* iframes are inline by default */
  border: none; /* Reset default border */
  height: 100%; /* Viewport-relative units */
  width: 100%;
  min-height: calc(85vh - 10rem);
}
.avue-form {
  padding: 0px;
}
</style>
