export default [
   { type: "text", prop: "name", label: "表格名称" },
   { type: "text", prop: "tableName", label: "表格中文名称" },
   { type: "text", prop: "recRevisor", label: "记录修改责任者", readonly: true },
   { type: "datetime", prop: "recReviseTime", label: "记录修改时刻", readonly: false, format: "yyyy-MM-dd HH:mm:ss", valueFormat: "yyyyMMddHHmmss", hide: false }
];
