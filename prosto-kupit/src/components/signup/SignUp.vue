<script setup>
import { useForm } from "vee-validate";
import * as yup from 'yup'
import {useAuthStore} from "@/stores/auth-store.js";

const { register } = useAuthStore()

const yupValidationSchema = yup.object({
  fio: yup
      .string()
      .required('Поле является обязательным'),
  email: yup
      .string()
      .email('Некорректная почта')
      .required('Поле является обязательным'),
  password: yup
      .string()
      .min(6)
      .max(20)
})

const {
  defineField,
  errors,
  handleSubmit
} = useForm({
  validationSchema: yupValidationSchema
})
const [ fio, fioAttrs ] = defineField('fio')
const [ email, emailAttrs ] = defineField('email')
const [ password, passwordAttrs ] = defineField('password')

const submit = handleSubmit((values) => {
  register(values.fio, values.email, values.password)
})



</script>

<template>
  <p class="register-text">Регистрация</p>
  <form class="register container" method="post" @submit.prevent="submit">
    <input type="text" placeholder="Иванов Иван Иванович" class="register-fio" v-model="fio" v-bind="fioAttrs" required>
    <input type="email" placeholder="email" class="register-email" v-model="email" v-bind="emailAttrs" required>
    <p v-if="errors.email">{{ errors.email }}</p>
    <br>
    <input type="password" placeholder="пароль" class="register-pass" v-model="password" v-bind="passwordAttrs" required>
    <p v-if="errors.password">{{ errors.password }}</p>
    <br>
    <button class="register-btn" :disabled="errors.email || errors.password">Зарегистрироваться</button>
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
  height: 632px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  padding: 90px 90px 0 90px;

  &-email, &-pass, &-fio {
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
}
</style>