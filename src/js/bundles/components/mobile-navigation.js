export default() => {
  (function (mobileNavigation) {
    'use strict';

    const dom = {};

    const cacheDom = () => {
      dom.trigger = document.getElementsByClassName('hamburger__menu')[0];
      dom.body = document.getElementsByTagName('body')[0];
      dom.subnav = document.querySelectorAll('.subnavMobile--title');
      // dom.subnavlist = document.querySelectorAll('.subnavMobile--list');
      dom.subnavlistback = document.querySelectorAll('.subnavMobile__list--back');
    }

    const bindUIActions = () => {
      dom.trigger.addEventListener('click', toggleNavigation);
      dom.subnav.forEach(el => {
        el.addEventListener('click', () => {
          el.parentNode.classList.add('active');
        });
      });
      dom.subnavlistback.forEach(el => {
        el.addEventListener('click', () => {
          el.closest('.subnavMobile').classList.remove('active');
        });
      });
    }

    const toggleNavigation = () => {
      dom.body.classList.toggle('nav-open');
    }

    const init = () => {
      cacheDom();
      bindUIActions();
    }

    mobileNavigation.init = init;

  })((window.mobileNavigation = window.mobileNavigation || {}));
}