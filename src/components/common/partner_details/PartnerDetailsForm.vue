<script setup>
import PartnerPaymentDetails from './PartnerPaymentDetails.vue';
import PartnerDetailsIp from '@/components/common/partner_details/PartnerDetailsIp.vue';
import PartnerDetailsOrg from '@/components/common/partner_details/PartnerDetailsOrg.vue';
import PartnerDetailsSe from '@/components/common/partner_details/PartnerDetailsSe.vue';
import PartnerDetailsIndividual from '@/components/common/partner_details/PartnerDetailsIndividual.vue';
import DefaultBtn from '@/components/ui/DefaultBtn.vue'

import { computed, watch, ref, reactive, inject } from 'vue';
import { validateByRegExp, partnerDetails as details } from "@/utils/validateUtils.js";
import { errorNotify } from "@/utils/errorNotify.js";
import { fullscreenSpinner } from '@/utils/fullscreenSpinner.js';
import { successNotify } from "@/utils/successNotify.js";

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  userId: {
    type: [Number, null],
    default: null
  },
  detailsId: {
    type: [Number, null],
    default: null,
  }
})

const emit = defineEmits(['update:model-value', 'hide-dialog', 'details-created', 'details-updated'])

const spinner = fullscreenSpinner()
const $http = inject('$http')

const partnerTypes = [
  { name: 'individual', id: 1, label: "Физическое лицо (ГПХ)", component: PartnerDetailsIndividual },
  { name: 'self-employed', id: 2, label: "Самозанятый", component: PartnerDetailsSe },
  { name: 'manufacturer', id: 3, label: "Индивидуальный предприниматель", component: PartnerDetailsIp },
  { name: 'company', id: 4, label: "Юридическое лицо", component: PartnerDetailsOrg },
]

const initialPartnerDetails = {
  user_id: props.userId,
  form_id: null,
  id: null,
  fio: null,
  snils: null,
  inn: null,
  kpp: null,
  ogrn: null,
  name: null,
  short_name: null,
  registration_address: null,
  address: null,
  legal_address: null,
  nds_id: null,
  rs: null,
  ks: null,
  bik: null,
  bank: null,
  dr: null,
  usdt: null
}

const showFormDialog = defineModel('showFormDialog')
const partnerDetails = reactive({ ...initialPartnerDetails })

const partnerTypeSelectRef = ref(null)
const partnerInnInputRef = ref(null)
const formDialogRef = ref(null)

const isPaymentDetailsError = ref(false)

const partnerTypeComponent = computed(() => {
  const partnerTypeItem = partnerTypes.find(item => item.id === partnerDetails.form_id)
  return partnerTypeItem?.component
})

watch(() => props.detailsId, async (newId) => {
  if (newId && showFormDialog.value) {
    await fetchPartnerDetails(props.detailsId)
  }
})

const hideFormDialog = () => {
  formDialogRef.value.hide()
}

const onPaymentDetailsError = (value) => {
  isPaymentDetailsError.value = value
}

const fetchPartnerDetails = async (id) => {
  spinner.show()
  const { error, data, success } = await $http.getPartnerDetailsItem({ id: id })
  if (error) {
    errorNotify(typeof error === 'string' ? error : "Ошибка получения данных")
    console.log(error)
  }
  spinner.hide()

  if (success) {
    Object.assign(partnerDetails, data)
  }
}

const onFormSubmit = async () => {
  spinner.show()
  const requestData = { ...partnerDetails }

  if (props.detailsId) {
    requestData.id = props.detailsId

    const { error, success } = await $http.updatePartnerDetails(requestData)

    if (error) {
      errorNotify(typeof error === 'string' ? error : "Ошибка обновления реквизитов")
      console.log(error)
      spinner.hide()
    }

    if (success) {
      emit('details-updated')
      spinner.hide()
      formDialogRef.value.hide()
        successNotify('Реквизит обновлен')
    }
  } else {
    const { error, success } = await $http.createPartnerDetails(requestData)

    if (error) {
      errorNotify(typeof error === 'string' ? error : "Ошибка создания реквизитов")
      console.log(error)
      spinner.hide()
    }

    if (success) {
      emit('details-created')
      spinner.hide()
      formDialogRef.value.hide()
        successNotify('Реквизит добавлен')
    }
  }
}

const onFormVlidationError = () => {
  errorNotify("Зполните необходимые поля")
}

const onFormCancel = async () => {
  Object.assign(partnerDetails, initialPartnerDetails)
  formDialogRef.value.hide()
}

const onHideDialog = () => {
  Object.assign(partnerDetails, initialPartnerDetails)
  emit('hide-dialog')
}



</script>

<template>
  <q-dialog
    ref="formDialogRef"
    v-model="showFormDialog"
    transition-show="rotate"
    transition-hide="rotate"
    class="partner-details-form"
    @hide="onHideDialog"
  >
    <q-card
      class="partner-details-form__container bg-purple-10 column no-wrap"      
    >
      <q-card-section class="partner-details-form__header">
        <h2>{{ props.title }}</h2>
        <q-btn
          class="q-py-xs bg-purple-12"
          round
          size="10px"
          style="height: 40px; width: 40px;"
          @click="hideFormDialog"        
        >
          <q-icon
            name="icon-pm-cross"
            size="14px"
          />
        </q-btn>
      </q-card-section>      
      <q-scroll-area style="height: 100%;">
        <q-form
          class="partner-details-form"
          @submit="onFormSubmit"
          @reset="onFormCancel"
          @validation-error="onFormVlidationError"
        >        
          <q-card-section class="partner-details-form__selection">            
            <div class="selection-item">
              <q-select
                ref="partnerTypeSelectRef"
                v-model="partnerDetails.form_id"
                :options="partnerTypes"
                :multiple="false"
                :disable="!!detailsId" 
                behavior="menu"               
                option-value="id"
                option-label="label"
                map-options
                standout
                emit-value
                label="Тип"
                placeholder="Тип"
                clearable
                clear-icon="icon-pm-cross-sm"
                dropdown-icon="icon-pm-shevron-down"
                popup-content-class="q-item__label__dropdown-option"
                :rules="[(value) => !!value]"              
              />         
            </div>   
            <div class="selection-item">
              <q-input
                ref="partnerInnInputRef"
                v-model="partnerDetails.inn"
                standout
                label="ИНН"
                placeholder="ИНН"
                clearable
                clear-icon="icon-pm-cross-sm"
                :rules="[(value) => !!value, (value) => validateByRegExp(value, details.inn)]"
                class="q-field--without-bottom-slot"
              />
            </div>
          </q-card-section>          
          <component
            :is="partnerTypeComponent"
            v-if="partnerDetails.form_id"
            v-model:partner-details="partnerDetails"
          />
          <PartnerPaymentDetails
            v-if="partnerTypeComponent"
            v-model:rs-model="partnerDetails.rs"
            v-model:ks-model="partnerDetails.ks"
            v-model:bik-model="partnerDetails.bik"
            v-model:bank-model="partnerDetails.bank"
            v-model:usdt-model="partnerDetails.usdt"
            @has-errors="onPaymentDetailsError"
          />        
          <q-card-section
            v-if="partnerTypeComponent"
            class="partner-details-form__actions row wrap"
          >
            <DefaultBtn type="submit">
              Отправить
            </DefaultBtn>
            <DefaultBtn
              type="reset"
              bg-color="dark"
            >
              Отменить
            </DefaultBtn>
          </q-card-section>
        </q-form>      
      </q-scroll-area>
    </q-card>
  </q-dialog>
</template>


<style lang="scss">
.q-dialog__inner--minimized > .partner-details-form__container {

  @media (min-width: 320px) {
    max-width: 1125px;
    width: 100%;
  }
}

.partner-details-form {

  &__container {
    padding: 22px;
    height: 90vh;
    display: flex;
    flex-direction: column;    

    .q-card__section {
      padding-top: 9px;
      padding-bottom: 9px;

      @media (max-width: 420px) {
        padding-inline: 0px;        
      }
    }
  }

  &__header {
    padding: 0;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-between;
  }

  &__selection {    
    display: flex;
    flex-direction: column;
    gap: 18px;

    @media (min-width: 900px){
      flex-direction: row;
      flex-wrap: nowrap;
      .selection-item {
        flex-grow: 1;
        width: 100%;
      }
    }
  }

  &__actions {
    gap: 18px;

    > button {
      width: 162px;
      padding: 20px 0;
    }
  }
}
</style>
