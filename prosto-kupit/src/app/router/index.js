import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/pages/HomePage.vue";
import SignupPage from "@/pages/SignupPage.vue";
import SigninPage from "@/pages/SigninPage.vue";
import BasketPage from "@/pages/BasketPage.vue";
import OrderPage from "@/pages/OrderPage.vue";

const routes = [
    { path: '/', component: HomePage, name: 'home' },
    { path: '/signup', component: SignupPage, name: 'signup' },
    { path: '/signin', component: SigninPage, name: 'signin' },
    { path: '/basket', component: BasketPage, name: 'basket' },
    { path: '/order', component: OrderPage, name: 'order' }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export { router }