import getCodeByClass from "@/business_utils/getCodeByClass";

async function getODEntity() {
  const prodClassDic = await getCodeByClass("ORDC3");
  const exportFlagDic = await getCodeByClass("ORDC4");
  const pscDic = await getCodeByClass("ORDC5");
  const entity = [
    { type: "text", prop: "orderNo", label: "订单号", sortable: true  },
    { type: "text", prop: "orderCustCname", label: "订单用户", sortable: true  },
    { type: "text", prop: "orderType", label: "订单性质", sortable: true  },
    {
      type: "text",
      prop: "productCategory",
      label: "产品大类"
      , sortable: true 
    },
    {
      type: "date",
      prop: "orderRecvTime",
      label: "签订日期",
      sortable: true,
      format: "yyyy-MM-dd",
      valueFormat: "yyyyMMdd"
    },
    { type: "text", prop: "productionBase", label: "生产基地", sortable: true  },
    { type: "number", prop: "orderThick", label: "订货厚度", sortable: true },
    {
      type: "number",
      prop: "orderMinThick",
      label: "订货最小厚度（直径）",
      sortable: true
    },
    {
      type: "number",
      prop: "orderMaxThick",
      label: "订货最大厚度（直径）",
      sortable: true
    },
    { type: "number", prop: "orderWidth", label: "订货宽度", sortable: true },
    {
      type: "number",
      prop: "orderMinWidth",
      label: "订货最小宽度",
      sortable: true
    },
    {
      type: "number",
      prop: "orderMaxWidth",
      label: "订货最大宽度",
      sortable: true
    },
    { type: "number", prop: "orderLen", label: "订货长度", sortable: true },
    {
      type: "number",
      prop: "orderMinLen",
      label: "订货最小长度",
      sortable: true
    },
    {
      type: "number",
      prop: "orderMaxLen",
      label: "订货最大长度",
      sortable: true
    },
    { type: "number", prop: "orderWt", label: "订货重量", sortable: true },
    { type: "number", prop: "orderQty", label: "订货数量", sortable: true },
    { type: "number", prop: "unitPrice", label: "单价", sortable: true },
    { type: "text", prop: "wtMethodCode", label: "计重方式" , sortable: true },
    { type: "text", prop: "orderSpecial", label: "订单特殊要求" , sortable: true },
    {
      type: "date",
      prop: "delivyDate",
      label: "交货期",
      sortable: true,
      format: "yyyy-MM-dd",
      valueFormat: "yyyyMMdd"
    },
    { type: "text", prop: "sgStd", label: "标准" , sortable: true },
    { type: "text", prop: "productionFlag", label: "单条排产状态" , sortable: true }
  ];

  return entity;
}
export default getODEntity;
