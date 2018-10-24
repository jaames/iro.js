const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const version = require("./package.json").version;

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";
const devserver = process.env.DEV_SERVER || false;

module.exports = {
  mode,
  entry: [
    "./src/iro.js",
    devserver ? "./src/test.js" : false
  ].filter(Boolean),
  output: {
    path: path.resolve(__dirname, "build"),
    library: 'iro',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  resolve: {
    extensions: [".js"],
    alias: {
      "ui": path.resolve(__dirname, "src/ui/"),
      "util": path.resolve(__dirname, "src/util/"),
      "colorModels": path.resolve(__dirname, "src/colorModels/"),
      "modules": path.resolve(__dirname, "src/modules/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-transform-react-jsx', {pragma: "h"}]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: [
        "iro.js v" + version,
        "2017-2018 James Daniel",
        "Released under the MIT License",
        "github.com/jaames/backdrop",
      ].join("\n")
    }),
    devserver ? new HtmlWebpackPlugin() : false
  ].filter(Boolean),
  devtool: "source-map",
}