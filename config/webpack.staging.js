const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const version = process.env.BUILD_NUMBER ? process.env.BUILD_NUMBER : 0;

module.exports = {
    context: path.join(__dirname, '../src'),
    entry: './main.jsx',
    output: {
        path: path.join(__dirname, '../dist'),
        filename: `js/main-bundle-dev-${version}.js`,
        publicPath: '//dev.diluv.io/public/',
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            title: 'Diluv',
            template: 'index.html',
            cdnPath: '//download.nodecdn.net/containers/diluv/dev/public/',
            gz: '.gz',
        }),
        new UglifyJSPlugin({}),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                BUILD_ENV: JSON.stringify('staging'),
            },
        }),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader',
                }, {
                    loader: 'sass-loader',
                }],
            },
        ],
    },
};
