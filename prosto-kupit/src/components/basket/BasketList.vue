<script setup>
import { useAuthStore } from "@/stores/auth-store.js";
import BasketCard from './BasketCard.vue'
import {computed, onMounted, ref} from "vue";
import axios from "axios";
import {storeToRefs} from "pinia";

const { authToken } = storeToRefs(useAuthStore())
const basketCards = ref([])
const loading = ref(true)

const groupCart = computed(() => {
  return basketCards.value.reduce((groups, item) => {
    if (!groups[item.product_id]) {
      groups[item.product_id] = []
    }
    groups[item.product_id].push(item)
    return groups
  }, {})
})

const getCart = () => {
  axios
      .get(
          'http://lifestealer86.ru/api-shop/cart',
          { headers: { 'Authorization': `Bearer ${authToken.value}`} }
      )
      .then((data) => basketCards.value = data.data.data)
      .finally(() => loading.value = false)
}

onMounted(() => {
  getCart()
})
</script>

<template>
  <h2 class="title container">Корзина</h2>
  <section class="basket-list container">
    <basket-card
        v-for="(value, id) in groupCart"
        :key="value[0].id"
        :product_id="+value[0].product_id"
        :id="value[0].id"
        :name="value[0].name"
        :description="value[0].description"
        :image="value[0].image"
        :price="+value[0].price"
        :count="value.length"
        @response="getCart"
    />
    <h1 v-if="loading" class="loading">Загрузка...</h1>
    <p v-if="!basketCards?.length && !loading" class="loading">Корзина пуста</p>
  </section>
<!--  <div class="order-menu">-->
<!--  </div>-->
</template>

<style scoped lang="scss">
//.order-menu{
//  width: 430px;
//  height: 300px;
//  position: fixed;
//  bottom: 0;
//  right: 130px;
//  background: var(--dark-color);
//}
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