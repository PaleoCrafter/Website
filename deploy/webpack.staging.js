const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: './main.jsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main-bundle.js',
    },
    devServer: {
        contentBase: './public',
        port: 1234,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            title: 'Diluv',
            template: 'index.html',
            bundleUrl: 'https://download.nodecdn.net/containers/diluv/dev/'
        }),
        new UglifyJSPlugin({}),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('staging')
            }
        }),
    ],
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
            {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
        ],
    },
};
