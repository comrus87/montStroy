'use strict';

const ERROR_NAME_MESSAGE = 'Имя должно начинаться с большой буквы, состоять как минимум из 2 и максимум из 24 букв';
const ERROR_PHONE_MESSAGE = 'Введите корректный телефон';
const ERROR_EMAIL_MESSAGE = 'Введите корректный E-mail';

const btnNav = document.querySelector('.page-header__nav-button');
const navList = document.querySelector('.page-header__nav-list');
const btnsServices =  document.querySelectorAll('.services__section-title');
const servicesItems =  document.querySelectorAll('.services__section-item');

const name = document.querySelectorAll('.page-footer__form-input')[0];
const phone = document.querySelectorAll('.page-footer__form-input')[1];
const email = document.querySelectorAll('.page-footer__form-input')[2];
const message = document.querySelectorAll('.page-footer__form-input')[3];
const form = document.querySelector('.page-footer__form');

btnNav.addEventListener('click', function () {
  navList.classList.toggle('page-header__nav-list--close');
});

function removeNoJs (block) {
  if (block.classList.contains('no-js')) {
    block.classList.remove('no-js');
  }
}

removeNoJs(navList);

btnsServices.forEach( function(button, i) {
  button.addEventListener('click', function () {
    if (window.matchMedia('(max-width: 1023px)').matches) {
      if (!(servicesItems[i].classList.contains('services__section-item--active'))) {
        for (let j = 0; j < servicesItems.length; j++) {
          servicesItems[j].classList.remove('services__section-item--active');
        }
        servicesItems[i].classList.add('services__section-item--active');
      } else {
        servicesItems[i].classList.remove('services__section-item--active');
      }
    }
  })
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

const phoneModalMask = IMask(phone, {mask: '+{7}(000)000-00-00'});


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
})

let swiperPartnersDesktop;
let swiperPartnersTablet;
let swiperPartnersMobile;
let swiperAdvantagesTablet;
let swiperAdvantagesMobile;

let currentSize = '';


function initSwiper () {

  if (window.matchMedia('(min-width: 1024px)').matches && currentSize !== 'desktop') {

    currentSize = 'desktop';

    swiperPartnersDesktop = new Swiper('.partners__list-container', {
      init: false,
      slidesPerView: 4,
      spaceBetween: 30,
      loop: true,
      navigation: {
        nextEl: '.partners__button-next',
        prevEl: '.partners__button-previous',
      }
    });

    swiperPartnersDesktop.init();
  };

  if (window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches && currentSize !== 'tablet') {

    currentSize = 'tablet';

    swiperPartnersTablet = new Swiper('.partners__list-container', {
      init: false,
      slidesPerView: 3,
      spaceBetween: 10,
      initialSlide: 1,
      centeredSlides: true,
      loop: true,
      pagination: {
        el: '.partners__slider-dots',
        clickable: true,
      },
    });

    swiperPartnersTablet.init();

    swiperAdvantagesTablet = new Swiper('.intro__advantages-container', {
      init: false,
      slidesPerView: 3,
      spaceBetween: 10,
      initialSlide: 1,
      centeredSlides: true,
      loop: true,
      pagination: {
        el: '.intro__slider-dots',
        clickable: true,
      },
    });

    swiperAdvantagesTablet.init();
  }

  if (window.matchMedia('(max-width: 767px)').matches && currentSize !== 'mobile') {

    currentSize = 'mobile';

    swiperPartnersMobile = new Swiper('.partners__list-container', {
      init: false,
      slidesPerView: 1,
      loop: true,
      pagination: {
        el: '.partners__slider-dots',
        clickable: true,
      },
    });

    swiperPartnersMobile.init();
  }

}

initSwiper();

window.addEventListener('resize', initSwiper);


