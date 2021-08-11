
module.exports = {
    publicPath: '/', 
    runtimeCompiler: true,
    lintOnSave: false,
    devServer: {
        open: true,
        hot: true,
        proxy: {
            '/test': {
                target: 'http://sit.oa.plushe.com',
                pathRewrite: {
                  '^/test': '',
                },
            },
            '/dev': {
                target: 'http://172.30.41.4:10007',
                pathRewrite: {
                  '^/dev': '',
                },
            },
        }
    },
    css: {
        loaderOptions: {
            
        }
    }
}