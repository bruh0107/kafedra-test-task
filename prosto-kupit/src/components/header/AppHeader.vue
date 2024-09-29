<script setup>
import { HeaderNavigation } from "@/components/index.js";
</script>

<template>
  <header class="header">
    <div class="header__inner container">
      <router-link to="/"><img src="@/assets/img/logo.svg" alt="logo" class="header__logo"></router-link>
      <header-navigation />
    </div>
  </header>
</template>

<style scoped lang="scss">
.header{
  background: #F5EDD8;
  position: sticky;
  top: 0;
  z-index: 10;

  &__inner{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 26px 0;
  }

  &__logo{
    display: flex;
    align-items: center;

    &-text{
      color: #3D2B2D;
      font-family: 'Comfortaa', sans-serif;
      font-weight: bold;
      line-height: 150%;
      font-size: 48px;
    }

  }
}

</style>