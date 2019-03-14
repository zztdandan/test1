// 配置编译环境和线上环境之间的切换

let baseUrl = "";
const iconfontVersion = ["567566_pwc3oottzol"];
const iconfontUrl = `//at.alicdn.com/t/font_$key.css`;
const codeUrl = `${baseUrl}/code`;
const env = process.env;
if (env.NODE_ENV === "development") {
  baseUrl = ``; // 开发环境地址
} else if (env.NODE_ENV === "production") {
  baseUrl = ``; // 生产环境地址
} else if (env.NODE_ENV === "test") {
  baseUrl = ``; // 测试环境地址
}
env.reportBaseUrl = "http://172.16.4.148:8080/WebReport/ReportServer?";

export { baseUrl, iconfontUrl, iconfontVersion, codeUrl, env };
