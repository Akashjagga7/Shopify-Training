export default() => {
  (function (headerSearch) {

    'use strict';

    const dom = {};

    const cacheDom = () => {
      dom.searchWindowTrigger = document.querySelectorAll('.searchBar');
      dom.searchWindow = document.querySelector('.search');
      dom.searchInput = document.getElementById('searchInput');
    }

    const bindUIActions = () => {
      dom.searchWindowTrigger.forEach(e => e.addEventListener('click', toggleSearchWindow));
    }

    const toggleSearchWindow = () => {
      dom.searchWindow.classList.toggle('active');
      if (dom.searchWindow.classList.contains('active')) {
        dom.searchInput.focus();
      } else {
        dom.searchInput.blur();
      }
    }

    const init = () => {
      cacheDom();
      bindUIActions();
    }

    headerSearch.init = init;

  })((window.headerSearch = window.headerSearch || {}));
}