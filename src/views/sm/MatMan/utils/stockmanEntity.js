import getCodeByClass from "@/business_utils/getCodeByClass";
// import LG_axios from "@/router/axios-wrap";
async function viewEntity() {
  // const url = "/sm/stock/queryDelivy";
  // const stockDic = await await LG_axios.get(url, {});
  // const matKindDic = await getCodeByClass("SM01");
  // console.log("111111", matKindDic);
  const readonly = "false";
  const entity = [{
      type: "text",
      prop: "baseCode",
      label: "基地",
      search: true,
      sortable: true,
      filter: true,
      "filter-multiple": true,
      labelWidth: "120"
      // dicData: stockDic
    },
    {
      type: "text",
      prop: "stockNo",
      label: "库号",
      labelWidth: "120",
      disabled: "false"
    },
    {
      type: "text",
      prop: "stockDesc",
      label: "库区描述",
      search: true,
      labelWidth: "120"
    },
    {
      type: "text",
      prop: "matLineType",
      label: "产线类型",
      search: true,
      labelWidth: "120"
    },
    {
      type: "text",
      prop: "matKind",
      label: "物料种类",
      search: true,
      labelWidth: "120"
    },
    {
      type: "text",
      prop: "delivyMark",
      label: "发货标记",
      labelWidth: "120"
    },
    {
      type: "text",
      prop: "readAuto",
      label: "自动准发红冲",
      labelWidth: "120"
    },
    {
      type: "text",
      prop: "wtPlace",
      label: "过磅地点",
      labelWidth: "120"
    }
  ];
  return entity;
}

export default viewEntity;
