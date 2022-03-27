window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu_item'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
        })
    })
});
$(document).ready(function(){
    $('.reviews__inner').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow:'<button type="button" class="slick-prev"><img src="icons/previous_arrow.png"></img></button>',
        nextArrow:'<button type="button" class="slick-next"><img src="icons/next_arrow.png"></img></button>',
    responsive: [
        {
        breakpoint: 768,
        settings: {
            arrows: false,
            slidesToShow: 1
        }
        },
        {
        breakpoint: 480,
        settings: {
            arrows: false,
            slidesToShow: 1
        }
        }
    ]
    });

});

// modal windows

$('[data-modal=call-back]').on('click', function () {
    $('.overlay, #call-back').fadeIn('slow');
});
$('.modal__close').on('click', function () {
    $('.overlay, #call-back').fadeOut('slow');
});

// validation form

function valideForms(form) {
    $(form).validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            phone: "required",
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            name: {
                required: "Введите имя",
                minlength: jQuery.validator.format("Минимум {0} символа!")
            },
            phone: "Введите телефон",
            email: {
                required: "Введите email",
                email: "email в формате test@test.ru"
            }
        }
    });
};
valideForms('#price');
valideForms('#call-back form');
valideForms('#question');

// number phone mask

$('input[name=phone]').mask("+7(999) 999-99-99");

// send mail 

$('form').submit(function(e) {
    e.preventDefault();

    if(!$(this).valid()) {
        return;
    }

    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function () {
        $(this).find("input").val("");

        $('#call-back').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
    });
    return false;
});