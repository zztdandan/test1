const top = [
  {
    label: "首页",
    path: "/wel/index",
    icon: "el-icon-menu",
    meta: {
      i18n: "dashboard"
    },
    parentId: 0
  },
  {
    label: "官网",
    icon: "el-icon-document",
    meta: {
      i18n: "website"
    },
    path: "https://avuex.avue.top",
    parentId: 1
  },
  {
    label: "测试",
    icon: "el-icon-document",
    path: "/test/index",
    meta: {
      i18n: "test"
    },
    parentId: 2
  }
];
const first = [
  {
    label: "demo",
    path: "/dm",
    component: "views/dm/demo",
    icon: "icon-caidan",
    children: [
      {
        label: "demo",
        path: "/dm",
        component: "views/dm/demo",
        icon: "icon-caidan"
      },
      {
        label: "标签",
        path: "/tags",
        component: "views/util/tags",
        icon: "icon-caidan",
        meta: {
          i18n: "tags"
        },
        children: []
      },
      {
        label: "表格",
        path: "/table",
        component: "views/util/table",
        icon: "icon-caidan",
        meta: {
          i18n: "table"
        },
        children: []
      }
    ]
  }
];
const second = [
  {
    label: "标签",
    path: "/tags",
    component: "views/util/tags",
    icon: "icon-caidan",
    meta: {
      i18n: "tags"
    },
    children: []
  },
  {
    label: "存储",
    path: "/store",
    component: "views/util/store",
    icon: "icon-caidan",
    meta: {
      i18n: "store"
    },
    children: []
  },
  {
    label: "全局函数",
    path: "https://avuex.avue.top/$/doc/api",
    icon: "icon-caidan",
    meta: {
      i18n: "api"
    },
    children: []
  },
  {
    label: "日志监控",
    path: "/logs",
    component: "views/util/logs",
    icon: "icon-caidan",
    meta: {
      i18n: "logs"
    },
    children: []
  },
  {
    label: "表格",
    path: "/table",
    component: "views/util/table",
    icon: "icon-caidan",
    meta: {
      i18n: "table"
    },
    children: []
  },
  {
    label: "表单",
    path: "/form",
    component: "views/util/form",
    icon: "icon-caidan",
    meta: {
      i18n: "form"
    },
    children: []
  },
  {
    label: "权限",
    path: "/permission",
    component: "views/util/permission",
    icon: "icon-caidan",
    meta: {
      i18n: "permission"
    },
    children: []
  },
  {
    label: "数据展示",
    path: "/data",
    component: "views/util/data",
    icon: "icon-caidan",
    meta: {
      i18n: "data"
    },
    children: []
  },
  {
    label: "异常页",
    path: "/error",
    meta: {
      i18n: "error"
    },
    icon: "icon-caidan",
    children: [
      {
        label: "403",
        path: "error",
        component: "components/error-page/403",
        icon: "icon-caidan",
        children: []
      },
      {
        label: "404",
        path: "404",
        component: "components/error-page/404",
        icon: "icon-caidan",
        children: []
      },
      {
        label: "500",
        path: "500",
        component: "components/error-page/500",
        icon: "icon-caidan",
        children: []
      }
    ]
  }
];
const third = [
  {
    label: "测试页面",
    path: "/test",
    component: "views/test",
    icon: "icon-caidan",
    meta: {
      i18n: "test"
    },
    children: []
  }
];
exports.callback = (req, res) => {
  let menu = [first, second, third];
  let type = req.query["type"] || 0;
  return menu[type] || [];
};
