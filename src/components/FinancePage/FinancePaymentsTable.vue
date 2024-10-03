<script setup>

import PmTable from "@/components/ui/Table/PmTable.vue";
import { formatedLocalDate } from "@/utils/formatedLocalDate.js";

defineProps({
    rows: {
        type: Array,
        required: true,
        default: () => []
    }
})

const formatDatePayout = (value) => {
    const {formateTime, formateDate} = formatedLocalDate(value)

    return `${formateTime } / ${formateDate}`
}

const columns = [
    {name: 'id', label: 'ID', field: 'id', align: 'center', autoWith: true},
    {name: 'datePayment', label: 'Дата заказа/выплата ', field: 'date_add', align: 'center', format: (val) => formatDatePayout(val)},
    {name: 'name', label: 'Название', field: 'requisites', align: 'center', format: (val) => val.short_name || val.fio || ''},
    {name: 'score', label: 'Счет', field: 'requisites', align: 'center', format: (val) => val.rs || val.usdt},
    {name: 'solve', label: 'К оплате', field: 'amount', align: 'center'},
    {name: 'status', label: 'Статус', field: 'status', align: 'center', format: (val) => val.name}
]
</script>

<template>
  <q-card class="finance-payment-form__wrapper">
    <h2>Выплаты </h2>

    <PmTable
      class="finance-payment-form__table"
      :columns="columns"
      :rows="rows"
    />
  </q-card>
</template>

<style scoped lang="scss">
h2 {
    padding-left: 14px;
    margin-bottom: 15px;
}
.finance-payment-form{
    &__wrapper{
        margin-top: 40px;
        margin-bottom: 100px;
        border-radius: 22px;
        padding: 42px 35px;
    }
}
</style>