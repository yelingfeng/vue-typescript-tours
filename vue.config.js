const BASE_URL = '/Tours/'
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? BASE_URL : '/',
    outputDir: 'dist',
    lintOnSave: true,
    assetsDir: 'lib',
    runtimeCompiler: true,
    productionSourceMap: false,
    css: {
        loaderOptions: {
            css: {
                localIdentName: '[folder]__[hash:base64:8]',
                camelCase: 'only'
            }
        }
    },
    devServer: {
        open: true,
        port: 8550,
        https: false,
        hotOnly: false,
        proxy: null
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'development') {
            config.devtool = 'source-map'
            // mutate config for production...
        }
        config.externals = {
            jquery: 'jQuery',
            moment: 'moment',
            BMap: 'BMap',
            BMapLib: 'BMapLib'
        }
    }
}
