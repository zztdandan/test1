import getCodeByClass from "@/business_utils/getCodeByClass";
import * as CRUD from "./CRUD";
import "linqjs";
export default async function() {
    const classcode_dic = await CRUD.queryCodeClass({});
    //  debugger;
    const dic1 = classcode_dic.select(x => {
        x.label = x.code;
        x.value = x.id;
        return x;
    });
    debugger;
    const status_dic = await getCodeByClass("CIST1");
    return [
        {
            type: "select",
            prop: "classid",
            label: "大类code",
            readonly: true,
            dicData: dic1
        },
        { prop: "code", label: "常数项code" },
        { type: "text", prop: "name", label: "常数项名称" },
        { type: "text", prop: "remark", label: "备注" },
        { type: "select", prop: "status", label: "状态", dicData: status_dic }
    ];
}
