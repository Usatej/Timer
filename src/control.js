const remote = require('electron').remote;
const msgs = require('./constants');
const app = remote.app;
const Menu = remote.menu;
const globalShortcut = remote.globalShortcut;
const BrowserWindow = remote.BrowserWindow;
const ClassicDisplay = require('./display_modules/classic/classicModule');
const TimerDisplay = require('./display_modules/timer/timerModule');

const displayModule = {
    CLASSIC: 'display_classic',
    TIMER: 'display_timer'
};

let actDisplay = {
    module: null,
    type: null
}

const btnDisplay = document.querySelector('#btn-display');
const btnToggleTimer = document.querySelector("#btn-timer-toggle");


btnToggleTimer.addEventListener('click', function (event) {
    if (actDisplay.module !== null) {
        if (actDisplay.type === displayModule.CLASSIC) {
            actDisplay.module = new TimerDisplay();
            actDisplay.type = displayModule.TIMER;
            actDisplay.module.init(display);
        } else if (actDisplay.type === displayModule.TIMER) {
            actDisplay.module = new ClassicDisplay();
            actDisplay.type = displayModule.CLASSIC;
            actDisplay.module.init(display);
        }
    }
});

btnDisplay.addEventListener('click', function (event) {

    let parWin = remote.getCurrentWindow();
    display = new BrowserWindow({
        width: 1366,
        height: 768,
        webPreferences: {
            nodeIntegration: true
        }
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

    actDisplay.module = new ClassicDisplay();
    actDisplay.type = displayModule.CLASSIC;
    actDisplay.module.init(display);

    display.show();

    if (display !== null) {
        btnDisplay.disabled = true;
    }
});