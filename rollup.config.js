import { version } from './package.json';
import alias from '@rollup/plugin-alias';
import buble from '@rollup/plugin-buble';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import bundleSize from 'rollup-plugin-bundle-size';

const build = process.env.BUILD || "development";
const devserver = process.env.DEV_SERVER || false;
const esmodule = process.env.ES_MODULE || false;
const prod = build === "production";

const banner = `/*!
 * iro.js v${version}
 * 2016-2020 James Daniel
 * Licensed under MPL 2.0
 * github.com/jaames/iro.js
 */
`

module.exports = {
  input: 'src/index.ts',
  output: [
    esmodule ? {
      file: 'dist/iro.es.js',
      format: 'es',
      name: 'iro',
      banner: banner,
      sourcemap: devserver ? true : false,
      sourcemapFile: 'dist/iro.es.map'
    } : {
      file: prod ? 'dist/iro.min.js' : 'dist/iro.js',
      format: 'umd',
      name: 'iro',
      banner: banner,
      sourcemap: devserver ? true : false,
      sourcemapFile: prod ? 'dist/iro.min.js.map' : 'dist/iro.js.map'
    }
  ].filter(Boolean),
  plugins: [
    bundleSize(),
    nodeResolve(),
    alias({
      resolve: ['.jsx', '.js'],
    }),
    replace({
      VERSION: JSON.stringify(version),
      PROD: prod ? 'true' : 'false',
      DEV_SERVER: devserver ? 'true' : 'false'
    }),
    typescript({
      abortOnError: false,
      typescript: require('typescript'),
      tsconfigOverride: {
        compilerOptions: {
          module: 'esnext',
          target: 'esnext',
          declaration: !devserver ? true : false,
          sourceMap: devserver ? true : false
        },
      },
    }),
    buble({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      jsx: 'h',
      objectAssign: 'Object.assign',
      transforms: {}
    }),
    // commonjs(),
    devserver ? serve({
      contentBase: ['dist', 'demo']
    }) : false,
    devserver ? livereload({
      watch: 'dist'
    }) : false,
    // only minify if we're producing a non-es production build
    prod && !esmodule ? uglify({
      mangle: {
        properties: {
          regex: /^_/
        },
      },
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