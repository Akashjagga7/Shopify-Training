/*
 * Basic file with global javascripts.
 * Files imported here will be available on every page.
 */

import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/rias/ls.rias';
import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes';
import 'lazysizes/plugins/respimg/ls.respimg';

import 'Styles/layout/theme.scss';

import mobileNavigation from '../components/mobile-navigation';
import accordion from '../components/accordion';
import stickyHeader from '../components/sticky-header';
import footerNavigation from '../components/footer-menu'
import headerSearch from '../components/header-search';
import swiperSlider from "../components/crousel";
import drawer from '../components/drawer';
import product from '../graphQl/product'
// import ajaxSearch from '../components/ajax-search';

mobileNavigation()
accordion()
stickyHeader()
footerNavigation()
headerSearch()
swiperSlider()
drawer()
product()
// ajaxSearch()

window.mobileNavigation.init();
window.accordion.init();
window.stickyHeader.init();
window.footerNavigation.init();
window.headerSearch.init();
window.swiperSlider.init();
window.drawer.init();
window.product.init();
// window.ajaxSearch.init();