import { defineStore } from "pinia";
import {computed, reactive, ref} from "vue";
import axios from "axios";

export const useAuthStore = defineStore('auth-store', () => {
    const authToken = ref(localStorage.getItem('user-token'))
    const isAuth = computed(() => {
        return authToken.value
    })

    const setToken = (token) => {
        authToken.value = token
        localStorage.setItem('user-token', token)
    }

    const login = (email, password) => {
        axios
            .post(
                import.meta.env.VITE_API_URL + 'login',
                { email: email, password: password }
                )
            .then((res) => setToken(res.data.data.user_token))
    }

    const register = (fio, email, password) => {
        axios
            .post(
                import.meta.env.VITE_API_URL + 'signup',
                { fio: fio, email: email, password: password }
            )
            .then((res) => {
                setToken(res.data.data.user_token)
                console.log(res)
            })
    }

    const logout = () => {
        authToken.value = null
        localStorage.removeItem('user-token')
    }

    return { authToken, isAuth, setToken, logout, login, register }
})