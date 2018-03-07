const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    context: path.join(__dirname, '../src'),
    entry: './main.jsx',
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'main-bundle.js',
        publicPath: '/',
    },
    devServer: {
        contentBase: './public',
        port: 1234,
        historyApiFallback: true,
    },
    plugins: [
        new CleanWebpackPlugin(['dist'], { root: path.join(__dirname, '../') }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('dev'),
                BUILD_ENV: JSON.stringify('dev'),
            },
        }),
        new HtmlWebpackPlugin({
            inject: false,
            title: 'Diluv',
            template: 'index.html',
            cdnPath: '/',
            gz: '',
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
                test: /\.(css|sass|scss)$/,
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
