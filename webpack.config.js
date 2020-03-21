var path = require('path')
var libraryName = 'MiniValine'
var ROOT_PATH = path.resolve(__dirname)
var APP_PATH = path.resolve(ROOT_PATH, 'src')
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist')

var plugins = []

module.exports = {
  mode: 'production',
  performance: { hints: false },
  entry: './src/index.js',
  optimization: {
    minimize: true //Update this to true or false
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
        'style-loader',
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ],
      include: APP_PATH
    },
    {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=40000'
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
    ]
  },

  plugins: plugins
}
