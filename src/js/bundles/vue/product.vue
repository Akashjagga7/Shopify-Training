<template>
    <h1>Product data from vue</h1>
    <div class="row productDetail">
        <div class="col-6">
            <swiper-slider :images="productForm.varImg"
            :slidePerView=2
            :spaceBetween=50></swiper-slider>
            <!-- <img :src="productForm.vImage" /> -->
        </div>
        <div class="col-6">
            <div class="product-description">
                <h1>{{ product.title }}</h1>
                <div class="type"><span>Type:</span> {{ product.type }}</div>
                <div class="vendor"><span>Vendor:</span> {{ product.vendor }}</div>        
                <div class="description"> 
                    {{ product.description }}
                </div>
                <form method="post">
                    <div class="form-group">
                        <div class="optionWrapper" v-for="option in product.options" :key="option">
                            <label for="productSelect" class="label">Select {{ option.name }}</label>
                            <select @change="findVariant(); findVariantImages();" v-model="productForm[option.name]" :name="option.name" :id="option.name"  class="form-control">
                                <option v-for="value in option.values" :key="value" :value="value">
                                    {{ value }}
                                </option>
                            </select>
                        </div>    
                        <!-- <label for="productSelect" class="label">Select Size:</label>
                        <select v-model="productForm.id" name="id" id="productSelect" class="form-control">
                            <option v-for="variant in product.variants" :key="variant" :value="variant.id">
                                {{ variant.title }}
                            </option>
                        </select> -->
                    </div>        
                    <div class="form-group">
                        <!-- <div id="counter" class="number-counter">
                            <input type="button" value="-" data-item-quantity-minus data-item-quantity-change class="counter-minus">
                            <input type="number" name="quantity" pattern="[0-9]*" id="quantity" value="1" min="1" aria-label="{{ 'cart.general.item_quantity' | t }}" data-item-quantity class="counter-input">              
                            <input type="button" value="+" data-item-quantity-plus data-item-quantity-change class="counter-plus">
                        </div> -->
                        <div id="counter" class="number-counter">
                            <input type="button" value="-" @click="decreaseQ" class="counter-minus">
                            <input type="number" name="quantity" pattern="[0-9]*" id="quantity" :value="productForm.qty" min="1"  class="counter-input">              
                            <input type="button" value="+" @click="increaseQ" class="counter-plus">
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary btn-lg js-cart-add js-cart-open" @click="addItemCart">Add to cart</button>
                    <button @click="openModal" class="btn btn-primary btn-lg">Open Popup</button>
                </form> 
            </div>
        </div>
    </div>
    <modal-popup v-show="modalOpen" :closeModal="openModal" :title="product.title" :description="product.description"></modal-popup>
</template>

<script setup>

// for vue 3 use setup in opening script tag 
// import ImageFeild from './responsive-image.vue';
// import SwiperSlider from './swiper-slider.vue';
// import { ref } from 'vue';
// import modalPopup from './modal.vue';

// const props = defineProps({
//     product: {
//         type: Object,
//         default: () => {}
//     }
// });

// let modalOpen = ref(false);

// function openModal(e) {
//     e.preventDefault(); 
//     modalOpen.value = !modalOpen.value;
// }

import { ref , reactive, onMounted , toRefs} from 'vue';
import ImageFeild from './responsive-image.vue';
import SwiperSlider from './swiper-slider.vue';
import modalPopup from './modal.vue';


    const props = defineProps({
        product: {
            type: Object,
            default: () => {}
        }
    }); 

    const {
        product
    } = toRefs(props)

    const modalOpen = ref(false);
    const selectedVariant = ref(null);
    const selectedOptions = ref([]);
    const productForm = reactive({
        Color: null,
        Size: null,
        qty: 1,
        id: null,
        // vImage: null,
        varImg: []
    });
    
    onMounted(() => {
        setupSelectedItems();
    });

    function openModal(e) {
        e.preventDefault();
        modalOpen.value = !modalOpen.value;
    };    

    function increaseQ(){
        productForm.qty ++;
    };

    function decreaseQ(){
        if (productForm.qty > 1) {
            productForm.qty --;
        } else {
            return
        }
    };

    function addItemCart(event) {
        event.preventDefault();
        let addData = {
            'id':productForm.id,
            'quantity':productForm.qty
        };
        fetch('/cart/add.js', {
            body: JSON.stringify(addData),
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With':'xmlhttprequest'
            },
            method: 'POST'
        })
        .then(resp => resp.json())
        .then(data => {
            console.log('data from vue' + data)
            }).catch(err => {
            console.error(err)
        });
    };

    function setupSelectedItems() {
        let params = new window.URLSearchParams(window.location.search);
        let variantId = params.get('variant');
        if(variantId) {
            const variant = product.value.variants.filter(variant => variant.id.toString() === variantId );
            
            selectedVariant.value = variant[0];
            product.value.options.forEach((option, index) => {
                selectedOptions.value[index] = {
                    'name': option.name,
                    'value': selectedVariant.value[`option${index + 1}`]
                }
                productForm[option.name] = selectedVariant.value[`option${index + 1}`];
                productForm.id = selectedVariant.value.id;
                productForm.varImg = product.value.images.filter(img => img.alt === productForm.Color);
                
            })
        } else {
            updateURL(product.value.variants[0].id);
            selectedVariant.value = product.value.variants[0];
            // productForm.vImage = selectedVariant.image;
            product.value.options.forEach((option, index) => {
                selectedOptions.value[index] = {
                    'name': option.name,
                    'value': option.values[0]
                }
                productForm[option.name] = option.values[0];
                productForm.id = product.value.variants[0].id;
                productForm.varImg = product.value.images.filter(img => img.alt === productForm.Color);
                
            })
        }
    };

    function updateURL(variantID) {
        let url = new URL(window.location.href);
        let params = new window.URLSearchParams(window.location.search);
        params.set('variant', variantID);
        url.search = params;
        url = url.toString();
        window.history.replaceState({url : url}, null, url);
    };

    function findVariant() {
        const variantName = productForm.Color + ' / ' + productForm.Size;
        const variant = product.value.variants.find(vr => vr.title === variantName)
        productForm.id = variant.id;
        // productForm.vImage = variant.image;
        updateURL(variant.id);
        
    };

    function findVariantImages() {
        const variantName = productForm.Color;
        const variantBasedImage = product.value.images.filter(img => img.alt === variantName);
        productForm.varImg = variantBasedImage;
    };
    
</script>