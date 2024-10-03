<script setup>

import SupportUserBlock from "@/components/common/SupportUserBlock.vue";
import SpOffersAdvantageCard from "@/components/SpOffersPage/SpOffersAdvantageCard.vue";
import SpOffersViewPanel from "@/components/SpOffersPage/SpOffersViewPanel.vue";
import SpOffersDescribeCard from "@/components/SpOffersPage/SpOffersDescribeCard.vue";
import SpOffersInfoCards from "@/components/SpOffersPage/SpOffersInfoCards.vue";
import SpOffersCardPanel from "@/components/SpOffersPage/SpOffersCardPanel.vue";
import SpOffersPromo from "@/components/SpOffersPage/SpOffersPromo.vue";
</script>

<template>
  <q-page class="sp-offers-page__wrapper">
    <SpOffersPromo />
    <SpOffersCardPanel />
    <SpOffersInfoCards />
    <SpOffersDescribeCard />
    <SpOffersViewPanel />
    <SpOffersAdvantageCard />
    <SupportUserBlock />
  </q-page>
</template>

<style lang="scss">

</style>