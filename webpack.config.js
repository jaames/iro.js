"use strict";

const path = require('path');
const webpack = require('webpack');

const config = require('./package.json');
require('dotenv').config();

const PROD = process.env.NODE_ENV === 'production';

const CONFIG = {
  sourceDir: "src",
  buildDir: "dist",
  js: {
    input: "iro.js",
    output: (PROD) ? "iro.min.js" : "iro.js",
    babelPresets: ["es2015", "stage-2"],
    // We can mangle (compress) the following props for better minification, since they aren't used publicly
    mangleProps: [
      // colorModels/*.js
      "toHsv",
      "fromHsv",
      "name",
      // util.dom.js
      "create",
      "attr",
      "append",
      "listen",
      "unlisten",
      "whenReady",
      // ui/gradient.js
      "radial",
      "linear"
    ]
  },
  bannerText: [
    "iro.js",
    "----------------",
    "Author: James Daniel (github.com/jaames | rakujira.jp)",
    "Last updated: " + new Date().toDateString(),
  ].join("\n")
}

const prependBanner = new webpack.BannerPlugin({
  banner: CONFIG.bannerText,
  raw: false,
  entryOnly: true
});

const uglifyJs = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
  },
  mangle: {
    props: {
      // Mangle protected properties (which start with "_"), and combine all the ones listed in the config
      regex: new RegExp("^_|" + CONFIG.js.mangleProps.join("$|"))
    },
  }
});

const productionMode = new webpack.DefinePlugin({
  "process.env": {
    NODE_ENV: '"production"'
  }
});

let plugins = (PROD) ? [productionMode, uglifyJs, prependBanner] : [prependBanner];

module.exports = {
  entry: path.resolve(__dirname, CONFIG.sourceDir, CONFIG.js.input),
  devtool: 'source-map',
  output: {
    library: process.env.NAME,
    libraryTarget: process.env.TARGET,
    path: path.resolve(__dirname, CONFIG.buildDir),
    //path: __dirname,
    filename: CONFIG.js.output,
    publicPath: CONFIG.buildDir
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          babelrc: false,
          presets: CONFIG.js.babelPresets,
        }
      }
    ]
  },
  plugins: plugins,
};
