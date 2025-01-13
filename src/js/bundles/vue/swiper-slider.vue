<template>
    <swiper
        modules
        :slides-per-view="slidePerview"
        :space-between="spaceBetween">
        <swiper-slide v-for="(image, index) in images" :key="index"> <img :src="image.src" :alt="image.alt"> </swiper-slide>
    </swiper>

</template>

<script>
// for vue 3 use setup in opening script tag 
// import { Swiper, SwiperSlide } from 'swiper/vue';

// const props = defineProps({
//     images : {
//         type : Array,
//         default: () => []
//     },
//     slidePerview: {
//         type: Number,
//         default: 1
//     },
//     spaceBetween: {
//         type: Number,
//         default: 0
//     }
// }) 
import { Swiper, SwiperSlide } from 'swiper/vue';
export default {
    components: {
        Swiper,
        SwiperSlide
    },
    props: {
        images : {
            type : Array,
            default: () => []
        },
        slidePerview: {
            type: Number,
            default: 1
        },
        spaceBetween: {
            type: Number,
            default: 0
        }
    }
}
</script>