const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  stats: 'errors-only',
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, '../docs'),
    filename: 'app.[contenthash].js',
    clean: true
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'),
      filename: 'index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, './.nojekyll'), to: path.resolve(__dirname, '../docs') },
        { from: path.resolve(__dirname, './*.webmanifest'), to: path.resolve(__dirname, '../docs') },
        { from: path.resolve(__dirname, './*.png'), to: path.resolve(__dirname, '../docs') },
        { from: path.resolve(__dirname, './*.ico'), to: path.resolve(__dirname, '../docs') },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin()
    ],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 1234,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
};
