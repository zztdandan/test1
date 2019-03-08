import getCodeByClass from "@/business_utils/getCodeByClass";
async function getEntity() {
    const orderTypeDic = await getCodeByClass("ORDC1");
    const customerConfirmFlagDic = await getCodeByClass("ORDC2");

    const entity = [
        { type: "text", span: 8, prop: "orderNo", label: "订单编号" },
        {
            type: "date",
            span: 8,
            prop: "orderRecvTime",
            label: "签订日期",
            more: true
        },
        { type: "text", span: 8, prop: "orderTransactor", label: "经办人" },
        {
            type: "select",
            span: 8,
            prop: "orderType",
            label: "订单性质",
            dicData: orderTypeDic
        },
        { type: "date", span: 8, prop: "modifyDate", label: "更改日期" },
        {
            type: "radio",
            span: 8,
            prop: "customerConfirmFlag",
            label: "客户确认标记",
            dicData: customerConfirmFlagDic
        }
    ];
    return entity;
}

export default getEntity;
