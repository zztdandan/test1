import getCodeByClass from "@/business_utils/getCodeByClass";

async function actEntity() {
    const apiTypeDic = await getCodeByClass("BIAT01");
    const entity = [
        {
            type: "text",
            prop: "code",
            label: "api编码",
            labelWidth: "80"
        },
        {
            type: "text",
            prop: "name",
            label: "名称",
            labelWidth: "80"
        },

        {
            type: "text",
            label: "权限命名",
            prop: "perms"
        },
        {
            type: "select",
            prop: "type",
            label: "api层级",
            dicData: apiTypeDic
        },
        {
            label: "父级服务id",
            prop: "parentId",
            readonly: true,
            hide: true
        },
        {
            label: "父级名称",
            prop: "parentName",
            readonly: true
        },
        {
            label: "",
            labelWidth: "1",
            prop: "pid",
            formslot: true,
            hide: true
        }
    ];
    return entity;
}

export default actEntity;
