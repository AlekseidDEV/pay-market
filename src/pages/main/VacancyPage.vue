<script setup>

import VacancyPromo from "@/components/VacancyPage/VacancyPromo.vue";
import VacancyInfoCard from "@/components/VacancyPage/VacancyInfoCard.vue";
import VacancyList from "@/components/VacancyPage/VacancyList.vue";
</script>

<template>
  <q-page class="vacancy-page__wrapper">
    <div>
      <VacancyPromo />
      <VacancyInfoCard />
      <VacancyList />
    </div>
  </q-page>
</template>

<style lang="scss">

</style>