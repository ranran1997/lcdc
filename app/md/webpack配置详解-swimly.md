# webpack配置
webpack前前后后也折腾过很多次了，每次也都是弄个似懂非懂也就放弃了，也就相当于研究一门语言，成功运行hello world就放弃是一样的，这次就对这么久研究的成果做个汇总，方便日后查询。
## 安装
``` bash
$ npm init
$ npm install webpack --save-dev # 全局安装依赖
# or
$ npm install webpack-dev-server --save-dev # 安装webpack调试工具
```
<!--more-->
## 基本配置
``` javascript
// config/webpack.config.js
const webpack = require('webpack');

// 配置目录
// 因为我们的webpack.config.js文件不在项目根目录下，所以需要一个路径的配置
const path = require('path');
const CURRENT_PATH = path.resolve(__dirname); // 获取到当前目录
const ROOT_PATH = path.join(__dirname, '../'); // 项目根目录
const MODULES_PATH = path.join(CURRENT_PATH, './node_modules'); // node包目录
const BUILD_PATH = path.join(CURRENT_PATH, './public/assets'); // 最后输出放置公共资源的目录

module.exports = {
  context: path.join(__dirname, '../'), // 设置webpack配置中指向的默认目录为项目根目录
  entry: {
    index: './public/pages/index.js',
    public: './public/pages/public.js'
  },
  output: {
    path: BUILD_PATH, // 设置输出目录
    filename: '[name].bundle.js', // 输出文件名
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.coffee'] // 配置简写，配置过后，书写该文件路径的时候可以省略文件后缀
  },
  module: {
    loaders: [
      // loader 扔在这里
    ]
  },
  plugins: [
    // 插件扔在这里
  ]
}
```
## loader
根据项目需求安装对应的loader，loader一般以 功能名称_loader命名，下面就less的配置进行安装loader
``` bash
$ npm install less --save-dev # install less

$ npm install css-loader style-loader --save-dev # install style-loader, css-loader

$ npm install less less-loader --save-dev # 基于style-loader,css-loader
```
### install url loader
用来处理图片和字体文件
``` bash
$ npm install file-loader --save-dev
$ npm install url-loader --save-dev
```
### install babel loader
写es6必须的loader
``` bash
$ npm install babel-loader babel-core babel-preset-es2015 --save-dev
```
### 修改config的loader部分
``` javascript
// config/webpack.config.js

module.exports = {
  module: {
    loaders: [
      // style & css & less loader
      { test: /\.css$/, loader: "style-loader!css-loader"},
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader")},
      // babel loader
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: ['babel-loader'],
        query: {
          presets: ['es2015']
          // 如果安装了React的话
          // presets: ['react', 'es2015']
        }
      },
      // image & font
      { test: /\.(woff|woff2|eot|ttf|otf)$/i, loader: 'url-loader?limit=8192&name=[name].[ext]'},
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url-loader?limit=8192&name=[name].[ext]'},
    ]
  }
}
```
## 插件
ExtractTextPlugin：分离css，最讨厌webpack打包之后生成一坨行业css。
``` bash
# install ExtractTextPlugin
$ npm install extract-text-webpack-plugin --save-dev
```
### 修改config的plugins
``` javascript
// config/webpack.config.js

const ExtractTextPlugin = require("extract-text-webpack-plugin");

module: {
  loaders: [
    // 把之前的style&css&less loader改为
    { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
    { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!less') },
  ]
},
plugins: [
  // 分离css
  new ExtractTextPlugin('[name].bundle.css', {
    allChunks: true
  }),
]
```
## 设置jQuery全局变量
虽然jQuery已经略显老土，但是平常工作中我们还是不可避免的要用到，如果我们把jQuery设置成全局变量，这样又可以方便使用我们所熟悉的$了。
``` bash
$ npm install jquery --save-dev

# 安装 expose-loader
$ sudo npm install expose-loader --save
```
``` javascript
// config/webpack.config.js

module: {
  loaders: [
    // expose-loader将需要的变量从依赖包中暴露出来
    { test: require.resolve("jquery"), loader: "expose?$! expose?jQuery" }
  ]
},
plugins: [
  // 把jquery作为全局变量插入到所有的代码中
  // 然后就可以直接在页面中使用jQuery了
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery'
  }),
]
```
## CommonsChunkPlugin抽取公共资源
``` javascript
// config/webpack.config.js

entry: {
  jquery: ['jquery']
},
plugins: [
  // public sources
  new webpack.optimize.CommonsChunkPlugin({
    // 与 entry 中的 jquery 对应
    name: 'jquery',
    // 输出的公共资源名称
    filename: 'common.bundle.js',
    // 对所有entry实行这个规则
    minChunks: Infinity
  }),
]
```
## UglifyJsPlugin代码压缩混淆
``` javascript
// config/webpack.config.js

plugins: [
  new webpack.optimize.UglifyJsPlugin({
    mangle: {
      except: ['$super', '$', 'exports', 'require']
      //以上变量‘$super’, ‘$’, ‘exports’ or ‘require’，不会被混淆
    },
    compress: {
      warnings: false
    }
  })
]
```
## react开发
react+webpack+redux所谓是标配，下面就走起：
``` bash
# react
$ npm install react --save
$ npm install react-dom --save

# 喜欢redux?
$ npm install --save redux # redux
$ npm install --save react-redux # 和react配合
$ npm install --save redux-thunk # middleware

# 如果已经装了babel可以忽略下面这条
$ npm install babel-loader babel-core babel-preset-es2015 --save-dev

# 但是要用React的话一定记得安装下面这个
$ npm install babel-preset-react --save-dev
```
``` javascript
loaders: [
  {
    test: /\.jsx?$/,
    exclude: /(node_modules|bower_components)/,
    loader: ['babel-loader'],
    query: {
      presets: ['react', 'es2015']
    }
  }
]
```
## 呃，bug
在最新的React，如果按照上面的配置使用的话，会出现如下警告：
``` bash
Warning: It looks like you're using a minified copy of the development build of React. When deploying React apps to production, make sure to use the production build which skips development warnings and is faster. See https://fb.me/react-minification for more details.
```
在Webpack的plugins里添加：
``` javascript
new webpack.DefinePlugin({
  "process.env": { 
     NODE_ENV: JSON.stringify("production") 
   }
})
```