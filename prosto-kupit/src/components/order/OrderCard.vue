<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
import {storeToRefs} from "pinia";
import {useAuthStore} from "@/stores/auth-store.js";

const { authToken } = storeToRefs(useAuthStore())



const doAnOrder = () => {
  axios
      .post(
          'http://lifestealer86.ru/api-shop/order',
          null,
          { headers: {'Authorization': `Bearer ${authToken.value}`} }
      )
      .then((data) => console.log(data.data.data))
}
</script>

<template>
  <article class="order-card">
    <div class="order-card-inner">

    </div>
  </article>
</template>

<style scoped lang="scss">

</style>