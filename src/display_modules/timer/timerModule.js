const path = require('path');
const msgs = require('../../constants');

class TimerDisplay {
    win = null;

    elems = {
        inputs: {},
        btns: {}
    };
    state = {};

    init(window) {
        this.win = window;

        this.elems.inputs.mins = document.querySelector('#timer-minutes');
        this.elems.inputs.secs = document.querySelector('#timer-seconds');
        this.elems.btns.set = document.querySelector('#btn-timer-set');
        this.elems.btns.run = document.querySelector('#btn-timer-run');

        this.setListeners();

        this.setPage();
    }

    setPage() {
        const modalPath = path.join('file://', __dirname, 'timer.html');
        this.win.loadURL(modalPath);
        this.win.setMenu(null);
    }

    setListeners() {
        const self = this;

        this.elems.btns.run.addEventListener('click', function (event) {
            if (self.win !== null) {
                self.win.send(msgs.START_TIMER, { minutes: self.elems.inputs.mins.value, seconds: self.elems.inputs.secs.value });
            }
        });

        this.elems.btns.set.addEventListener('click', function (event) {
            if (self.win !== null) {
                self.win.send(msgs.SET_TIMER, { minutes: self.elems.inputs.mins.value, seconds: self.elems.inputs.secs.value });
            }
        });
    }
};

module.exports = TimerDisplay;