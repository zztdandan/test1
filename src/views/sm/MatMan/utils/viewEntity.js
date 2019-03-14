import getCodeByClass from "@/business_utils/getCodeByClass";

async function viewEntity() {
    const entity = [{
            type: "text",
            prop: "stackCode",
            label: "库区",
            search: true,
            labelWidth: "120"
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
            prop: "sgSing",
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
        }
    ];
    return entity;
}

export default viewEntity;
