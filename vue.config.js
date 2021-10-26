const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const SentryPlugin = require("@sentry/webpack-plugin");

module.exports ={

    publicPath:'/',//资源公共路径

    outputDir:'dist',//打包输出路径

    assetsDir:'assets',//静态资源目录

    chainWebpack: config => { //webpack 链式调用修改配置
        config
        .when(process.env.NODE_ENV === 'production',
            config => config.devtool('source-map'),
            config => config.devtool('source-map')
        )
        .plugin("lodashReplace").use(new LodashModuleReplacementPlugin());


        if(process.env.NODE_ENV === 'production'){
            config.plugin('SentryPlugin')
                .use(SentryPlugin,[{
                    release: process.env.VUE_APP_RELEASE,
                    include: "./dist",
                }])
        }
    },

    css:{
        loaderOptions:{
            sass:{
                // 这里的选项会传递给 sass-loader,推荐通过这个改，因为这些选项需要应用在使用了相应 loader 的多个地方，不止webpack
            }
        }
    },

    devServer:{
        open:true,
        proxy:{
            '/rest': {
                target: 'http://localhost',
                changeOrigin: true
            },
        }
    }
};
