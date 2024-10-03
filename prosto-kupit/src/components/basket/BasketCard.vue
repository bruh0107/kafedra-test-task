<script setup>
import { useRouter } from "vue-router";
import {computed} from "vue";
import colbasa from '@/assets/img/callbase.jpg'

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
    type: Number,
  }
})

const router = useRouter()

const imageFullPath = computed(() => 'http://lifestealer86.ru/' + props.image)

</script>

<template>
  <article class="basket-card">
    <div class="basket-card-inner">
      <div class="basket-card-left">
        <img class="basket-card-img" :src="image ? imageFullPath : colbasa" alt="Продукт">
        <div class="basket-card-info">
          <p class="basket-card-title">{{ name }}</p>
          <p class="basket-card-body">{{ description }}</p>
        </div>
      </div>
      <div class="basket-card-right">
        <div>
          <button>-</button>
          <button>+</button>
        </div>
        <div>
          <span class="basket-card-price">{{ price }} р.</span>
          <button class="basket-card-btn">Оформить</button>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.basket-card{
  height: fit-content;
  width: auto;
  display: flex;
  background: var(--bg-green);

  &-inner{
    padding: 20px;
    display: flex;
    width: 100%;
    justify-content: space-between;

  }
  &-info{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  &-text{
    display: flex;
    gap: 20px;
    justify-content: space-between;
  }
  &-img{
    width: 120px;
    height: 120px
  }
  &-body{
    font-size: 18px;
  }
  &-title{
    font-size: 20px;
  }
  &-left{
    display: flex;
    gap: 20px;
    max-width: 60%;
  }
  &-right{
    display: flex;

    & > div:nth-child(2){
      display: flex;
      flex-direction: column;
      gap: 20px;
      justify-content: center;
      align-items: center;
    }
  }
  &-price{
    font-size: 20px;
  }
  &-btn{
    padding: 14px 60px;
  }




}
</style>