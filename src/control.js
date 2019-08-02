const electron = require('electron');
const path = require('path');
const app = electron.remote.app;
const Menu = electron.remote.menu;
const globalShortcut = electron.remote.globalShortcut;
const BrowserWindow = electron.remote.BrowserWindow;

const btnExit = document.querySelector('#btn-exit');
const btnDisplay = document.querySelector('#btn-display');

let display = null;

btnExit.addEventListener('click', function (event) {
    app.quit();
});

btnDisplay.addEventListener('click', function (event) {
    const modalPath = path.join('file://', __dirname, 'display.html');

    display = new BrowserWindow({
        width: 1366,
        height: 768
    });

    if (!globalShortcut.isRegistered('CommandOrControl+Enter')) {
        globalShortcut.register('CommandOrControl+Enter', () => {
            if (display !== null) display.setFullScreen(!display.isFullScreen());
        });
    }

    if (!globalShortcut.isRegistered('CommandOrControl+Shift+O')) {
        globalShortcut.register('CommandOrControl+Shift+O', () => {
            if (display !== null) display.webContents.toggleDevTools();
        });
    }
    
    display.on('close', function () {
        display = null;
        btnDisplay.disabled = false;
        globalShortcut.unregister('CommandOrControl+Enter');
        globalShortcut.unregister('CommandOrControl+Shift+O');
        globalShortcut.unregister('CommandOrControl+Shift+L');

    });
    display.loadURL(modalPath);

    display.setMenu(null);
    display.show();

    if (display !== null) {
        btnDisplay.disabled = true;
    }
});