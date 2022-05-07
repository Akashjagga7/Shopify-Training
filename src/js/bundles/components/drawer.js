export default() => {
    (function (drawer) {
  
      'use strict';
  
      const dom = {};
  
      const cacheDom = () => {
        dom.cartBtn = document.querySelectorAll('.js-cart-drawer');
        dom.prodCartBtn = document.querySelectorAll('.js-cart-open');
        // dom.placeholder = document.querySelector('.cart__item-placeholder');
        dom.drawer = document.querySelector('.cart__drawer');
        dom.closeDrawer = document.querySelector('.c-drawer__close');
        dom.overlay = document.querySelector('.drawerOverlay');
      }
  
      const bindUIActions = () => {
        dom.cartBtn.forEach(btn => {
            btn.addEventListener('click' , function(e) {
                e.preventDefault();
                dom.drawer.classList.add('open');
                dom.overlay.classList.add('open');
                // dom.placeholder.classList.add('hide')
            })
        });
        dom.prodCartBtn.forEach(btn => {
            btn.addEventListener('click' , function(e) {
                dom.drawer.classList.add('open');
                dom.overlay.classList.add('open');
                // dom.placeholder.classList.remove('hide')
            })
        });
        dom.closeDrawer.addEventListener('click' , function(e) {
            dom.drawer.classList.remove('open');
            dom.overlay.classList.remove('open')
        })
        dom.overlay.addEventListener('click' , function(e) {
            dom.drawer.classList.remove('open');
            dom.overlay.classList.remove('open')
        })
      }
  
      const init = () => {
        cacheDom();
        bindUIActions();
      }
  
      drawer.init = init;
  
    })((window.drawer = window.drawer || {}));
}