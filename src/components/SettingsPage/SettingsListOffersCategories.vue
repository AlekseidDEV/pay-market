<script setup>
import PmTable from '@/components/ui/Table/PmTable.vue'
import DefaultBtn from "@/components/ui/DefaultBtn.vue";
import SettingsAddListItem from './SettingsAddListItem.vue';

import { errorNotify } from "@/utils/errorNotify.js";
import { fullscreenSpinner } from '@/utils/fullscreenSpinner.js';
import { computed, inject, onMounted, ref } from 'vue';

const columnsData = [
  { name: 'id', label: 'ID', field: 'id', align: 'left', autoWith: true },
  { name: 'name', label: 'Название', field: 'name', align: 'left' },
  { name: 'delete', label: '', field: '', align: 'right', autoWith: true },
  { name: 'edit', label: '', field: '', align: 'right', autoWith: true },
]

const rowsData = ref([])

const spinner = fullscreenSpinner()
const $http = inject('$http')
const isShowDialog = ref(false)
const isShowDeleteDialog = ref(false)
const isFetching = ref(true)

const newItemName = ref(null)
const currentRowIndex = ref(null)

onMounted(async () => {
  await fetchItems()
})

const showDialog = (rowIndex) => {
  resetNewItem()

  if (rowIndex === null) {
    isShowDialog.value = true
  } else {
    currentRowIndex.value = rowIndex
    newItemName.value = rowsData.value[rowIndex].name
    isShowDialog.value = true
  }
}

const showDeleteDialog = (rowIndex) => {
  resetNewItem()

  if (typeof rowIndex === 'number') {
    currentRowIndex.value = rowIndex
    newItemName.value = rowsData.value[rowIndex]
    isShowDeleteDialog.value = true
  }
}

const isDisabledAddButton = computed(() => {
  return !newItemName.value
})

const fetchItems = async () => {
  isFetching.value = true

  const { error, data, success } = await $http.getOfferCategoriesList()

  if (error) {
    errorNotify(typeof error === 'string' ? error : "Ошибка получения данных")
  }

  if (success) {
    rowsData.value = [...data]
  }

  isFetching.value = false
}

const updateItem = async (rowIndex, newName) => {
  spinner.show()

  if (newName && typeof rowIndex === 'number') {
    const itemId = rowsData.value[rowIndex].id
    const requestData = {
      id: itemId,
      name: newName
    }

    const { error, data, success } = await $http.updateOfferCategory(requestData)

    if (error) {
      errorNotify(typeof error === 'string' ? error : "Ошибка отправки данных")
    }

    if (success) {
      rowsData.value[rowIndex] = {
        id: data.id || "ID_ERROR",
        name: data.name || "NAME_ERROR"
      }
    }
  }

  spinner.hide()
  isShowDialog.value = false
  resetNewItem()
}

const onAcceptClicked = () => {
  if (currentRowIndex.value === null) {
    addItem(newItemName.value)
  } else if (typeof currentRowIndex.value === 'number') {
    updateItem(currentRowIndex.value, newItemName.value)
  }
}

const addItem = async (newItemName) => {
  spinner.show()

  if (newItemName) {
    const requestData = { name: newItemName }
    const { error, data, success } = await $http.createOfferCategory(requestData)

    if (error) {
      errorNotify(typeof error === 'string' ? error : "Ошибка при добавлени категории")
    }

    if (success) {
      rowsData.value.unshift({
        id: data.id || "ID_ERROR",
        name: data.name || "NAME_ERROR"
      })
    }
  }

  spinner.hide()
  isShowDialog.value = false
  resetNewItem()
}

const validateNameInput = (value) => {
  const name = typeof value === 'string' ? value : null
  newItemName.value = name
}

const resetNewItem = () => {
  newItemName.value = null
  currentRowIndex.value = null
}

</script>

<template>
  <div class="settings-list-offer-categories">
    <PmTable
      :rows="rowsData"
      :columns="columnsData"
      :hide-bottom="false"
      :pagination="{ rowsPerPage: 5 }"
      :loading="isFetching"
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
          :disabled="false"
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
    <div class="row full-width justify-end">
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
    :title="currentRowIndex === null ? 'Добавить категорию оффера' : 'Категория оффера'"
    @hideDialog="resetNewItem"
  >
    <template #content>
      <div class="column q-gutter-sm">
        <q-input
          v-model="newItemName"
          standout
          placeholder="Название категории"
          @input="(e) => validateNameInput(e.target.value)"
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
    title="Удаление категории"
    @hideDialog="resetNewItem"
  >
    <template #content>
      <div class="q-pa-lg">
        <div class="text-center">
          Вы действительно хотите удалить категорию
          <br>
          <span class="text-weight-bolder text-h5">
            {{ rowsData[currentRowIndex].name }}
          </span>
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
        @click="() => { console.log('удалить к чертям') }"
      >
        Удалить!
      </DefaultBtn>
    </template>
  </SettingsAddListItem>
</template>

<style scoped></style>
