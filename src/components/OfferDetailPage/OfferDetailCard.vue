<script setup>
import DefaultBtn from "@/components/ui/DefaultBtn.vue";

import { inject, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { errorNotify } from "@/utils/errorNotify.js";
import { formatedLocalDate } from "../../utils/formatedLocalDate.js";
import {Notify} from "quasar";

const emits = defineEmits(['connecting'])

const props = defineProps({
    isDisabledBtn: {
        type: Boolean,
        required: true,
        default: false
    }
})

const routerId = useRoute().params.id
const $http = inject('$http')

const uploadsBaseUrl = import.meta.env.VITE_UPLOADS_BASE_URL

const cardOfferInfo = ref({})
const offerDateAddFormat = ref('')

const getOfferDetails = async () => {
    const {error, data, status} = await $http.getOfferById(routerId)

    if(status){
        cardOfferInfo.value = data
        offerDateAddFormat.value = formatedLocalDate(cardOfferInfo.value.date_add).formateDate
    }else {
        console.error('Error: ' + error);
        errorNotify()
    }
}

const showMessage = () => {
  if(props.isDisabledBtn){
    Notify.create({
      message: 'Для отключения офера свяжитесь с техподдержкой',
      color: 'warning',
      textColor: 'dark',
      position: 'top-right',
      icon: 'warning',
      timeout: 6000
    })
  }
}

onMounted( () => {
    getOfferDetails()
})
</script>

<template>
  <q-card class="card-offer-detail">
    <div class="card-offer-detail__logo">
      <img
        :src="uploadsBaseUrl + cardOfferInfo.logo"
        alt="icon"
      >
      <div class="logo--titles">
        <p>Категория</p>
        <p>{{ cardOfferInfo.category?.name }}</p>
      </div>
    </div>
    <div class="card-offer-detail__btns">
      <button>{{ cardOfferInfo.category?.name }}</button>
      <span>ID оффера: {{ cardOfferInfo.id }}</span>
    </div>
    <div class="card-offer-detail__list">
      <div>
        <div><q-icon name="icon-pm-globe-filled" /> Домен: <span>{{ cardOfferInfo.domine }}</span></div>
        <div><q-icon name="icon-pm-calendar-filled" /> Дата запуска: <span>{{ offerDateAddFormat }}</span></div>
        <div><q-icon name="icon-pm-location-filled" /> Страна: <span>{{ cardOfferInfo.country?.name }}</span></div>
        <div><q-icon name="icon-pm-rubel-filled" /> Оплата за целевое действие: <span>{{ cardOfferInfo.target_action_price }} ₽</span></div>
        <div><q-icon name="icon-pm-target-bold" /> Целевое действие: <span>{{ cardOfferInfo.targetAction?.name }}</span></div>
      </div>

      <div>
        <default-btn
          class="card-offer-detail__btn-connect"
          :disable="isDisabledBtn"
          bg-color="pink"
          @click="emits('connecting')"
          @mouseenter="showMessage"
        >
          {{ isDisabledBtn ? 'Уже подключено' : 'Подключить' }}
        </default-btn>
      </div>
    </div>
  </q-card>
</template>

<style scoped lang="scss">
.card-offer-detail{
    padding: 24px 24px 30px 24px;
    border-radius: 22px;
    margin-top: 20px;
    margin-bottom: 41px;
    &__btn-connect{
        padding: 15px 40px;

      &:disabled{
        cursor: help !important;
      }
    }
    &__logo{
        display: flex;
        align-items: center;
        gap: 0px 24px;

        .logo--titles{
            p:first-child{
                color: rgb(140, 139, 142);
                font-size: 15px;
                font-weight: 400;
                line-height: 18px;
                text-align: left;
                margin-bottom: 6px;
            }
            p:last-child{
                color: rgb(255, 255, 255);
                font-size: 24px;
                font-weight: 600;
                line-height: 28px;
                text-align: left;
            }
        }
       img{
           max-width: 58px;
           width: 100%;
           height: 58px;
           border-radius: 50px;
       }
        p{
            margin: 0;
        }
    }
    &__btns{
        display: flex;
        align-items: center;
        gap: 20px;
        flex-wrap: wrap;
        position: absolute;
        top: 15px;
        right: 17px;
        button{
            background: transparent;
            border: 1px solid #F90042;
            border-radius: 50px;
            color: #F90042;
            padding: 10px 17px;
        }
        span{
            background: #252136;
            border-radius: 50px;
            font-size: 15px;
            font-weight: 400;
            color: rgb(140, 139, 142);
            padding: 3px 17px;
        }
    }
    &__list{
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: end;
        flex-wrap: wrap;
        div{
            font-size: 15px;
            font-weight: 400;
            line-height: 18px;
            text-align: left;
            color: #8c8c8e;
            margin-bottom: 15px;
            i{
                color: #F90042;
                margin-right: 15px;
                font-size: 20px;
            }
            span{
                color: white;
                white-space: nowrap;
            }
        }
    }
    @media (max-width: 690px) {
        &__btns{
            position: static;
            margin: 17px 0;
        }
    }
}
</style>