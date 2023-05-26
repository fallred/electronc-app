const config = require('./config');

const APPENV = process.env.npm_package_config_APPENV || 'dev';
const envPath = `./config/${APPENV}.env`;
const env = require(envPath);
const NODE_ENV = env.NODE_ENV;
const APP_BROWSER_ENV = env.APP_BROWSER_ENV;
const isProd = NODE_ENV === 'production';
const isDev = NODE_ENV === 'development';

const assetsSubDirectory = config.common.assetsSubDirectory;

export function validStaticCdnDirStatus(filename) {
    const staticKeywords = ['Default', 'Error'];
    const htmlName = '.html';
    for (let i = 0; i < staticKeywords.length; i++) {
        const keyword = staticKeywords[i];
        if (filename.indexOf(keyword) > -1 && filename.indexOf(htmlName) > -1) {
            return true;
        }
    }
    return false;
}

export function resourcePrefix(outputProjectName, dirname) {
    if (!outputProjectName) {
        throw new Error('outputProjectName is not assigned');
    }
    const baseUrl = `${APP_BROWSER_ENV}/um/${outputProjectName}`;
    // return dirname && validStaticCdnDirStatus(dirname) ? baseUrl : `${baseUrl}/${process.env.TIMEHASH}`;
    return baseUrl;
}
export function getPublicPath() {
    const publicPath = isProd
        ? `https://gh-fe.gsxcdn.com/${resourcePrefix(assetsSubDirectory)}/`
        : isDev
        ? `/${assetsSubDirectory}/`
        : `https://gh-fe.gsxcdn.com/${resourcePrefix(assetsSubDirectory)}/`;
    return publicPath;
}