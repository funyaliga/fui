var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: './src/app.js',
    // devtool : 'source-map',
    output: {
        path: path.join(__dirname, "dist"),
        // publicPath: __dirname + '/dist/', //代码分割出来的位置
        publicPath: 'dist/', //代码分割出来的位置
        filename: 'app.js'
    },
    devtool: false,
    module : {
        loaders : [
            { test : /\.vue$/, loader : "vue"},
            // { test: /\.scss$/, loader: 'style!css!sass' },
            {
                test: /\.js$/,
                exclude: /node_modules|vue\/dist|vue-hot-reload-api|vue-loader/,
                loader : "babel"
            }, //支持ES6
        ]
    },
    babel: {
        presets: ['es2015']
    },
    vue: {
        loaders: {
            // scss: 'style!css!sass'
            sass: 'style!css!sass?indentedSyntax',
            scss: 'style!css!sass'
        }
    },
    publicPath: './dist/',
    // 将jQuery全局变量变为模块可引
    externals: { jquery: "jQuery" },

    plugins: [
        // 提供全局的变量，在模块中使用无需用require引入
        new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery",
            "window.jQuery": "jquery"
        }),
    ],
    watch : true
};
