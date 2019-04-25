const path = require("path");
const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.config.js');

module.exports = merge(common, {
    mode: 'development',
    
    devtool: 'inline-source-map',

    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: 'false'
        })
    ],

    output: {
        path: path.resolve( __dirname, "../dist" ),
        publicPath: "/"
    },

    // Simulating the app listed in a sub directory "/app"
    devServer: {
        contentBase: "./dist",
        publicPath:"/app/ytalarm/",
        // port: 8080,
        historyApiFallback: {
            index: '/index.html'
        },
        openPage: "app/ytalarm/",
        https: true
    }
});