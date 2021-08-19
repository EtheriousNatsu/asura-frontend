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
0. 在本地修改当前目录下的`conifg/prod.env.js.VUE_APP_SERVER_URL`,指向你的部署服务器地址
1. 在本地使用命令`docker-compose -f local.yml up`下载依赖库
2. 在本地使用命令`npm run build`进行构建
3. 把整个项目上传到服务器上
4. 在服务器上使用命令`docker-compose -f production.yml up -d`启动服务

PS:使用本地构建的原因是，如果服务器内存小的话，在服务器上可能构建失败