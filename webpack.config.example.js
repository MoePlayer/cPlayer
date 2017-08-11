var webpack = require('webpack');
var path = require('path');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var OfflinePlugin = require('offline-plugin');


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
    inject: 'head',
    minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
    }
};


module.exports = {
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
        new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
        new OfflinePlugin()
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
                        loader: "awesome-typescript-loader",
                        options: {
                            useBabel: true
                        }
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
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }
            },
            {
                test: /\.(less)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: "less-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(css)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            },
            {
                test: /\.(ttf|otf|woff|woff2|eot)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
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
            },
            {
                test: /\.svg$/, use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }]
            },
            {
                test: /\.js$/,
                enforce: "pre",
                use: [{ loader: 'source-map-loader' }]
            }
        ]
    }
}