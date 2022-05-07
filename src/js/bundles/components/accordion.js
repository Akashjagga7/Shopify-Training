export default() => {
    (function (accordion) {
  
      'use strict';
  
      const dom = {};
  
      const cacheDom = () => {
        dom.accordionTrigger = document.querySelectorAll(".accordion__btn");
      }
  
      const bindUIActions = () => {
        dom.accordionTrigger.forEach((e , i) => e.addEventListener('click', function(){
            this.classList.toggle("active");
            let panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            } 
        }));
      }
  
      const init = () => {
        cacheDom();
        bindUIActions();
      }
  
      accordion.init = init;
  
    })((window.accordion = window.accordion || {}));
}
