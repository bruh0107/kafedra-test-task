<script setup>
import { useRouter } from "vue-router";
import {computed, ref} from "vue";
import {storeToRefs} from "pinia";
import {useAuthStore} from "@/stores/auth-store.js";
const { isAuth } = storeToRefs(useAuthStore())

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
  },
  showBtn: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()

const imageFullPath = computed(() => 'http://lifestealer86.ru/' + props.image)

</script>

<template>
  <article class="product-card" :style="{ backgroundImage: `url(${imageFullPath})` }">
    <div class="product-card-inner">
      <p class="product-card-title">{{ name }}</p>
      <p class="product-card-body">{{ description }}</p>
      <div class="product-card-info">
        <span class="product-card-price">{{ price }} р.</span>
        <button class="product-card-btn" v-if="isAuth">В корзину</button>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">

.product-card{
  height: 344px;
  width: 400px;
  display: flex;
  align-items: end;
  border-radius: 10px;
  background-position: 50% 50%;
  background-size: cover;
  box-shadow: 0 0 15px var(--shadow);
  overflow: hidden;
  position: relative;

  &:hover .product-card-inner{
    transform: translateY(0%);
  }

  &-inner{
    background: rgb(72, 113, 71, 0.7);
    width: 100%;
    border-radius: 10px;
    backdrop-filter: blur(3px);
    position: absolute;
    bottom: 0;
    transform: translateY(40%);
    transition: 0.3s all;
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
    transition: 0.3s;
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