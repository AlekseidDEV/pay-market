<script setup>

import HighRiskPromo from "@/components/HighRiskProjectPage/HighRiskPromo.vue";
import HighRiskPayCard from "@/components/HighRiskProjectPage/HighRiskPayCard.vue";
import HighRiskCategoryCard from "@/components/HighRiskProjectPage/HighRiskCategoryCard.vue";
import HighRiskInfo from "@/components/HighRiskProjectPage/HighRiskInfo.vue";
import HighRiskForm from "@/components/HighRiskProjectPage/HighRiskForm.vue";
</script>

<template>
  <q-page class="high-risk-project-page__wrapper">
    <div>
      <HighRiskPromo />
      <HighRiskPayCard />
      <HighRiskCategoryCard />
      <HighRiskInfo />
      <HighRiskForm id="form-accept-pay" />
    </div>
  </q-page>
</template>

<style lang="scss">
</style>