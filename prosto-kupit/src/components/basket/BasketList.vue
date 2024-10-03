<script setup>
import { useAuthStore } from "@/stores/auth-store.js";
import { BasketCard } from "@/components/index.js";
import {onMounted, ref} from "vue";
import axios from "axios";
import {storeToRefs} from "pinia";

const { authToken } = storeToRefs(useAuthStore())
const basketCards = ref()
onMounted(() => {
  axios
      .get(
          'http://lifestealer86.ru/api-shop/cart',
          { headers: { 'Authorization': `Bearer ${authToken.value}`} }
      )
      .then((data) => basketCards.value = data.data.data)
})
</script>

<template>
  <h2 class="title container">Корзина</h2>
  <section class="basket-list container">
    <basket-card
        v-for="card in basketCards"
        :key="card.id"
        :id="card.id"
        :name="card.name"
        :description="card.description"
        :image="card.image"
        :price="+card.price"
    />
    <h1 v-if="!basketCards" class="loading">Загрузка...</h1>
  </section>
</template>

<style scoped lang="scss">
.title{
  font-weight: 400;
  font-size: 48px;
  padding: 48px 0;
  color: var(--dark-color);
}
.loading{
  text-align: center;
  font-size: 48px;
  margin-top: 50px;
  color: var(--dark-color);
}
.basket-list{
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>