const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/App.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js',
    sourceMapFilename: 'bundle.map',
  },
  module: {
    rules: [
      { enforce: 'pre', test: /\.js?x$/, loader: 'eslint-loader' },
      {
        test: /\.js?x$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.(s*)css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8000,
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new HtmlPlugin({
      template: path.join(__dirname, '/src/index.html'),
      favicon: path.join(__dirname, '/src/assets/favicon.png'),
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  watch: true,
  mode: 'development',
  devtool: '#source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
  },
};
