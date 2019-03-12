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
        <iframe
          :src="url"
          v-if="this.dialog.form.prodCategories.length>0"
          frameborder="0"
        ></iframe>
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
        ifrUrl: "https://form.avue.top",
        form: { url: "",prodCategories:"" },
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
              
              label: "市场价日期",
              display: this.market_date,
              prop: "date",
              type: "date",
              format: "yyyy-MM-dd"
            }

          ]
        }
      },

      page: {
        total: 122
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
      url:function(){
          const date=dayjs(this.dialog.form.date).format("YYYY-MM-DD");
          const url=`${baseReportUrl}${this.dialog.ifrPath}&marketdate=${date}&aa=`+this.dialog.form.prodCategories;
          return url

      }
  },
  methods: {
    handleDialog(path,v) {
      this.dialog.visible = true;
      this.dialog.ifrPath=path;
      this.market_date=v;
    },
    handleClose() {
      this.dialog.visible = false;
    },
    query(){
        const self=this;
        const data=[];
        this.$$get('/pm/delay-days/query').then(d=>{
            d.forEach(v=>data.push(v.tails));
            self.data=data;
        })
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
</style>
