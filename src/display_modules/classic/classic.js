const ipc = require('electron').ipcRenderer;
const $ = require('jquery');
const msgs = require('../../constants');

let $leftTime;
let $rightTime;
let $finalTime;
let $containerLeft;
let $containerRight;
let $containerResult;

$('document').ready(function () {
    $leftTime = $('#left-time');
    $rightTime = $('#right-time');
    $finalTime = $('#final-time');
    $containerLeft = $('.table-container--left');
    $containerRight = $('.table-container--right');
    $containerResult = $('.table-container--result');
});

ipc.on(msgs.STOP_ONE, function (event, args) {
    stopTime(args);
});

ipc.on(msgs.STOP_BOTH, function (event, finalTime) {
    stopBothTimes(finalTime);
});

ipc.on(msgs.PREPARE, function (event, args) {
    prepareTimes();
});

ipc.on(msgs.START, function (event, args) {
    startTimes(args);
});

function stopTime(args) {
    if (args.side === 'left') {
        $leftTime.text(args.time);
        $containerLeft.addClass('finished');
    } else {
        $rightTime.text(args.time);
        $containerRight.addClass('finished');
    }
}

function stopBothTimes(time) {
    $containerRight.removeClass('running');
    $containerLeft.removeClass('running');
    $containerResult.removeClass('running');

    $finalTime.text(time);
}

function prepareTimes() {
    $containerRight.addClass('running');
    $containerLeft.addClass('running');
    $containerResult.addClass('running');

    $containerRight.removeClass('finished');
    $containerLeft.removeClass('finished');

    $leftTime.text('00:00:00');
    $rightTime.text('00:00:00');
}

function startTimes() {

}