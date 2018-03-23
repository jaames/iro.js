const { version } = require("./package");

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
  format: ["umd", "umd-min"],
  moduleName: "iro",
  js: "buble",
  env: {
    VERSION: version
  }
}