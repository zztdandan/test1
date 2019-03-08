import getCodeByClass from "@/business_utils/getCodeByClass";

async function getODEntity() {
    const prodClassDic = await getCodeByClass("ORDC3");
    const exportFlagDic = await getCodeByClass("ORDC4");
    const pscDic = await getCodeByClass("ORDC5");
    const entity = [
        { type: "text", prop: "orderNo", label: "订单号", sortable: true },
        {
            type: "select",
            sortable: true,
            filter: true,
            "filter-multiple": true,
            prop: "prodClass",
            label: "产品大类",
            dicData: prodClassDic
        },
        {
            type: "select",
            prop: "exportFlag",
            label: "出口标记",
            dicData: exportFlagDic
        },
        {
            type: "date",
            prop: "prodReadyDate",
            label: "生产备妥日期",
            format: "yyyy-MM-dd",
            valueFormat: "yyyyMMdd"
        },
        {
            type: "date",
            prop: "delivyDateTrnp",
            label: "船期交货日期",
            format: "yyyy-MM-dd",
            valueFormat: "yyyyMMdd"
        },
        {
            type: "date",
            prop: "delivyDateUser",
            label: "期望交货日期",
            format: "yyyy-MM-dd",
            valueFormat: "yyyyMMdd"
        },
        {
            type: "date",
            prop: "delivyDate",
            label: "交货日期",
            sortable: true,
            format: "yyyy-MM-dd",
            valueFormat: "yyyyMMdd"
        },
        { type: "text", prop: "psc", label: "产品规范", dicData: pscDic }
    ];

    return entity;
}
export default getODEntity;
