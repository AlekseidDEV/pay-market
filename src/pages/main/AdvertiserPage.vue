<script setup>


import AdvertiserPromo from "@/components/AdvertiserPage/AdvertiserPromo.vue";
import AdvertiserTypeSource from "@/components/AdvertiserPage/AdvertiserTypeSource.vue";
import AdvertiserPanel from "@/components/AdvertiserPage/AdvertiserPanel.vue";
import AdvertiserForm from "@/components/AdvertiserPage/AdvertiserForm.vue";


</script>

<template>
  <q-page class="advertiser-page__wrapper">
    <AdvertiserPromo />
    <AdvertiserPanel />
    <AdvertiserTypeSource />
    <AdvertiserForm id="form-registrate" />
  </q-page>
</template>

<style lang="scss">

</style>