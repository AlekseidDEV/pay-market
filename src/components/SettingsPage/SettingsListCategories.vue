<script setup>
import PmTable from '@/components/ui/Table/PmTable.vue'
import DefaultBtn from "@/components/ui/DefaultBtn.vue";
import SettingsAddListItem from './SettingsAddListItem.vue';

import { computed, reactive, ref } from 'vue';
import InputField from '@/components/ui/InputField.vue';


const isShowDialog = ref(false)
const newItem = reactive({
  id: null,
  name: null
})

const columnsData = [
    { name: 'id', label: 'ID', field: 'id', align: 'left' },
    { name: 'name', label: 'Название', field: 'name', align: 'left' },
    { name: 'edit', label: '', field: '', align: 'right' },
]

const rowsData = ref([
    { id: '101', name: 'Категория 1' },
    { id: '102', name: 'Категория 2' },
    { id: '103', name: 'Категория 3' },
    { id: '104', name: 'Категория 4' },
    { id: '105', name: 'Категория 5' },
    { id: '106', name: 'Категория 6' },
    { id: '107', name: 'Категория 7' },
    { id: '108', name: 'Категория 8' },
    { id: '109', name: 'Категория 9' },
])

const showDialog = () => {
  isShowDialog.value = true
}

const isDisabledAddButton = computed(()=>{
  return !(newItem.id && newItem?.name)
})

const addItem = async () => {
  const {id, name} = newItem
  rowsData.value.unshift({id, name })
  isShowDialog.value = false  
  resetNewItem()
}

const validateIdInput = (value) =>{  
  const id = parseInt(value)  
  newItem.id = isNaN(id) ? null : id
}

const validateNameInput = (value) =>{  
  const name = typeof value === 'string' ? value.trim() : null
  newItem.name = name  
}

const resetNewItem = () => {
  newItem.id = null,
  newItem.name = null
}
</script>

<template>
  <div class="settings-list-categories">
    <PmTable
      :rows="rowsData"
      :columns="columnsData"
      :hide-bottom="false"
      :pagination="{ rowsPerPage: 5 }"
    >
      <template #body-cell-cust="{ colName, rowIndex }">
        <DefaultBtn
          v-if="['edit'].includes(colName)"          
          :disable="false"
          bg-color="dark-grey"
          class="btn-3"          
        >
          <q-icon
            class="q-pa-sm"
            name="icon-pm-edit"
            size="20px"
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
          class="btn-2 full-width"
          bg-color="pink"
          style="height: 60px;"        
          @click="showDialog"
        >
          Добавить
        </DefaultBtn>   
      </div>
    </div>
  </div>
  <SettingsAddListItem    
    v-model="isShowDialog"
    title="Добавить категорию"
    @hideDialog="resetNewItem"
  >
    <template #content>
      <div class="column q-gutter-sm">
        <InputField
          v-model="newItem.id"
          aria-placeholder="ID"
          @input="(e) => validateIdInput(e.target.value)"
        />
        <InputField
          v-model="newItem.name"
          aria-placeholder="Название"
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
        @click="addItem"
      >
        Применить
      </DefaultBtn>
    </template>
  </SettingsAddListItem>
</template>

<style scoped></style>