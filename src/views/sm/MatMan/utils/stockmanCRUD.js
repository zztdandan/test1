import api_config from "@/api_config.json";
import {
  SimpleMessage,
  ErrNotify
} from "@/business_utils/ele_alert";
import LG_axios from "@/router/axios-wrap";
import {
  doesNotReject
} from "assert";

// 创建
export async function createData(params) {
  try {
    const url = "/sm/stock/create";
    params.createDate = dayjs().format("YYYYMMDDHHmmss");
    const res = await LG_axios.post(url, params);
    SimpleMessage("新增成功");
    return res;
  } catch (err) {
    console.log(err);
    ErrNotify("新增出现错误");
  }
}

// 删除
export async function deleteData(params) {
  try {
    console.log("11111", params);
    const url = "/sm/stock/delete";
    const res = await LG_axios.deleteJson(url, params);
    SimpleMessage("删除成功");
    return res;
  } catch (err) {
    console.log(err);
    ErrNotify("删除出现错误");
  }
}

// 更新表格信息信息
export async function updateData(params) {
  try {
    const url = "/sm/stock/update";
    const res = await LG_axios.put(url, params);
    SimpleMessage("更新成功");
    return res;
  } catch (err) {
    console.log(err);
    ErrNotify("更新错误");
  }
}

// 查询
export async function queryData(params, page_para, loading) {
  try {
    // console.log(api_config);
    const url = "/sm/stock/query";
    // console.log("params", params);
    params = Object.assign(params, page_para);
    // console.log("params", params);
    const res = await LG_axios.get(url, params);
    // console.log("res11111", res);
    SimpleMessage("查询成功");
    return res;
  } catch (err) {
    console.log(err);
    ErrNotify("查询出错");
  }
}
