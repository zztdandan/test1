<template>
  <el-form-item
    :label="this.Info.label"
    :label-width="labelWidth"
  >
    <el-autocomplete
     :size="this.size" 
      class="inline-input"
      v-model="input_value"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      :name="this.Info.id"
      :readonly="this.Info.readonly"
    ></el-autocomplete>
  </el-form-item>
</template>

<script>
  export default {
    name: "auto-com-input",
    props: {
      Info: {
        type: Object,
        default: {},
        required: true
      },
      size: {
        type: String,
        default: "medium"
      },
      value: {
        type: Object,
        default: {}
      }
    },
    data: function() {
      // console.log("组件渲染开始 ");
      return {
        input_value: "",
        labelWidth: "5rem",
        valueList: [],

        full: true
        //格式:[{value:},{value:}]
      };
    },
    watch: {
      //手动实现与Props的同步
      input_value: function(newval, oldval) {
        // console.log("检测到内部input_value的改动");
        let full_val = this.valueList.where(x => x.value == newval).first();
        if (newval) {
          this.$emit("update:value", { id: this.Info.id, value: full_val });
        }
      },
      value: function(newval, oldval) {
        // console.log("检测到输入数据的改动");
        if (newval) {
          this.input_value = newval.value;
        }
      }
    },
    created: function() {
     // 初始化一些变量
        this.readonly = this.Info.readonly ? true : false;
        this.labelWidth = this.Info.labelWidth ? this.Info.labelWidth : "5rem";
        this.value = this.input_value ? this.input_value : "";
      //设置数值列表
      this.valueList = this.Info.value_list;
      //设置不输入时是否全部显示搜索结果
      this.full = this.Info.full ? true : false;
    
        this.input_value = this.value.value?this.value.value:"";
     
    },
    methods: {
      querySearch(queryString, cb) {
        let that_vue = this;
        let value_list = that_vue.valueList;
        let ept_list = this.full ? value_list : [];
        let results = queryString
          ? value_list.where(x => x["value"].indexOf(queryString) >= 0)
          : ept_list;
        // 调用 callback 返回建议列表的数据
        cb(results);
      }
      //  createFilter(queryString) {
      //   return (restaurant) => {
      //     return (restaurant.value.indexOf(queryString) === 0);
      //   };
      // },
    }
  };
</script>

<style scoped>
.el-autocomplete {
  width: 100% !important;
}
</style>