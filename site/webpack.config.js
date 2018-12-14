var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var Clean = require('clean-webpack-plugin');
//代理的配置参数
var Config = require('./src/config/config.dev.js');

var BUILD_DIRNAME = 'build';
var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(__dirname, BUILD_DIRNAME);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var pkg = require('./package.json');
//获取npm run 后面的命令
var TARGET = process.env.npm_lifecycle_event;


var env = process.env.WEBPACK_ENV;
var outputFile;


var common = {
    entry: {
        app:path.resolve(APP_PATH, 'entries/index')//'./src/index'
    },
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js'
    },
    resolve: {
        modulesDirectories: ['node_modules', './src','./src/components', './src/layout'],
        extensions: ['', '.js', '.jsx','.json'],
        alias: {
            'sinon': 'sinon/pkg/sinon'
        }
    },
    externals:{
        'jsdom': 'window',
        //注释掉cheerio，否则会报TypeError: _cheerio2.default.load is not a function的错误
        // 'cheerio': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/addons': true,
        'react/lib/ReactContext': 'window'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: [ 'babel'],
                exclude: /node_modules/,
                // include: APP_PATH //这里因为要编译test下面的文件，所以要注释掉
            },
            {
              test: /\.md$/,
              loader: 'babel!react-markdown'
            },
            {
                test: /\.json$/,
                loader: 'json',
            },
            {
                test: /\.png|jpg|jpeg|gif|svg$/,
                loader: "url"
            },
            {test: /\.TTF$/, loader: 'file?name=fonts/[name].[ext]'},
            {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?name=fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream'},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=fonts/[name].[ext]'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?name=fonts/[name].[ext]&limit=10000&mimetype=image/svg+xml'}

        ]
    },
    plugins: [
        new HtmlwebpackPlugin({
            title: 'BBD',
            template:path.resolve(APP_PATH, 'entries/index.html'), //html模板路径
            filename: 'index.html',
            inject:true,  //允许插件修改哪些内容，包括head与body
            hash:false //为静态资源生成hash值
        }),
        //webpack就能够比对id的使用频率和分布来得出最短的id分配给使用频率高的模块
        new webpack.optimize.OccurenceOrderPlugin(),
        //允许错误不打断程序
        new webpack.NoErrorsPlugin(),
        //样式代码去重
        new webpack.optimize.DedupePlugin(),
        // 添加jquery插件
        new webpack.ProvidePlugin({
            $: 'jquery',
            "jQuery": 'jquery'
        }),
    ]
}

//如果是启动或者测试
if(TARGET == 'start' || TARGET.indexOf('test') > -1){
    var config = merge(common, {
        //devtool: 'cheap-module-eval-source-map',//'eval-source-map'
        devtool:'cheap-module-eval-source-map',
        module:{
            loaders:[
                {
                    test:/\.less$/,
                    loader:'style!css?modules&importLoaders=1&localIdentName=[local]_[hash:base64:5]!less?sourceMap=true' //postcss
                    // loader:'style!css?modules!less' //postcss
                },
                {
                    test:/\.css$/,
                    // loader:['style','css?modules'],//postcss
                    loader:'style!css',//postcss
                    // include:APP_PATH
                }
            ]
        },
        devServer: {
            port: Config.port,
            // contentBase: './demo',
            historyApiFallback: true,
            // hot: true, // remember to add --hot to start script
            inline: true,
            progress: true,
            host:'0.0.0.0',
            proxy:Config.proxy
        },
        plugins: [
            //是否注释掉这行代码
            // new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                DEBUG: true,
                'process.env': {
                    'NODE_ENV': JSON.stringify('development')
                }
            })
        ]
    })

}

//打包到生产环境中
if(TARGET == 'build'){
    var config = merge(common,{
        entry: {
            vendor: Object.keys(pkg.dependencies),
            app:'./src/entries/index.js'
            //app: path.resolve(APP_PATH, 'index.js')
        },
        // devtool: 'inline-source-map',
        /* important! */
        output: {
            path: BUILD_PATH,
            filename: '[name].js?'
        },
        // devtool: 'cheap-module-source-map',
        module: {
            loaders: [
                {
                    test: /\.less$/,
                    loader: ExtractTextPlugin.extract('css-loader?modules&importLoaders=1&localIdentName=[local]_[hash:base64:5]!'  + 'less'),//+ 'postcss!'
                    // include: APP_PATH
                },
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),//postcss
                    // include: APP_PATH
                }
            ]
        },
        plugins: [
            new Clean([BUILD_DIRNAME]),
            // new ExtractTextPlugin('styles.[chunkhash].css'),
            new ExtractTextPlugin('styles.css', { allChunks: true }),
            new webpack.optimize.CommonsChunkPlugin(
                'vendor',
                '[name].js'
                // '[name].[chunkhash].js'
            ),

            new webpack.DefinePlugin({
                DEBUG: false,
                'process.env': {
                    // This affects react lib size
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            // new webpack.optimize.UglifyJsPlugin({
            //     compress: {
            //         warnings: false,
            //         // 用于压缩的时候去除log
            //         drop_debugger:true,
            //         drop_console:true
            //     }
            // })
        ]
    });

}


module.exports = config;