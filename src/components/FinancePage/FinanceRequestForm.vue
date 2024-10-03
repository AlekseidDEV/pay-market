<script setup>
import DefaultBtn from "@/components/ui/DefaultBtn.vue";
import InputField from "@/components/ui/InputField.vue";

import { Screen } from "quasar";
import { errorNotify } from "@/utils/errorNotify.js";
import { useMainStore } from "@/core/stores/index.js";
import { successNotify } from "@/utils/successNotify.js";
import {  inject, onMounted, ref } from "vue";

const emits = defineEmits(['updatePayoutTable'])

const $http = inject('$http')
const user = useMainStore().getUser

const userDetailsId = ref('')
const sumPayout = ref('')
const commentField = ref('')
const commisions = ref('')

const userDetailsOptions = ref([])


const sendRequestPayment = async () => {
    const {error, data, success} = await $http.setUserPayout({
        user_id: user.id,
        amount: sumPayout.value,
        requisites_id: userDetailsId.value,
        comment: commentField.value,
        decimal: commisions.value.replace(/\D/g, '')
    })

    if(error){
        console.error('Error: ' + error);
        errorNotify()
        return
    }

   if(success){
       successNotify('Запрос на выплату отправлен')
       emits('updatePayoutTable')
   }else {
       errorNotify(data.error)
   }
}

const calcCommision = (value) => {
    const option = userDetailsOptions.value.find((opt) => opt.id === value)

    if(option.usdt){
        commisions.value = '10%'
    }else {
        commisions.value = '0%'
    }
}

onMounted(async () => {
    const {error, data, status} = await $http.getPartnerDetailsList({user_id: user.id})

    if(status){
        data.forEach((detail) => {
            userDetailsOptions.value.push({id: detail.id, name: detail.fio || detail.short_name, usdt: detail.usdt})
        })

    }else {
        console.error(error);
        errorNotify()
        return
    }
})

</script>

<template>
  <q-card class="finance-payment-form__wrapper">
    <h2>Запросить выплату</h2>
    <q-form
      class="finance-payment-form__form"
      @submit="sendRequestPayment"
    >
      <div class="finance-payment-form__wrapper-fields">
        <div class="block">
          <InputField
            v-model="sumPayout"
            class="input-filed"
            placeholder="Сумма"
            :rules="[(value) => value !== '' && /^\d+$/gi.test(value)]"
          />
          <q-select
            v-model="userDetailsId"
            :options="userDetailsOptions"
            option-label="name"
            option-value="id"
            behavior="menu"
            emit-value
            map-options
            label="Выбрать реквзиты"
            popup-content-class="q-item__label__dropdown-option"
            class="form-select"
            standout
            clearable
            clear-icon="icon-pm-cross-sm"
            dropdown-icon="icon-pm-shevron-down"
            :rules="[(value) => !!value]"
            @update:model-value="calcCommision"
          />
          <InputField
            v-if="Screen.lt.md"
            v-model="commisions"
            class="finance-payment-form__field-percent field--grey"
            placeholder="Комиссия"
            readonly
          />
        </div>
        <div class="block">
          <InputField
            v-model="commentField"
            placeholder="Комментарий"
            filled
            autogrow
          />
        </div>
      </div>
      <div class="finance-payment-form__form-footer">
        <InputField
          v-if="!Screen.lt.md"
          v-model="commisions"
          class="finance-payment-form__field-percent field--grey"
          label="Комиссия"
          readonly
        />
        <default-btn class="finance-payment-form__btn">
          Создать
        </default-btn>
      </div>
    </q-form>
  </q-card>
</template>

<style lang="scss">

.finance-payment-form{
    &__wrapper{
        margin-top: 40px;
        border-radius: 22px;
        padding: 42px 52px 70px 52px;

        h2 {
            margin-bottom: 20px;
        }
    }
    &__wrapper.q-card{
        border-radius: 22px;
    }
    &__wrapper-fields{
        display: flex;
        justify-content: space-between;
        gap: 0px 10px;
        .block{
            max-width: 500px;
            width: 100%;
        }
        .input-filed{
            height: 56px;
            margin-bottom: 18px;
        }
        .form-select{
            &:last-child{
                margin-top: 18px;
            }
        }
    }
    &__field-percent{
        max-width: 190px;
        width: 100%;
        height: 58px;
    }
    &__form-footer{
        display: flex;
        justify-content: space-between;
        margin-top: 18px;
    }
    &__btn{
        height: 54px;
        max-width: 212px;
        width: 100%;
    }

    @media (max-width: 640px) {
        &__wrapper{
            text-align: center;
            padding: 18px 18px;
        }
        &__field-percent{
            margin-top: 15px;
            max-width: 100%;
        }
        &__wrapper-fields{
            flex-direction: column;
            .fields-block, .comment-block{max-width: 100%}
            .comment-block{
                margin-top: 50px;
                height: 110px;
            }
          .block{
            max-width: 100%;
            width: 100%;

            &:last-child{
              margin-top: 15px;
            }
          }
        }
        &__btn{
            margin: auto;
        }
    }
}
</style>