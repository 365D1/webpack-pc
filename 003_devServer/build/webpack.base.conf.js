const path = require('path')
const utils = require('./utils')
const config = require('../config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

// webapck 配置
module.exports = {
    context: path.resolve(__dirname, '../'),
    // 入口
    entry: { script: './src/main.js' },
    // 输出文件
    output: {
        // 输出路径
        path: config.build.assetsRoot,
        // 输出文件名
        filename: 'js/[name].js',
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    // loader 配置
    module: {
        rules: [
            // 样式资源         
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // 在开发环境使用 style-loader
                    fallback: "style-loader"
                })
            },
            // 图片资源
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                // url-loader 依赖 file-loader 需要安装 file-loader
                loader: 'url-loader',
                options: {
                    // 资源名字只要 7 位
                    name: utils.assetsPath('img/[name].[hash:7].[ext]'),
                    // 小于 8KB 的图片 使用 Base64 方式
                    limit: 8 * 1024,
                    // 关闭 url-loader 的 es6 模块化 解决 HTML 图片 src 的 [object Module] 错误
                    esModule: false
                }
            },
            // 媒体资源
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            // 字体资源
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            // HTML 中的图片资源
            {
                test: /\.html$/,
                // url-loader 依赖 file-loader 需要安装 file-loader
                loader: 'html-loader'
            }
        ]
    },
    // 插件配置
    plugins: [
        // 构建前清理 dist 文件夹
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/page/index.html'
        }),
        new ExtractTextPlugin({
            filename: "css/style.min.css",
            disable: process.env.NODE_ENV === "development"
        })
    ],
    // 解析规格
    resolve: {
        // 配置省略后缀名的文件
        extensions: ['.js', '.json', 'scss'],
        // 配置解析模块路径别名
        alias: {
            '@': resolve('src')
        }
    },
    // 优化
    optimization: {

    },
    // 模式
    // mode: 'development',    
}