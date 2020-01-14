var webpack = require('webpack');
var path = require('path');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.cplayer_noview': JSON.stringify(!!process.env.noview),
    __DEV__: false
};

module.exports = {
    mode: 'production',

    entry: [
        "./src/lib/index.ts"
    ],
    output: {
        filename: "cplayer" + (process.env.suffix || '') + ".js",
        path: __dirname + "/dist",
        library: 'cplayer-umd',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    plugins: [
        !!process.env.analyzer ? new BundleAnalyzerPlugin() : undefined,
        new webpack.DefinePlugin(GLOBALS)
    ].filter(function(e){return e}),

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        strictExportPresence: true,
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
                        loader: 'postcss-loader',
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
            }
        ]
    }
}