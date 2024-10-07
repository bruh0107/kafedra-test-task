<script setup>
import { useAuthStore } from "@/stores/auth-store.js";
import BasketCard from './BasketCard.vue'
import "vue3-toastify/dist/index.css";
import {computed, onMounted, ref} from "vue";
import axios from "axios";
import {storeToRefs} from "pinia";
import { toast } from "vue3-toastify";
import {useRouter} from "vue-router";

const { authToken } = storeToRefs(useAuthStore())
const router = useRouter()

const basketCards = ref([])
const loading = ref(true)
const products = ref([])
const isOpenModal = ref(false)

const groupCart = computed(() => {
  return basketCards.value.reduce((groups, item) => {
    if (!groups[item.product_id]) {
      groups[item.product_id] = []
    }

    const currentProduct = products.value.find(product => product.id === item.product_id)

    item.image = currentProduct?.image
    groups[item.product_id].push(item)
    console.log(groups)
    return groups
  }, {})
})

const fullPrice = computed(() => {
  return basketCards.value.reduce((acc, order) => acc + order.price, 0)
})

const addProduct = (product_id) => {
  axios
      .post(
          'http://lifestealer86.ru/api-shop/cart/' + product_id,
          null,
          { headers: {'Authorization': `Bearer ${authToken.value}`} }
      )
      .then(() => getCart())
}

const getProducts = () => {
  axios
      .get(
          'http://lifestealer86.ru/api-shop/products',
      )
      .then((data) => products.value = data.data.data)
}

const getCart = () => {
  axios
      .get(
          'http://lifestealer86.ru/api-shop/cart',
          { headers: { 'Authorization': `Bearer ${authToken.value}`} }
      )
      .then((data) => basketCards.value = data.data.data)
      .finally(() => loading.value = false)
}

const deleteOne = (id) => {
  axios
      .delete(
          'http://lifestealer86.ru/api-shop/cart/' + groupCart.value[id].pop().id,
          { headers: { 'Authorization': `Bearer ${authToken.value}`} }
      )
}

const deleteGroup = (id) => {
  groupCart.value[id].forEach((product) => {
    axios
        .delete(
            'http://lifestealer86.ru/api-shop/cart/' + product.id,
            { headers: { 'Authorization': `Bearer ${authToken.value}`} }
        )
        .then(() => {
          toast("Товар удален из корзины", {
            "type": "info",
            "autoClose": 1500,
            "transition": "slide",
            "dangerouslyHTMLString": true
          })
        })
    getCart()
  })
}

const placeAnOrder = () => {
  axios
      .post(
          'http://lifestealer86.ru/api-shop/order',
          null,
          { headers: { 'Authorization': `Bearer ${authToken.value}`} }
      )
      .then((data) => {
        console.log(data)
        getCart()
        toast("Заказ оформлен!", {
          "type": "success",
          "autoClose": 1500,
          "transition": "slide",
          "dangerouslyHTMLString": true
        })
        router.push('/order')
      })
      .catch(() => {
        toast("Корзина пустая!", {
          "type": "error",
          "autoClose": 1500,
          "transition": "slide",
          "dangerouslyHTMLString": true
        })
      })
}

onMounted(() => {
  getCart()
  getProducts()
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
        @delete-group="deleteGroup"
        @delete-product="deleteOne"
        @add-product="addProduct"
    />
    <h1 v-if="loading" class="loading">Загрузка...</h1>
    <p v-if="!basketCards?.length && !loading" class="loading">Корзина пуста</p>
  </section>
  <div class="order-menu">
    <div class="order-menu-info">
      <p>Оформить заказ</p>
      <img src="@/assets/img/arrow.svg" alt="Стрелка" @click="isOpenModal = !isOpenModal" class="order-arrow" :style="{ rotate: isOpenModal ? 180 + 'deg' : 0 + 'deg' }">
    </div>
    <div class="order-info" v-if="isOpenModal">
      <span>Итог: {{ fullPrice }} p.</span>
      <button class="order-btn" @click="placeAnOrder">Оформить</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.order-menu{
  width: 430px;
  min-height: 70px;
  height: fit-content;
  position: fixed;
  bottom: 0;
  right: 130px;
  background: var(--dark-color);
  padding: 17px 30px;
  border: 5px solid var(--white);
  border-bottom: none;

  &-info{
    display: flex;
    justify-content: space-between;

    & > p{
      font-size: 24px;
    }
  }
}

.title{
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
.basket-list{
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 100px;
}

.order-info{
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  align-items: center;
  font-size: 18px;
}

.order-btn{
  padding: 7px 30px;
  border: none;
  background: var(--white);
  cursor: pointer;
  font-family: 'Comfortaa', sans-serif;
  font-size: 16px;
  color: var(--dark-color);
  transition: 0.2s;
  border-radius: 7px;

  &:hover{
    color: var(--dark-color-hover);
    background: var(--bg-hover);
  }
}
</style>