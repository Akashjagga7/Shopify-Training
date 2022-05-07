export default() => {
    (function (stickyHeader) {
  
      'use strict';
  
      const dom = {};
  
      const cacheDom = () => {
        dom.header = document.getElementById('shopify-section-header');
      }
  
      const bindUIActions = () => {
        window.addEventListener('scroll', function(e) {
          let scrollpos = window.scrollY;
          if(scrollpos > 100) {
            dom.header.classList.add('header--small');
          } else {
            dom.header.classList.remove('header--small');
          }
        });
      }
  
      const init = () => {
        cacheDom();
        bindUIActions();
      }
  
      stickyHeader.init = init;
  
    })((window.stickyHeader = window.stickyHeader || {}));
}
