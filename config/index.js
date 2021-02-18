// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    sitEnv: require('./sit.env'),
    prodEnv: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',          //请根据自己路径配置更改
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {

    env: require('./dev.env'),
    port: 80,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api/auth': {
         target: 'http://192.168.1.55:80',
        // target: 'http://192.168.1.109:9000',
        // target: 'http://erp.hnqst.cn',
        // changeOrigin: true,
        pathRewrite: {
          // '^/api/auth': '/api/auth'
          '^/api/auth': '/api/auth'
        }
      }, 
      '/api/admin': {
        //  target: 'http://192.168.1.164:9000',
          target: 'http://192.168.1.55:80',
        // target: 'http://erp.hnqst.cn',
        // changeOrigin: true,
        pathRewrite: {
          // '^/api/admin': '/'
           '^/api/admin': '/api/admin'

        }
      },
      // 订单管理
      '/api/ordersys': {
           target: 'http://192.168.1.55:80',
       //  target: 'http://192.168.5.188:8091',
        // changeOrigin: true,
        pathRewrite: {
          '^/api/ordersys': '/api/ordersys',
          // '^/api/ordersys': '/'
        }
      },
      // 基础数据
      '/api/basedatasys': {
        // target: 'http://192.168.3.141:9786',
         target: 'http://192.168.1.55:80',
        // changeOrigin: true, // 服务为本地服务，
        pathRewrite: {
           '^/api/basedatasys': '/api/basedatasys',
          // '^/bdCustomer': '/bdCustomer'
        },
      },
      // 订单监控
      '/api/ordertrace': {
         target: 'http://192.168.1.55:80',
        //target: 'http://erp.hnqst.cn',
        pathRewrite: {
          '^/api/ordertrace': '/api/ordertrace'
          // '^/api/ordertrace': '/'
        }
      },
      // 财务
      '/api/financialsys': {
        // target: 'http://192.168.1.55:9000',
        target: 'http://192.168.1.55:80',
        // changeOrigin: true,
        pathRewrite: {
          '^/api/financialsys': '/api/financialsys'
         //  '^/api/financialsys': '/'
        },

      

        // 对接个人后端
        // target: 'http://192.168.1.130:9788',
        // pathRewrite: {
        //   '^/api/financialSys': '/'
        // }

        //mockerjs
        // target: 'http://192.168.1.120:7300/mock/5ad94157eb8d4205d3b0a990',
        // pathRewrite: {
        //   '^/api/financialSys': '/e-finacial'
        // }
      },
      // 采销
      '/api/ordersys/purchase': {
        target: 'http://192.168.1.55:80',
        // target: 'http://192.168.1.250:9088',
        pathRewrite: {
          '^/api/ordersys/purchase': '/api/ordersys/purchase'
        }
    },
      // 一般贸易
      '/api/generaltradesys': {
        //  target: 'http://192.168.1.120:7300/mock/5ad94157eb8d4205d3b0a990',
        //  pathRewrite: {
        //    '^/api/generalTradeSys': '/generalTradeSys'
        //  }

        // 对接个人后端
         target: 'http://192.168.1.3:9988',
        pathRewrite: {
          '^/api/generaltradesys': '/'
        }
      },
      '/api/e-oss': {
        target: 'http://123.207.153.164:9761',
        pathRewrite: {
          '^/api/e-oss': '/'
        }
      },
      '/api/erp-adapter': {
      //  target: 'http://192.168.1.210:8090',
           target: 'http://192.168.1.55:80',
        // changeOrigin: true,
       pathRewrite: {
         //  '^/api/erp-adapter': '/api/erp-adapter'
        '^/api/erp-adapter': '/api/erp-adapter'
       }
     },
     '/api/oms': {
      // target: 'http://192.168.1.210:8090',
      target: 'http://erp.hnqst.cn',
      changeOrigin: true,
      pathRewrite: {
        '^/api/oms': '/api/oms'
        // '^/api/erp-adapter': '/'
      }
    }
      // '/api/e-oss':{
      //   target: 'http://123.207.153.164:9000',
      //   pathRewrite: {
      //     '^/api/e-oss': '/api/e-oss'
      //  }
      // }
    },

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
