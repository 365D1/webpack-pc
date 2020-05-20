'use strict'
const path = require('path')

module.exports = {
    dev: {

        // Paths
        assetsSubDirectory: '',
        assetsPublicPath: '/',
        proxyTable: {},

        host: '0.0.0.0',
        port: 8080,
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false
    },

    build: {
        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: '',
        assetsPublicPath: '/'
    }
}
