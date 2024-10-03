<script setup>
import PmTable from '@/components/ui/Table/PmTable.vue'
import DefaultBtn from "@/components/ui/DefaultBtn.vue";
import SettingsAddListItem from './SettingsAddListItem.vue';

import { errorNotify } from "@/utils/errorNotify.js";
import { fullscreenSpinner } from '@/utils/fullscreenSpinner.js';
import { validateByRegExp, countryRegExps } from '@/utils/validateUtils';
import { computed, inject, onMounted, reactive, ref } from 'vue';

const columnsData = [
  { name: 'id',         label: 'ID',                field: 'id',          align: 'left' },
  { name: 'name',       label: 'Полное название',   field: 'name',        align: 'left' },
  { name: 'shortName',  label: 'Короткое название', field: 'shortName',   align: 'left' },
  { name: 'alpha2',     label: 'Двухбуквенный код', field: 'alpha2',      align: 'left' },
  { name: 'alpha3',     label: 'Трехбуквенный код', field: 'alpha3',      align: 'left' },
  { name: 'iso',        label: 'ISO',               field: 'iso',         align: 'left' },
  { name: 'delete',     label: '',                  field: '',            align: 'right' },
  { name: 'edit',       label: '',                  field: '',            align: 'right' },
]

const rowsData = ref([])

const spinner = fullscreenSpinner()
const $http = inject('$http')
const isShowDialog = ref(false)
const isShowDeleteDialog = ref(false)
const isFetching = ref(true)
const currentRowIndex = ref(null)

const nameInputRef = ref(null)
const shortNameInputRef = ref(null)
const alpha2InputRef = ref(null)
const alpha3InputRef = ref(null)
const isoInputRef = ref(null)

let newItem = reactive({
  name: "",
  shortName: "",
  alpha2: "",
  alpha3: "",
  iso: ""
})

onMounted(async () => {
  await fetchItems()  
})

const isDisabledAddButton = computed(() => {
  return nameInputRef?.value?.hasError
    || shortNameInputRef?.value?.hasError
    || alpha2InputRef?.value?.hasError
    || alpha3InputRef?.value?.hasError
    || isoInputRef?.value?.hasError
    || !newItem.name
    || !newItem.shortName
    || !newItem.alpha2
    || !newItem.alpha3
    || !newItem.iso
    || false
})

const showDialog = (rowIndex) => {
  resetNewItem()
  if (rowIndex === null) {
    isShowDialog.value = true
  } else {
    currentRowIndex.value = rowIndex
    newItem = reactive({...rowsData.value[rowIndex]})
    isShowDialog.value = true
  }
}

const showDeleteDialog = (rowIndex) => {
  resetNewItem()  
  if (typeof rowIndex === 'number') {
    currentRowIndex.value = rowIndex
    newItem = reactive({ ...rowsData.value[rowIndex] })
    isShowDeleteDialog.value = true
  }
}

const fetchItems = async () => {
  isFetching.value = true
  const { error, data, success } = await $http.getCountryList()
  if (error) {
    errorNotify(typeof error === 'string' ? error : "Ошибка получения данных")
  }
  if (success) {
    rowsData.value = [...data]
  }
  isFetching.value = false
}

const updateItem = async (rowIndex) => {
  spinner.show()

  const itemId = rowsData.value[rowIndex].id
  const requestData = { id: itemId, ...newItem }
  const { error, data, success } = await $http.updateCountry(requestData)

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
  const { error, data, success } = await $http.createCountry(requestData)

  if (error) {
    errorNotify(typeof error === 'string' ? error : "Ошибка при добавлени действия")
  }

  if (success) {
    rowsData.value.unshift({
      id: data.id,
      ...data
    })
  }
  
  spinner.hide()
  isShowDialog.value = false
  resetNewItem()
}

const resetNewItem = () => {
  currentRowIndex.value = null
  newItem = reactive({
    name: "",
    shortName: "",
    alpha2: "",
    alpha3: "",
    iso: ""
  })
}
</script>

<template>
  <div class="settings-list-countries__wrapper">
    <PmTable
      :rows="rowsData"
      :columns="columnsData"
      :hide-bottom="false"
      :pagination="{ rowsPerPage: 5 }"
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
    :title="currentRowIndex === null ? 'Добавить страну' : 'Страна'"
    @hideDialog="resetNewItem"
  >
    <template #content>
      <div class="column q-gutter-md">
        <q-input
          ref="nameInputRef"
          v-model="newItem.name"
          standout
          class="q-field--without-bottom-slot"
          :maxlength="50"
          label="Полное название"
          placeholder="Полное название"
          :rules="[(value) => validateByRegExp(value, countryRegExps.name)]"
        />
        <q-input
          ref="shortNameInputRef"
          v-model="newItem.shortName"
          standout
          class="q-field--without-bottom-slot"
          :maxlength="20"
          label="Короткое название"
          placeholder="Короткое название"
          :rules="[(value) => validateByRegExp(value, countryRegExps.shortName)]"
        />
        <q-input
          ref="alpha2InputRef"
          v-model="newItem.alpha2"
          standout
          class="q-field--without-bottom-slot"
          label="Двухбуквенный код"
          placeholder="Двухбуквенный код"
          mask="AA"
          :rules="[(value) => validateByRegExp(value, countryRegExps.alpha2)]"
        />
        <q-input
          ref="alpha3InputRef"
          v-model="newItem.alpha3"
          standout
          class="q-field--without-bottom-slot"
          :maxlength="3"
          label="Трехбуквенный код"
          placeholder="Трехбуквенный код"
          mask="AAA"
          :rules="[(value) => validateByRegExp(value, countryRegExps.alpha3)]"
        />
        <q-input
          ref="isoInputRef"
          v-model="newItem.iso"
          standout
          class="q-field--without-bottom-slot"
          :maxlength="3"
          mask="###"
          label="Код в формате ISO"
          placeholder="Код в формате ISO"
          :rules="[(value) => validateByRegExp(value, countryRegExps.iso)]"
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
    title="Удаление страны"
    @hideDialog="resetNewItem"
  >
    <template #content>
      <div class="q-pa-lg">
        <div class="text-center">
          Вы действительно хотите удалить страну
          <br>
          <span class="text-weight-bolder text-h5">{{ rowsData[currentRowIndex].name }}</span>
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

<style lang="scss" scoped></style>
