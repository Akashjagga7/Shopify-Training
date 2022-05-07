export default() => {
  (function (footerNavigation) {
    'use strict';

    const dom = {};

    const cacheDom = () => {
      dom.footTitle = document.querySelectorAll('.footerMenu__title');
    }

    const bindUIActions = () => {
      dom.footTitle.forEach(el => {
        el.addEventListener('click', () => {
          el.parentNode.classList.toggle('active');
        });
      });
    }

    const init = () => {
      cacheDom();
      bindUIActions();
    }

    footerNavigation.init = init;

  })((window.footerNavigation = window.footerNavigation || {}));
}