<template>
    <div class="container-fluid">
        <div class="row">
            <div class="collection__hero__content col-4">
                <h2 class="collection__hero__title">{{collection.title}}</h2>
                <p class="collection__hero__description">{{collection.description}}</p>
            </div>
            <div class="collection__hero__image col-8">
                <img :src="collection.featureImage" />
            </div>
        </div>
    </div>
    <div class="collection__filters">
        <div class="container-fluid">
            <div class="row">
                <div class="collection__filters__wrapper col-9">
                    <label class="filters__label">FILTER BY</label>
                    <div class="custom__select">
                        <span class="custom__select__default">{{collection.title}}</span>
                        <ul class="custom__select__list">
                            <li class="custom__select__item" v-for="coll in collection.col" :key="coll"><a :href="coll.url">{{coll.title}}</a></li>
                        </ul>
                    </div>
                    <div class="custom__select">
                        <span class="custom__select__default">{{collection.currentTag}}</span> 
                        <ul class="custom__select__list">
                            <li class="custom__select__item" v-for="tag in collection.tag" :key="tag"><a :href="`${collection.url}/${tag.productTag}`">{{tag.productTag}}</a></li>
                        </ul>
                    </div>
                    <div class="custom__select">
                        <select id="filterProductVue" @change="selectedPriceValueVue()" v-model="priceFilter">
                            <option v-for="price in collection.priceFilter" :key="price" :value="price.val">{{price.val}}</option>
                        </select>
                    </div>
                </div>    
                <div class="collection__filters__sort col-3">
                    <label class="filters__label">SORT BY</label>
                    <div class="custom__select">
                        <span class="custom__select__default" v-for="option in collection.sortOption" :key="option"><i v-if="collection.defaultSort == option.value">{{ option.name }}</i></span>
                        <ul class="custom__select__list">
                            <li class="custom__select__item" v-for="option in collection.sortOption" :key="option">
                                <a :href="`?sort_by=${option.value}`">{{ option.name }}</a>
                            </li>
                        </ul>
                    </div>
                </div>       
            </div>  
        </div>
    </div>
    <div class="row collectionProductGrid">
        <div v-for="(product , index) in filteredProduct" :key="product" class="col-3">
            <div v-if="index < prodToShow">
                <div class="product__gridItem" :data-value="product.price">
                    <a :href="product.url">
                        <img :src="product.image" />
                    </a>
                    <div class="product__gridContent">
                        <div class="product__gridTitle lead-sm">{{product.title}}</div>
                        <div class="product__gridDescription">
                            {{product.desc}}
                        </div>
                        <form data-cart-submit="data-cart-submit">
                            <input type="hidden" name="id" value="{{ product.variants.first.id }}" />
                            <button class="p-add-to-cart-btn link link-price js-cart-open">ADD TO BAG <i class="divider">−</i> <span class="link__finalPrice">{{product.price}}</span></button>
                        </form> 
                    </div>
                </div>
            </div>    
        </div>
        <div v-if="filteredProduct.length == 0">NO PRODUCT</div>

        <div v-if="prodToShow < collection.length" class="loadMore" >
            <button @click="loadMore();">Load More</button>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <ul>
                <li v-for="tag in collection.tag" :key="tag">
                    <label>
                        <input v-model="checkedTag" type="checkbox" :value="tag.productTag" />
                        <span>{{tag.productTag}}</span>
                    </label>
                </li>
            </ul>
        </div>
        <div class="col">
            <label class="selectedTags" v-for="(tag , i) in checkedTag" :key="tag">{{tag}} <span @click="removeTag(i)">X</span></label>
            <label class="selectedTags" @click="clearAll()" v-if="checkedTag.length != 0">clear all</label>
        </div>
    </div>
</template>

<script setup>

    import { ref , toRefs , onMounted, computed } from 'vue';

    const props = defineProps({
        collection: {
            type: Object,
            default: () => {}
        }
    });

    const {
        collection
    } = toRefs(props)

    const priceFilter = ref(null);
    const prodToShow = ref(4);
    const checkedTag = ref([]);
    const currentProduct = ref([]);

    onMounted(() => {
        currentProduct.value = props.collection.product;
    })

    const filteredProduct = computed(() => {
        if (checkedTag.length != 0) {
            let prod = currentProduct.value;
            let result = prod.filter(d => checkedTag.value.every(t => d.tags.includes(t)))
            return result
        } else {
            return props.collection.product;
        }
    })

    function loadMore() {
        if (prodToShow.value > props.collection.length) return;
        prodToShow.value = prodToShow.value + 4;
    }

    function selectedPriceValueVue() {
        let productGrid = document.querySelectorAll('.product__gridItem');
        console.log(priceFilter.value + "Akash Jagga");
        if (priceFilter.value === 'all') {
            productGrid.forEach(product => {
                product.parentNode.classList.remove('hide-product');  
            })      
        } else {
            productGrid.forEach(product => {
                let dataPrice = Number(product.getAttribute('data-value'));
                if (dataPrice > Number(priceFilter.value)  ) {
                    product.parentNode.classList.add('hide-product');
                } else {
                    product.parentNode.classList.remove('hide-product');
                }
            })
        }
    }

    function removeTag(index) {
        checkedTag.value.splice(index , 1);
    }

    function clearAll() {
        checkedTag.value = [];
    }

</script>