const slider = tns({
  container: '.carousel__inner',
  items: 1,
  slideBy: 'page',
  controls: false,
  speed: 1000,
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
    991: {
      gutter: 30,
    },
    767: {
      width: 150,
      gutter: 45
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
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  })

  function toggleClass(item) {
    $(item).each(function (i) {
      $(this).on('click', function (event) {
        event.preventDefault();
        $('.catalog-item__main').eq(i).toggleClass('catalog-item__main_active')
        $('.catalog-item__submain').eq(i).toggleClass('catalog-item__submain_active')
      })
    })
  }

  toggleClass('.catalog-item__link')
  toggleClass('.catalog-item__back')

})
