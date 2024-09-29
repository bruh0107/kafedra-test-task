<script setup>
import { useForm } from "vee-validate";
import * as yup from 'yup'
import {useAuthStore} from "@/stores/auth-store.js";
import {storeToRefs} from "pinia";

const { login } = useAuthStore()
const { errorStatus } = storeToRefs(useAuthStore())

const yupValidationSchema = yup.object({
  email: yup
      .string()
      .email('Некорректная почта')
      .required('Поле является обязательным'),
  password: yup.string().min(6).max(20)
})

const {
  defineField,
  errors,
  handleSubmit
} = useForm({
  validationSchema: yupValidationSchema
})
const [ email, emailAttrs ] = defineField('email')
const [ password, passwordAttrs ] = defineField('password')

const submit = handleSubmit((values) => {
  login(values.email, values.password)
})
</script>

<template>
  <p class="register-text">Вход</p>
  <form class="register container" @submit.prevent="submit">
    <input type="email" placeholder="email" class="register-email" v-model="email" v-bind="emailAttrs" required>
    <span v-if="errors.email">{{ errors.email }}</span>
    <br>
    <input type="password" placeholder="пароль" class="register-pass" v-model="password" v-bind="passwordAttrs" required>
    <p v-if="errors.password">{{ errors.password }}</p>
    <br>
    <button class="register-btn" :disabled="errors.email || errors.password">Войти</button>
    <br>
    <p v-if="errorStatus">Неверный логин или пароль</p>
  </form>
</template>

<style scoped lang="scss">
.register-text{
  font-size: 48px;
  padding: 47px 0;
  text-align: center;
}
.register{
  background: #F5EDD8;
  width: 860px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  padding: 90px 90px 0 90px;

  &-email, &-pass {
    border: none;
    background: #FFFCF4;
    width: 680px;
    padding: 20px 0 20px 15px;
    margin-bottom: 45px;
    font-family: 'Comfortaa', sans-serif;
    font-size: 24px;
    border-radius: 10px;
  }
  &-btn{
    font-size: 24px;
    font-family: 'Comfortaa', sans-serif;
    border: none;
    padding: 18px 25px;
    background: #FFFCF4;
    border-radius: 10px;
    color: #3D2B2D;
    cursor: pointer;
  }

  &-btn:hover{
    color: #554143;
    background: #fffef9;
  }
  &-btn:active{
    color: #554143;
    background: #ffffff;
  }
}
</style>