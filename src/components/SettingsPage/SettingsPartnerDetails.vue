<script setup>
import PmTable from '@/components/ui/Table/PmTable.vue'
import PartnerDetailsPreview from '@/components/common/partner_details/PartnerDetailsPreview.vue';

import { errorNotify } from "@/utils/errorNotify.js";
import { inject, onMounted, ref } from 'vue';

const columnsData = [
  { name: 'id', label: 'ID', field: 'id', align: 'left', autoWith: true },
  { name: 'inn', label: 'ИНН', field: 'inn', align: 'left' },
  { name: 'name', label: 'Название', field: row => row.name || row.fio || null, align: 'left' },
  { name: 'type', label: 'Тип реквизитов', field: row => partnerDetailsTypes.value?.get(row.form_id) || null, align: 'left' },
  { name: 'delete', label: '', field: '', align: 'right', autoWith: true },
  { name: 'edit', label: '', field: '', align: 'right', autoWith: true },
]
const rowsData = ref([])
const $http = inject('$http')
const partnerDetailsTypes = ref(null)
const partnerDetailsType = ref('')

const isShowDetailsPreview = ref(false)
const isFetching = ref(true)
const currentDetailsId = ref(null)
const filterInn = ref(null)

onMounted(async () => {
  await fetchPartnerDetailsTypes()
  await fetchItems()
})

const fetchPartnerDetailsTypes = async () => {
  const { error, data, success } = await $http.getPartnerDetailsTypeList()
  if (error) {
    errorNotify(typeof error === 'string' ? error : "Ошибка получения данных")
  }
  if (success) {
    const typesMap = new Map()
    data.forEach(type => {
      typesMap.set(type.id, type.name)
    });
    partnerDetailsTypes.value = typesMap
  }
}

const resetFormdDiaolgData = () => {
  currentDetailsId.value = null
}

const showDetailsPreview = (formId, id) => {
  if (id && typeof id === 'number') {
    partnerDetailsType.value = partnerDetailsTypes.value.get(formId)
    currentDetailsId.value = id
    isShowDetailsPreview.value = true
  }
}

const hideDetailsPreview = () => {
  resetFormdDiaolgData()
  isShowDetailsPreview.value = false
}

const fetchItems = async () => {
  isFetching.value = true
  const { error, data, success } = await $http.getFilteredPartnerDetailsList({})
  if (error) {
    errorNotify(typeof error === 'string' ? error : "Ошибка получения данных")
  }
  if (success) {
    rowsData.value = [...data]
  }
  isFetching.value = false
}
</script>

<template>
  <div class="settings-patner-details-list">
    <PmTable
      :rows="rowsData"
      :columns="columnsData"
      :hide-bottom="false"
      :pagination="{ rowsPerPage: 20 }"
      :filter="filterInn"
      class="bg-purple-11 text-grey-13"
      @row-click.stop="(event, row, index) => showDetailsPreview(row.form_id, row.id)"
    >
      <template #top-right>
        <q-input
          v-model="filterInn"
          borderless
          dense
          debounce="300"
          placeholder="Поиск"
          clearable
          clear-icon="icon-pm-cross-sm"
          class="settings-patner-details-list__filter-input"
        >
          <template #append>
            <q-icon
              name="search"
              class="text-grey-13"
            />
          </template>
        </q-input>
      </template>
    </PmTable>
  </div>
  <PartnerDetailsPreview
    v-model="isShowDetailsPreview"
    :details-id="currentDetailsId"
    :partnerType="partnerDetailsType"
    @hideDialog="hideDetailsPreview"
  />
</template>

<style lang="scss" >
.settings-patner-details-list {
  padding: 22px;

  .q-table__card {
    box-shadow: none;
  }

  .q-table th {
    color: white;
    font-size: 14px;
  }

   .q-table thead,
   .q-table tr,
   .q-table th,
   .q-table td {
    border-bottom: 1px solid $grey-13;
  }

  .q-table>tbody tr:hover {    
    color: $red-13;
  }

  &__filter-input {

    input {
      color: $grey-13;
    }

    .q-field__append {
      padding-right: 20px;
    }

    .q-field__append.q-field__marginal .q-icon.q-field__focusable-action {
      color: $grey-13;
    }
  }
}
</style>
