'use strict';

const btnNav = document.querySelector('.page-header__nav-button');
const navList = document.querySelector('.page-header__nav-list');
const btnsServices =  document.querySelectorAll('.services__section-title');
const servicesItems =  document.querySelectorAll('.services__section-item');

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
  button.addEventListener('click', function (evt) {
    if (window.matchMedia('(max-width: 1023px)').matches) {
      servicesItems[i].classList.toggle('services__section-item--active');
    }

  })
});


