import {app, BrowserWindow, dialog, ipcMain} from 'electron';
import * as path from 'path';

export function showOpenDialog() {
    dialog
        .showOpenDialog({
            properties: ['openFile', 'multiSelections', 'openDirectory', 'showHiddenFiles'],
            filters: [
                { name: '图片', extensions: ['jpg', 'png', 'gif'] },
                { name: '视频', extensions: ['mkv', 'avi', 'mp4'] },
                { name: '自定义文件类型', extensions: ['json'] },
                { name: '任意类型', extensions: ['*'] },
            ],
        })
        .then((it) => console.log(it))
}
  
export function showSaveDialog() {
    dialog
        .showSaveDialog({
            title: '请保存到一个隐蔽的位置',
        })
        .then((it) => console.log(it))
}
  
export function showMessageBox(win: BrowserWindow) {
    dialog
        .showMessageBox(win, {
            icon: path.join(process.cwd(), 'apple.png'),
            type: 'info',
            title: '消息标题',
            message: '消息内容',
            detail: '更详细的信息',
            buttons: ['按钮1', '按钮2'],
            defaultId: 1,
        })
        .then((it) => {
            console.log('result', it)
        })
}