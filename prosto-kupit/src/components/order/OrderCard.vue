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
      <ul>
        <li class="order-card-names" v-for="value in products" :key="value?.id">
          {{ value?.name }}
        </li>
      </ul>
      <div class="order-card-info">
        <span>Номер заказа: {{ id }}</span>
        <span class="order-card-price">{{ order_price }} р.</span>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.order-card{
  min-height: 344px;
  width: auto;
  display: flex;
  align-items: end;
  border-radius: 10px;
  background: var(--bg-green);
  box-shadow: 0 0 15px var(--shadow);
  padding: 30px;

  &-inner{
    flex-grow: 1;
    display: flex;
    height: 100%;
    justify-content: space-between;
    flex-direction: column;

    & ul{
      margin-left: 15px;
    }
  }
  &-info{
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 20px;
  }
  &-names{
    font-size: 20px;
  }
}
</style>