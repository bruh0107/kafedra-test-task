<script setup>
import { ProductCards } from "@/components/index.js";
import {onMounted, ref} from "vue";
import axios from "axios"

const products = ref()
onMounted(() => {
  axios
      .get(
          'https://fakestoreapi.com/products'
      )
      .then((response) => products.value = response.data)

})
</script>
<template>
  <section class="product-card">
    <product-cards
        v-for="product in products"
        :key="product.id"
        :id="product.id"
        :title="product.title"
        :description="product.description"
        :price="+product.price"
    />
    <h1 v-if="!products" class="loading">Загрузка...</h1>
  </section>
</template>

<style scoped lang="scss">
.loading{
  text-align: center;
  font-size: 48px;
}
</style>