/* eslint-disable no-empty */
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const config = require('../config');

const uploadUtils = {
    async upload(filepath) {
        try {
            const filename = path.basename(filepath);
            const dirname = path.dirname(filepath);
            // const resPrefix = utils.resourcePrefix(config.common.assetsSubDirectory);
            const resPrefix = 'dev/um/groupfissionStatic';
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
            const {cdnUrl, name} = data[0];
            console.log('upload resource cdnUrl:', cdnUrl);
            console.log('upload resource name:', name);
            return cdnUrl;
        } catch (error) {}
    },
};
uploadUtils.upload('individualDefault');
