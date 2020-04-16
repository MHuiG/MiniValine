var path = require('path')
var libraryName = 'MiniValine'
var ROOT_PATH = path.resolve(__dirname)
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist')
const version = require('./package.json').version
var CDN_PATH = 'https://cdn.jsdelivr.net/npm/minivaline@' + version + '/dist/'
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var plugins = [
  new webpack.optimize.ModuleConcatenationPlugin()
]
var WEBPACK_CONFIG = {
  mode: 'production',
  performance: { hints: false },
  entry: {
    MiniValine: './src/index.js'
  },
  optimization: {
    minimize: false
  },
  output: {
    path: BUILD_PATH,
    publicPath: './dist/',
    filename: '[name].min.js',
    chunkFilename: libraryName + '.[name].min.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    publicPath: '/dist/',
    inline: true,
    port: 8088
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ]
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader'
      ]
    },
    {
      test: /\.(png|jpg)$/,
      use: ['url-loader?limit=1024*10']
    }
    ]
  },
  plugins: plugins
}
if (process.env.env_config == 'build') {
  plugins.push(new CleanWebpackPlugin())
  plugins.push(new UglifyJsPlugin({
    parallel: 4,
    sourceMap: false,
    parallel: true,
    uglifyOptions: {
      warnings: false,
      ie8: true,
      safari10: true,
      output: {
        comments: false,
        beautify: false,
        ascii_only: true
      },
      compress: {
        collapse_vars: true,
        reduce_vars: true
      }
    }
  }))
  WEBPACK_CONFIG.devtool = false
  WEBPACK_CONFIG.optimization.minimize = true
  WEBPACK_CONFIG.output.publicPath = CDN_PATH
} else {
  plugins.push(new webpack.LoaderOptionsPlugin())
  plugins.push(new webpack.NamedModulesPlugin())
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = WEBPACK_CONFIG
