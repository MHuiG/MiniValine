var path = require('path')
var libraryName = 'MiniValine'
var ROOT_PATH = path.resolve(__dirname)
var APP_PATH = path.resolve(ROOT_PATH, 'src')
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist')
const version = require('./package.json').version
var CDN_PATH = 'https://unpkg.com/minivaline@'+version+'/dist/'
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

var plugins = []

var WEBPACK_CONFIG = {
  mode: 'production',
  performance: { hints: false },
  entry: {
	  'MiniValine': './src/index.js'
  },
  optimization: {
    minimize: true,
  },
  output: {
    path: BUILD_PATH,
	publicPath: (process.env.env_config == 'build') ? CDN_PATH :'./dist/',
    filename: '[name].min.js',
	chunkFilename: libraryName+'.[name].min.js',
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
      include: APP_PATH,
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
      ],
      include: APP_PATH
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

if(process.env.env_config == 'build'){
	plugins.push(new CleanWebpackPlugin())
	WEBPACK_CONFIG.devtool=false
}
module.exports = WEBPACK_CONFIG