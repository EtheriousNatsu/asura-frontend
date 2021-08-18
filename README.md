# asura-frontend
本项目为阿修罗接口测试平台的前端代码，[后端代码传送门](https://github.com/EtheriousNatsu/asura-web)

# 体验地址
[点我](http://120.79.132.106)

# 技术栈
* vue
* vuex
* vue-router
* axios
* bootstrap-vue
* vue-chartjs
* open-iconic
* vee-validate
* vue-autosuggest
* vue-codemirror
* vue-moment
* vue-select
* vuedraggable
* vuex-persistedstate

# 项目结构
```bash
├── README.md
├── build                       ;构建相关
├── compose                     ;Dockerfile
├── config                      ;环境配置
├── index.html
├── local.yml                   ;本地部署文件
├── package-lock.json
├── package.json
├── production.yml              ;生产部署文件
├── src
│   ├── App.vue
│   ├── assets
│   ├── components              ;公用组件
│   ├── config
│   │   ├── env.js              ;环境变量
│   │   ├── errorHandler.js     ;异常处理
│   │   ├── fetch.js            ;请求工具
│   │   └── utils.js            ;工具方法
│   ├── constant                ;常量
│   ├── main.js                 ;程序入口
│   ├── pages                   ;页面
│   ├── router                  ;路由
│   ├── service                 ;api接口
│   ├── store                   ;状态
│   ├── toast                   ;页面提示
│   └── utils
└── static                      ;静态资源
```

# 本地开发
```bash
docker-compose -f local.yml up
```

# 生产部署
1.首先需要
```
docker-compose -f production.yml up
```