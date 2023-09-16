import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vue3TouchEvents from "vue3-touch-events";
import axios from 'axios'
import VueAxios from 'vue-axios'
import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'



const app = createApp(App)
const vfm = createVfm()
app.use(VueAxios, axios);
app.use(Vue3TouchEvents);
app.use(router);
app.use(store);
app.use(vfm)
app.mount('#app');


window.setTimeout(() => {
    store.commit('init')
}, 3000);
