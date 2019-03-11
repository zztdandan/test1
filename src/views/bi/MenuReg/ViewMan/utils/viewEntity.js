import getCodeByClass from "@/business_utils/getCodeByClass";

async function viewEntity() {
    const entity = [
        { type: "text", prop: "code", label: "画面编码", search: true },
        { type: "text", prop: "label", label: "画面名称", search: true },
        { type: "text", prop: "icon", label: "画面图标类" },
        { type: "text", prop: "path", label: "画面地址", search: true },
        { type: "text", prop: "component", label: "画面控件地址" }
    ];
    return entity;
}

export default viewEntity;
