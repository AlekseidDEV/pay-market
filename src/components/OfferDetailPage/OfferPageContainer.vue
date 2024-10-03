<script setup>
import TrafficSourceContainer from "@/components/OfferDetailPage/TrafficSourceContainer.vue";
import OfferDetailCard from "@/components/OfferDetailPage/OfferDetailCard.vue";

import { successNotify } from "@/utils/successNotify.js";
import { errorNotify } from "@/utils/errorNotify.js";
import { useRoute } from "vue-router";

import { useMainStore } from "@/core/stores/index.js";
import { inject, onMounted, ref } from "vue";

const $http = inject('$http')
const user = useMainStore().getUser
const offerIdParams = useRoute().params.id

const isOfferTrafficSource = ref(false)

const connectOffer = async () => {
    const {error, status} = await $http.setOfferToUser({
        offer_id: offerIdParams,
        user_id: user.id
    })

    if(error){
        console.error('Error: ' + error);
        errorNotify()
        return
    }

    isOfferTrafficSource.value = true

    if(status){
        successNotify('Оффер подключен')
    }else {
        successNotify('Оффер уже подключен')
    }
}

const isConnectOffer = async () => {
    const {error, data} = await $http.offerIssetByUser()

    if(error){
        console.error('Error: ' + error);
        errorNotify()
        return
    }

   isOfferTrafficSource.value = data.en.some((offer) => {
       if(+offerIdParams === offer.offer_id){
           return true
       }else {
           return false
       }
   })
}

onMounted(() => {
    isConnectOffer()
})
</script>

<template>
  <div class="offer-page-container__wrapper">
    <OfferDetailCard
      :is-disabled-btn="isOfferTrafficSource"
      @connecting="connectOffer"
    />
    <transition name="traffic">
      <TrafficSourceContainer v-if="isOfferTrafficSource" />
    </transition>
  </div>
</template>

<style lang="scss">

.offer-page-container{
    &__wrapper{
        .traffic-enter-active,
        .traffic-leave-active {
            transition: opacity 0.5s ease;
        }

        .traffic-enter-from,
        .traffic-leave-to {
            opacity: 0;
        }
    }
}
</style>