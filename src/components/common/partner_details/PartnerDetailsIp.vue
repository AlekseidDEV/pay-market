<script setup>
import InputField from "@/components/ui/InputField.vue";

import { validateByRegExp, partnerDetails as details } from "@/utils/validateUtils.js";
import { ref } from 'vue';

const partnerDetails = defineModel('partnerDetails')

const ndsIdOptions = [
    { id: 1, label: "Без НДС" },
    { id: 2, label: "10%" },
    { id: 3, label: "20%" }
]

const localeFormat = {
    months: ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"],
    monthsShort: ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"],
    daysShort: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"]
}

const isEqualAddress = ref(false)

const ogrnInputRef = ref(null)
const nameInputRef = ref(null)
const shortNameInputRef = ref(null)
const addressInputRef = ref(null)
const legalAddressInputRef = ref(null)
const registrationAddressInputRef = ref(null)
const ndsIdSelectRef = ref(null)

const onUpdateEqualAddress = (value) => {
  if(value){
    replaceAddress()
    
  }    
}

const onUpdateRegistrationAddress = () => {
  if(isEqualAddress.value){
    replaceAddress()    
  }    
}

const replaceAddress = () => {  
  partnerDetails.value.address = partnerDetails.value.registration_address  
}
</script>

<template>
  <q-card-section 
    class="partner-details-ip__section"    
  >
    <div class="section-item">
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
    </div>
    <div class="section-item">
      <input-field
        v-model="partnerDetails.dr"
        label="Дата рождения"      
        class="message-lg"      
      >
        <template #append-slot>
          <q-icon
            name="calendar_today"
            class="cursor-pointer"
          >
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
              class="date-picker-menu"
            >
              <q-date
                v-model="partnerDetails.dr"
                class="pm-data-picker"
                mask="DD.MM.YYYY"
                minimal
                :locale="localeFormat"
              />
            </q-popup-proxy>
          </q-icon>
        </template>
      </input-field>
    </div>
  </q-card-section>
  <q-card-section
    class="partner-details-ip__section column"    
  >
    <q-input
      ref="nameInputRef"
      v-model="partnerDetails.name"
      standout
      label="Наименование"
      placeholder="Наименование"
      clearable
      clear-icon="icon-pm-cross-sm"
      :rules="[(value)=>!!value]"
      class="q-field--without-bottom-slot full-width"
    />
    <q-input
      ref="shortNameInputRef"
      v-model="partnerDetails.short_name"
      standout
      label="Сокращенное наименование"
      placeholder="Сокращенное наименование"
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
      ref="registrationAddressInputRef"
      v-model="partnerDetails.registration_address"
      standout
      label="Адрес регистрации"
      placeholder="Адрес регистрации"
      clearable
      clear-icon="icon-pm-cross-sm"      
      :rules="[(value)=>!!value]"      
      class="q-field--without-bottom-slot full-width"
      @update:model-value="onUpdateRegistrationAddress"      
    />    
    <q-checkbox
      v-model="isEqualAddress"
      class="partner-details-ip__checkbox pm-checkbox"
      label="Почтовый адрес совпадает с адресом регистрации"
      checked-icon="check"
      unchecked-icon="check"        
      @update:model-value="onUpdateEqualAddress"
    />    
    <q-input
      ref="addressInputRef"
      v-model="partnerDetails.address"
      :disable="isEqualAddress"
      standout
      label="Почтовый адрес"
      placeholder="Почтовый адрес"
      clearable
      clear-icon="icon-pm-cross-sm"
      :rules="[(value)=>!!value]"      
      class="q-field--without-bottom-slot full-width"
    />
  </q-card-section>
  <q-card-section class="partner-details-ip__section row no-wrap">
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

<style lang="scss">
.partner-details-ip__section {
  display: flex;
  flex-direction: column;
  gap: 18px;

  @media (min-width: 640px) {
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .section-item {    
    flex-grow: 1;
    width: 100%;
  }

  .pm-checkbox {
    .q-checkbox__icon {
      font-size: 25px;
    }    
  }
}
</style>
