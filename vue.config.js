module.exports ={

    publicPath:'/',//资源公共路径

    outputDir:'dist',//打包输出路径

    assetsDir:'assets',//静态资源目录

    configureWebpack: config => {  //webpack 配置,可以是对象或函数,通过配置替换webpack对象
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
        } else {
            // 为开发环境修改配置...
        }
    },

    chainWebpack: config => { //webpack 链式调用修改配置
        //webpack 链式调用修改配置
    },

    css:{
        loaderOptions:{
            sass:{
                // 这里的选项会传递给 sass-loader,推荐通过这个改，因为这些选项需要应用在使用了相应 loader 的多个地方，不止webpack
            }
        }
    },

    devServer:{
        proxy:{
            '/rest': {
                target: 'http://localhost',
                changeOrigin: true
            },
        }
    }
};
