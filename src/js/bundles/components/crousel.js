import Swiper from 'swiper/swiper-bundle';
import 'swiper/swiper-bundle.css';

export default() => {
    (function (swiperSlider) {
      'use strict';
  
      const bindUIActions = () => {

        const collectionProductSlider = new Swiper('.homeCollection--js-slider', {
            direction: 'horizontal',
            slidesPerView: 3,
            slidesPerColumn : 1,
            spaceBetween: 0,
            scrollbar: {
                el: '.swiper-scrollbar',
                draggable: true
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction',
            },
            breakpoints: {
                320: {
                    slidesPerView: 1
                },
                540: {
                    slidesPerView: 2
                },
                768: {
                    slidesPerView: 3
                }
            }
        });

        const ingredientsItemsSlider = new Swiper('.ingredientsItems--js-slider', {
            direction: 'horizontal',
            slidesPerView: 2,
            slidesPerColumn : 1,
            spaceBetween: 0,
            lazy: true,
            scrollbar: {
                el: '.ingredientsItems__scroll',
                draggable: true
            },
            pagination: {
                el: '.ingredientsItems__page',
                type: 'fraction',
            }
        });

        const slider = new Swiper ('.product__mainSlider', {
            slidesPerView: 1,
            loop: true,
        });
        
        const thumbs = new Swiper ('.product__thumbsSlider', {
            direction: 'vertical',
            spaceBetween: 24,
            slidesPerView: 5,
            touchRatio: 0.2,
            slideToClickedSlide: true,
            loop: true,
        });
        
        slider.controller.control = thumbs;
        thumbs.controller.control = slider;
      }
  
      const init = () => {
        bindUIActions();
      }
  
      swiperSlider.init = init;
  
    })((window.swiperSlider = window.swiperSlider || {}));
  }