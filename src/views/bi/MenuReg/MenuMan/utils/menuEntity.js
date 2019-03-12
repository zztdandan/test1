import getCodeByClass from "@/business_utils/getCodeByClass";

async function menuEntity() {
    const entity = [
        {
            type: "text",
            prop: "id",
            label: "目录编码",
            labelWidth: "100"
        },
        {
            type: "text",
            prop: "name",
            label: "目录名称",

            labelWidth: "100"
        },
        {
            type: "text",
            prop: "icon",
            label: "目录图标类",

            labelWidth: "100"
        },
        {
            label: "画面代码",
            prop: "pcode",
            formslot: true,
            labelWidth: "100"
        },
        {
            type: "text",
            prop: "viewLabel",
            label: "画面名",
            readonly: true,
            labelWidth: "100"
        }
    ];
    return entity;
}

export default menuEntity;
