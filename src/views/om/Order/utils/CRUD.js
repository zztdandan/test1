import api_config from "@/api_config.json";
import { SimpleMessage,  ErrNotify } from "@/business_utils/ele_alert";
import LG_axios from '@/router/axios-wrap';
// 新增订单
export async function createOrder(params) {
   try {
      const url = api_config.om.Order.createOrder;
      const res = await LG_axios.post(url, params);
      SimpleMessage("新增订单成功");
      return res;
   } catch (err) {
      ErrNotify("新增订单出现错误");
   }
}
// createOrder END

// 查询条款列表.支持模糊查询
export async function queryProvision(params) {
   try {
      const url = api_config.om.Order.queryProvision;
      const res = await LG_axios.get(url, params);
      SimpleMessage("查询条款列表.支持模糊查询成功");
      return res;
   } catch (err) {
      ErrNotify("查询条款列表.支持模糊查询出现错误");
   }
}
// queryProvision END

// 更新订单信息
export async function updateOrder(params) {
   try {
      const url = api_config.om.Order.updateOrder;
      const res = await LG_axios.put(url, params);
      SimpleMessage("更新订单信息成功");
      return res;
   } catch (err) {
      ErrNotify("更新订单信息出现错误");
   }
}
// updateOrder END
