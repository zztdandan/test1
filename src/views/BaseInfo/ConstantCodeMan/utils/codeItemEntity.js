import { GetCode } from "@/business_utils/base-info/getCodeByClass";
export default async function() {
   const status_dic = await GetCode("CIST1");
   return [
      { type: "text", prop: "id", label: "主键ID", hide: false, readonly: true },
      { type: "text", prop: "classid", label: "大类id", hide: false, readonly: true },
      { type: "text", prop: "classcode", label: "大类code", readonly: true },
      { type: "text", prop: "code", label: "常数项code" },
      { type: "text", prop: "name", label: "常数项名称" },
      { type: "text", prop: "remark", label: "备注" },
      { type: "select", prop: "status", label: "状态", dicData: status_dic }
   ];
}
