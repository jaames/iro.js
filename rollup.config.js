import path from 'path';
import { version } from './package.json';
import buble from 'rollup-plugin-buble';
import alias from 'rollup-plugin-alias';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const build = process.env.BUILD || "development";
const devserver = process.env.DEV_SERVER || false;
const esmodule = process.env.ES_MODULE || false;
const prod = build === "production";

const banner = `/*!
 * iro.js v${version}
 * 2016-2019 James Daniel
 * Licensed under MPL 2.0
 * github.com/jaames/iro.js
 */
`

module.exports = {
  input: 'src/iro.js',
  output: [
    esmodule ? {
      file: 'dist/iro.es.js',
      format: 'es',
      name: 'iro',
      banner: banner,
      sourcemap: true,
      sourcemapFile: 'dist/iro.es.map'
    } : {
      file: prod ? 'dist/iro.min.js' : 'dist/iro.js',
      format: 'umd',
      name: 'iro',
      banner: banner,
      sourcemap: true,
      sourcemapFile: prod ? 'dist/iro.min.js.map' : 'dist/iro.js.map'
    }
  ].filter(Boolean),
  plugins: [
    alias({
      resolve: ['.jsx', '.js'],
      'ui': path.resolve(__dirname, 'src/ui/'),
      'util': path.resolve(__dirname, 'src/util/'),
      'modules': path.resolve(__dirname, 'src/modules/'),
    }),
    replace({
      VERSION: JSON.stringify(version),
      PROD: prod ? 'true' : 'false',
      DEV_SERVER: devserver ? 'true' : 'false'
    }),
    buble({
      jsx: 'h',
      objectAssign: 'Object.assign',
      transforms: {
      }
    }),
    nodeResolve(),
    commonjs(),
    devserver ? serve() : false,
    devserver ? livereload() : false,
    // only minify if we're producing a non-es production build
    prod && !esmodule ? uglify({
      output: {
        comments: function(node, comment) {
          if (comment.type === 'comment2') {
            // preserve banner comment
            return /\!/i.test(comment.value);
          }
          return false;
        }
      }
    }) : false,
  ].filter(Boolean)
};