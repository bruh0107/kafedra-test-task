import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/pages/HomePage.vue";
import ProductsPage from "@/pages/ProductsPage.vue";

const routes = [
    { path: '/', component: HomePage, name: 'home' },
    { path: '/products', component: ProductsPage, name: 'products' }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export { router }