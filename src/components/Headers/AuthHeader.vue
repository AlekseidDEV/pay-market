<script setup>
import { computed } from "vue";
import { Screen } from "quasar";
import {useRouter} from "vue-router";

const router = useRouter()

const imgPath = computed(() => {
    return Screen.lt.md ? '/icons/logoMobile.svg' : '/icons/logo.svg'
})
</script>

<template>
  <header class="header">
    <div class="header__wrapp-content">
      <div class="header__logo">
        <router-link to="/">
          <img
            :src="imgPath"
            alt="logo"
          >
        </router-link>
      </div>
      <span
        class="header__close-icon"
        @click="router.push({name: 'main-page'})"
      >
        <span class="x-icon" />
      </span>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header{
  &__wrapp-content{
    padding-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__close-icon{
    cursor: pointer;
    width: 34px;
    height: 34px;
    background: #1E1B2E;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 640px) {
      width: 20px;
      height: 20px;

      svg {
        height: 10px;
        width: 10px;
      }
    }
  }
}
</style>