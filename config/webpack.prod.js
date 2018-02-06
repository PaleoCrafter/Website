const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const version = process.env.BUILD_NUMBER ? process.env.BUILD_NUMBER : 0;
module.exports = {
    context: path.join(__dirname, '../'),
    entry: './main.jsx',
    output: {
        path: path.join(__dirname, '../dist'),
        filename: `js/main-bundle-${version}.js`,
        publicPath: 'https://download.nodecdn.net/containers/diluv/',
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], { root: path.join(__dirname, '../') }),
        new HtmlWebpackPlugin({
            inject: false,
            title: 'Diluv',
            template: 'index.html',
            bundleUrl: '//diluv.com/public/',
            gz: '.gz',
        }),
        new UglifyJSPlugin({}),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                BUILD_ENV: JSON.stringify('production'),
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
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
        ],
    },
};
