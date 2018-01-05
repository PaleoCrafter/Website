const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const version = process.env.BUILD_NUMBER ? process.env.BUILD_NUMBER : 0;

module.exports = {
    context: path.join(__dirname, '../src'),
    entry: './main.jsx',
    output: {
        path: path.join(__dirname, '../dist'),
        filename: `main-bundle-dev-${version}.js`,
        publicPath: 'https://download.nodecdn.net/containers/diluv/public/',

    },
    devServer: {
        contentBase: './public',
        port: 1234,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            title: 'Diluv',
            template: 'index.html',
        }),
        new UglifyJSPlugin({}),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('staging'),
            },
        }),
    ],
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
        ],
    },
};
