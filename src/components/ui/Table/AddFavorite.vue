<script setup>
import { errorNotify } from "@/utils/errorNotify.js";
import { successNotify } from "@/utils/successNotify.js";
import { inject } from "vue";

const $http = inject('$http')
const model = defineModel()

const addFavoriteOffer = async (userId, rowId) => {
    const {error} = await $http.setUserFavorites({
        user_id: userId,
        offer_id: rowId
    })

    if(error){
        errorNotify("Не получилось добавить оффер в избранное")
        console.error("Error: " + error);
        return
    }

    successNotify('Добавленно в избранное')
}

const deleteFavoriteOffer = async (userId, rowId) => {
    const {error} = await $http.delUserFavorites({
        user_id: userId,
        offer_id: rowId
    })

    if(error){
        errorNotify("Не удалось удалить оффер")
        console.error("Error: " + error);
        return
    }

    successNotify('Удалено из избранного')
}

defineExpose({
    deleteFavoriteOffer,
    addFavoriteOffer
})
</script>

<template>
  <q-checkbox
    v-model="model"
    checked-icon="star"
    unchecked-icon="star_border"
    indeterminate-icon="star_border"
  />
</template>

<style scoped lang="scss">

</style>