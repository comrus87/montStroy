'use strict';

document.addEventListener('DOMContentLoaded', function () {

  var ERROR_NAME_MESSAGE = 'Имя должно начинаться с большой буквы, состоять как минимум из 2 и максимум из 24 букв';
  var ERROR_PHONE_MESSAGE = 'Введите корректный телефон';
  var ERROR_EMAIL_MESSAGE = 'Введите корректный E-mail';

  var btnNav = document.querySelector('.page-header__nav-button');
  var navList = document.querySelector('.page-header__nav-list');
  var btnsServices = document.querySelectorAll('.services__section-title');
  var servicesItems = document.querySelectorAll('.services__section-item');

  var name = document.getElementById('form-name');
  var phone = document.getElementById('form-phone');
  var email = document.getElementById('form-email');
  var form = document.querySelector('.page-footer__form');
  var btnFeedBack = document.querySelector('.page-header__feedback');
  var btnFeedBackIntro = document.querySelector('.intro__link-сontact');
  var btnServices = document.querySelector('.intro__link-servcies');
  var services = document.getElementById('services');

  function onBtnFeedBackClick(evt) {
    evt.preventDefault();
    form.scrollIntoView({behavior: 'smooth'});
  }

  function onBtnServicesClick(evt) {
    evt.preventDefault();
    services.scrollIntoView({behavior: 'smooth'});
  }

  if (btnFeedBack) {
    btnFeedBack.addEventListener('click', onBtnFeedBackClick);
  }

  if (btnFeedBackIntro) {
    btnFeedBackIntro.addEventListener('click', onBtnFeedBackClick);
  }

  if (btnServices) {
    btnServices.addEventListener('click', onBtnServicesClick);
  }

  btnNav.addEventListener('click', function () {
    navList.classList.toggle('page-header__nav-list--close');
  });

  function removeNoJs(block) {
    block.classList.remove('no-js');
  }

  removeNoJs(navList);

  btnsServices.forEach(function (button, i) {
    button.addEventListener('click', function () {
      if (window.matchMedia('(max-width: 1023px)').matches) {
        if (!(servicesItems[i].classList.contains('services__section-item--active'))) {
          for (var j = 0; j < servicesItems.length; j++) {
            servicesItems[j].classList.remove('services__section-item--active');
          }
          servicesItems[i].classList.add('services__section-item--active');
        } else {
          servicesItems[i].classList.remove('services__section-item--active');
        }
      }
    });
  });

  var onNameValidate = function () {
    var value = name.value.trim();
    var reg = /^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/;

    if (value.length > 0 && reg.test(value) === false) {
      name.setCustomValidity(ERROR_NAME_MESSAGE);
    } else {
      name.setCustomValidity('');
    }
  };

  var phoneModalMask = IMask(phone, {mask: '+{7}(000)000-00-00'});

  var onPhoneValidate = function () {
    var value = phone.value.trim();

    if (value.length > 0 && value.length < 16) {
      phone.setCustomValidity(ERROR_PHONE_MESSAGE);
    } else {
      phone.setCustomValidity('');
    }
  };

  var onEmailValidate = function () {
    var value = email.value.trim();
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(value) === false && value !== '') {
      email.setCustomValidity(ERROR_EMAIL_MESSAGE);
    } else {
      email.setCustomValidity('');
    }
  };

  if (form) {
    name.addEventListener('input', onNameValidate);
    phone.addEventListener('input', onPhoneValidate);
    email.addEventListener('input', onEmailValidate);

    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      form.reset();
    });
  }

  var swiperPartners = new Swiper('.partners__list-container', {
    loop: true,
    slidesPerView: 1,
    pagination: {
      el: '.partners__slider-dots',
      clickable: true
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 10,
        initialSlide: 1,
        centeredSlides: true
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
        centeredSlides: false,
        navigation: {
          nextEl: '.partners__button-next',
          prevEl: '.partners__button-previous'
        }
      }
    }
  });

  var swiperAdvantages = new Swiper('.intro__advantages-container', {
    loop: true,
    slidesPerView: 1,
    initialSlide: 1,
    spaceBetween: 20,
    pagination: {
      el: '.intro__slider-dots',
      clickable: true,
    },

    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 10,
        centeredSlides: true
      }
    }
  });

  function checkedSwiper() {
    if (window.matchMedia('(min-width: 1024px)').matches) {
      swiperAdvantages.destroy();
    }
    return swiperAdvantages;
  }

  checkedSwiper();

  window.addEventListener('resize', checkedSwiper);

  ymaps.ready(init);

  function init() {
    var myMap = new ymaps.Map("map", {
      center: [55.63176836, 37.61793924],
      zoom: 16
    });

    var placemarkDesktop = new ymaps.Placemark([55.63176836, 37.61793924], {}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/map-marker.png',
      iconImageSize: [74, 98],
      iconImageOffset: [-50, -92]
    });

    var placemarkTablet = new ymaps.Placemark([55.63176836, 37.61793924], {}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/map-marker.png',
      iconImageSize: [22, 26],
      iconImageOffset: [-15, -32]
    });

    function toggleMarker() {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        myMap.geoObjects.add(placemarkDesktop);
        myMap.geoObjects.remove(placemarkTablet);
      } else {
        myMap.geoObjects.remove(placemarkDesktop);
        myMap.geoObjects.add(placemarkTablet);
      }
    }
    toggleMarker();
    window.addEventListener('resize', toggleMarker);
  }
});
