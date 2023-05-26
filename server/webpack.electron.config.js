const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    mode: 'production',
    entry: resolve('src/main.ts'),
    output: {
        path: path.join(__dirname, './build'),
        filename: 'electron.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    compact: false,
                    babelrc: false,
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                targets: {
                                    node: '12.16.3',
                                },
                            },
                        ],
                        'minify',
                    ],
                },
                include: resolve('electron'),
            },
            {
                test: /\.(js|mjs|jsx|ts|tsx|css|less|styl|sass|scss|vue|htm|html)$/,
                enforce: 'pre',
                use: [
                    {
                        options: {
                            failOnError: true,
                            failOnWarning: false
                        },
                        loader: 'mew-loader'
                    }
                ],
                include: resolve('src')
            }
        ],
        noParse: /utils/,
    },
    // externals: {
    //     'axios': 'commonjs axios',
    //     '@sentry/electron': 'commonjs @sentry/electron',
    //     '@sentry/integrations': 'commonjs @sentry/integrations',
    //     'electron-better-ipc/source/main': 'commonjs electron-better-ipc/source/main',
    //     'electron-log': 'commonjs electron-log',
    //     'electron-updater': 'commonjs electron-updater',
    //     'electron-store': 'commonjs electron-store',
    //     'fs-extra': 'commonjs fs-extra',
    //     'js-yaml':  'commonjs js-yaml',
    //     'random-string-generator': 'commonjs random-string-generator',
    //     'winreg': 'commonjs winreg',
    // },
    target: 'electron-main',
    stats: 'errors-only',
};
