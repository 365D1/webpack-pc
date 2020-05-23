process.env.NODE_ENV = 'production'

const ora = require('ora');
const webpack = require('webpack')
const chalk = require('chalk')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()

// webpack 构建
webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err

    // 配置控制台输出
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
        console.log(chalk.red('  Build failed with errors.\n'))
        process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'));
})