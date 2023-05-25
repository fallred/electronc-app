// https://github.com/arackaf/customize-cra/blob/master/api.md
const path = require('path');
// const fs = require('fs');
// const webpack = require('webpack');
const {
    override,
    // fixBabelImports,
    // addLessLoader,
    // addWebpackAlias,
    // addWebpackModuleRule,
    // addWebpackPlugin,
} = require('customize-cra');
const rewireMultipleEntry = require('react-app-rewire-multiple-entry');

function createEntry(name) {
    return {
        // entry: `src/entries/${name}/index.js`,
        entry: path.join(__dirname, `src/entries/${name}/index.js`),
        template: 'public/index.html',
        outPath: `/${name}.html`,
    };
}

const entries = ['home', 'login'].map(createEntry);
console.log('entries:', entries);
const multipleEntry = rewireMultipleEntry(entries);

const addEntry = () => config => {
    // config.optimization.splitChunks.name = process.env.NODE_ENV === 'development';
    console.log('addEntry:');
    multipleEntry.addMultiEntry(config);
    console.log(config);
    return config;
};

module.exports = override(
    addEntry(),
    // fixBabelImports('import', {
    //     libraryName: 'antd',
    //     libraryDirectory: 'es',
    //     style: true,
    // }),
    // addLessLoader({
    //     javascriptEnabled: true,
    //     modifyVars: {
    //         '@primary-color': '#4780ff',
    //         '@table-header-bg': '#f3f8ff',
    //         '@table-row-hover-bg': '#f4f6f8',
    //         '@border-radius-base': '2px',
    //         '@table-padding-vertical': '10px',
    //         '@table-selected-row-bg': '#dde5f0',
    //     },
    // }),
    // addWebpackAlias({
    //     '@': path.join(__dirname, './src'),
    // }),
    // addWebpackModuleRule({
    //     test: /\.(png|svg|jpg|gif$)/,
    //     use: [
    //         {
    //             loader: 'url-loader',
    //             options: {
    //                 limit: 15240,
    //                 fallback: {
    //                     loader: 'file-loader',
    //                     options: {
    //                         outputPath: 'static/img',
    //                     },
    //                 },
    //             },
    //         },
    //     ],
    // }),
    // addWebpackPlugin(
    //     new webpack.DefinePlugin({
    //         'process.env': {
    //             PKG_NAME: JSON.stringify(process.env.npm_package_name),
    //             PKG_VERSION: JSON.stringify(process.env.npm_package_version),
    //         },
    //     })
    // )
);
