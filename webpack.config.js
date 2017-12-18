const path = require('path');
var fs = require('fs');
var webpack = require('webpack');

module.exports = {
  entry: {
    'example': './examples/index.js'
  },
  output: {
    path: path.resolve(__dirname),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      include: [path.resolve(__dirname)],
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env', 'stage-2'],
          plugins: ['transform-runtime']
        }
      }
    }]
  },
  resolve: {
    alias: {}
  },
  devtool: 'source-map',
  devServer: {
    //
    contentBase: [path.join(__dirname, 'examples/'), path.join(__dirname)],
    watchContentBase: true,
    port: 8011,
    compress: true,
    stats: 'minimal',
    inline: true,
    open: true
    // https: true,
    // proxy: {
    //     // 工单管理
    //     "/api": {
    //         pathRewrite: {"^/api": "http://mock.bbfe.group/mock/5a1e89e8d3ef9a75725992d3/snc/api"},
    //         logLevel: 'debug',
    //         secure: false,
    //         changeOrigin: true
    //     }
    // }
  }
};
