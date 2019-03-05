// 这是个独立文件，专门用于取codeclass中的数据字典字段
import api_config from "@/api_config.json";
import { SimpleMessage, ErrConsole, SimpleNotify, ErrNotify } from "@/business_utils/ele_alert";
import { postRequest, postRequestFormData, uploadFileRequest, getRequest, deleteRequest, putRequest, getBodyRequest } from "@/plugins/axios_api/api_utils";
import "linqjs";
export const GetCode = async function(class_id) {
   try {
      const url = api_config.bi.CodeMan.queryCodeByClass; // get方法，参数为 classcode
      const params = {
         classcode: class_id
      };
      var res = getRequest(url, params);
      return res.select(x => {
         return { value: x.code, label: x.name };
      });
   } catch (error) {
      console.log("获取数据项，数据字典错误", error);
   }
};

export default GetCode;
