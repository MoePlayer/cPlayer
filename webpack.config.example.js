var webpack = require('webpack');
var path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

var HtmlWebpackPlugin = require('html-webpack-plugin');

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production'),
    __DEV__: true
};

var HtmlWebpackConfig = {
    title: 'hexo',
    filename: 'index.html',
    template: "./src/example.html",
    hash: true,
    showErrors: true,
    inject: 'head'
};

module.exports = {
    mode: 'production',

    entry: [
        "./src/example.ts"
    ],
    output: {
        filename: "cplayerexample.js",
        path: __dirname + "/example"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    plugins: [
        new webpack.DefinePlugin(GLOBALS),
        new HtmlWebpackPlugin(HtmlWebpackConfig),
        new CopyPlugin([
            { from: __dirname + '/src/manifest.json', to: 'manifest.json' }
          ])
    ],

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                test: /\.(scss)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.(html|svg)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }
            },
            {
                test: /\.(css)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader"
                    }
                ]
            },
            {
                test: /\.(ttf|otf|woff|woff2|eot|png|jpg|mp3|mp4)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        esModule: false
                    }
                }]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: path.resolve(__dirname, "node_modules"),
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
            }
        ]
    }
}