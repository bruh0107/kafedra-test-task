<script setup>
import { useForm } from "vee-validate";
import * as yup from 'yup'
import {useAuthStore} from "@/stores/auth-store.js";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";

const { register } = useAuthStore()
const { errorStatusReg } = storeToRefs(useAuthStore())

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
  register(values.fio, values.email, values.password).then(() => router.push('/'))
})

const router = useRouter()

</script>

<template>
  <p class="register-text">Регистрация</p>
  <form
      class="register container"
      @submit.prevent="submit"
  >
    <input
        type="text"
        placeholder="Иванов Иван Иванович"
        class="register-fio"
        v-model="fio"
        v-bind="fioAttrs"
        required
    >
    <input
        type="email"
        placeholder="email"
        class="register-email"
        :class="{ red: errors.email }"
        v-model="email"
        v-bind="emailAttrs"
        required
    >
    <p class="errors" v-if="errors.email">{{ errors.email }}</p>
    <br>
    <input
        type="password"
        placeholder="пароль"
        class="register-pass"
        :class="{ red: errors.password }"
        v-model="password"
        v-bind="passwordAttrs"
        required
    >
    <p class="errors" v-if="errors.password">{{ errors.password }}</p>
    <br>
    <button class="register-btn" :disabled="errors.email || errors.password">Зарегистрироваться</button>
    <br>
    <p class="errors" v-if="errorStatusReg">Пользователь с такими данными уже существует</p>
  </form>
</template>

<style scoped lang="scss">
.register-text{
  font-size: 48px;
  padding: 47px 0;
  text-align: center;
  color: var(--dark-color);
}
.register{
  background: var(--bg-green);
  width: 860px;
  height: 632px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  padding: 90px 90px 0 90px;

  &-email, &-pass, &-fio {
    border: none;
    background: var(--white);
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
    background: var(--white);
    border-radius: 10px;
    color: var(--dark-color);
    cursor: pointer;
    transition: 0.3s;
  }
  &-btn:hover{
    color: var(--dark-color-hover);
    background: var(--white);
  }
  .red{
    border: 2px solid #ff2121;
  }
  .errors{
    font-size: 18px;
  }

}
</style>