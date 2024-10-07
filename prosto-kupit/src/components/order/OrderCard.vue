<script setup>
import { useRouter } from "vue-router";
import axios from "axios";

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  products: {
    type: Array,
    required: true
  },
  order_price: {
    type: Number,
  }
})

const router = useRouter()

</script>

<template>
  <article class="order-card">
    <div class="order-card-inner">
      <div
          class="order-card-info"
           v-for="value in products"
           :key="value?.id"
      >
        <p class="order-card-title">
          {{ value?.name }}
        </p>
        <p class="order-card-count">{{  }}</p>
      </div>
      <div>
          <span class="order-card-price">{{ price }} р.</span>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">

</style>