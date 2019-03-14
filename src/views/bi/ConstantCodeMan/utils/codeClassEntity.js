
import getCodeByClass from "@/business_utils/getCodeByClass";

export default async function() {
   const status_dic = await getCodeByClass("CIST1");

   return [
      { type: "text", prop: "id", label: "主键ID", hide: true, readonly: true },
      { type: "text", prop: "code", label: "代码编号"},
      { type: "text", prop: "name", label: "代码名称" },
      { type: "select", prop: "status", label: "状态", dicData: status_dic, hide: true }
   ];
}
