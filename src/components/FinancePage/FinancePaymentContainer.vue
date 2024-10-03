<script setup>

import FinancePaymentsTable from "@/components/FinancePage/FinancePaymentsTable.vue";
import FinanceRequestForm from "@/components/FinancePage/FinanceRequestForm.vue";

import { useMainStore } from "@/core/stores/index.js";
import { errorNotify } from "@/utils/errorNotify.js";
import { inject, onMounted, ref } from "vue";


const $http = inject('$http')
const user = useMainStore().getUser
const payoutData = ref([])

const getPayoutData = async () => {
    const {error, data, status,} = await $http.getIssetPayout(user.id)

    if(status){
        data ? payoutData.value.push(data) : payoutData.value.splice(0)
    }else {
        console.error('Error: ' + error);
        errorNotify()
    }
}

onMounted(() => {
    getPayoutData()
})
</script>

<template>
  <FinanceRequestForm @update-payout-table="getPayoutData" />
  <FinancePaymentsTable :rows="payoutData" />
</template>

<style scoped lang="scss">

</style>