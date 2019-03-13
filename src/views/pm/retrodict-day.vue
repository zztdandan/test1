<template>
  <basic-container>
    <avue-crud
      :option="option"
      :page="page"
      :data="data"
      ref="crud1"
    >
      <template
        slot-scope="scope"
        slot="menuLeft"
      >
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
        <avue-form
          :option="dialog.formOption"
          v-model="dialog.form"
        ></avue-form>
        <el-checkbox-group v-model="checkList"></el-checkbox-group><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checkList"></el-checkbox-group><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checkList"></el-checkbox-group><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checkList"></el-checkbox-group><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      </div>
    </el-dialog>
  </basic-container>
</template>

<script>
const baseReportUrl="http://172.16.4.148:8080/WebReport/ReportServer?"
export default {
  data() {
    return {
      market_date: false,
      dialog: {
        visible: false,
        form: { prodCategories:"" },
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
              dicUrl: '/bd/product-categories/query',
              rules: [
                {
                  required: true,
                  message: "请选择产品大类 ",
                  trigger: "blur"
                }
              ]
            },
            {
              
              label: "牌号",
              prop: "steelGrade",
              type: "checkbox",
              format: "yyyy-MM-dd"
            }

          ]
        }
      },

      page: {
        total: 0
      },
      data: [
        
      ],
      option: {
        addBtn: false,
        editBtn: false,
        index: true,
        indexLabel: '序号',
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
  created(){
      this.query()
  },
  computed:{
      
  },
  watch:{
    data(d){
      this.page.total=d.length;
    }
  },
  methods: {
    handleDialog(path,v) {
      this.dialog.visible = true;
      // this.dialog.ifrPath=path;
      // this.market_date=v;
    },
    handleClose() {
      this.dialog.visible = false;
    },
    query:async function(){
        this.data=await this.$$get('/pm/delay-days/query');
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
.avue-form{
  padding: 0px;
}
</style>
