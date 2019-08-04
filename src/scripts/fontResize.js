const $ = require('jquery');

$(document).ready(function () {
    var holdWidth = $(window).width();
    var holdHeight = $(window).height();
    var holdAverageSize = (holdWidth + holdHeight) / 2;
    $(window).on('resize', function () {
        newAverageSize = ($(window).width() + $(window).height()) / 2;
        newPercentage = ((newAverageSize / holdAverageSize) * 100) + "%";
        $("html").css("font-size", newPercentage)
        console.log(newPercentage);
    });
});