const webpack = require('webpack');
const path = require('path');
const px2rem = require('px2rem');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "[name].css"
});

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    entry: {
        index: './src/example/index.js'
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
            use: extractSass.extract({
                use: ['css-loader', 'postcss-loader'],
                fallback: "style-loader"
            })
        }, {
            test: /\.scss$/,
            use: extractSass.extract({
                use: ['css-loader', 'postcss-loader', 'sass-loader'],
                fallback: "style-loader"
            })
        }, {
            test: /\.vue$/,
            include: [
                resolve('src')
            ],
            use: ['vue-loader']
        }]
    },
    plugins: [
        extractSass,
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, './src/example/index.html')
        }),
        new webpack.LoaderOptionsPlugin({
            vue: {
                loaders: {
                    css: extractSass.extract({
                        use: ['css-loader', 'postcss-loader'],
                        fallback: "style-loader"
                    }),
                    less: extractSass.extract({
                        use: ['css-loader', 'postcss-loader', 'less-loader'],
                        fallback: "style-loader"
                    }),
                    sass: extractSass.extract({
                        use: ['css-loader', 'postcss-loader', 'sass-loader'],
                        fallback: "style-loader"
                    }),
                    scss: extractSass.extract({
                        use: ['css-loader', 'postcss-loader', 'sass-loader'],
                        fallback: "style-loader"
                    })
                }
            }
        })
    ],
    resolve: {
        alias: {
            'vue': resolve('./node_modules/vue/dist/vue')
        }
    }
};
