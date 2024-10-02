<script setup>
import {useAuthStore} from "@/stores/auth-store.js";
import {storeToRefs} from "pinia";

const { isAuth } = storeToRefs(useAuthStore())
const { logout } = useAuthStore()

</script>

<template>
  <nav class="navigation">
    <template v-if="!isAuth">
      <router-link class="navigation-link" to="/signup">Зарегистрироваться</router-link>
      <router-link class="navigation-link" to="/signin">Войти</router-link>
    </template>
    <template v-else>
      <router-link to="/basket" class="navigation-link">Корзина</router-link>
      <router-link to="#" class="navigation-link">Оформленные заказы</router-link>
      <router-link to="/" class="navigation-link" @click="logout">Выйти</router-link>
    </template>
  </nav>
</template>

<style scoped lang="scss">
.navigation{
  display: flex;
  gap: 40px;
  align-items: center;

  &-link{
    font-family: 'Comfortaa', sans-serif;
    font-size: 26px;
    transition: 0.4s;
  }
  &-link:hover{
    color: #f5f5f5;
  }
  &-link:active{
    color: #ffffff;
  }
}
</style>