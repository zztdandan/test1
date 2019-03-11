<template>
  <div>
    <avue-form ref="aform" v-model="ODIFObject" :option="ODIFOption" class="custom">
      <template slot="menuForm">
        <div class="flex-md">
          <el-button v-if="btnType=='add'" type="primary" size="mini" @click="hConfirmAdd">确认添加</el-button>
          <el-button v-if="btnType=='edit'" type="primary" size="mini"  @click="hConfirmEdit">确认编辑</el-button>
          <el-button v-if="btnType!=''" @click="hConfirmCancel">取消</el-button>
        </div>
      </template>
    </avue-form>
  </div>
</template>
<script>
  import getODIFEntity from "./utils/ODIFEntity";

  export default {
    name: "order-det-info-form",
    components: {},
    data: function() {
      return {
        ODIFObject: {},
        ODIFOption: {
          size:"mini",
          menuBtn: true,
          submitBtn: false,
          emptyBtn: false,
          column: []
        },
        editable: false,
        btnType: ""
      };
    },
    created: async function() {
      let tmp_column = await getODIFEntity();
      this.ODIFOption.column = this.calcODIFCol(tmp_column, this.editable);
    },
    mounted: function() {},
    methods: {
      setData(data) {
        this.ODIFObject = data;
      },
      calcODIFCol(col, flag) {
        let tmp_flag = true;
        if (typeof flag != "undefined") {
          tmp_flag = flag;
        }

        let tmp_col = col.map(x => {
          x.disabled = !tmp_flag;
          return x;
        });
        return tmp_col;
      },

      hConfirmAdd() {
        // debugger
        //验证通过后再触发
        this.$refs["aform"].validate(flag => {
          if (flag) {
            this.$emit("confirm-add", this.ODIFObject);
          } else {
              this.$emit("confirm-add", this.ODIFObject);
            console.log("验证不通过");
          }
        });
      },
      hConfirmEdit() {
        this.$emit("confirm-edit", this.ODIFObject);
      },
      hConfirmCancel() {
        this.$emit("confirm-cancel", this.ODIFObject);
      },
      toggleEditable(ed_flag) {
        if (typeof ed_flag != "undefined") {
          this.editable = ed_flag;
        } else {
          this.editable = !this.editable;
        }
        this.$set(
          this.ODIFOption,
          "column",
          this.calcODIFCol(this.ODIFOption.column, this.editable)
        );
      },
      toggleBtnType(type) {
        this.btnType = type;
      }
    },
    watch: {}
  };
</script>
<style scoped>
.flex-md {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  width: 40%;
  margin: auto;
}
</style>
<style>
.custom .avue-form__group {
  flex-direction: column !important;
  max-height: 150px;
}
</style>
