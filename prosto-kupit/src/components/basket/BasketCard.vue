<script setup>
import { useRouter } from "vue-router";
import {computed, ref} from "vue";
import callbase from '@/assets/img/callbase.jpg'
import {storeToRefs} from "pinia";
import {useAuthStore} from "@/stores/auth-store.js";

const emit = defineEmits(['response', 'deleteProduct', 'deleteGroup', 'addProduct'])
const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  product_id: {
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
  },
  count: {
    type: Number
  }
})
const { authToken } = storeToRefs(useAuthStore())
const router = useRouter()
const counter = ref(props.count)
const imageFullPath = computed(() => 'http://lifestealer86.ru/' + props.image)

const increaseQuantity = () => {
  counter.value++
  emit('addProduct', props.product_id)

}
const decreaseQuantity = () => {
  if (counter.value > 1) {
    counter.value--
    emit("deleteProduct", props.product_id)
  }
}

</script>

<template>
  <article class="basket-card">
    <div class="basket-card-inner">
      <div class="basket-card-left">
        <img class="basket-card-img" :src="image ? imageFullPath : callbase" alt="Продукт">
        <div class="basket-card-info">
          <p class="basket-card-title">{{ name }}</p>
          <p class="basket-card-body">{{ description }}</p>
        </div>
      </div>
      <div class="basket-card-right">
        <div>
          <button @click="decreaseQuantity">-</button>
          <span>{{ counter }}</span>
          <button @click="increaseQuantity">+</button>
        </div>
        <div>
          <span class="basket-card-price">{{ price }} р.</span>
        </div>
        <img class="deleteOrder" src="@/assets/img/trash_icon.svg" alt="Мусорка" @click="emit('deleteGroup', product_id)">
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
  border-radius: 10px;

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
    justify-content: space-around;
  }
  &-text{
    display: flex;
    gap: 20px;
    justify-content: space-between;
  }
  &-img{
    width: 120px;
    height: 120px;
    border-radius: 5px;
    object-fit: cover;
    background: var(--white);
  }
  &-body{
    font-size: 18px;
  }
  &-title{
    font-size: 24px;
  }
  &-left{
    display: flex;
    gap: 20px;
    max-width: 60%;
  }
  &-right{
    display: flex;
    gap: 30px;
    align-items: flex-end;

    & > div:first-child{
      display: flex;
      align-items: center;
      width: 120px;
      height: fit-content;
      justify-content: space-between;

      & > button{
        padding: 14px;
        font-size: 18px;
        border: none;
        background: var(--white);
        cursor: pointer;
        font-family: 'Comfortaa', sans-serif;
        color: var(--dark-color);
        transition: 0.2s;
        border-radius: 7px;

        &:hover{
          color: var(--dark-color-hover);
          background: var(--bg-hover);
        }
      }
      & > span{
        font-size: 20px;
      }
    }
    & > div:nth-child(2){
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: 20px;
      align-items: end;
    }
  }

  &-price{
    font-size: 28px;
  }

  .deleteOrder{
    cursor: pointer;
  }

}
</style>