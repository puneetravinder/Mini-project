import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
    faPen, faTrash, faCircleCheck,
    faCheck, faArrowUpRightFromSquare, faCloud,
    faArrowsRotate, faMagnifyingGlass, faXmark, faCartShopping
} from "@fortawesome/free-solid-svg-icons";
import { tooltip } from './directives/tooltip'
import 'bootstrap-icons/font/bootstrap-icons.css'

library.add(faPen, faTrash,
    faCircleCheck, faCheck,
    faArrowUpRightFromSquare,
    faCloud, faArrowsRotate,
    faMagnifyingGlass, faXmark,
    faCartShopping);

const app = createApp(App)

app.component("font-awesome-icon", FontAwesomeIcon)

app.use(createPinia())
app.use(router)
app.use(FontAwesomeIcon)
app.directive('tooltip', tooltip)

app.mount('#app')
