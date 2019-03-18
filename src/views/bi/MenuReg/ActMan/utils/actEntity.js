import getCodeByClass from "@/business_utils/getCodeByClass";

async function actEntity() {
    const entity = [
        {
            type: "text",
            prop: "code",
            label: "权限编码",
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
            formslot: true,
            search:true,
          },
        {
            type: "text",
            prop: "viewName",
            label: "画面名",
            readonly: true,
            labelWidth: "80"
        }
    ];
    return entity;
}

export default actEntity;
