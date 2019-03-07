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
    <el-dialog
      title
      :visible.sync="dialog.visible"
      width="80%"
      :fullscreen="!true"
      :before-close="handleClose"
    >
      <div>
        <avue-form
          :option="dialog.formOption"
          v-model="dialog.form"
        ></avue-form>
        <iframe
          :src="dialog.form.url"
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
              ],
              span: 6,
              mock: {
                type: "dic"
              }
            }
          ]
        }
      },

      page: {
        total: 122
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
  methods: {
    handleAdd() {
      this.dialog.visible = true;
    },
    handleClose() {
      this.dialog.visible = false;
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
