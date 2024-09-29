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
  <article class="product-card container" :style="{ backgroundImage: `url(${imageFullPath})` }">
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
  flex-wrap: wrap;
  align-items: end;
  border-radius: 10px;
  background-position: 50% 50%;
  background-size: cover;

  &-inner{
    background: rgba(233, 214, 170, 0.8);
    width: 400px;
    border-radius: 10px;
    backdrop-filter: blur(3px);
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
    color: #3D2B2D;
    font-family: 'Comfortaa', sans-serif;
    border-radius: 5px;
    transition: 0.3s;
  }

  &-btn:hover{
    color: #554143;
    background: #f4efe0;
  }
  &-btn:active{
    color: #685a5b;
    background: #f8f6f0;
  }

  &-price{
    font-size: 24px;
  }
}
</style>