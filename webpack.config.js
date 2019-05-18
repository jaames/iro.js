// var path = require('path');

// module.exports = {
//   devtool: 'source-map',
//   entry: './src/app',
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'app.js'
//   },
//   resolve: {
//     extensions: ['.ts', '.tsx']
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.tsx?$/,
//         exclude: /node_modules/,
//         loaders: ['ts-loader']
//       }
//     ]
//   }
// }

const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var',
    library: 'iro',
    umdNamedDefine: true,
	  libraryExport: 'default'
  }
};