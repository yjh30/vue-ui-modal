const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AutoPrefixer = require('autoprefixer');
const px2rem = require('postcss-px2rem');

const px2remConfigs = {
    baseDpr: 1,
    remUnit: 37.5,
    forcePxComment: '!px',
    keepComment: '!no'
};

const loaders = [
    { enforce: "pre", test: /\.(js|jsx)$/,  exclude: /node_modules/, loader: "eslint-loader" },
    { test: /\.(js|jsx)$/,  exclude: /node_modules/, loader: "babel-loader" },
    { test: /\.vue$/, exclude: /node_modules/, loader: "vue-loader" },
    { test: /\.css$/, loader: "style-loader!css-loader!postcss-loader" },
    { test: /\.scss$/, loader: "style-loader!css-loader!postcss-loader!sass-loader"  }
];

const plugins = [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../src/example/index.html'),
        filename: 'example/index.html',
        inject: 'body',
        chunks: ['example/index']
    }),

    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: function () {
                return [
                    px2rem(px2remConfigs), // 手淘rem解决适配问题
                    AutoPrefixer({browsers: ['last 20 versions']})
                ]
            },
            /*
            * vue的postcss需要单独配置，因为vue-loader接管了.vue文件的loader
            * */
            vue: {
                postcss: [
                    px2rem(px2remConfigs),
                    AutoPrefixer({browsers: ['last 20 versions']})
                ],
                loaders: {
                    css: "style-loader!css-loader",
                    less: "style-loader!css-loader!less-loader",
                    sass: "style-loader!css-loader!sass-loader",
                    scss: "style-loader!css-loader!sass-loader"
                }
            }
        }
    })
];

module.exports = {
    entry: {
        'index': path.join(__dirname, '../src/main/index.js'),
        'example/index': path.join(__dirname, '../src/example/index.js')
    },
    module: {
        loaders: loaders
    },
    output: {
        path: path.join(__dirname, '../build'),
        filename: '[name].js'
    },
    plugins: plugins,
    devServer: {
        disableHostCheck: true
    }
};
