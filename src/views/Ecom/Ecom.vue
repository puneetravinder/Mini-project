<script setup lang="ts">
import { watchEffect, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useTaskStore } from "../../stores/tasksStore";
import Loader from "../../components/Layout/Loader.vue";
import { useEcomStore } from "../../stores/ecomStore";
import { useToastStore } from "../../stores/toastStore";

const router = useRouter()
const tasksStore = useTaskStore()
tasksStore.navTitle = 'E-Commerce Product List App'
tasksStore.colorClass = 'navbar-dark'
tasksStore.navStyle = '#7ac400'
const ecomStore = useEcomStore()
let searchText = ref('')
const productData = reactive<any>({
    data: []
})
const toastStore = useToastStore()
const priceSort = ref(0)
const categoryFilter = ref(0)

const getProductsData = (): void => {
    ecomStore.getProducts().then(res => {
        productData.data = ecomStore.products
    })
}

watchEffect(() => {
    getProductsData()
})

const handleSearch = (): void => {
    if (searchText.value == '') {
        productData.data = ecomStore.products
        return
    }
    productData.data = ecomStore.products.filter((data: any) => {
        const title = data.title.toLowerCase()
        const description = data.description.toLowerCase()
        if (searchText.value &&
            (title.includes(searchText.value.toLowerCase()) || description.includes(searchText.value.toLowerCase()))) {
            return data
        }
    })
}

watch(searchText, () => {
    handleSearch()
})

watch(priceSort, () => {
    sortByPrice()
})

watch(priceSort, () => {
    sortByPrice()
})

watch(categoryFilter, () => {
    categorySorting()
})

function sortByPrice(): void {
    ecomStore.priceSorting(priceSort.value)
    productData.data = ecomStore.products
}

function categorySorting(): void {
    ecomStore.categorySorting(categoryFilter.value).then(res => {
        productData.data = ecomStore.products
    })
}

const getRating = (rating: number): string => {
    let ratingVal;
    const decimalVal = rating.toString().split('.');
    ratingVal = getDecimalRating(decimalVal, rating)
    return `--rating: ${ratingVal}`;
}

const getDecimalRating = (decimalVal: string[], rating: number): number => {
    if (+decimalVal[1] < 3) return Math.floor(rating)
    else if (+decimalVal[1] >= 3 && +decimalVal[1] <= 7) return +(decimalVal[0] + '.5')
    else if (+decimalVal[1] > 7) return Math.ceil(rating)
    else return rating
}

const handleGotoCart = (): void => {
    router.push({ name: 'cart' })
}

const onAddToCart = (product: any): void => {
    product['quantity'] = 1
    ecomStore.addToCart(product)
    toastStore.showToast('Product added in cart')
}

</script>

<template>
    <div class="container-xl">
        <h2>Featured <b>Products</b></h2>
        <div class="row mb-4">
            <ul class="nav nav-pills p-3 bg-white mb-3 rounded-pill align-items-center shadow-sm">
                <li class="nav-item">
                    <p class="mb-0 mx-2 text-muted">Filters : </p>
                </li>
                <li class="nav-item">
                    <div class="col-auto ms-2">
                        <select v-model="categoryFilter" class="form-select" aria-label="" role="button">
                            <option selected value="0">All Category</option>
                            <option value="men's clothing">Men's clothing</option>
                            <option value="women's clothing">Women's clothing</option>
                            <option value="jewelery">Jewelery</option>
                            <option value="electronics">Electronics</option>
                        </select>
                    </div>
                </li>
                <li class="nav-item">
                    <div class="col-auto ms-4">
                        <select v-model="priceSort" class="form-select" aria-label="" role="button">
                            <option selected disabled value="0">Filter by Price</option>
                            <option value="1">Low to high</option>
                            <option value="2">High to low</option>
                        </select>
                    </div>
                </li>
                <li class="nav-item">
                    <div class="col-auto ms-4">
                        <input v-model="searchText" type="text" class="form-control" id="search" placeholder="Search...">
                    </div>
                </li>
                <li class="nav-item" v-if="ecomStore.cart.length">
                    <div class="col-auto ms-4">
                        <div class="col-auto">
                            <button type="button" class="btn btn-primary position-relative" @click="handleGotoCart">
                                <font-awesome-icon icon="cart-shopping" />
                                <span
                                    class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {{ ecomStore.cart.length }}
                                    <span class="visually-hidden">unread messages</span>
                                </span>
                            </button>
                        </div>
                    </div>
                </li>
            </ul>

        </div>
        <Loader v-if="ecomStore.showSpinner" :loader="ecomStore.showSpinner" />
        <div v-if="!ecomStore.showSpinner" class="row">
            <div class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="item carousel-item active">
                        <div class="row">
                            <div class="col-sm-3 mb-4" v-for="product in productData.data">
                                <div class="thumb-wrapper shadow">
                                    <!-- <span class="wish-icon">
                                            <i class="fa fa-heart-o"></i>
                                        </span> -->
                                    <div class="img-box">
                                        <img :src="product.image" class="img-fluid" alt="">
                                    </div>
                                    <div class="thumb-content">
                                        <h4 class="card-title mb-3">{{ product.title }}</h4>
                                        <div class="d-flex justify-content-start mb-2">
                                            <div class="col">Ratings - {{ product.rating.rate }}/5 </div>
                                            <div class="Stars p-1 px-2" :style="getRating(product.rating.rate)"
                                                aria-label="Rating of this product is 2.3 out of 5.">
                                            </div>
                                        </div>
                                        <p class="badge bg-primary text-wrap my-2"
                                            style="width: 4rem; margin-right: 160px;"><b>${{ product.price }}</b></p>
                                        <div class="d-grid gap-2">
                                            <button class="btn btn-primary btn-lg" @click="onAddToCart(product)">
                                                Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
h2 {
    color: #000;
    font-size: 26px;
    font-weight: 300;
    text-align: center;
    text-transform: uppercase;
    position: relative;
    margin-bottom: 50px !important;
}

h2::after {
    content: "";
    width: 100px;
    position: absolute;
    margin: 0 auto;
    height: 4px;
    border-radius: 1px;
    background: #7ac400;
    left: 0;
    right: 0;
    bottom: -20px;
}

.carousel {
    margin: 50px auto;
    padding: 0 70px;
}

.carousel .item {
    color: #747d89;
    min-height: 325px;
    text-align: center;
    overflow: hidden;
}

.carousel .thumb-wrapper {
    padding: 25px 15px;
    background: #fff;
    border-radius: 6px;
    text-align: center;
    position: relative;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
}

.carousel .item .img-box {
    height: 120px;
    margin-bottom: 20px;
    width: 100%;
    position: relative;
}

.carousel .item img {
    max-width: 100%;
    max-height: 100%;
    display: inline-block;
    position: absolute;
    bottom: 0;
    margin: 0 auto;
    left: 0;
    right: 0;
}

.carousel .item h4 {
    font-size: 18px;
}

.carousel .thumb-content .btn {
    color: #7ac400;
    font-size: 11px;
    text-transform: uppercase;
    font-weight: bold;
    background: none;
    border: 1px solid #7ac400;
    padding: 6px 14px;
    margin-top: 5px;
    line-height: 16px;
    border-radius: 20px;
}

.carousel .thumb-content .btn:hover,
.carousel .thumb-content .btn:focus {
    color: #fff;
    background: #7ac400;
    box-shadow: none;
}

.card-title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}


:root {
    --star-size: 20px;
    --star-color: #fff;
    --star-background: #fc0;
}

.Stars {
    --percent: calc(var(--rating) / 5 * 100%);
    display: inline-block;
    font-size: var(--star-size);
    font-family: Times;
    /* make sure ★ appears correctly */
    line-height: 1;
    background: #6a6a6a;
    border-radius: 10px;

    &::before {
        content: '★★★★★';
        letter-spacing: 3px;
        background: linear-gradient(90deg, var(--star-background) var(--percent), var(--star-color) var(--percent));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
}
</style>