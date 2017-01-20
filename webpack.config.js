const path = require('path');
const config = require('./package.json');

const webpack = require('webpack');
require('dotenv').config();

const PROD = process.env.NODE_ENV === 'production';

let plugins = [];

PROD ? [
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }))
  ] : '';

module.exports = {
  entry: path.resolve(__dirname, config.main),
  devtool: 'source-map',
  output: {
    library: process.env.NAME,
    libraryTarget: process.env.TARGET,
    path: __dirname,
    filename: (PROD) ? 'build/iro.min.js' : 'build/iro.js'
  },
  module: {
    loaders: [
      {test: /\.es6?$/, exclude: /node_modules/, loader: 'babel'}
    ]
  },
  plugins: plugins
};
