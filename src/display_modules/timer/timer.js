const ipc = require('electron').ipcRenderer;
const $ = require('jquery');
const msgs = require('../../constants');

//canvas settings
var c = document.querySelector("canvas");
var ctx = c.getContext("2d");

c.width = window.innerWidth;
c.height = window.innerHeight;

//IPC settings
ipc.on(msgs.START_TIMER, function (event, args) {
    console.log(args);
    let time = Number.parseInt(args.minutes) * 60 + Number.parseInt(args.seconds);
    runTimer(time);
});

ipc.on(msgs.SET_TIMER, function (event, args) {
    console.log(args);
    let time = Number.parseInt(args.minutes) * 60 + Number.parseInt(args.seconds);
    setTimer(time);
});


//VAR DECLADATION
let timerRunning = false;
let start = 18;
let timer = start;

//TIMER SET
setInterval(function () {
    if (timer > 0) {
        timer--;
    }
}, 10);


//FUNCTIONS FOR IPC
function setRunTimer(value) {
    timerRunning = value;
}

function runTimer(time) {
    start = timer = time * 100;
    setRunTimer(true);
}

function setTimer(time) {
    setRunTimer(false);
    start = timer = time * 100;
    draw();
}


//CANVAS LOGIC
function draw() {
    let timeLeft = Math.round(timer / 100);
    ctx.clearRect(0, 0, c.width, c.height);

    ctx.beginPath();
    ctx.arc(c.width / 2, c.height / 2, 250, 0, 2 * Math.PI);
    ctx.lineWidth = "3";
    ctx.strokeStyle = "#fff";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(c.width / 2, c.height / 2, 250, 1.5 * Math.PI, (timer * 2 / start) * Math.PI + 1.5 * Math.PI);
    ctx.lineWidth = "20";
    ctx.strokeStyle = "#ff0000";
    ctx.stroke();

    let minutes = Math.floor(timeLeft / 60);
    if(minutes < 10) minutes = '0' + minutes;

    let seconds = timeLeft % 60;
    if(seconds < 10) seconds = '0' + seconds;

    let timeText = `${minutes}:${seconds}`;

    ctx.font = "80px Verdana";
    ctx.fillStyle = "#ff0000";
    ctx.fillText(timeText, c.width / 2 - ctx.measureText(timeText).width / 2, c.height/2 + 20);
}

function animate() {
    requestAnimationFrame(animate);
    if (timerRunning) {
        draw();
    }
}

//FIRST DRAW - if not animating need to draw one time
draw();
animate();
