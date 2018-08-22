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
  input: "./src/index.js",
  format: ["umd", "umd-min", "es"],
  moduleName: "iro",
  js: "buble",
  alias: {
    "components": path.resolve(__dirname, "src/components/"),
    "util": path.resolve(__dirname, "src/util/")
  },
  env: {
    VERSION: version
  }
}