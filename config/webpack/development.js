var fs = require('fs')
var path = require('path')
var webpack = require('webpack')

var rootPath = __dirname + '/../../';
var webPath = rootPath + "web/apps/"
module.exports = {

  devtool: 'inline-source-map',

  entry: fs.readdirSync(webPath).reduce(function (entries, dir) {
    if (dir === "comm" || dir === "public") {
      return entries;
    }
    if (fs.statSync(path.join(webPath, dir)).isDirectory())
      entries[dir] = [path.join(webPath, dir, 'app.js')]
      //entries[dir] = ["babel-core/polyfill", path.join(webPath, dir, 'app.js')]

    return entries
  }, {}),

  output: {
    path: rootPath + '/build',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/build/'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css$/, loader: 'style!css' }
    ]
  },

  plugins: [
    //new webpack.optimize.CommonsChunkPlugin('shared.js'),
    //new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]

}

