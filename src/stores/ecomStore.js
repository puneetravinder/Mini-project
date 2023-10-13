import { defineStore } from 'pinia'
import axios from "axios";
import { useDateFormat } from '@vueuse/core'

export const useEcomStore = defineStore('ecomStore', {
    state: () => {
        return {
            products: [],
            showSpinner: false,
            cart: []
        }
    },
    actions: {
        async getProducts() {
            this.showSpinner = true
            await axios.get('https://fakestoreapi.com/products').then(response => {
                this.showSpinner = false
                this.products = response.data
            })
        },
        priceSorting(sort) {
            this.products = this.products.sort((val1, val2) => {
                if (sort == 1) {
                    if (val1.price < val2.price)
                        return -1
                    return 1;
                }
                else {
                    if (val1.price < val2.price)
                        return 1
                    else return -1;
                }
            })
        },
        async categorySorting(category) {
            if (category == '0') {
                await this.getProducts()
                if (this.showSpinner == false) return
            }
            this.showSpinner = true
            await axios.get(`https://fakestoreapi.com/products/category/${category}`).then(response => {
                this.showSpinner = false
                this.products = response.data
            })
        },
        addToCart(product) {
            let cart = this.cart
            let cartData = {
                id: product.id,
                title: product.title,
                image: product.image,
                price: product.price,
                quantity: product.quantity,
            }
            cart.unshift(cartData)
            this.cart = cart
        },
        removeFromCart(id) {
            this.notes = this.notes.filter(note => note.id !== id)
        },
        updateCart(id, updatedNote) {
            this.notes.forEach(note => {
                if (note.id == id) {
                    note.title = updatedNote.title
                    note.description = updatedNote.description
                }
            })
        },
        clearCart() {
            this.cart = []
        },
    },
    getters: {
        removeItemFromCart: (state) => {
            return (id) => {
                state.cart = state.cart.filter(product => product.id !== id)
                return state.cart
            }
        }
    }
})