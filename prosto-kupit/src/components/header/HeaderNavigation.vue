<script setup>

</script>

<template>
  <nav class="navigation">
    <router-link class="navigation-link" to="/signup">Зарегистрироваться</router-link>
    <router-link class="navigation-link" to="/signin">Войти</router-link>
  </nav>
</template>

<style scoped lang="scss">
.navigation{
  display: flex;
  gap: 40px;
  align-items: center;

  &-link{
    font-family: 'Comfortaa', sans-serif;
    font-size: 26px;
  }
}
</style>