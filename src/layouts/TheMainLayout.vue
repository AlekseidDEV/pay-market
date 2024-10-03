<script setup>

import MainFooter from "@/components/Footers/MainFooter.vue";
import MainHeader from "@/components/Headers/MainHeader.vue";
</script>

<template>
  <div class="the-main-layout__wrapper">
    <q-layout>
      <MainHeader />
      <q-page-container>
        <router-view />
      </q-page-container>
      <MainFooter />
    </q-layout>
  </div>
</template>

<style lang="scss">

</style>