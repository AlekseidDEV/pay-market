<script setup>

import InputField from "@/components/ui/InputField.vue";
import DefaultBtn from "@/components/ui/DefaultBtn.vue";

import { Screen } from "quasar";
import { reactive } from "vue";

const emits = defineEmits(['search-offers'])

const filterParams = reactive({
    "user_id": '',
    "offer_id": ''
})

</script>

<template>
  <div class="offer-toggle-filter__wrapper">
    <q-scroll-area
      v-if="Screen.width > 440"
      style="height: 40px; max-width: 450px; width: 100%"
    >
      <div class="offer-toggle-filter__fields">
        <InputField
          v-model="filterParams.user_id"
          dense
          label="ID Пользователя"
          @keyup.enter="emits('search-offers', filterParams)"
        />
        <InputField
          v-model="filterParams.offer_id"
          dense
          label="ID Оффера"
          @keyup.enter="emits('search-offers', filterParams)"
        />
      </div>
    </q-scroll-area>
    <div v-else>
      <div class="offer-toggle-filter__fields">
        <InputField
          v-model="filterParams.user_id"
          dense
          label="ID Пользователя"
        />
        <InputField
          v-model="filterParams.offer_id"
          dense
          label="ID Оффера"
        />
      </div>
    </div>
    <div class="offer-toggle-filter__wrapper-btn">
      <DefaultBtn
        :border="false"
        class="offer-toggle-filter__btn-search"
        @click="emits('search-offers', filterParams)"
      >
        <q-icon
          name="search"
          size="25px"
        />
      </DefaultBtn>
    </div>
  </div>
</template>

<style lang="scss">
    .offer-toggle-filter{
        &__wrapper{
            display: flex;
            padding: 20px 15px 20px 15px;
        }
        &__fields{
            display: flex;
            gap: 10px;

            label {
                width: 220px;
            }
        }
        &__btn-search{
            margin-left: 15px;
            height: 100%;
            padding: 7px;
        }
        @media (max-width: 440px) {
            &__wrapper{
                flex-direction: column;
            }
            &__fields{
                flex-direction: column;
                label {
                    width: 100%;
                }
            }
            &__wrapper-btn{
                text-align: center;
            }
            &__btn-search{
                margin-top: 15px;
                margin-left: 0;
            }
        }
    }
</style>