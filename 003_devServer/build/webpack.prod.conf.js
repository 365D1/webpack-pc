'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const env = process.env.NODE_ENV === 'testing' ? require('../config/test.env') : require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    // 模式
    mode: 'production'
})


module.exports = webpackConfig