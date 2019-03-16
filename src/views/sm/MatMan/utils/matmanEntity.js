import getCodeByClass from "@/business_utils/getCodeByClass";
import LG_axios from "@/router/axios-wrap";
async function viewEntity() {
  const url = "/sm/stock/queryDelivy";
  const stockDic = await await LG_axios.get(url, {});
  const matKindDic = await getCodeByClass("SM01");
  console.log("111111", matKindDic);
  const entity = [{
      type: "select",
      prop: "stockCode",
      label: "库区",
      search: true,
      sortable: true,
      filter: true,
      "filter-multiple": true,
      labelWidth: "120",
      dicData: stockDic
    },
    {
      type: "text",
      prop: "matNo",
      label: "材料号",
      search: true,
      labelWidth: "120"
    },
    {
      type: "text",
      prop: "sgSign",
      label: "牌号",
      search: true,
      labelWidth: "120"
    },
    {
      type: "text",
      prop: "matThick",
      label: "厚度",
      search: true,
      labelWidth: "120"
    },
    {
      type: "text",
      prop: "matWidth",
      label: "宽度",
      labelWidth: "120"
    },
    {
      type: "text",
      prop: "matLength",
      label: "长度",
      labelWidth: "120"
    },
    {
      type: "date",
      prop: "inStockTime",
      label: "入库日期"
      // format: "yyyy-MM-dd"
      // valueFormat: "yyyyMMdd"
    },
    {
      type: "select",
      prop: "matKind",
      label: "种类",
      search: true,
      sortable: true,
      filter: true,
      "filter-multiple": true,
      labelWidth: "120",
      dicData: matKindDic
    }
  ];
  return entity;
}

export default viewEntity;
