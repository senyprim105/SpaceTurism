$(function() {
    $('.slider__content').slick({
        //autoplay: true,
        arrows: true,
        prevArrow: '<button type="button" class="slider__arow slider__arow--prev"></button>',
        nextArrow: '<button type="button" class="slider__arow slider__arow--next"></button>',

    });

    $('.header__burger').on("click", function(evt) {
        const menu = $('.header__menu-list');
        menu.toggleClass('header__menu-list--show');
    })
});