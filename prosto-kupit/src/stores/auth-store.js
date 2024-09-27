import { defineStore } from "pinia";
import {computed, ref} from "vue";

export const useAuthStore = defineStore('auth-store', () => {
    const authToken = ref(localStorage.getItem('user-token'))
    const isAuth = computed(() => {
        return authToken.value
    })

    const setToken = (token) => {
        authToken.value = token
        localStorage.setItem('user-token', token)
    }

    const logout = () => {
        authToken.value = null
        localStorage.removeItem('user-token')
    }

    return { authToken, isAuth, setToken, logout }
})