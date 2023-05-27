// @ts-nocheck
import { app, BrowserWindow, ipcMain, dialog } from "electron";
import * as path from "path";
import {showOpenDialog, showSaveDialog, showMessageBox} from './demo1';
import { Worker } from 'worker_threads';
const process = require('process');
const { spawn } = require('child_process');

// import log from 'electron-log';
// @ts-ignore
// import addon from '../../build/Release/myaddon.node';


console.log(process.versions.node);

const worker = new Worker(path.join(__dirname, "./worker.js"));
worker.postMessage('start');
worker.on('message', message => {
  console.log('Received message from worker:', message);
});


// ipcMain.handle('hello', async (event, arg) => {
//   const result = addon.hello();
//   return result;
// });


let mainWindow: BrowserWindow;
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      sandbox: false,
      // preload: path.join(__dirname, "../preload/index.js"),
    },
  });


  ipcMain.on('command', (event, type) => {
    if (type === 'open') showOpenDialog()
    else if (type === 'save') showSaveDialog()
    else if (type === 'message') showMessageBox(mainWindow)
  })

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../../index.html"));
  // mainWindow.loadFile(path.join(__dirname, "../../web/build/login.html"));
  // mainWindow.loadFile(path.join(__dirname, "../../web/public/index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools({mode: 'detach'});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.




// const child = spawn('./myaddon1', ['--port', '50051']);
const addonPath = path.join(__dirname, 'myaddon1');
console.log('addonPath:', addonPath);
const child = spawn(addonPath, ['--port', '50051']);

child.stdout.on('data', (data: any) => {
  console.log(`stdout: ${data}`);
});

child.stderr.on('data', (data: any) => {
  console.error(`stderr: ${data}`);
});

child.on('close', (code: any) => {
  console.log(`child process exited with code ${code}`);
});