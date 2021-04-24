const slider = tns({
  container: '.carousel__inner',
  items: 1,
  slideBy: 'page',
  controls: false,
  speed: 300,
  nav: false,
  rewind: false,
  preventScrollOnTouch: "force",
  mouseDrag: true,
  response: {
    1199: {
      autoWidth: true,
      nav: true,
      navPosition: "bottom"
    },
  }
})
document.querySelector('.prev').addEventListener('click', function () {
  slider.goTo('prev')
})
document.querySelector('.carousel__item_first').addEventListener('click', function () {
  slider.goTo(0)
})
document.querySelector('.carousel__item').addEventListener('click', function () {
  slider.goTo(1)
})
document.querySelector('.carousel__item_third').addEventListener('click', function () {
  slider.goTo(2)
})
document.querySelector('.next').addEventListener('click', function () {
  slider.goTo('next')
})
$(document).ready(function () {
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  })

  function toggleClass(item) {
    $(item).each(function (i) {
      $(this).on('click', function (event) {
        event.preventDefault()
        $('.catalog-item__main').eq(i).toggleClass('catalog-item__main_active')
        $('.catalog-item__submain').eq(i).toggleClass('catalog-item__submain_active')
      })
    })
  }

  toggleClass('.catalog-item__link')
  toggleClass('.catalog-item__back')

  // Modal
  $('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn('slow')
    $('body').css('overflow', 'hidden')
  })
  $('.modal__close').on('click', function () {
    $('.overlay, #consultation, #order, #thanks').fadeOut('slow')
    $('body').css('overflow', 'auto')
  })
  $('.button_mini').each(function (i) {
    $(this).on('click', function () {
      $('#order .modal__descr').text($('.catalog-item__title').eq(i).text())
      $('.overlay, #order').fadeIn('slow')
      $('body').css('overflow', 'hidden')
    })
  })

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: 'required',
        email: {
          required: true,
          email: true
        },
      },
      messages: {
        name: {
          required: "Будь ласка, вкажіть ваше ім'я",
          minlength: jQuery.validator.format("Введіть {0} символа"),
        },
        phone: "Будь ласка, введіть ваш номер",
        email: {
          required: "Будь ласка, вкажіть вашу пошту",
          email: "Ваша адреса пошти має бути у форматі name@domain.com",
        },
      }
    })
  }
  validateForms('#order form')
  validateForms('#consultation-form')
  validateForms('#consultation form')

  $('input[name=phone]').mask("+999 (99) 9999999")

  $('form').submit(function (event) {
    event.preventDefault()
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function () {
      $(this).find("input").val("")
      $('#consultation, #order').fadeOut()
      $('.overlay, #thanks').fadeIn('slow')
      $('form').trigger('reset')
    });
    return false;
  });
  // Page up
  $(window).scroll(function () {
    if($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn()
    } else {
      $('.pageup').fadeOut()
    }
  })
  // smooth scroll
  $("a[href^='#up']").click(function () {
    const _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  })

  new WOW().init()
})
