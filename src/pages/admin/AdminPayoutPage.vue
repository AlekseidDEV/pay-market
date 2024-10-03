<script setup>

import AdminPayoutContainer from "@/components/AdminPayotPage/AdminPayoutContainer.vue";
</script>

<template>
  <q-page class="admin-payout__wrapper page-container">
    <div>
      <h2>Выплаты пользователям</h2>
      <AdminPayoutContainer />
    </div>
  </q-page>
</template>

<style scoped lang="scss">
    .admin-payout__wrapper{
        margin-top: 53px;
    }
</style>