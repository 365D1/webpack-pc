const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')


// webapck 配置
module.exports = {
    // 入口
    entry: './src/main.js',
    // 输出文件
    output: {
        // 输出文件名
        filename: 'bundle.js',
        // 输出路径
        path: resolve(__dirname, 'dist')
    },
    // loader 配置
    module: {
        rules: [
            // 样式资源
            {
                test: /\.css$/,
                // use 数组中的执行顺序  从右到左 从下到上
                use: [
                    // 创建 style 标签 并插入到 HTML 中
                    'style-loader',
                    // 将 CSS 文件变成 CommonJS 模块加载到 JS 中
                    'css-loader'
                ]
            },
            // 图片资源
            {
                test: /\.(jpg|png|gif)$/,
                // url-loader 依赖 file-loader 需要安装 file-loader
                loader: 'url-loader',
                options: {
                    // 资源名字只要 10 位
                    name: '[hash:10].[ext]',
                    // 小于 8KB 的图片 使用 Base64 方式
                    limit: 8 * 1024,
                    // 关闭 url-loader 的 es6 模块化 解决 HTML 图片 src 的 [object Module] 错误
                    esModule: false
                }
            },
            // HTML 中的图片资源
            {
                test: /\.html$/,
                // url-loader 依赖 file-loader 需要安装 file-loader
                loader: 'html-loader'
            },
            // 其他资源
            {
                exclude: /\.(css|js|html|jpg|png|gif)$/,
                loader: 'file-loader',
                options: {
                    // 资源名字只要 10 位
                    name: '[hash:10].[ext]'
                }
            }
        ]
    },
    // 插件配置
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/page/index.html'
        })
    ],
    // 模式
    mode: 'development'
}