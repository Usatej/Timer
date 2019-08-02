$(document).ready(function () {
    let activeItem = 'nav-list__item--active';
    let activeLink = 'nav-list__link--active';

    let $links = $('.nav-list__link');
    $links.on('click', function () {
        $links.parent().removeClass(activeItem)
        $(this).parent().addClass(activeItem)
        $links.removeClass(activeLink)
        $(this).addClass(activeLink)

        openTab($(this).attr('linkto'));
    });
});

function openTab(name) {
    let activeClass = 'tab--active';
    $('.tab').removeClass(activeClass);
    $('#' + name).addClass(activeClass);
}