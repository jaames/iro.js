"use strict";

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
  entry: ["webpack/hot/dev-server", "./src/iro.es6"],
  devtool: 'source-map',
  output: {
    library: process.env.NAME,
    libraryTarget: process.env.TARGET,
    path: __dirname + "/build",
    filename: (PROD) ? 'iro.min.js' : 'iro.js',
    publicPath: "/build/"
  },
  module: {
    loaders: [
      {test: /\.es6?$/, exclude: /node_modules/, loader: 'babel'}
    ]
  },
  plugins: plugins,
};
