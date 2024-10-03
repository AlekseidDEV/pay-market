<script setup>
import PmTable from '@/components/ui/Table/PmTable.vue'
import DefaultBtn from "@/components/ui/DefaultBtn.vue";
import SettingsAddListItem from './SettingsAddListItem.vue';

import { errorNotify } from "@/utils/errorNotify.js";
import { fullscreenSpinner } from '@/utils/fullscreenSpinner.js';
import { inject, onMounted, ref, reactive, computed } from 'vue'
import { validateByRegExp, path    } from '@/utils/validateUtils';


const columnsData = [
    { name: 'id', label: 'ID', field: 'id', align: 'left', autoWith: true },
    { name: 'offer_id', label: 'Оффер ID', field: row => offersMap.value.get(row.offer_id).name || null, align: 'left' },
    { name: 'path_id', label: 'path_id', field: 'path_id', align: 'left' },
    { name: 'amount', label: 'Сумма, руб', field: 'amount', align: 'left' },
    { name: 'type', label: 'Тип шага', field: row => stepTypesMap.get(row.type)?.title || null, align: 'left', },
    { name: 'pay_interval', label: 'Интервал', field: 'pay_interval', align: 'left', },
    { name: 'success', label: 'Успех', field: 'success', align: 'left', },
    { name: 'fail', label: 'Не успех', field: 'fail', align: 'left', },
    { name: 'delete', label: '', field: '', align: 'right', autoWith: true },
    { name: 'edit', label: '', field: '', align: 'right', autoWith: true },
]
const rowsData = ref([])
const $http = inject('$http')
const spinner = fullscreenSpinner()
const isShowDialog = ref(false)
const isShowDeleteDialog = ref(false)
const isFetching = ref(true)
const currentRowIndex = ref(null)
const offersMap = ref(new Map())

const offerIdInputRef = ref(null)
const pathIdInputRef = ref(null)
const typeInputRef = ref(null)
const payIntervalInputRef = ref(null)
const successInputRef = ref(null)
const failInputRef = ref(null)

const stepTypesMap = new Map([
    ['freeze', { title: 'Заморозка' }],
    ['pay', { title: 'Списание' }],
])

const defautltItem = {
    offer_id: null,
    path_id: null,
    amount: null,
    type: null,
    pay_interval: null,
    success: null,
    fail: null,
}

const newItem = reactive({})

onMounted(async () => {
    await fetchOffers()
    await fetchItems()
    resetNewItem()
})

const isDisabledAddButton = computed(() => {
    return offerIdInputRef?.value?.hasError        
        || typeInputRef?.value?.hasError
        || payIntervalInputRef?.value?.hasError
        || successInputRef?.value?.hasError
        || failInputRef?.value?.hasError
        || !newItem.offer_id        
        || !newItem.amount
        || !newItem.type
        || !newItem.pay_interval
        || !newItem.success
        || !newItem.fail
        || false
})

const resetNewItem = () => {
    currentRowIndex.value = null
    Object.assign(newItem, defautltItem)
}

const fetchItems = async () => {
    isFetching.value = true
    const { error, data, success } = await $http.getPathList()
    if (error) {
        errorNotify(typeof error === 'string' ? error : "Ошибка получения данных")
    }
    if (success) {
        rowsData.value = data
    }
    isFetching.value = false
}

const fetchOffers = async () => {
    const { error, data, success } = await $http.getOfferList()
    if (error) {
        errorNotify(typeof error === 'string' ? error : "Ошибка получения данных")
    }
    if (success) {        
        data.forEach(offer => {
            offersMap.value.set(offer.id, offer)
        });        
    }
}

const showDialog = (rowIndex) => {
    resetNewItem()
    if (rowIndex === null) {
        isShowDialog.value = true
    } else {
        currentRowIndex.value = rowIndex
        Object.assign(newItem, rowsData.value[rowIndex])
        isShowDialog.value = true
    }
}

const showDeleteDialog = (rowIndex) => {
    resetNewItem()
    if (typeof rowIndex === 'number') {
        currentRowIndex.value = rowIndex
        Object.assign(newItem, rowsData.value[rowIndex])
        isShowDeleteDialog.value = true
    }
}

const onAcceptClicked = () => {
    if (currentRowIndex.value === null) {
        createItem()
    }
    else if (typeof currentRowIndex.value === 'number') {
        updateItem(currentRowIndex.value)
    }
}

const createItem = async () => {
    spinner.show()
    const requestData = { ...newItem }
    const { error, success } = await $http.createPath(requestData)

    if (error) {
        errorNotify(typeof error === 'string' ? error : "Ошибка при добавлени действия")
    }

    if (success) {
      await fetchItems()
    }

    spinner.hide()
    isShowDialog.value = false
    resetNewItem()
}

const updateItem = async (rowIndex) => {
    spinner.show()

    const itemId = rowsData.value[rowIndex].id
    const requestData = { id: itemId, ...newItem }
    const { error, data, success } = await $http.updatePath(requestData)

    if (error) {
        errorNotify(typeof error === 'string' ? error : "Ошибка отправки данных")
    }

    if (success) {
        rowsData.value[rowIndex] = data
    }

    spinner.hide()
    isShowDialog.value = false
    resetNewItem()
}

const deletePath = async (id) => {
  console.log(id)
    spinner.show()    
    const { error, success } = await $http.deletePath(id)

    if (error) {
        errorNotify(typeof error === 'string' ? error : "Ошибка при добавлени действия")
    }

    if (success) {
      await fetchItems()
    }

    spinner.hide()
    isShowDeleteDialog.value = false
    resetNewItem()
}

</script>

<template>
  <div class="settings-steps__wrapper">
    <PmTable
      :rows="rowsData"
      :columns="columnsData"
      :hide-bottom="false"
      :pagination="{ rowsPerPage: 20 }"
      class="bg-purple-11 text-grey-13"
    >
      <template #body-cell-cust="{ colName, rowKey }">
        <DefaultBtn
          v-if="['delete'].includes(colName)"
          bg-color="dark-grey"
          class="btn-3"
          @click="showDeleteDialog(rowKey)"
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
          @click="showDialog(rowKey)"
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
    <div class="row full-width justify-end q-pb-md">
      <div
        style="height: 60px; width: 195px;"
        class="row text-right"
      >
        <DefaultBtn
          :disabled="isFetching"
          class="btn-2 full-width"
          bg-color="pink"
          style="height: 60px;"
          @click="showDialog(null)"
        >
          Добавить
        </DefaultBtn>
      </div>
    </div>
  </div>
  <SettingsAddListItem
    v-model="isShowDialog"
    :title="currentRowIndex === null ? 'Добавить шаг' : 'Шаг'"
    @hideDialog="resetNewItem"
  >
    <template #content>      
      <div class="column q-gutter-md">
        <q-select
          ref="offerIdInputRef"
          v-model="newItem.offer_id"
          :options="Array.from(offersMap, ([id, value]) => ({ id, title: value.name }))"
          option-value="id"        
          option-label="title"   
          map-options     
          standout
          emit-value
          :multiple="false"
          behavior="menu"
          label="Оффер"
          placeholder="Оффер"
          dropdown-icon="icon-pm-shevron-down"
          clearable
          clear-icon="icon-pm-cross-sm"
          popup-content-class="q-item__label__dropdown-option"
        />
        <q-input
          ref="pathIdInputRef"
          v-model="newItem.path_id"
          standout
          class="q-field--without-bottom-slot"
          :maxlength="50"
          label="Path ID"
          placeholder="Path ID"
          :rules="[(value) => validateByRegExp(value, path.path_id)]"
        />
        <q-input
          ref="amountIdInputRef"
          v-model="newItem.amount"
          standout
          class="q-field--without-bottom-slot"
          :maxlength="50"
          label="Сумма, руб"
          placeholder="Сумма, руб"
          :rules="[(value) => validateByRegExp(value, path.amount)]"
        />      
        <q-select
          ref="typeInputRef"
          v-model="newItem.type"
          :options="Array.from(stepTypesMap, ([name, value]) => ({ name, title: value.title }))"
          option-value="name"
          option-label="title"
          map-options
          standout
          emit-value
          :multiple="false"
          behavior="menu"
          label="Тип шага"
          placeholder="Тип шага"
          dropdown-icon="icon-pm-shevron-down"
          clearable
          clear-icon="icon-pm-cross-sm"
          popup-content-class="q-item__label__dropdown-option"
        />
        <q-input
          ref="payIntervalInputRef"
          v-model="newItem.pay_interval"
          standout
          class="q-field--without-bottom-slot"
          :maxlength="50"
          label="Интервал"
          placeholder="Интервал"
          :rules="[(value) => validateByRegExp(value, path.pay_interval)]"
        />      
        <q-select
          ref="successInputRef"
          v-model="newItem.success"
          :options="rowsData"
          option-value="path_id"        
          option-label="path_id"   
          map-options     
          standout
          emit-value
          :multiple="false"
          behavior="menu"
          label="Успех"
          placeholder="Успех"
          dropdown-icon="icon-pm-shevron-down"
          clearable
          clear-icon="icon-pm-cross-sm"
          popup-content-class="q-item__label__dropdown-option"
        />
        <q-select
          ref="failInputRef"
          v-model="newItem.fail"
          :options="rowsData"
          option-value="path_id"        
          option-label="path_id"   
          map-options     
          standout
          emit-value
          :multiple="false"
          behavior="menu"
          label="Не успех"
          placeholder="Не успех"
          dropdown-icon="icon-pm-shevron-down"
          clearable
          clear-icon="icon-pm-cross-sm"
          popup-content-class="q-item__label__dropdown-option"
        />
      </div>
    </template>
    <template #footer>
      <DefaultBtn
        :disabled="isDisabledAddButton"
        class="btn-2 full-width"
        bg-color="pink"
        style="height: 40px;"
        @click="onAcceptClicked"
      >
        Применить
      </DefaultBtn>
    </template>
  </SettingsAddListItem>
  <SettingsAddListItem
    v-model="isShowDeleteDialog"
    title="Удаление шага"
    @hideDialog="resetNewItem"
  >
    <template #content>
      <div class="q-pa-lg">
        <div class="text-center">
          Вы действительно хотите удалить шаг
          <br>
          <span class="text-weight-bolder text-h5">id:{{ rowsData[currentRowIndex]?.id || null }}</span>
          <br>
          ?
        </div>
      </div>
    </template>
    <template #footer>
      <DefaultBtn
        class="btn-2 full-width"
        bg-color="pink"
        style="height: 40px;"
        @click="deletePath(rowsData[currentRowIndex].id)"
      >
        Удалить!
      </DefaultBtn>
    </template>
  </SettingsAddListItem>
</template>

<style lang="scss">
.settings-steps__wrapper {

   .q-table thead,
   .q-table tr,
   .q-table th,
   .q-table td {
    border-bottom: 1px solid $grey-13;
  }
}
</style>