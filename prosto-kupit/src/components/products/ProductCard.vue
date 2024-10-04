<script setup>
import { useRouter } from "vue-router";
import {computed} from "vue";
import {storeToRefs} from "pinia";
import {useAuthStore} from "@/stores/auth-store.js";
import axios from "axios";
const { isAuth, authToken } = storeToRefs(useAuthStore())

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: "Не задано"
  },
  image: {
    type: String,
    default: ''
  },
  price: {
    type: Number
  }
})

const router = useRouter()

const imageFullPath = computed(() => 'http://lifestealer86.ru/' + props.image)

const addToCart = () => {
  axios
      .post(
          'http://lifestealer86.ru/api-shop/cart/' + props.id,
          null,
          { headers: {'Authorization': `Bearer ${authToken.value}`} }
      )
      .then((data) => console.log(data.data.data))
}

</script>

<template>
  <article class="product-card" :style="{ backgroundImage: `url(${imageFullPath})` }">
    <div class="product-card-inner">
      <p class="product-card-title">{{ name }}</p>
      <p class="product-card-body">{{ description }}</p>
      <div class="product-card-info">
        <span class="product-card-price">{{ price }} р.</span>
        <button class="product-card-btn" v-if="isAuth" @click="addToCart">В корзину</button>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">

.product-card{
  min-height: 344px;
  width: auto;
  display: flex;
  align-items: end;
  border-radius: 10px;
  background-position: 50% 50%;
  background-size: cover;
  box-shadow: 0 0 15px var(--shadow);
  overflow-y: hidden;
  position: relative;

  &:hover .product-card-inner{
    bottom: 0;
  }

  &-inner{
    background: rgb(72, 113, 71, 0.7);
    width: 100%;
    border-radius: 10px;
    backdrop-filter: blur(3px);
    position: absolute;
    bottom: -43px;
    transition: bottom 0.3s;
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
    background: var(--white);
    color: var(--dark-color);
    font-family: 'Comfortaa', sans-serif;
    border-radius: 5px;
    transition: 0.2s;
    cursor: pointer;
  }

  &-btn:hover{
    color: var(--dark-color-hover);
    background: var(--bg-hover);
  }

  &-price{
    font-size: 24px;
  }
}
</style>