/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-self-import */
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const config = require('../config');
const utils = require('../utils');

class UploadPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.afterEmit.tap('UploadPlugin', compilation => {
            console.log('afterEmit');
            // 先拿到要上传的的资源
            const assets = compilation.assets;
            // 获取到的是一个待上传的文件组成的数组 ['xxx.js','index.html']
            // const files = Object.keys(assets).filter(f => utils.fileFilters.every(filter => filter(f)));
            const promises = assets.map(asset => this.upload(asset));
            return Promise.all(promises);
        });
    }
    async upload(filepath) {
        try {
            const filename = path.basename(filepath);
            const dirname = path.dirname(filepath);
            const resPrefix = resourcePrefix(config.common.assetsSubDirectory, dirname + filename);
            const baseDir = `${resPrefix}/${dirname}`;
            const apiUrl = `${config.common.ossServiceBaseUrl}/inner/upload/stream?rename=0&baseDir=${baseDir}`;
            const form = new FormData();
            const localFile = path.resolve(__dirname, `../../${config.common.outputDir}`, filepath);
            const fileBuffer = fs.createReadStream(localFile, {emitClose: true});
            form.append('name', filename);
            form.append('file', fileBuffer);
            const resData = await axios.post(apiUrl, form, {
                headers: form.getHeaders(),
            });
            const {data = []} = resData.data || {};
            const {cdnUrl, url, name} = data[0];
            console.log('upload resource cdnUrl:', cdnUrl);
            console.log('upload resource name:', name);
            return cdnUrl;
        } catch (error) {}
    }
}
module.exports = UploadPlugin;
