<script setup>
import UserWalletPrewiew from "@/components/common/UserWalletPrewiew.vue";
import FinancePaymentContainer from "@/components/FinancePage/FinancePaymentContainer.vue";
</script>

<template>
  <q-page class="finance-page__wrapper page-container">
    breadcrumbs...
    <UserWalletPrewiew
      :show-btn="false"
    />
    <FinancePaymentContainer />
  </q-page>
</template>

<style lang="scss" scoped>
.finance-page__wrapper {
    margin-top: 42px;
    padding: 0px 10px;
}
</style>