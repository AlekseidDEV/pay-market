<script setup>

import HomeTableFilter from "@/components/HomePage/HomeTableFilter.vue";
import HomeOffersTable from "@/components/HomePage/HomeOffersTable.vue";

import { inject, onMounted, ref } from "vue";
import { errorNotify } from "@/utils/errorNotify.js";

const $http = inject('$http')
const offersList = ref([])
const isRowSelected = ref(false)
const targetScroll = ref(null)

const getOfferList = async (id = 3) => {
    const {error, data} = await $http.getOffersByParams({
        ...(id > 2 ? {category_id: id} : {}),
        ...(id === 1 ? {enebled: true} : {}),
        ...(id === 2 ? {favorites: true} : {})
    })

    if(error){
        offersList.value.splice(0)
        isRowSelected.value = false
        errorNotify()
        console.error('Error: ' + error);
        return
    }

    id === 2 ? isRowSelected.value = true : isRowSelected.value = false
    offersList.value.splice(0)
    Object.assign(offersList.value, data.offer)
}

defineExpose({
    targetScroll
})

onMounted(() => {
    getOfferList()
})
</script>

<template>
  <div class="home-table-container">
    <h2>Офферы для вас</h2>
    <HomeTableFilter @change-filter="getOfferList" />
    <div ref="targetScroll">
      <HomeOffersTable
        :rows-data="offersList"
        :is-all-selected-rows="isRowSelected"
      />
    </div>
  </div>
</template>

<style  lang="scss">
.home-table-container{
    margin-top: 90px;
    margin-bottom: 90px;
    @media (max-width: 525px) {
        margin-top: 31px;
        margin-bottom: 30px;

        h2 {
            font-size: 20px;
        }
    }
}
</style>