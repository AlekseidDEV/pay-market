<script setup>
import OfferToggleTable from "@/components/AdminOfferTogglePage/OfferToggleTable.vue";
import OfferToggleTableFilter from "@/components/AdminOfferTogglePage/OfferToggleTableFilter.vue";

import { inject, onMounted, ref } from "vue";
import { errorNotify } from "@/utils/errorNotify.js";

const $http = inject('$http')

const dataOffers = ref([])
const searchParams = ref({})

const getOffers = async () => {
    const {error, data} = await $http.getOffersToUser({
        ...searchParams.value
    })

    if(error){
        console.error('Error: ' + error);
        errorNotify()
        return
    }

    dataOffers.value.splice(0)

    data.forEach((item) => {
        dataOffers.value.push(
            {
                offerId: item.offer.id,
                userId: item.user.id,
                login: item.user.username,
                offerName: item.offer.name,
            }
        )
    })
}

const searchOffer = (params) => {
    Object.assign(searchParams.value, params)
    getOffers()
}

onMounted(() => {
    getOffers()
})
</script>

<template>
  <div>
    <q-card class="offer-toggle-container__wrapper">
      <OfferToggleTableFilter @search-offers="searchOffer" />
      <OfferToggleTable
        :rows-data="dataOffers"
        @update-table="getOffers"
      />
    </q-card>
  </div>
</template>

<style lang="scss">
    .q-card.offer-toggle-container__wrapper{
        margin-top: 40px;
        border-radius: 22px;
    }
</style>