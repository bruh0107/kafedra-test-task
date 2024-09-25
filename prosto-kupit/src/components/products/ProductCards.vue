<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: "Не задано"
  },
  price: {
    type: Number
  },
  showBtn: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()


</script>

<template>
  <article class="product-card">
    <div class="product-card-inner">
      <span class="product-card-title">{{ title }}</span>
      <p class="product-card-body">{{ description }}</p>
      <span class="product-card-price">{{ price }}</span>
      <button class="product-card-btn">В корзину</button>
    </div>
  </article>
</template>

<style scoped lang="scss">
.product-card{
  height: 344px;
  width: 400px;
  background: #F5EDD8;


}
</style>