<script setup>
import PmTable from '@/components/ui/Table/PmTable.vue'
import DefaultBtn from "@/components/ui/DefaultBtn.vue";
import SettingsAddListItem from './SettingsAddListItem.vue';

import { errorNotify } from "@/utils/errorNotify.js";
import { fullscreenSpinner } from '@/utils/fullscreenSpinner.js';
import { validateByRegExp, offerRegExps } from '@/utils/validateUtils';
import { computed, inject, onMounted, reactive, ref } from 'vue';

const columnsData = [
  { name: 'id',                   label: 'ID',                field: 'id',            align: 'left' },
  { name: 'name',                 label: 'Полное название',   field: 'name',          align: 'left' },
  { name: 'logo_link',            label: 'Логотип',           field: 'logo_link',     align: 'left' },
  { name: 'domine',               label: 'Домен',             field: 'domine',        align: 'left' },
  { name: 'country_name',         label: 'Страна',            field: row => row.country?.name || null, align: 'left' },
  { name: 'target_action_name',   label: 'Целевое действие',  field: row => row.targetAction?.name || null, align: 'left' },
  { name: 'category_name',        label: 'Категория',         field: row => row.category?.name || null, align: 'left' },
  { name: 'target_action_price',  label: 'Цена целевого действия', field: 'target_action_price', align: 'left' },
  { name: 'delete',               label: '',                  field: '',              align: 'right' },
  { name: 'edit',                 label: '',                  field: '',              align: 'right' },
]

const rowsData = ref([])
const countries = ref([])
const targetActions = ref([])
const categories = ref([])

const uploadsBaseUrl = import.meta.env.VITE_UPLOADS_BASE_URL
const spinner = fullscreenSpinner()
const $http = inject('$http')
const isShowDialog = ref(false)
const isShowDeleteDialog = ref(false)
const isFetching = ref(false)

//inputs refs
const nameInputRef = ref(null)
const logoImgRef = ref(null)
const domineInputRef = ref(null)
const countryIdInputRef = ref(null)
const categoryIdInputRef = ref(null)
const targetActionIdInputRef = ref(null)
const targetActionPriceInputRef = ref(null)

const currentRowIndex = ref(null)
const fileToUpload = ref(null)
let newItem = reactive({})

onMounted(async () => {
  resetNewItem()

  isFetching.value = true

  await fetchCountries()
  await fetchTargetActions()
  await fetchOfferCategories()
  await fetchOffers()

  isFetching.value = false
})

const isDisabledAddButton = computed(() => {
  return nameInputRef?.value?.hasError
    || domineInputRef?.value?.hasError
    || targetActionPriceInputRef?.value?.hasError
    || !(newItem.logo || newImgUrl.value)
    || !newItem.name
    || !newItem.domine
    || !newItem.country_id
    || !newItem.category_id
    || !newItem.target_action_id
    || !newItem.target_action_price
    || false
})

const newImgUrl = computed(() => {
  if (fileToUpload.value) {
    return URL.createObjectURL(fileToUpload.value)
  }
  else return null
})

const resetNewItem = () => {
  currentRowIndex.value = null
  fileToUpload.value = null
  newItem = reactive({
    name: "",
    logo: "",
    domine: "",
    country_id: null,
    category_id: null,
    target_action_id: null,    
    target_action_price: ""
  })
}

const showDialog = (rowIndex) => {
  resetNewItem()
  if (rowIndex === null) {
    isShowDialog.value = true
  } else {
    currentRowIndex.value = rowIndex
    newItem = reactive({ ...rowsData.value[rowIndex] })
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

const fetchOffers = async () => {
  const { error, data, success } = await $http.getOfferList()
  if (error) {
    errorNotify(typeof error === 'string' ? error : "Ошибка получения данных")
  }
  if (success) {
    rowsData.value = data.map((offer) => {
      offer.country_id = parseInt(offer.country_id)
      return offer
    })
  }
}

const fetchCountries = async () => {
  const { error, data, success } = await $http.getCountryList()
  if (error) {
    errorNotify(typeof error === 'string' ? error : "Ошибка получения данных")
  }
  if (success) {
    countries.value = data
  }
}

const fetchTargetActions = async () => {
  const { error, data, success } = await $http.getTargetActionList()
  if (error) {
    errorNotify(typeof error === 'string' ? error : "Ошибка получения данных")
  }
  if (success) {
    targetActions.value = data
  }
}

const fetchOfferCategories= async () => {
  const { error, data, success } = await $http.getOfferCategoriesList()
  if (error) {
    errorNotify(typeof error === 'string' ? error : "Ошибка получения данных")
  }
  if (success) {
    categories.value = data
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

  if (fileToUpload.value) {
    const { error, data } = await $http.uploadPhoto({ image: fileToUpload.value })
    if (error) {
      errorNotify(typeof error === 'string' ? error : "Ошибка при загрузке изображения")
      spinner.hide()
      return
    }
    if (data) {
      newItem.logo = data
    }
  }

  const requestData = { ...newItem }
  const { error, data, success } = await $http.createOffer(requestData)

  if (error) {
    errorNotify(typeof error === 'string' ? error : "Ошибка при добавлении оффера ")
  }

  if (success) {
    rowsData.value.unshift({      
      ...data,
      country_id: parseInt(data.country_id),      
    })    
  }

  spinner.hide()
  isShowDialog.value = false
  resetNewItem()
}

const updateItem = async (rowIndex) => {
  spinner.show()

  if (fileToUpload.value) {
    const { error, data } = await $http.uploadPhoto({ image: fileToUpload.value })
    if (error) {
      errorNotify(typeof error === 'string' ? error : "Ошибка при загрузке изображения")
      spinner.hide()
      return
    }
    if (data) {
      newItem.logo = data
    }
  }

  const itemId = rowsData.value[rowIndex].id
  const requestData = {
    id: itemId,
    name: newItem.name,
    logo: newItem.logo,
    domine: newItem.domine,
    country_id: newItem.country_id,
    category_id: newItem.category_id,
    target_action_id: newItem.target_action_id,
    target_action_price: newItem.target_action_price
  }
  const { error, data, success } = await $http.updateOffer(requestData)

  if (error) {
    errorNotify(typeof error === 'string' ? error : "Ошибка отправки данных")
  }

  if (success) {
    rowsData.value[rowIndex] = {
      ...data,
      country_id: parseInt(data.country_id),      
    }
  }

  spinner.hide()
  isShowDialog.value = false
  resetNewItem()
}

</script>

<template>
  <div class="settings-list-offers__wrapper">
    <PmTable
      :rows="rowsData"
      :columns="columnsData"
      :hide-bottom="false"
      :pagination="{ rowsPerPage: 5 }"
    >
      <template #body-cell-cust="{ colName, rowKey }">
        <a
          v-if="['logo_link'].includes(colName)"
          class="text-red-13"
          :href="uploadsBaseUrl + rowsData[rowKey].logo"
          target="_blank"
        >
          Открыть...
        </a>
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
          :disabled="false"
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
    :title="currentRowIndex === null ? 'Добавить оффер' : 'оффер'"
    @hideDialog="resetNewItem"
  >
    <template #content>
      <div class="column q-gutter-md">
        <q-input
          ref="nameInputRef"
          v-model="newItem.name"
          standout
          class="q-field--without-bottom-slot"
          :maxlength="120"
          label="Название оффера"
          placeholder="Название оффера"
          :rules="[(value) => validateByRegExp(value, offerRegExps.name)]"
        />
        <q-card bordered>
          <q-card-section class="column q-gutter-md">
            <div class="row justify-center">
              <q-img
                ref="logoImgRef"
                :src="newImgUrl || `${uploadsBaseUrl + newItem.logo}`"
                style="height: 150px; max-width: 150px"
                class="rounded-borders"
              >
                <template #error>
                  <div class="absolute-full flex flex-center bg-negative text-white text-center">
                    Выберите логотип
                  </div>
                </template>
              </q-img>
            </div>
            <q-file
              v-model="fileToUpload"
              standout
              max-file-size="1048576"
              label="Выбрать логотип (до 1МБ)"
              accept="image/*"
              @update:model-value="onFileSelected"
              @rejected="errorNotify('Выберите подходящее изображение')"
            >
              <template #prepend>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </q-card-section>
        </q-card>
        <q-input
          ref="domineInputRef"
          v-model="newItem.domine"
          standout
          class="q-field--without-bottom-slot"
          :maxlength="50"
          label="Домен"
          placeholder="Домен"
          :rules="[(value) => validateByRegExp(value, offerRegExps.domine)]"
        />
        <q-select
          ref="countryIdInputRef"
          v-model="newItem.country_id"
          :options="countries"
          option-value="id"
          option-label="name"
          map-options
          standout
          emit-value
          behavior="menu"
          :multiple="false"
          label="Выбор страны"
          placeholder="Выбор страны"
          dropdown-icon="icon-pm-shevron-down"
          clearable
          clear-icon="icon-pm-cross-sm"
          popup-content-class="q-item__label__dropdown-option"
        />
        <q-select
          ref="targetActionIdInputRef"
          v-model="newItem.target_action_id"
          :options="targetActions"
          option-value="id"
          option-label="name"
          map-options
          standout
          emit-value
          behavior="menu"
          :multiple="false"
          label="Целевое действие"
          placeholder="Целевое действие"
          dropdown-icon="icon-pm-shevron-down"
          clearable
          clear-icon="icon-pm-cross-sm"
          popup-content-class="q-item__label__dropdown-option"
        />
        <q-select
          ref="categoryIdInputRef"
          v-model="newItem.category_id"
          :options="categories"
          option-value="id"
          option-label="name"
          map-options
          standout
          emit-value
          behavior="menu"
          :multiple="false"
          label="Категория"
          placeholder="Категория"
          dropdown-icon="icon-pm-shevron-down"
          clearable
          clear-icon="icon-pm-cross-sm"
          popup-content-class="q-item__label__dropdown-option"
        />
        <q-input
          ref="targetActionPriceInputRef"
          v-model="newItem.target_action_price"
          standout
          class="q-field--without-bottom-slot"
          :maxlength="10"
          label="Цена целевого действия, руб"
          placeholder="Цена целевого действия, руб"
          :rules="[(value) => validateByRegExp(value, offerRegExps.target_action_price)]"
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
    title="Удаление оффера"
    @hideDialog="resetNewItem"
  >
    <template #content>
      <div class="q-pa-lg">
        <div class="text-center">
          Вы действительно хотите удалить оффер
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

<style lang="scss"></style>