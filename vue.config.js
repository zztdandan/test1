const devConfig = require("./config/dev.env");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const proxyTableName = process.env.proxyTableName || "proxyTable";
const proxyTable = devConfig[proxyTableName];
const setAlias = require("./vue_config/alias");

// 基础路径 注意发布之前要先修改这里
const publicPath = "./";
const PROD = process.env.NODE_ENV === "production";
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
    publicPath: publicPath, // 根据你的实际情况更改这里
    lintOnSave: false, // 编译时eslint校验代码
    productionSourceMap: false,
    devServer: {
        // open: process.platform === 'darwin',
        host: "localhost",
        port: 9528,
        https: false,
        open: true, // 启动服务后是否打开浏览器
        hotOnly: false,
        disableHostCheck: true,
        // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
        proxy: proxyTable, // string | Object
        before: () => {},
    },
    configureWebpack: config => {
        if (PROD) {
            // 生产环境
            config.plugins.push(
                new CompressionWebpackPlugin({
                    // asset: "[path].gz[query]",
                    // algorithm: "gzip",
                    // test: /\.js$|\.css$|\.html$/,
                    // threshold: 10240,
                })
            );
        } else {
            // 开发环境
        }
    },
    chainWebpack: config => {
        // 忽略的打包文件
        config.externals({
            vue: "Vue",
            "vue-router": "VueRouter",
            vuex: "Vuex",
            axios: "axios",
            "element-ui": "ELEMENT",
        });
        if (PROD) {
            config
                .plugin("webpack-bundle-analyzer")
                .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin, [
                    {
                        analyzerMode: "static",
                        reportFilename: "bundle-report.html",
                        openAnalyzer: false,
                    },
                ]);
        }

        const entry = config.entry("app");
        entry.add("babel-polyfill").end();
        entry.add("classlist-polyfill").end();
        // entry.add("@/mock").end();
        setAlias(config);
                
    },
};
