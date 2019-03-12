<template>
  <basic-container>
    <h3>表格例子</h3>
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
          @click.stop="handleAdd()"
        >新增</el-button>
      </template>
    </avue-crud>
    <!-- <el-dialog
      title
      :visible.sync="dialog.visible"
      width="80%"
      :fullscreen="!true"
      :before-close="handleClose"
    >-->
    <div>
      <avue-form
        :option="dialog.formOption"
        v-model="dialog.form"
      ></avue-form>
      <iframe
        :src="url"
        v-if="dialog.form.url.length>0"
        frameborder="0"
      ></iframe>
    </div>
    <!-- </el-dialog> -->
    <el-form>
      <el-switch v-model="cityVisable">显示城市</el-switch>
    </el-form>
  </basic-container>
</template>

<script>
export default {
  data() {
    return {
      cityVisable: false,
      dialog_form: {},
      dialog: {
        visible: false,
        ifrUrl: "https://form.avue.top",
        form: { url: "", cityVisdiplay: false },
        formOption: {
          emptyBtn: false,
          submitBtn: false,
          column: [
            {
              label: "url",
              prop: "url",
              type: "select",
              dicData: [
                {
                  label: "form-maker",
                  value: "https://form.avue.top"
                },
                {
                  label: "百度",
                  value: "https://www.baidu.com/"
                }
              ]
            },
            {
              label: "显示城市",
              prop: "cityVisdiplay",
              type: "switch"
            }
          ]
        }
      },

      page: {
        total: this.totalPage
      },
      data: [
        {
          username: "smallwei",
          name: "avue",
          password: "123456",
          newpassword: "123456",
          date: "2019-01-01",
          textarea: "这是一条很长很长很长很长很长很长很长很长的个性签名"
        },
        {
          username: "smallwei",
          name: "avue",
          password: "123456",
          newpassword: "123456",
          date: "2019-01-01",
          textarea: "这是一条很长很长很长很长很长很长很长很长的个性签名"
        },

        {
          username: "smallwei",
          name: "avue",
          password: "123456",
          newpassword: "123456",
          date: "2019-01-01",
          textarea: "这是一条很长很长很长很长很长很长很长很长的个性签名"
        },
        {
          username: "smallwei",
          name: "avue",
          password: "123456",
          newpassword: "123456",
          date: "2019-01-01",
          textarea: "这是一条很长很长很长很长很长很长很长很长的个性签名"
        },
        {
          username: "smallwei",
          name: "avue",
          password: "123456",
          newpassword: "123456",
          date: "2019-01-01",
          textarea: "这是一条很长很长很长很长很长很长很长很长的个性签名"
        },
        {
          username: "smallwei",
          name: "avue",
          password: "123456",
          newpassword: "123456",
          date: "2019-01-01",
          textarea: "这是一条很长很长很长很长很长很长很长很长的个性签名"
        },
        {
          username: "smallwei",
          name: "avue",
          password: "123456",
          newpassword: "123456",
          date: "2019-01-01",
          textarea: "这是一条很长很长很长很长很长很长很长很长的个性签名"
        }
      ],
      option: {
        addBtn: false,
        column: [
          {
            label: "用户名",
            prop: "username",
            span: 14,
            row: true
          },
          {
            label: "姓名",
            prop: "name",
            span: 14,
            row: true
          },
          {
            label: "密码",
            prop: "password",
            type: "password",
            span: 14,
            row: true
          },
          {
            label: "确认密码",
            prop: "newpassword",
            type: "password",
            hide: true,
            span: 14,
            row: true
          },
          {
            label: "申请日期",
            prop: "date",
            type: "date",
            span: 14,
            row: true
          },
          {
            label: "个性签名",
            prop: "textarea",
            type: "textarea",
            minRows: 8,
            span: 24,
            overHidden: true,
            row: true
          }
        ]
      }
    };
  },
  computed: {
    url: function() {
      console.log("this.dialog.form", this.dialog.form);
      return this.dialog.form.url + "?wd=" + this.dialog.form.city;
    },
    totalPage: function() {
      return this.data.length;
    }
  },
  watch: {
    "dialog.form.cityVisdiplay": function(val, oldVal) {
      console.log("cityVisdiplay", val);
      if (val) {
        this.dialog.formOption.column.push({
          label: "城市",
          prop: "city",
          type: "select",
          // remote: true,
          props: {
            label: "city",
            value: "id"
          },
          dicUrl: `/bd/city/query`,
          dicQuery: {
            a: 1
          }
        });
      } else {
        this.dialog.formOption.column.pop();
      }
    },
    cityVisable: function(val) {
      console.log("cityVisdiplay222", val);
      this.dialog.formOption.column = val
        ? [
            {
              label: "显示城市333",
              prop: "cityVisdiplay",
              type: "switch"
            }
          ]
        : [];
    },
    $route(to, from) {
      console.log("$route", { to, from });
    }
  },
  methods: {
    handleAdd() {
      this.dialog.visible = true;
    },
    handleClose() {
      this.dialog.visible = false;
    },
    getColumns() {
      const columns = [
        {
          label: "url",
          prop: "url",
          type: "select",
          dicData: [
            {
              label: "form-maker",
              value: "https://form.avue.top"
            },
            {
              label: "百度",
              value: "https://www.baidu.com/"
            }
          ]
        },
        {
          label: "城市",
          prop: "city",
          type: "select",
          // remote: true,
          props: {
            label: "city",
            value: "id"
          },
          dicUrl: `/bd/city/query`,
          dicQuery: {
            a: 1
          }
        },
        {
          label: "显示城市",
          prop: "cityVisdiplay",
          type: "switch"
        }
      ];
      const self = this;
      console.log("self", JSON.stringify(self.dialog));
      const cols = columns.filter(
        c =>
          c.prop !== "city" ||
          (c.prop === "city" && self.dialog && self.dialog.form.cityVisdiplay)
      );

      return cols;
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
