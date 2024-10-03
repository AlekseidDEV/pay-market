<script setup>

import PmTable from "@/components/ui/Table/PmTable.vue";
import AdminTablePayoutActions from "@/components/AdminPayotPage/AdminTablePayoutActions.vue";

import { formatedLocalDate } from "@/utils/formatedLocalDate.js";

defineProps({
    rowsData: {
        type: [Array, null],
        required: true,
        default: () => []
    }
})

const emits = defineEmits(['update-payout', 'preview-detail'])

const formatedPayoutData = (value) => {
    const { formateTime, formateDate } = formatedLocalDate(value)

    return `${formateTime} / ${formateDate}`
}

const columns = [
    {name: 'id', label: 'ID', field: 'id', align: 'left', autoWith: true},
    {name: 'dateAdd', label: 'Дата добавления', field: 'date_add', align: 'center', autoWith: false, format: formatedPayoutData},
    {name: 'rs', label: 'Рассчётный счет', field: 'requisites', align: 'center', autoWith: false, format: (val) => val?.rs || val?.usdt},
    {name: 'amount', label: 'К оплате', field: 'amount', align: 'center', autoWith: false},
    {name: 'status', label: 'Статуст', field: 'status', align: 'center', autoWith: false, format: (val) => val.name},
    {name: 'btns', label: 'Действия', field: '', align: 'center', autoWith: false},
]
</script>

<template>
  <q-card class="admin-payout-table__wrapper">
    <PmTable
      class="pm-table"
      :columns="columns"
      :rows="rowsData"
      @row-click="(evt, row, index) => emits('preview-detail', row.requisites_id, row.comment)"
    >
      <template #body-cell-cust="{colName, row}">
        <div v-if="colName === 'btns' && row.status.id === 1">
          <AdminTablePayoutActions
            :row-payout="row"
            @approve="emits('update-payout')"
            @reject="emits('update-payout')"
          />
        </div>
        <div v-else-if="colName === 'btns' && row.status.id !== 1">
          ---
        </div>
      </template>
    </PmTable>
  </q-card>
</template>

<style lang="scss">
    .admin-payout-table{
        &__wrapper{
            padding: 8px;
            margin-top: 30px;
        }
    }

    .q-card.admin-payout-table__wrapper{
        border-radius: 22px;
    }
</style>