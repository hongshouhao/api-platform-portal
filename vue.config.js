const webpack = require('webpack');
var requirejs = require("requirejs");
var path = require("path");

// requirejs.config({
//     paths: {
//         "oidc": "/node_modules/oidc-client/lib/oidc-client",
//         "env": "/lib/env",
//         "identity": "/lib/identity",
//         "ocelot": "/lib/ocelot",
//     },
//     shim: {
//         'env': {
//             exports: 'Env'
//         },
//         'identity': {
//             deps: ['env', 'oidc', 'jquery'],
//             exports: 'Identity'
//         },
//         'ocelot': {
//             deps: ['env', 'identity', 'jquery'],
//             exports: 'Ocelot'
//         },
//     }
// })

module.exports = {
    // resolve: {
    //     // chainWebpack: config => {
    //     //     config.resolve.alias
    //     //         .set('identity', path.resolve(__dirname, '../lib/identity'));
    //     // },
    //     // modules: [__dirname, 'node_modules','lib'],
    //     alias: {
    //         "oidc": "./node_modules/oidc-client/lib/oidc-client",
    //         "env": "./lib/env",
    //         "identity": "./lib/identity",
    //         "ocelot": "./lib/ocelot",
    //     }
    // },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ],
    }
}