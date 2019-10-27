'use strict';

const ERROR_NAME_MESSAGE = 'Имя должно начинаться с большой буквы, состоять как минимум из 2 и максимум из 24 букв';
const ERROR_PHONE_MESSAGE = 'Введите корректный телефон';
const ERROR_EMAIL_MESSAGE = 'Введите корректный E-mail';
const btnNav = document.querySelector('.page-header__nav-button');
const navList = document.querySelector('.page-header__nav-list');
const btnsServices = document.querySelectorAll('.services__section-title');
const servicesItems = document.querySelectorAll('.services__section-item');
const name = document.querySelectorAll('.page-footer__form-input')[0];
const phone = document.querySelectorAll('.page-footer__form-input')[1];
const email = document.querySelectorAll('.page-footer__form-input')[2];
const message = document.querySelectorAll('.page-footer__form-input')[3];
const form = document.querySelector('.page-footer__form');
btnNav.addEventListener('click', function () {
  navList.classList.toggle('page-header__nav-list--close');
});

function removeNoJs(block) {
  if (block.classList.contains('no-js')) {
    block.classList.remove('no-js');
  }
}

removeNoJs(navList);
btnsServices.forEach(function (button, i) {
  button.addEventListener('click', function () {
    if (window.matchMedia('(max-width: 1023px)').matches) {
      if (!servicesItems[i].classList.contains('services__section-item--active')) {
        for (let j = 0; j < servicesItems.length; j++) {
          servicesItems[j].classList.remove('services__section-item--active');
        }

        servicesItems[i].classList.add('services__section-item--active');
      } else {
        servicesItems[i].classList.remove('services__section-item--active');
      }
    }
  });
});

const onNameValidate = function () {
  const value = name.value.trim();
  const reg = /^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/;

  if (value.length > 0 && reg.test(value) == false) {
    name.setCustomValidity(ERROR_NAME_MESSAGE);
  } else {
    name.setCustomValidity('');
  }
};

name.addEventListener('input', onNameValidate);
const phoneModalMask = IMask(phone, {
  mask: '+{7}(000)000-00-00'
});

const onPhoneValidate = function () {
  const value = phone.value.trim();

  if (value.length > 0 && value.length < 16) {
    phone.setCustomValidity(ERROR_PHONE_MESSAGE);
  } else {
    phone.setCustomValidity('');
  }
};

phone.addEventListener('input', onPhoneValidate);

const onEmailValidate = function () {
  const value = email.value.trim();
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  if (reg.test(value) == false && value != '') {
    console.log(value.length, value);
    email.setCustomValidity(ERROR_EMAIL_MESSAGE);
  } else {
    email.setCustomValidity('');
  }
};

email.addEventListener('input', onEmailValidate);
form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  form.reset();
});
let swiperPartners = new Swiper('.partners__list-container', {
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
let swiperAdvantages = new Swiper('.intro__advantages-container', {
  loop: true,
  slidesPerView: 1,
  initialSlide: 1,
  spaceBetween: 20,
  pagination: {
    el: '.intro__slider-dots',
    clickable: true
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
  if (window.matchMedia('(min-width: 1024px)').matches && swiperAdvantages !== undefined) {
    swiperAdvantages.destroy();
  } else if (swiperAdvantages === undefined) {
    return swiperAdvantages;
  }

  ;
}

checkedSwiper();
window.addEventListener('resize', checkedSwiper);
ymaps.ready(init);

function init() {
  let myMap = new ymaps.Map("map", {
    center: [55.63176836, 37.61793924],
    zoom: 16
  });
  let placemarkDesktop = new ymaps.Placemark([55.63176836, 37.61793924], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/map-marker.png',
    iconImageSize: [74, 98],
    iconImageOffset: [-50, -92]
  });
  let placemarkTablet = new ymaps.Placemark([55.63176836, 37.61793924], {}, {
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

  ;
  toggleMarker();
  window.addEventListener('resize', toggleMarker);
}