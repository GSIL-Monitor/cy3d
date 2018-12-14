/*
 * @author: Jay Mark
 * @email: jay.mj@alibaba-inc.com
 * @website: http://majie.co
 * @created: 2017-02-22
 *
 * @description: webpack config file
 */


var TARGET = process.env.npm_lifecycle_event

var path = require('path'),
    webpack = require('webpack'),
    HtmlwebpackPlugin = require('html-webpack-plugin'),
    Clean = require('clean-webpack-plugin')

var ROOT_PATH = path.resolve(__dirname),
    SRC_PATH = path.resolve(ROOT_PATH, "src"),
    DEMO_PATH = path.resolve(ROOT_PATH, "demo"),
    BUILD_PATH = path.resolve(ROOT_PATH, "build")

var exportConfig = null

if (TARGET === 'start') {
  exportConfig = {
    entry: {},
    output: {
      path: BUILD_PATH,
      filename: '[name].js?'
    },
    resolve: {
      extensions: ['.js']
    },
    module: {
      loaders: [
        {
          test: /\.js?$/,
          loaders: ['babel-loader'],
          include: [SRC_PATH, DEMO_PATH]
        },
        {
          test:/\.css$/,
          loader:'style-loader!css-loader'
        },
        {
          test: /\.png|jpg|jpeg|gif|svg$/,
          loader: "url-loader"
        }
      ]
    },
    devtool: 'eval-source-map',
    devServer: {
      host: '0.0.0.0',
      port: 7077,
      historyApiFallback: true,
      hot: true,
      inline: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'DEBUG': true
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      new HtmlwebpackPlugin()
    ]
  }

  function generateDemoHtmls () {
    var excludeChunks = []
    var otherEntries = require('./.geekpack.json')
    for (var name in otherEntries) {
      var htmlPlugin = new HtmlwebpackPlugin({
        title: name,
        filename: name+".html",
        chunks: [name]
      })

      exportConfig.entry[name] = path.resolve(DEMO_PATH, otherEntries[name])
      exportConfig.plugins.push(htmlPlugin)
      excludeChunks.push(name)
    }

    var appHtmlPlugin = new HtmlwebpackPlugin({
      title: 'App',
      filename: "index.html",
      // template: 'src/htmlTemplate/app.html',
      inject: true,
      excludeChunks: excludeChunks
    })
    exportConfig.plugins.push(appHtmlPlugin)
  }

  generateDemoHtmls()

}

if (TARGET === 'build') {
  exportConfig = {
    entry: path.resolve(SRC_PATH, 'index.js'),
    output: {
      path: BUILD_PATH,
      filename: 'cy3d.js',
      libraryTarget: 'umd',
      library: 'CY3D'
    },
    resolve: {
      extensions: ['.js']
    },
    module: {
      loaders: [
        {
          test: /\.js?$/,
          loaders: ['babel-loader'],
          include: SRC_PATH
        },
        {
          test:/\.css$/,
          loader:'style-loader!css-loader'
        },
        {
          test: /\.png|jpg|jpeg|gif|svg$/,
          loader: "url-loader"
        }
      ]
    },
    plugins: [
      new Clean([BUILD_PATH]),
      new webpack.DefinePlugin({
        DEBUG: false
      })
    ]
  }
}

module.exports = exportConfig