首先需要确保已经安装了nodejs环境，version >= 4.0

### 如何启动本项目
```js
$ cd envobgm/client
$ npm install -g cnpm --registry=https://registry.npm.taobao.org （安装淘宝镜像）
$ cnpm install
$ npm start
```

### npm命令说明
```
启动项目            $ npm start 访问http://localhost:5055
启动mock服务器      $ npm run mock
项目打包            $ npm run build
```


### 目录说明
```shell
├── /node_modules/                  # package.json中依赖的存放目录
├── /src/                           # 源代码 
│   ├── /components/                # 组件开发目录
│   │   ├── /common/                # 公用功能组件
│   │   ├── /mod/                   # 公用页面组件
│   │   ├── /pages/                 # 页面组件
│   ├── /config/                    # 配置文件，url、代理等
│   ├── /entries/                   # 页面入口文件，index.html和index.js
│   ├── /layout/                    # 公共菜单栏组件
│   ├── /mock_api/                  # 存放mock数据
│   ├── /routes/                    # 路由配置
│   ├── /servers/                   # 后台接口配置和异步请求的封装
│   ├── /resources/                 # 公共样式及静态资源
│   │   ├── /css                    # 公共的样式
│   │   ├── /fonts                  # iconfont及字体资源
│   │   ├── /images                 # 图片资源
├── .babelrc                        # babel的配置文件
├── .gitignore                      # 配置不需要进行git版本管理的文件
├── package.json                    # npm依赖配置文件
├── README.md                       # 项目说明文件
├── webpackage.config.js            # webpack的配置文件
```
