# e-admin-ui 
## 准备工作
- node.js环境（npm包管理器）
- vue-cli 脚手架构建工具
- cnpm  npm的淘宝镜像
- Visual Studio Code 2017 前端开发环境

## 开发运行
```bash
   
    # 安装依赖
    npm install
    //or # 建议不要用cnpm  安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
    

    # 本地开发 开启服务
    npm run dev
```
#由于单点登录重定向改成以下登录方式（根据测试环境域名修改）
浏览器访问 http://sso.qst.com/erpLogin.html?redirect_url=http://erpui.qst.com/api/auth/jwt/setCookie#/
hosts文件新增 127.0.0.1 erpui.qst.com

## 发布
```bash
    # 发布测试环境 带webpack ananalyzer
    npm run build:sit-preview

    # 构建生成环境
    npm run build:prod
```
### 使用nginx部署，配置参考
```
  location / {
        # 指向我们打包后上传的前端文件
        root /opt/nginx/dist;
        index index.html;
    }
    location /jwt/ {
        # 转发请求到后端服务网关--认证api服务
        proxy_pass http://127.0.0.1:8765/jwt/;
    }
          
    location /api/ {
        # 转发请求到后端服务网关--业务数据api服务
        proxy_pass http://127.0.0.1:8765/api/;
     }
```
### 使用nodejs部署，配置参考
```
        proxyTable: {
          '/jwt': {
            target: 'http://localhost:8765',
            pathRewrite: {
              '^/jwt': '/jwt'
            },
          },
          '/api':{
            target: 'http://localhost:8765',
            pathRewrite: {
              '^/api': '/api'
            },
          }
        }

```

## 目录结构
```shell
├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令
│   ├── filtres                // 全局filter
│   ├── mock                   // mock数据
│   ├── router                 // 路由
│   ├── store                  // 全局store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── view                   // view
│   ├── App.vue                // 入口页面
│   └── main.js                // 入口 加载组件 初始化等
├── static                     // 第三方不打包资源
│   ├── jquery
│   └── Tinymce                // 富文本
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json

```

## 状态管理
后台只有user和app配置相关状态使用vuex存在全局，其它数据都由每个业务页面自己管理。

## 开源框架
组件UI：element-ui 1.4.9
http://element-cn.eleme.io/#/zh-CN/component/installation

