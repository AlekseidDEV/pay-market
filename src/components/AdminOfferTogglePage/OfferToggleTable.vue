<script setup>

import PmTable from "@/components/ui/Table/PmTable.vue";
import DefaultBtn from "@/components/ui/DefaultBtn.vue";
import OfferToggleDialog from "@/components/AdminOfferTogglePage/OfferToggleDialog.vue";

import { ref } from "vue";

const emits = defineEmits(['update-table'])

defineProps({
    rowsData: {
        type: Array,
        required: true,
        default: () => []
    }
})

const isShowDialog = ref(false)
const offerRowData = ref(null)

const openModal = (row) => {
    isShowDialog.value = true
    offerRowData.value = row
}


const columns = [
    {name: 'userId', label: 'Пользователь', field: 'userId', align: 'left', autoWith: false, sortRow: true, format: (val, row) => `(#${val}) ${row.login}`},
    {name: 'offerId', label: 'Оффер', field: 'offerId', align: 'left', autoWith: false, sortRow: true, format: (val, row) => `(#${val}) ${row.offerName}`},
    {name: 'btn', label: 'Действия', field: 'btn', align: 'center', autoWith: true},
]

</script>

<template>
  <PmTable
    :columns="columns"
    :rows="rowsData"
  >
    <template #body-cell-cust="{ colName, row }">
      <DefaultBtn
        v-if="colName === 'btn'"
        bg-color="dark"
        :border="false"
        class="offer-toggle-table__btn"
        @click="openModal(row)"
      >
        Отключить
      </DefaultBtn>
    </template>
  </PmTable>
  <OfferToggleDialog
    v-model="isShowDialog"
    :offer-del="offerRowData"
    @delete-offer="emits('update-table')"
  />
</template>

<style lang="scss">
.offer-toggle-table{
    &__btn{
        padding: 10px;
    }
}
</style>