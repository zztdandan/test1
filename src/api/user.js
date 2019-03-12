import lgAxios from "@/router/axios-wrap";
import { baseUrl } from "@/config/env";
export const loginByUsername = (username, password, code, redomStr) =>
  lgAxios.post(baseUrl + "/admin/login", {
    username,
    password,
    code,
    redomStr
  });

export const getUserInfo = () => lgAxios.get(baseUrl + "/admin/sys/user/info");

/** 未实现 */
export const refeshToken = () => lgAxios.post(baseUrl + "/user/refesh");

export const getMenu = (type = 0) =>
  lgAxios.get(baseUrl + "/admin/sys/user/menu", { type });

export const getTopMenu = () =>
  lgAxios.get(baseUrl + "/admin/sys/user/top-menu");

/**
 * TODO: 未实现
 */
export const sendLogs = list => lgAxios.post(baseUrl + "/user/logout", list);

export const logout = () => lgAxios.get(baseUrl + "/admin/sys/user/logout");
