import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/pages/HomePage.vue";
import SignUp from "@/pages/SignupPage.vue";
import SignIn from "@/pages/SigninPage.vue";

const routes = [
    { path: '/', component: HomePage, name: 'home' },
    { path: '/signup', component: SignUp, name: 'signup' },
    { path: '/signin', component: SignIn, name: 'signin' },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export { router }