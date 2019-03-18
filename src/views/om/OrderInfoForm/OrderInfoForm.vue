<template>
  <div>
    <avue-form v-model="OIFObject" :option="OIFOption">
    
    </avue-form>
  </div>
</template>
<script>
  import getOIFE from "./utils/OIFEntity";
  export default {
    name: "order-info-form",
    props: {},
    components: {},
    data: function() {
      return {
        OIFObject: {},
        OIFOption: {
          menuBtn: false,
          size:"mini",
          submitBtn: false,
          emptyBtn: false,
          column: []
        },
        editable: false
      };
    },
    created: async function() {
      let tmp_column = await getOIFE();
      this.OIFOption.column = this.calcOIFCol(tmp_column, this.editable);
    },
    mounted: function() {},
    computed: {},
    methods: {
      calcOIFCol(col, flag) {
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
      //转化editable的方法
      toggleEditable(ed_flag) {
        if (typeof ed_flag != "undefined") {
          this.editable = ed_flag;
        } else {
          this.editable = !this.editable;
        }
        this.OIFOption.column = this.calcOIFCol(
          this.OIFOption.column,
          this.editable
        );
      },
      setData(data) {
        this.OIFObject = data;
      },
      getData() {
        return this.OIFObject;
      }
    },
    watch: {}
  };
</script>
<style scoped>
</style>