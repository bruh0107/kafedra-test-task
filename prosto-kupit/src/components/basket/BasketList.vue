<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {storeToRefs} from "pinia";
import {useAuthStore} from "@/stores/auth-store.js";
import { BasketCard } from "@/components/index.js";

const { authToken } = storeToRefs(useAuthStore())
const basketProduct = ref()
onMounted(() => {
  axios
      .get(
          'http://lifestealer86.ru/api-shop/cart',
          { headers: { 'Authorization': `Bearer ${authToken.value}`} }
      )
      .then((data) => console.log(data.data.data))
})
</script>

<template>

</template>

<style scoped lang="scss">

</style>