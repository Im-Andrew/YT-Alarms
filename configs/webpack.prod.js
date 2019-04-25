const path = require("path");
const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.config.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: 'true'
        }),

        new HtmlWebpackPlugin({
            filename: '../build/index.html',
            template: './dist/index.template.html'
        })
    ],

    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "../build")
    }
});