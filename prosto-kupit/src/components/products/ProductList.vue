<script setup>
import { ProductCard } from "@/components/index.js";
import {onMounted, ref} from "vue";
import axios from "axios"

const products = ref()
onMounted(() => {
  axios
      .get(
          'http://lifestealer86.ru/api-shop/products'
      )
      .then((data) => products.value = data.data.data)
})
</script>

<template>
  <h1 class="title container">Каталог товаров</h1>
  <section class="product-list container">
    <product-card
        v-for="product in products"
        :key="product.id"
        :id="product.id"
        :name="product.name"
        :description="product.description"
        :image="product.image"
        :price="+product.price"
    />
  </section>
  <h1 v-if="!products" class="loading">Загрузка...</h1>
</template>

<style scoped lang="scss">
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
.product-list{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 890px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 600px){
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>