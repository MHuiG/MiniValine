var path = require('path')
var libraryName = 'MiniValine'
var ROOT_PATH = path.resolve(__dirname)
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist')
const version = require('./package.json').version
var CDN_PATH = 'https://cdn.jsdelivr.net/npm/minivaline@' + version + '/dist/'
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const TerserPlugin = require("terser-webpack-plugin");
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
    minimize: false,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name (module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
            return `npm.${packageName.replace('@', '')}`
          }
        }
      }
    }
  },
  output: {
    path: BUILD_PATH,
    publicPath: 'http://localhost:8088/dist/',
    filename: '[name].min.js',
    chunkFilename: libraryName + '.[name].min.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    dev: {
      publicPath: '/dist/',
    },
    port: 8088,
	open:true,
	hot:true,
	compress: true,
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      options: {
		presets: ['@babel/preset-env'],
		plugins: ["@babel/plugin-transform-modules-commonjs","@babel/transform-runtime"]
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
  target: ['web', 'es5'],
  plugins: plugins
}
if (process.env.env_config == 'build') {
  plugins.push(new CleanWebpackPlugin())
  plugins.push(new TerserPlugin({
	parallel: 4,
	terserOptions: {
	  ecma: 5,
	  toplevel: true,
	  ie8: true,
	  safari10: true,
	},
  }))
  WEBPACK_CONFIG.devtool = false
  WEBPACK_CONFIG.optimization.minimize = true
  WEBPACK_CONFIG.output.publicPath = CDN_PATH
} else {
  plugins.push(new webpack.LoaderOptionsPlugin())
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = WEBPACK_CONFIG
