const { version } = require("./package");
const path = require("path");

const banner = `/*!
 * iro.js v${version}
 * 2016-2018 James Daniel
 * Released under the MIT License
 * github.com/jaames/iro.js
 */
`

module.exports = {
  banner,
  input: "./src/iro.js",
  format: ["umd", "umd-min", "es"],
  moduleName: "iro",
  js: "buble",
  alias: {
    "ui": path.resolve(__dirname, "src/ui/"),
    "util": path.resolve(__dirname, "src/util/"),
    "colorModels": path.resolve(__dirname, "src/colorModels/"),
    "modules": path.resolve(__dirname, "src/modules/"),
  },
  env: {
    VERSION: version
  }
}
