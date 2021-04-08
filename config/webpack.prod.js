const { merge } = require('webpack-merge');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const base = require('./webpack.base');

const distPath = path.resolve(__dirname, '../dist');
const publicPathFolder = path.resolve(__dirname, '../public');

module.exports = (env, argv) => {
  let publicPath = '/maze-game';

  return merge(base(env, argv), {
    stats: 'errors-only',
    output: {
      path: distPath,
      filename: 'js/[name].[contenthash].js',
      chunkFilename: 'js/[name].[chunkhash].chunk.js',
      publicPath: publicPath,
    },
    optimization: {
      minimizer: [new TerserJSPlugin({ extractComments: false }), new OptimizeCSSAssetsPlugin({})],
    },
    plugins: [
      new WebpackBar(),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css',
      }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: path.resolve(__dirname, '../dist'),
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: publicPathFolder, to: distPath }],
      }),
    ],
  });
};
