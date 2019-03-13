<template>
  <div class="wrapper">
    <avue-form
      :option="formOption"
      v-model="form"
    >
      <template
        slot="search"
        slot-scope="scope"
      >
        <el-select
          filterable
          allow-create
          default-first-option
          placeholder="请选择功能号"
        >
          <el-option
            ref="search"
            v-for="(item,index) in searchOptions"
            :key="index"
            :label="item[scope.column.props.label]"
            :value="item[scope.column.props.value]"
          ></el-option>
        </el-select>
      </template>
    </avue-form>
    <!-- <avue-crud
      :data="data"
      :option="option"
      @search-change="searchChange"
      @row-save="rowSave"
      @row-update="rowUpdate"
      @row-del="rowDel"
    />-->
  </div>
</template>

<script>
const baseUrl = "/sys/dictionary";
export default {
  name: "Index",
  data() {
    return {
      form: {},
      searchOptions: [],
      formOption: {
        labelWidth: 120,
        column: [
          {
            label: "资源代码",
            prop: "search",
            type: "select",
            allowCreate: true,
            filterable: true,
            formslot: true,
            // remote: true,
            dicUrl: "/bd/base-option-value-set/info?optCateCode=OM01",
            props: {
              label: "optionName",
              value: "optionCode"
            }
          }
        ]
      },
      data: [],
      row: {},
      option: {
        column: []
      }
    };
  },
  computed: {},
  watch: {},
  created() {
    // this.query();
    // this.initSearchOptions();
  },
  methods: {
    async initSearchOptions() {
      this.searchOptions = await this.$$get("/bd/base-option-value-set/info", {
        optCateCode: "OM01"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
}
</style>
