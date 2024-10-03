<script setup>

import OfferToggleContainer from "@/components/AdminOfferTogglePage/OfferToggleContainer.vue";
</script>

<template>
  <q-page class="admin-offer-toggle__page page-container">
    <h2>Подключенные офферы</h2>
    <OfferToggleContainer />
  </q-page>
</template>

<style scoped lang="scss">
    .admin-offer-toggle{
        &__page{
            margin-top: 53px;
            padding: 10px;
        }
    }
</style>