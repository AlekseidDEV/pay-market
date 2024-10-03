<script setup>
import { computed, ref } from 'vue';
import { validateByRegExp, partnerDetails as details } from "@/utils/validateUtils.js";

const emit = defineEmits(['has-errors'])

const rsModel = defineModel('rsModel')
const ksModel = defineModel('ksModel')
const bikModel = defineModel('bikModel')
const bankModel = defineModel('bankModel')
const usdtModel = defineModel('usdtModel')

const paymentType = ref('bank-payment')

const rsInputRef = ref(null)
const ksInputRef = ref(null)
const bikInputRef = ref(null)
const bankInputRef = ref(null)
const usdtInputRef = ref(null)

// eslint-disable-next-line no-unused-vars
const hasErrors = computed(() => {
  const hasError = rsInputRef.value?.hasError
    || ksInputRef.value?.hasError
    || bikInputRef.value?.hasError
    || bankInputRef.value?.hasError
    || usdtInputRef.value?.hasError
    || false
  emit('has-errors', hasError)
  return hasError
})
</script>

<template>
  <q-card-section class="partner-payment-details column">
    <div>
      <h2>Платежные реквизиты</h2>
    </div>
    <div>
      <q-tabs
        v-model="paymentType"
        dense
        active-color="transparent"
        active-bg-color="transparent"
        indicator-color="transparent"
        breakpoint
        align="left"
        no-caps
      >
        <q-tab
          name="bank-payment"
          :ripple="false"
        >
          <q-chip
            outline
            clickable
            label="Банковские реквизиты"
            size="lg"
            :color="paymentType == 'bank-payment' ? 'red-13' : 'grey-13'"
          />
        </q-tab>
        <q-tab
          name="USDT"
          :ripple="false"
        >
          <q-chip
            outline
            clickable
            label="USDT"
            size="lg"
            :color="paymentType == 'USDT' ? 'red-13' : 'grey-13'"
          />
        </q-tab>
      </q-tabs>
    </div>

    <q-tab-panels
      v-model="paymentType"
      animated
      class="bg-purple-10"
    >
      <q-tab-panel
        name="bank-payment"
        class="q-pa-none"
      >
        <div class="partner-payment-details__fields column">
          <div class="partner-payment-details__row">
            <div class="section-item">
              <q-input
                ref="rsInputRef"
                v-model="rsModel"
                standout
                label="Расчетный счёт"
                placeholder="Расчетный счёт"
                clear-icon="icon-pm-cross-sm"
                clearable
                :rules="[(value) => validateByRegExp(value, details.rs)]"
                class="q-field--without-bottom-slot full-width"
              />
            </div>
            <div class="section-item">
              <q-input
                ref="ksInputRef"
                v-model="ksModel"
                standout
                label="Корреспондентский счёт"
                placeholder="Корреспондентский счёт"
                clearable
                clear-icon="icon-pm-cross-sm"
                :rules="[(value) => validateByRegExp(value, details.ks)]"
                class="q-field--without-bottom-slot full-width"
              />
            </div>
          </div>
          <div class="partner-payment-details__row">
            <div class="section-item">
              <q-input
                ref="bikInputRef"
                v-model="bikModel"
                standout
                label="БИК"
                placeholder="БИК"
                clearable
                clear-icon="icon-pm-cross-sm"
                :rules="[(value) => validateByRegExp(value, details.bic)]"
                class="q-field--without-bottom-slot full-width"
              />
            </div>
            <div class="section-item">
              <q-input
                ref="bankInputRef"
                v-model="bankModel"
                standout
                label="Банк"
                placeholder="Банк"
                clearable
                clear-icon="icon-pm-cross-sm"
                class="full-width"
              />
            </div>
          </div>
          <div class="partner-payment-details__row">
            <div class="section-item">
              <q-input
                model-value="Банковский перевод"
                standout
                disable
                label="Тип платежа"
                clearable
                clear-icon="icon-pm-cross-sm"
                class="q-field--without-bottom-slot full-width"
              />
            </div>
            <div class="section-item">
              <q-input
                model-value="Российский рубль"
                standout
                disable
                label="Валюта"
                clearable
                clear-icon="icon-pm-cross-sm"
                class="q-field--without-bottom-slot full-width"
              />
            </div>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="USDT">
        <div class="partner-payment-details__fields column">
          <q-input
            ref="usdtInputRef"
            v-model="usdtModel"
            standout
            label="Адрес кошелка"
            placeholder="Адрес кошелка"
            clearable
            clear-icon="icon-pm-cross-sm"
            popup-content-class="q-item__label__dropdown-option"
            class="q-field--without-bottom-slot full-width"
          />
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-card-section>
</template>

<style lang="scss">
.partner-payment-details {
  gap: 18px;

  .q-tab {
    padding: 0;

    .q-focus-helper {
      visibility: hidden;
    }

    .q-tab__content {
      padding: 0;
    }
  }

  >div:first-child {
    height: 24px;
  }

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 18px;

  }

  &__row {
    display: flex;
    flex-direction: column;
    gap: 18px;

    @media (min-width: 640px) {
      flex-direction: row;
      flex-wrap: nowrap;
      gap: 18px;
    }
  }

  .section-item {
    flex-grow: 1;
    width: 100%;

  }

  .q-field input {
    font-size: 14px;
  }

  .q-input {
    .q-field__append {
      padding-right: 8px;
    }

    &.q-field--disabled {
      .q-field__control {
        background-color: #f3f4f721;

        .q-field__label,
        .q-field__native {
          color: #8c8b8e;
        }
      }
    }
  }
}
</style>
