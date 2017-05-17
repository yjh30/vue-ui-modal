const webpack = require('webpack');
const path = require('path');
const px2rem = require('px2rem');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    entry: {
        index: resolve('./src/example/index.js')
    },
    output: {
        path: path.join(__dirname, './build'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.js|\.jsx$/,
            use: ['babel-loader'],
            include: [
                resolve('src')
            ]
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader']
        }, {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        }, {
            test: /\.vue$/,
            include: [
                resolve('src')
            ],
            use: ['vue-loader']
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, './src/example/index.html')
        }),
        new webpack.LoaderOptionsPlugin({
            vue: {
                loaders: {
                    css: "style-loader!css-loader",
                    less: "style-loader!css-loader!less-loader",
                    sass: "style-loader!css-loader!sass-loader",
                    scss: "style-loader!css-loader!sass-loader"
                }
            }
        })
    ],
    devServer: {
        host: "0.0.0.0",
        contentBase: path.join(__dirname, "./src"),
        compress: true,
        port: 3333
    },
    resolve: {
        alias: {
            'vue': resolve('./node_modules/vue/dist/vue')
        }
    }
};
