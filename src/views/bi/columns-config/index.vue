<template>
  <div class="container">
    <div class="header">
      <el-form
        ref="elForm"
        :model="elForm"
        label-width="5rem"
        :inline="true"
        size="mini"
      >
        <el-form-item label="功能号">
          <el-input
            style="width: 22rem"
            placeholder="请输入能号"
            v-model="elForm.functionNo"
          >
            <el-select
              style="width: 10rem"
              v-model="elForm.functionNo"
              slot="prepend"
              placeholder="请选择功能号"
            >
              <el-option
                v-for="item in funItems"
                :key="item.id"
                :label="item.itemDesc"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label>
          <el-button>预览</el-button>
        </el-form-item>
        <el-form-item label>
          <el-button>复制配置</el-button>
        </el-form-item>
        <el-form-item label>
          <el-button>配置列</el-button>
        </el-form-item>
        <!-- <el-form-item>
        <el-button type="primary">立即创建</el-button>
        <el-button>取消</el-button>
        </el-form-item>-->
      </el-form>
    </div>
    <div class="aside">
      <avue-form
        :option="fieldInfoForm.option"
        v-model="fieldModel"
      ></avue-form>aside
    </div>
    <div class="main">
      <avue-crud
        :data="data"
        :option="option"
        v-model="row"
        @row-click="rowClick"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const crudColumns = [
      {
        prop: "name",
        label: "字段名"
      },
      {
        prop: "desc",
        label: "字段描述"
      },
      {
        prop: "len",
        label: "输入长度"
      },
      {
        prop: "type",
        label: "类型"
      },
      {
        prop: "orderby",
        label: "排序号"
      }
    ];
    const fieldInfoColumns = [
      {
        prop: "name",
        label: "字段名",
        span: 24
      },
      {
        prop: "desc",
        label: "字段描述",
        span: 24
      },
      {
        prop: "len",
        label: "输入长度",
        span: 24
      },
      {
        prop: "type",
        label: "类型",
        span: 24
      },
      {
        prop: "orderby",
        label: "排序号",
        span: 24
      }
    ];
    return {
      // v-model:elForm
      elForm: { functionName: "功能说明" },
      // 功能列表，来自后台查询
      funItems: [],
      // 字段信息表单
      fieldInfoForm: {
        option: {
          size: "small",
          menuBtn: false,
          labelWidth: 80,
          column: fieldInfoColumns
        }
      },
      // 功能表信息
      option: {
        size: "mini",
        menu: false,
        index: true,
        indexLabel: "序号",
        stripe: true,
        addBtn: false,
        filterBtn: false,
        refreshBtn: false,
        columnBtn: false,
        gutter: 1,
        prop: 80,
        labelWidth: 80,
        column: crudColumns
      },
      data: [
        { name: "aa", desc: "描述", len: 12, type: "n", orderby: 1 },
        { name: "bb", desc: "描述22", len: 14, type: "c", orderby: 2 }
      ],
      row: {},
      // v-model字段信息
      fieldModel: {}
    };
  },
  computed: {},
  watch: {
    row(val) {
      console.log("row changed", val);
    }
  },
  created() {
    this.initfunItems();
  },
  methods: {
    async initfunItems() {
      this.funItems = await this.$$get("/api/sms/config/query/all", {
        itemType: "column-config"
      });
    },
    rowClick(row, event, column) {
      console.log("rowClick", { row, event, column });
    }
  }
};
</script>
<style>
.header {
  text-align: left;
  line-height: 2.4rem;
  padding: 0.01rem;
  width: 100%;
  height: 2.4rem;
}

.aside {
  background-color: #e9ebf0;
  color: #dddddd;
  text-align: center;
  left: 0;
  width: 20rem;
}

.main {
  background-color: #e9eef3;
  color: #333;
  right: 0;
  left: 20rem;
}
.aside,
.main {
  position: absolute;
  top: 2.42rem;
  bottom: 5px;
}
</style>
