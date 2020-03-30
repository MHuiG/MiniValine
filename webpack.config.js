var path = require('path')
var libraryName = 'MiniValine'
var ROOT_PATH = path.resolve(__dirname)
var APP_PATH = path.resolve(ROOT_PATH, 'src')
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
var plugins = [
  // new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({ filename: 'MiniValine.min.css' })
]

module.exports = {
  mode: 'production',
  performance: { hints: false },
  entry: './src/index.js',
  optimization: {
    minimize: true
  },
  output: {
    path: BUILD_PATH,
    publicPath: '/dist/',
    filename: libraryName + '.min.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },

  devtool: 'source-map',

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
	    //MiniCssExtractPlugin.loader,
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
	  //MiniCssExtractPlugin.loader,
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
