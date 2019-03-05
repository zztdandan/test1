export default [
   {
      type: "text",
      id: "name",
      label: "菜单名称",
      line: 1,
      labelWidth: "6rem",
      readonly: true
   },
   {
      type: "append-text",
      id: "parent_name",
      label: "父级菜单名称",
      append: "parent-id-append",
      labelWidth: "6rem",
      line: 2,
      readonly: true
   },
   {
      type: "text",
      id: "icon",
      label: "图标名称",
      labelWidth: "6rem",
      line: 3,
      readonly: true
   },
   {
      type: "text",
      id: "url",
      label: "url地址",
      labelWidth: "6rem",
      line: 4,
      readonly: true
   }
];
