const path = require("path");
// const SassLintPlugin = require('sass-lint-webpack');

// const Fiber = require("fiber");

module.exports = {
    entry: ["./src/pages/index/index.jsx" ],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options:{
                        extends: path.join(__dirname, "/.babelrc")
                    }
                }],
            },
            {
                test: /\.scss$/,
                use:[{loader: "style-loader"},
                     {
                         loader: "css-loader",
                         options:{
                             modules:true,
                             camelCase: true
                         }
                    },{
                    loader: "sass-loader",
                    options: {
                        sourceMap: true,
                        implementation: require("sass"),
                        // fiber:Fiber
                    }
                }]
            }
        ]
    },

    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    
    output: {
        filename: "main.js"
    }
};