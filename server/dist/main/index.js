"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var demo1_1 = require("./demo1");
// function showOpenDialog() {
//     dialog
//         .showOpenDialog({
//             properties: ['openFile', 'multiSelections', 'openDirectory', 'showHiddenFiles'],
//             filters: [
//                 { name: '图片', extensions: ['jpg', 'png', 'gif'] },
//                 { name: '视频', extensions: ['mkv', 'avi', 'mp4'] },
//                 { name: '自定义文件类型', extensions: ['json'] },
//                 { name: '任意类型', extensions: ['*'] },
//             ],
//         })
//         .then((it) => console.log(it))
// }
// function showSaveDialog() {
//     dialog
//         .showSaveDialog({
//             title: '请保存到一个隐蔽的位置',
//         })
//         .then((it) => console.log(it))
// }
// function showMessageBox(win: BrowserWindow) {
//     dialog
//         .showMessageBox(win, {
//             icon: path.join(process.cwd(), 'apple.png'),
//             type: 'info',
//             title: '消息标题',
//             message: '消息内容',
//             detail: '更详细的信息',
//             buttons: ['按钮1', '按钮2'],
//             defaultId: 1,
//         })
//         .then((it) => {
//             console.log('result', it)
//         })
// }
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
//# sourceMappingURL=index.js.map