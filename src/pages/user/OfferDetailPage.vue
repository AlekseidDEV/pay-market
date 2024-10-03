<script setup>

import OfferPageContainer from "@/components/OfferDetailPage/OfferPageContainer.vue";
</script>

<template>
  <q-page class="offer-detail__container page-container">
    <div class="offer-detail__wrapper">
      <span>breadcrumbs....</span>
      <OfferPageContainer />
    </div>
  </q-page>
</template>

<style scoped lang="scss">
.offer-detail{
    &__wrapper{
        margin-top: 42px;
        padding: 0px 10px;
    }
}
</style>