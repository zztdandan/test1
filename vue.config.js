const devConfig = require("./config/dev.env");

const proxyTableName = process.env.proxyTableName || "proxyTable";
const proxyTable = devConfig[proxyTableName];
// 基础路径 注意发布之前要先修改这里
const publicPath = "./";
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
  publicPath: publicPath, // 根据你的实际情况更改这里
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    // open: process.platform === 'darwin',
    host: "localhost",
    port: 8877,
    https: false,
    hotOnly: false,
    disableHostCheck: true,
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
    proxy: proxyTable, // string | Object
    before: app => {}
  },
  // configureWebpack: config => {
  //     if (process.env.NODE_ENV === 'production') {
  //         return {
  //             plugins: [
  //                 new BundleAnalyzerPlugin()
  //             ]
  //         }
  //     }
  // },
  chainWebpack: config => {
    // 忽略的打包文件
    config.externals({
      vue: "Vue",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      axios: "axios",
      "element-ui": "ELEMENT"
    });
    const entry = config.entry("app");
    entry.add("babel-polyfill").end();
    entry.add("classlist-polyfill").end();
    // entry.add("@/mock").end();
  }
};
