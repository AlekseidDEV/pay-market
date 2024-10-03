<script setup>
import InputField from "@/components/ui/InputField.vue";

import { validateByRegExp, partnerDetails as details } from "@/utils/validateUtils.js";
import { ref } from 'vue';

const partnerDetails = defineModel('partnerDetails')

const localeFormat = {
    months: ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"],
    monthsShort: ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"],
    daysShort: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"]
}

const isEqualAddress = ref(false)

const fioInputRef = ref(null)
const snilsInputRef = ref(null)
const addressInputRef = ref(null)
const registrationAddressInputRef = ref(null)

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
    class="partner-details-se__section-snils"
    style="gap: 18px;"
  >
    <div class="section-item">
      <q-input
        ref="snilsInputRef"
        v-model="partnerDetails.snils"
        standout
        label="СНИЛС"
        placeholder="СНИЛС"
        clearable
        clear-icon="icon-pm-cross-sm"
        :rules="[(value)=>!!value, (value) => validateByRegExp(value, details.snils)]"
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
    class="partner-details-se__section column"
    style="gap: 18px;"
  >
    <q-input
      ref="fioInputRef"
      v-model="partnerDetails.fio"
      standout
      label="ФИО"
      placeholder="ФИО"
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
    <div class="">
      <q-checkbox
        v-model="isEqualAddress"
        class="pm-checkbox"
        label="Почтовый адрес совпадает с адресом регистрации"
        checked-icon="check"
        unchecked-icon="check"
        @update:model-value="onUpdateEqualAddress"
      />
    </div>
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
</template>

<style lang="scss">
.partner-details-se__section-snils {
  display: flex;
  flex-direction: column;
  gap: 18px;

  @media (min-width: 742px){
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    .section-item {
      flex-grow: 1;
      width: 100%;
    }
  }
}

.partner-details-se__section {

  .q-field {
      min-width: 300px;      
      flex-grow: 1;
    }

  .pm-checkbox {
    .q-checkbox__icon {
      font-size: 25px;
    }    
  }
}
</style>