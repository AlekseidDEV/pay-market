<script setup>
  import TheFooter from '@/components/Footers/TheFooter.vue';
  import TheHeader from '@/components/Headers/TheHeader.vue';
</script>

<template>
  <div class="the-default-layout__wrapper">
    <q-layout>
      <TheHeader />
      <q-page-container>
        <router-view />
      </q-page-container>
      <TheFooter />
    </q-layout>
  </div>
</template>

<style scoped></style>