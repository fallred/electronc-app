"use strict";
exports.__esModule = true;
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.
var electron_1 = require("electron");
function invoke(type) {
    electron_1.ipcRenderer.send('command', type);
}
electron_1.ipcRenderer.invoke('hello').then(function (result) {
    console.log(result);
});
