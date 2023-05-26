/* eslint-disable import/no-dynamic-require */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const APPENV = process.env.npm_package_config_APPENV || 'dev';
const envPath = `./${APPENV}.env`;
const env = require(envPath);
const NODE_ENV = env.NODE_ENV;
const APP_BROWSER_ENV = env.APP_BROWSER_ENV;

const outputDirName = 'output';
const assetsSubDirectory = 'webchatWeb';

console.log('process.env.npm_package_config_APPENV:', process.env.npm_package_config_APPENV);
console.log('envPath:', envPath);
console.log('NODE_ENV:', NODE_ENV);
console.log('APP_BROWSER_ENV:', APP_BROWSER_ENV);
console.log('env:', env);

module.exports = {
    dev: {
        host: '0.0.0.0',
        port: 8083,
        autoOpenBrowser: true,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: 100,
        useEslint: false,
        showEslintErrorsInOverlay: false,
        devtool: 'source-map',
        cacheBusting: false,
        cssSourceMap: true,
    },

    build: {
        devtool: APP_BROWSER_ENV === 'prod' ? false : 'source-map',
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report,
    },

    common: {
        assetsRoot: path.resolve(__dirname, `../../${outputDirName}`),
        outputDirName,
        assetsSubDirectory,
        outputDir: `${outputDirName}/${assetsSubDirectory}`,
        outputDirPath: path.resolve(__dirname, `../../${outputDirName}/${assetsSubDirectory}`),
        assetsPublicPath: '/',
        ossServiceBaseUrl: 'http://test-api.internal.umeng100.com/oss-server',
    },
};
