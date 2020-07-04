const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: [
        './src/js/index.js',
        './src/scss/style.scss',
    ],
    output: {
        filename: './js/bundle.js'
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }, {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
                ]
            }, {
                test: /\.(png|jpe?g|svg|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    }
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ template: 'src/html/index.html' }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        })
    ],
    devServer: {
        contentBase: './dist',
    },
};