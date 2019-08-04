const app = require('electron').remote.app;
const path = require('path');
const ipcRenderer = require('electron').ipcRenderer;
const msgs = require('../../constants');

class ClassicDisplay {
    win = null;
    btns = {};
    state = {};

    init(window) {
        this.win = window;

        this.btns.exit = document.querySelector('#btn-exit');
        this.btns.stop = document.querySelector('#btn-times-stop');
        this.btns.prepare = document.querySelector("#btn-times-prepare");
        this.btns.stopLeft = document.querySelector("#btn-times-stop-left");
        this.btns.stopRight = document.querySelector("#btn-times-stop-right");
        this.btns.start = document.querySelector("#btn-times-start");

        this.state = {
            stopped: true,
            prepared: true,
            timers: {
                stopped: {
                    left: false,
                    right: false
                },
                times: {
                    left: 0,
                    right: 0
                }
            }
        }

        this.setListeners();
        this.setPage();
    };

    setPage() {
        const modalPath = path.join('file://', __dirname, 'classic.html');
        this.win.loadURL(modalPath);
        this.win.setMenu(null);
    }

    setListeners() {
        const self = this;

        this.btns.exit.addEventListener('click', function (event) {
            app.quit();
        });

        this.btns.stop.addEventListener('click', function (event) {
            if (self.win !== null) {
                self.win.send(msgs.STOP_BOTH, "00:18:671");
            }
        });

        this.btns.prepare.addEventListener('click', function (event) {
            if (self.win !== null) {
                self.win.send(msgs.PREPARE);
            }
        });

        this.btns.stopLeft.addEventListener('click', function (event) {
            if (self.win !== null) {
                self.win.send(msgs.STOP_ONE, { side: 'left', time: '00:20:302' });
            }
        });

        this.btns.stopRight.addEventListener('click', function (event) {
            if (self.win !== null) {
                self.win.send(msgs.STOP_ONE, { side: 'right', time: '00:18:671' });
            }
        });

        this.btns.start.addEventListener('click', function (event) {
            if (self.win !== null) {
                self.win.send(msgs.START);
            }
        });
    }
}

module.exports = ClassicDisplay;