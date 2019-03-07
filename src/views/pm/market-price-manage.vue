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
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          plain
          @click="handleAdd()"
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
        <avue-form
          :option="dialog.formOption"
          v-model="dialog.form"
        ></avue-form>
        <iframe
          :src="url"
          frameborder="0"
        ></iframe>
      </div>
    </el-dialog>
  </basic-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: {
        visible: false,
        ifrUrl: "https://form.avue.top",
        form: { url: "" },
        formOption: {
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
        column: [
          {
            label: "产品大类",
            prop: "prodCategories",
            span: 14,
            row: true
          },
          {
            label: "最新市场价日期",
            prop: "latestMarketDate",
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
          return 'http://172.16.2.245:8080/WebReport/ReportServer?reportlet=YKCS_MARKET_PRICE.cpt&op=write&pcid=1&aa='+this.dialog.form.prodCategories
      }
  },
  methods: {
    handleAdd() {
      this.dialog.visible = true;
    },
    handleClose() {
      this.dialog.visible = false;
    },
    query(){
        const self=this;
        const data=[];
        this.$$get('/pm/market-price/queryLatestDateByProdCate').then(d=>{
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
