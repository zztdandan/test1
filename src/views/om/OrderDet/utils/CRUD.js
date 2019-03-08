import api_config from "@/api_config.json";
import { SimpleMessage, ErrNotify } from "@/business_utils/ele_alert";
import LG_axios from '@/router/axios-wrap';

// 新增订单明细
export async function createorderDet(params) {
   try {
      const url = api_config.om.OrderDet.createorderDet;
      const res = await LG_axios.post(url, params);
      SimpleMessage("新增订单明细成功");
      return res;
   } catch (err) {
      ErrNotify("新增订单明细出现错误");
   }
}
// createorderDet END

// 查询订单列表
export async function queryOrderDet(params) {
   try {
      const url = api_config.om.OrderDet.queryOrderDet;
      const res = await LG_axios.get(url, params);
      SimpleMessage("查询订单列表成功");
      return res;
   } catch (err) {
      ErrNotify("查询订单列表出现错误");
   }
}
// queryOrderDet END

// 更新订单信息
export async function updateOrderDet(params) {
   try {
      const url = api_config.om.OrderDet.updateOrderDet;
      const res = await LG_axios.put(url, params);
      SimpleMessage("更新订单信息成功");
      return res;
   } catch (err) {
      ErrNotify("更新订单信息出现错误");
   }
}
// updateOrderDet END
