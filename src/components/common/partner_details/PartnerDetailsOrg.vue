<script setup>
import { ref } from 'vue';
import { validateByRegExp, partnerDetails as details } from "@/utils/validateUtils.js";

const partnerDetails = defineModel('partnerDetails')

const ndsIdOptions = [
    { id: 1, label: "Без НДС" },
    { id: 2, label: "10%" },
    { id: 3, label: "20%" }
]

const kppInputRef = ref(null)
const ogrnInputRef = ref(null)
const nameInputRef = ref(null)
const shortNameInputRef = ref(null)
const addressInputRef = ref(null)
const legalAddressInputRef = ref(null)
const ndsIdSelectRef = ref(null)

</script>

<template>
  <q-card-section 
    class="partner-details-org__section row"
    style="gap: 18px;"
  >
    <q-input
      ref="kppInputRef"
      v-model="partnerDetails.kpp"
      standout
      label="КПП"
      placeholder="КПП"
      clearable
      clear-icon="icon-pm-cross-sm"
      :rules="[(value)=>!!value, (value) => validateByRegExp(value, details.kpp)]"
      class="q-field--without-bottom-slot"
    />
    <q-input
      ref="ogrnInputRef"
      v-model="partnerDetails.ogrn"
      standout
      label="ОГРН/ОГРНИП"
      placeholder="ОГРН/ОГРНИП"
      clearable
      clear-icon="icon-pm-cross-sm"
      :rules="[(value)=>!!value, (value) => validateByRegExp(value, details.ogrn)]"
      class="q-field--without-bottom-slot"
    />    
  </q-card-section>
  <q-card-section
    class="partner-details-org__section column"
    style="gap: 18px;"
  >
    <q-input
      ref="nameInputRef"
      v-model="partnerDetails.name"
      standout
      label="Наименование организации"
      placeholder="Наименование организации"
      clearable
      clear-icon="icon-pm-cross-sm"
      :rules="[(value)=>!!value]"
      class="q-field--without-bottom-slot full-width"
    />
    <q-input
      ref="shortNameInputRef"
      v-model="partnerDetails.short_name"
      standout
      label="Сокращенное наименование организации"
      placeholder="Сокращенное наименование организации"
      clearable
      clear-icon="icon-pm-cross-sm"
      :rules="[(value) => !!value]"
      class="q-field--without-bottom-slot full-width"
    />
    <q-input
      ref="legalAddressInputRef"
      v-model="partnerDetails.legal_address"
      standout
      label="Юридический адрес"
      placeholder="Юридический адрес"
      clearable
      clear-icon="icon-pm-cross-sm"
      :rules="[(value)=>!!value]"      
      class="q-field--without-bottom-slot full-width"
    />    
    <q-input
      ref="addressInputRef"
      v-model="partnerDetails.address"
      standout
      label="Почтовый адрес"
      placeholder="Почтовый адрес"
      clearable
      clear-icon="icon-pm-cross-sm"
      :rules="[(value)=>!!value]"
      class="q-field--without-bottom-slot full-width"
    />
  </q-card-section>
  <q-card-section class="partner-details-org__section row no-wrap">
    <q-select
      ref="ndsIdSelectRef"
      v-model="partnerDetails.nds_id"
      :options="ndsIdOptions"
      option-value="id"
      option-label="label"
      map-options
      emit-value
      behavior="menu"
      :multiple="false"
      standout
      label="Введите ставку НДС"
      class="full-width"
      dropdown-icon="icon-pm-shevron-down"
      :rules="[(value)=>!!value]"
      popup-content-class="q-item__label__dropdown-option"
    />
    <div class="full-width" />
  </q-card-section>
</template>

<style lang="scss" scoped>
.partner-details-org__section {

  .q-field {
      min-width: 300px;      
      flex-grow: 1;
    }
}
</style>
