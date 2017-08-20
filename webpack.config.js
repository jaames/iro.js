"use strict";

const path = require("path");
const webpack = require("webpack");

module.exports = function (env) {

  var isDevMode = (env == "dev");

  // We can mangle (compress) the following props for better minification, since they aren't used publicly
  var mangleProps = [
    // colorModels/*.js
    "toHsv",
    "fromHsv",
    "name",
    // util.dom.js
    "create",
    "append",
    "appendNew",
    "attr",
    "setAttr",
    "append",
    "listen",
    "unlisten",
    "whenReady",
    // ui/svg.js
    "insert",
    "arc",
    "circle",
    "gradient",
  ]

  var config = {
    context: path.resolve(__dirname, "src"),
    entry: "./iro.js",
    output: {
      library: "iro",
      libraryTarget: "var",
      publicPath: "/test",
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
            loader: "babel-loader",
            options: {
              "babelrc": false,
              "presets": ["es2015", "stage-2"]
            }
          }
        }
      ]
    },
    plugins: [
      new webpack.BannerPlugin({
        banner: [
          "iro.js",
          "----------------",
          "Author: James Daniel (github.com/jaames | rakujira.jp)",
          "Last updated: " + new Date().toDateString(),
        ].join("\n")
      }),
    ],
    devtool: "source-map",
    devServer: {
      port: process.env.PORT || 8080,
      host: "localhost",
      publicPath: "http://localhost:8080/test/",
      contentBase: path.join(__dirname, "./"),
      watchContentBase: true,
    }
  }

  if (!isDevMode) {
    config.plugins = config.plugins.concat([
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
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
