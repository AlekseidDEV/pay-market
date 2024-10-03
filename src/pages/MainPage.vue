<script setup>
import MainPromo from "@/components/MainPage/MainPromo.vue";
import MainAdvantegPanel from "@/components/MainPage/MainAdvantegPanel.vue";
import MainHighRiskCard from "@/components/MainPage/MainHighRiskCard.vue";
import MainGoodIdeaCard from "@/components/MainPage/MainGoodIdeaCard.vue";
import MainQuestionsForm from "@/components/MainPage/MainQuestionsForm.vue";
import MainCurrentVacancies from "@/components/MainPage/MainCurrentVacancies.vue";
import SupportUserBlock from "@/components/common/SupportUserBlock.vue";
</script>

<template>
  <q-page class="main-page__wrapper">
    <MainPromo />
    <MainAdvantegPanel />
    <MainHighRiskCard />
    <SupportUserBlock />
    <MainGoodIdeaCard />
    <MainCurrentVacancies />
    <MainQuestionsForm />
  </q-page>
</template>

<style lang="scss">
</style>