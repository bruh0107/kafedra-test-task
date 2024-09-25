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
  <article class="product-card container">
    <div class="product-card-inner">
      <p class="product-card-title">{{ title }}</p>
      <p class="product-card-body">{{ description }}</p>
      <div class="product-card-info">
        <span class="product-card-price">{{ price }}</span>
        <button class="product-card-btn">В корзину</button>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.product-card{
  height: 344px;
  width: 400px;
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  border-radius: 10px;

  &-inner{
    background: #E9D6AA;
    width: 400px;
    border-radius: 10px;
  }

  &-title, &-body{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &-title{
    font-size: 20px;
    padding: 12px 50px 12px 12px;
  }

  &-body{
    font-size: 14px;
    padding: 0 12px;
  }

  &-info{
    display: flex;
    justify-content: space-between;
    padding: 12px;
    align-items: center;
  }

  &-btn{
    border: none;
    padding: 7px 33px;
    background: #F5EDD8;
    font-family: 'Comfortaa', sans-serif;
    border-radius: 5px;
  }
  &-price{
    font-size: 24px;
  }
}
</style>