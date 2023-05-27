"use strict";
exports.__esModule = true;
// @ts-nocheck
var electron_1 = require("electron");
var path = require("path");
var demo1_1 = require("./demo1");
var worker_threads_1 = require("worker_threads");
var process = require('process');
var spawn = require('child_process').spawn;
// import log from 'electron-log';
// @ts-ignore
// import addon from '../../build/Release/myaddon.node';
console.log(process.versions.node);
var worker = new worker_threads_1.Worker(path.join(__dirname, "./worker.js"));
worker.postMessage('start');
worker.on('message', function (message) {
    console.log('Received message from worker:', message);
});
// ipcMain.handle('hello', async (event, arg) => {
//   const result = addon.hello();
//   return result;
// });
var mainWindow;
function createWindow() {
    // Create the browser window.
    mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            sandbox: false
        }
    });
    electron_1.ipcMain.on('command', function (event, type) {
        if (type === 'open')
            (0, demo1_1.showOpenDialog)();
        else if (type === 'save')
            (0, demo1_1.showSaveDialog)();
        else if (type === 'message')
            (0, demo1_1.showMessageBox)(mainWindow);
    });
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "../../index.html"));
    // mainWindow.loadFile(path.join(__dirname, "../../web/build/login.html"));
    // mainWindow.loadFile(path.join(__dirname, "../../web/public/index.html"));
    // Open the DevTools.
    mainWindow.webContents.openDevTools({ mode: 'detach' });
    require('./grpc-client'); // 启动 gRPC 客户端
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.whenReady().then(function () {
    createWindow();
    electron_1.app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
// const child = spawn('./myaddon1', ['--port', '50051']);
// const addonPath = path.join(__dirname, 'myaddon1');
// console.log('addonPath:', addonPath);
// const child = spawn(addonPath, ['--port', '50051']);
// child.stdout.on('data', (data: any) => {
//   console.log(`stdout: ${data}`);
// });
// child.stderr.on('data', (data: any) => {
//   console.error(`stderr: ${data}`);
// });
// child.on('close', (code: any) => {
//   console.log(`child process exited with code ${code}`);
// });
