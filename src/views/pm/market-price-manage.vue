<template>
  <basic-container>
    <avue-crud
      :option="option"
      :page="page"
      :data="data"
      v-model="dialog.form"
      ref="crud1"
    >
      <template
        slot="menuLeft"
      >
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
          plain
          @click="handleDialog('reportlet=PM_MARKET_PRICE_CREATE.cpt&op=write','add')"
        >新增</el-button>
        <el-button
          type="primary"
          icon="moon-scissors"
          size="small"
          plain
          @click="handleDialog('reportlet=PM_MARKET_PRICE_EDIT.cpt&op=write','update')"
        >编辑</el-button>
                <el-button
          type="primary"
          icon="moon-zoom-in"
          size="small"
          plain
          @click="handleDialog('reportlet=PM_MARKET_PRICE_VIEW.cpt&op=view','view')"
        >查看详情</el-button>
        <!-- <el-button
          type="primary"
          icon="moon-cross"
          size="small"
          plain
          @click="handleDialog('reportlet=PM_MARKET_PRICE_VIEW.cpt&op=view','delete')"
        >删除</el-button> -->
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
          v-if="visibleIframe"
          frameborder="0"
        ></iframe>
      </div>
    </el-dialog>
  </basic-container>
</template>

<script>
//const baseReportUrl="http://172.16.4.148:8080/WebReport/ReportServer?"
export default {
  data() {
    return {
      market_date: false,
      editMode:'add',
      dialog: {
        visible: false,
        ifrUrl: "https://form.avue.top",
        form: { url: "",prodCategories:"" },
        formOption: {
          labelWidth: 100,
          emptyBtn: false,
          submitBtn: false,
          column:[]
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
        delBtn:false,
        menu: false,
        index: true,
        indexLabel: '序号',
        column: [{
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
              prop: "latestMarketDate",
              type: "date",
              format: "yyyy-MM-dd"
            }]
      }
    };
  },
  created(){
      this.query()
  },
  computed:{
      url:function(){
          const date=dayjs(this.dialog.form.date).format("YYYY-MM-DD");
          const url=`${this.env.reportBaseUrl}${this.dialog.ifrPath}&marketdate=${date}&pcid=`+this.dialog.form.prodCategories;
          return url

      },
      visibleIframe:function(){
          //console.log('visibleIframe changed');
          return this.dialog.visible 
          && ((this.editMode==="add" && this.dialog.form.prodCategories.length>0)
          ||(this.editMode==="view" && this.dialog.form.prodCategories.length>0)
          ||(this.editMode==="update" && this.dialog.form.prodCategories.length>0 
          &&this.dialog.form.date && this.dialog.form.date!==""));
      }
  },
  watch:{
    data(d){
      this.page.total=d.length;
    }
  },
  methods: {
    handleDialog(path,editMode) {
      this.dialog.visible = true;
      this.dialog.ifrPath=path;
      //this.market_date=v;
      this.editMode=editMode;
      this.editModeChanged(editMode);
    },
    handleClose() {
      this.dialog.visible = false;
    },
    async query(){
         this.data=await this.$$get('/pm/market-price/queryLatestDateByProdCate')
    },
    editModeChanged(val){
      if(val==="add"||val==="view"){
        this.dialog.form.prodCategories="";
        this.dialog.formOption.column=[{
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
            }]
      }else{
        //this.dialog.form={};
        console.log('this.dialog.form.date=',this.dialog.form.date);
        this.dialog.formOption.column=[{
              label: "产品大类",
              prop: "prodCategories",
              type: "select",
              props: {
                label: "prodCategories",
                value: "id"
              },
              dicUrl: '/bd/product-categories/query'
            
            },
            {
              label: "市场价日期",
              prop: "date",
              type: "date",
              format: "yyyy-MM-dd"
            }]
      }
    }
  }
};
</script>

<style>
iframe {
  display: block; /* iframes are inline by default */
  border: none; /* Reset default border */
  height: 50rem; /* Viewport-relative units */
  width: 100%;
  min-height: calc(85vh - 10rem);
}
.avue-form{
  padding: 0px;
}
.avue-group__item{
  margin-bottom: 0px;
  padding: 0px;
}
</style>
