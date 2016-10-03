var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, '');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
  entry: {
    app: [
      APP_DIR + '/app.jsx'
    ],
    vendor: [
     'react', 'react-dom'
    ]
  },
  output: {
    path: BUILD_DIR,
    filename: 'index.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
  ],
  module : {
    loaders : [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};

module.exports = config;