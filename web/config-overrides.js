// https://github.com/arackaf/customize-cra/blob/master/api.md
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const { paths } = require('react-app-rewired');
const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackAlias,
    addWebpackModuleRule,
    addWebpackPlugin,
} = require('customize-cra');
// const rewireMultipleEntry = require('react-app-rewire-multiple-entry');

function createEntry(name) {
    return {
        entry: `src/entries/${name}/index.js`,
        template: 'public/index.html',
        // entry: path.join(__dirname, `src/entries/${name}/index.js`),
        // template: path.join(__dirname, `public/index.html`), 
        outPath: `/${name}.html`,
    };
}

const entries = ['home', 'login'].map(createEntry);
console.log('entries:', entries);
const multipleEntry = require('react-app-rewire-multiple-entry')(entries);

const addEntry = () => config => {
    // config.optimization.splitChunks.name = process.env.NODE_ENV === 'development';
    console.log('addEntry:');
    config.output.path = path.join(path.dirname(paths.appBuild), 'build');
    multipleEntry.addMultiEntry(config);
    config.output.path = paths.appBuild;
    console.log(config);
    return config;
};
/*
function override(config, env) {
    // Modify the appBuild property to specify the output directory
    paths.appBuild = path.join(path.dirname(paths.appBuild), 'build');
  
    // Add multiple entry points
    config = addEntry(config, whenDev(() => ({
      entryPoints: ['src/index.dev.js']
    })));
    config = addEntry(config, whenProd(() => ({
      entryPoints: ['src/index.prod.js']
    })));
  
    // Modify the output path
    config.output.path = paths.appBuild;
  
    return config;
};
*/
module.exports = {
    webpack: override(
        addEntry(),
        fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true,
        }),
        addLessLoader({
            javascriptEnabled: true,
            modifyVars: {
                '@primary-color': '#4780ff',
                '@table-header-bg': '#f3f8ff',
                '@table-row-hover-bg': '#f4f6f8',
                '@border-radius-base': '2px',
                '@table-padding-vertical': '10px',
                '@table-selected-row-bg': '#dde5f0',
            },
        }),
        addWebpackAlias({
            '@': path.join(__dirname, './src'),
        }),
        addWebpackModuleRule({
            test: /\.(png|svg|jpg|gif$)/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 15240,
                        fallback: {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'static/img',
                            },
                        },
                    },
                },
            ],
        }),
        addWebpackPlugin(
            new webpack.DefinePlugin({
                'process.env': {
                    PKG_NAME: JSON.stringify(process.env.npm_package_name),
                    PKG_VERSION: JSON.stringify(process.env.npm_package_version),
                },
            }),
            process.env.NODE_ENV !== 'development' ? new UploadPlugin() : null
        )
    )
}