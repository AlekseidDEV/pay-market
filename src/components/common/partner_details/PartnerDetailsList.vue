<script setup>
import PmTable from '@/components/ui/Table/PmTable.vue'
import DefaultBtn from "@/components/ui/DefaultBtn.vue";
import PartnerDetailsForm from './PartnerDetailsForm.vue';
import PartnerDetailsDeleteDialog from './PartnerDetailsDeleteDialog.vue';
import PartnerDetailsPreview from './PartnerDetailsPreview.vue';

import { errorNotify } from "@/utils/errorNotify.js";
import { useMainStore } from '@/core/stores';
import { inject, onMounted, ref } from 'vue';

const columnsData = [
  { name: 'id', label: 'ID', field: 'id', align: 'left', autoWith: true },
  { name: 'name', label: 'Название', field: row => row.name || row.fio || null, align: 'left' },
  { name: 'inn', label: 'ИНН', field: 'inn', align: 'left' },
  { name: 'type', label: 'Тип реквизитов', field: row => partnerDetailsTypes.value?.get(row.form_id) || null, align: 'left' },
  { name: 'delete', label: '', field: '', align: 'right', autoWith: true },
  { name: 'edit', label: '', field: '', align: 'right', autoWith: true },
]
const rowsData = ref([])
const $http = inject('$http')
const store = useMainStore()
const user = store.getUser
const partnerDetailsTypes = ref(null)
const partnerDetailsType = ref('')

const formDialogRef = ref(null)

const isShowFormDialog = ref(false)
const isShowDeleteDialog = ref(false)
const isShowDetailsPreview = ref(false)
const isFetching = ref(true)
const currentDetailsId = ref(null)

onMounted(async () => {
  await fetchPartnerDetailsTypes()
  await fetchItems()
})

const fetchPartnerDetailsTypes = async () => {
  const { error, data, success } = await $http.getPartnerDetailsTypeList({ user_id: user.id })
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

const showFormDialog = (rowIndex) => {
  if (rowIndex === null) {
    isShowFormDialog.value = true
  } else {
    currentDetailsId.value = rowsData.value[rowIndex].id
    isShowFormDialog.value = true
  }
}

const hideFormDialog = () => {
  resetFormdDiaolgData()
  isShowFormDialog.value = false
}

const showDeleteDialog = (rowIndex) => {
  if (typeof rowIndex === 'number') {
    currentDetailsId.value = rowsData.value[rowIndex].id
    isShowDeleteDialog.value = true
  }
}

const hideDeleteDialog = () => {
  resetFormdDiaolgData()
  isShowDeleteDialog.value = false
}

const onDetailsDeleted = async () => {
  resetFormdDiaolgData()
  isShowDeleteDialog.value = false
  await fetchItems()
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
  const { error, data, success } = await $http.getPartnerDetailsList({ user_id: user.id })
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
  <div class="patner-details-list">
    <PmTable
      :rows="rowsData"
      :columns="columnsData"
      :hide-bottom="false"
      :pagination="{ rowsPerPage: 5 }"      
      @row-click.stop="(event, row, index)=>showDetailsPreview(row.form_id, row.id)"
    >
      <template #body-cell-cust="{ colName, rowKey }">
        <DefaultBtn
          v-if="['delete'].includes(colName)"
          bg-color="dark-grey"
          class="btn-3"
          @click.stop="showDeleteDialog(rowKey)"
        >
          <q-icon
            class="q-pa-sm"
            name="icon-pm-trash"
            size="20px"
            color="grey-13"
          />
        </DefaultBtn>
        <DefaultBtn
          v-if="['edit'].includes(colName)"
          bg-color="dark-grey"
          class="btn-3"
          @click.stop="showFormDialog(rowKey)"
        >
          <q-icon
            class="q-pa-sm"
            name="icon-pm-edit"
            size="20px"
            color="grey-13"
          />
        </DefaultBtn>
      </template>
    </PmTable>
    <div class="patner-details-list__actions row full-width justify-end">
      <div
        style="height: 60px; width: 195px;"
        class="row text-right"
      >
        <DefaultBtn
          :disabled="isFetching"
          class="btn-2 full-width"
          bg-color="pink"
          style="height: 60px;"
          @click="showFormDialog(null)"
        >
          Добавить
        </DefaultBtn>
      </div>
    </div>
  </div>
  <PartnerDetailsForm
    ref="formDialogRef"
    v-model:show-form-dialog="isShowFormDialog"
    :user-id="user.id"
    :details-id="currentDetailsId"
    :title="currentDetailsId ? 'Изменение реквизитов' : 'Добавление реквизитов'"
    @details-updated="fetchItems"
    @details-created="fetchItems"
    @hideDialog="hideFormDialog"
  />
  <PartnerDetailsDeleteDialog
    v-model="isShowDeleteDialog"
    :details-id="currentDetailsId"
    @detailsDeleted="onDetailsDeleted"
    @hideDialog="hideDeleteDialog"
  />
  <PartnerDetailsPreview
    v-model="isShowDetailsPreview"
    :details-id="currentDetailsId"
    :partnerType="partnerDetailsType"
    @hideDialog="hideDetailsPreview"
  />
</template>

<style lang="scss">
.patner-details-list {
  padding: 22px;

  &__actions {
    padding-top: 22px;
  }
}
</style>
