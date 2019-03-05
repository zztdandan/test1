import request from "@/router/axios";
import { baseUrl } from "@/config/env";
export const loginByUsername = (username, password, code, redomStr) =>
  request({
    url: baseUrl + "/admin/login",
    method: "get",
    data: {
      username,
      password,
      code,
      redomStr
    }
  });

export const getUserInfo = () =>
  request({
    url: baseUrl + "/amin/sys/user/info",
    method: "get"
  });

/** 未实现 */
export const refeshToken = () =>
  request({
    url: baseUrl + "/user/refesh",
    method: "post"
  });

export const getMenu = (type = 0) =>
  request({
    url: baseUrl + "/user/getMenu",
    method: "get",
    data: {
      type
    }
  });

export const getTopMenu = () =>
  request({
    url: baseUrl + "/admin/sys/menu/list",
    method: "get"
  });

/**
 * TODO: 未实现
 */
export const sendLogs = list =>
  request({
    url: baseUrl + "/user/logout",
    method: "post",
    data: list
  });

export const logout = () =>
  request({
    url: baseUrl + "/user/logout",
    method: "get"
  });
