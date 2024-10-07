import { defineStore } from "pinia";
import {computed, ref} from "vue";
import axios from "axios";

export const useAuthStore = defineStore('auth-store', () => {
    const authToken = ref(localStorage.getItem('user-token'))
    const errorStatusReg = ref(null)
    const errorStatusLog = ref(null)
    const isAuth = computed(() => {
        return authToken.value
    })

    const setToken = (token) => {
        authToken.value = token
        localStorage.setItem('user-token', token)
    }

    const login = async (email, password) => {
        return axios
            .post(
                import.meta.env.VITE_API_URL + 'login',
                { email: email, password: password }
                )
            .then((res) => setToken(res.data.data.user_token))
            .catch((error) => {
                errorStatusLog.value = error.status
                throw new Error("Ошибка")
            })
    }

    const register = async (fio, email, password) => {
        return axios
            .post(
                import.meta.env.VITE_API_URL + 'signup',
                { fio: fio, email: email, password: password }
            )
            .then((res) => {
                setToken(res.data.data.user_token)
                console.log(res)
            })
            .catch(error => {
                errorStatusReg.value = error.status
                throw new Error("Ошибка")
            })
    }

    const logout = () => {
        axios
            .get(
                import.meta.env.VITE_API_URL + 'logout',
                { headers: { 'Authorization': `Bearer ${authToken.value}`} }
            )
        authToken.value = null
        localStorage.removeItem('user-token')
    }

    return { authToken, isAuth, setToken, logout, login, register, errorStatusReg, errorStatusLog }
})