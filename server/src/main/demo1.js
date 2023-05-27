"use strict";
exports.__esModule = true;
exports.showMessageBox = exports.showSaveDialog = exports.showOpenDialog = void 0;
var electron_1 = require("electron");
var path = require("path");
function showOpenDialog() {
    electron_1.dialog
        .showOpenDialog({
        properties: ['openFile', 'multiSelections', 'openDirectory', 'showHiddenFiles'],
        filters: [
            { name: '图片', extensions: ['jpg', 'png', 'gif'] },
            { name: '视频', extensions: ['mkv', 'avi', 'mp4'] },
            { name: '自定义文件类型', extensions: ['json'] },
            { name: '任意类型', extensions: ['*'] },
        ]
    })
        .then(function (it) { return console.log(it); });
}
exports.showOpenDialog = showOpenDialog;
function showSaveDialog() {
    electron_1.dialog
        .showSaveDialog({
        title: '请保存到一个隐蔽的位置'
    })
        .then(function (it) { return console.log(it); });
}
exports.showSaveDialog = showSaveDialog;
function showMessageBox(win) {
    electron_1.dialog
        .showMessageBox(win, {
        icon: path.join(process.cwd(), 'apple.png'),
        type: 'info',
        title: '消息标题',
        message: '消息内容',
        detail: '更详细的信息',
        buttons: ['按钮1', '按钮2'],
        defaultId: 1
    })
        .then(function (it) {
        console.log('result', it);
    });
}
exports.showMessageBox = showMessageBox;
