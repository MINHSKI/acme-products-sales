const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const prod = {
  plugins: [
    new UglifyJsPlugin()
  ],
};

const dev = {
  devtool: 'source-maps',
}

const _export = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [ 'es2015', 'react']
        }
      }
    ]
  }
};



if(process.env.NODE_ENV === 'PROD'){
  module.exports = Object.assign({}, _export, prod);
}
else {
  module.exports = Object.assign({}, _export, dev);
}
