var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
    navigateFallback: '/index.html',
    navigateFallbackWhitelist: [],
    stripePrefix: 'public',
    root: 'public/',
    plugins: [
        new SWPrecacheWebpackPlugin({
            cacheId: 'ng-pwa',
            filename: 'service-worker.js',
            staticFileGlobs: [
                'public/index.html',
                'public/**.js',
                'public/**.css'
            ],

        })
    ],
    stripePrefix: 'public/assets',
    mergeStaticsConfig: true
};