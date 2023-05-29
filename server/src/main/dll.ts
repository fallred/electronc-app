// app.js
const ffi = require('ffi');
const path = require('path');
const { getPath, getDataPath, getAppConfig, handleExecError } = require('../utils');

const dLLPath = path.join('extraResources\\Inject', 'PipeCore.dll');

// 加载 C++ DLL 文件
const clibrary = ffi.Library(dLLPath, {
    'add': ['int', ['int', 'int']]
});

// 调用 C++ 导出函数
clibrary.IpcConnectServer(7376);
const sum = clibrary.add(2, 3);
console.log(sum); // 输出 5