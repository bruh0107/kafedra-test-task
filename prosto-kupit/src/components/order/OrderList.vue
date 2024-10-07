<script setup>
import { OrderCard } from "@/components/index.js";
import {computed, onMounted, ref} from "vue";
import axios from "axios";
import { useAuthStore } from "@/stores/auth-store.js";
import {storeToRefs} from "pinia";

const { authToken } = storeToRefs(useAuthStore())

const orders = ref([])
const products = ref([])
const loading = ref(true)

const extendedOrders = computed(() => {
  return orders.value.map((order) => {
    let newOrder = { ...order }
    newOrder.products = order.products.map((id) => {
      return products.value.find((product) => product?.id === id)
    })
    return newOrder
  })
})

onMounted(() => {
  axios
      .get(
          'http://lifestealer86.ru/api-shop/order',
          { headers: {'Authorization': `Bearer ${authToken.value}`} }
      )
      .then((response) => orders.value = response.data.data)
      .finally(() => loading.value = false)
  axios
        .get(
            'http://lifestealer86.ru/api-shop/products'
        )
        .then((data) => products.value = data.data.data)
})
</script>

<template>
  <h2 class="order-title container">Оформленные заказы</h2>
  <section class="order-list container">
    <order-card
        v-for="value in extendedOrders"
        :key="value.id"
        :id="value.id"
        :products="value.products"
        :order_price="+value.order_price"
    />
  </section>
  <h1 v-if="loading" class="loading">Загрузка...</h1>
</template>

<style scoped lang="scss">
.order-list{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.order-title{
  font-weight: 400;
  font-size: 42px;
  padding: 48px 0;
  color: var(--dark-color);
}
.loading{
  text-align: center;
  font-size: 48px;
  margin-top: 50px;
  color: var(--dark-color);
}
</style>