"use strict";

const path = require("path");
const webpack = require("webpack");
const version = require("./package.json").version;

module.exports = function (env) {

  var isDevMode = (env == "dev");

  // We can mangle (compress) the following props for better minification, since they aren't used publicly
  var mangleProps = [
    // ui/svg.js
    "insert",
    "setAttrs",
    "setTransform",
    "arc",
    "circle",
    "gradient",
    "class",
    // "color",
    "stopColor",
    "stopOpacity",
    "offset",
    "opacity",
    "stroke",
    "strokeWidth",
    "fill",
    // "translate",
    // "rotate",
    // "scale"
  ]

  var config = {
    context: path.resolve(__dirname, "src"),
    entry: "./iro.js",
    output: {
      library: "iro",
      libraryTarget: "umd",
      path: path.resolve(__dirname, "dist"),
      filename: isDevMode ? "iro.js" : "iro.min.js",
      sourceMapFilename: isDevMode ? "iro.js.map" : "iro.min.js.map",
    },
    resolve: {
      extensions: [".js"],
      alias: {
        "ui": path.resolve(__dirname, "src/ui/"),
        "util": path.resolve(__dirname, "src/util/"),
        "colorModels": path.resolve(__dirname, "src/colorModels/"),
        "modules": path.resolve(__dirname, "src/modules/"),
      }
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    },
    plugins: [
      new webpack.BannerPlugin({
        banner: [
          "iro.js v" + version,
          "2016-2018 James Daniel",
          "Released under the MIT license",
          "github.com/jaames/iro.js"
        ].join("\n")
      }),
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(version)
      })
    ],
    devtool: "source-map",
    devServer: {
      port: process.env.PORT || 8080,
      host: "localhost",
      publicPath: "http://localhost:8080",
      contentBase: path.join(__dirname, "./"),
      watchContentBase: true,
    }
  }

  if (!isDevMode) {
    config.plugins = config.plugins.concat([
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        mangle: {
          props: {
            // Mangle protected properties (which start with "_"), and combine all the ones listed in the config
            regex: new RegExp("^_|" + mangleProps.join("$|"))
          }
        }
      })
    ]);
  }

  return config;
};
