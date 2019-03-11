import getCodeByClass from "@/business_utils/getCodeByClass";

async function menuEntity() {
    const entity = [
        {
            type: "text",
            prop: "code",
            label: "目录编码",
            labelWidth: "80"
        },
        {
            type: "text",
            prop: "label",
            label: "权限名称",

            labelWidth: "80"
        },
        {
            label: "画面代码",
            prop: "pcode",
            formslot: true
        },
        {
            type: "text",
            prop: "viewCode",
            label: "画面名",
            readonly: true,
            labelWidth: "80"
        }
    ];
    return entity;
}

export default menuEntity;
