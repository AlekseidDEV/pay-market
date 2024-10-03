<script setup>
import AdminTablePayout from "@/components/AdminPayotPage/AdminTablePayout.vue";
import AdminTablePayoutFilter from "@/components/AdminPayotPage/AdminTablePayoutFilter.vue";
import PartnerDetailsPreview from "@/components/common/partner_details/PartnerDetailsPreview.vue";

import { inject, onMounted, ref } from "vue";
import { errorNotify } from "@/utils/errorNotify.js";

const $http = inject('$http')

const requesitesId = ref(0)
const userComment = ref('')
const filterId = ref('0')
const isModal = ref(false)
const payoutList = ref([])

const getPayoutList = async () => {
    const { error, data } = await $http.getPayoutFullList(filterId.value === '0' ? '' : filterId.value)

    if(error){
        console.error('Error: ' + error);
        errorNotify('Произошла ошибка во время получения данных')
        return
    }

    payoutList.value.splice(0)
    Object.assign(payoutList.value, data.payout)
}

const filterChange = (id) => {
    filterId.value = id
    getPayoutList()
}

const showModalDetail = (id, comment) => {
    requesitesId.value = id
    isModal.value = true
    userComment.value = comment
}

onMounted( () => {
    getPayoutList()
})
</script>

<template>
  <div>
    <AdminTablePayoutFilter
      @change-filter="filterChange"
    />
    <AdminTablePayout
      :rows-data="payoutList"
      @update-payout="getPayoutList"
      @preview-detail="showModalDetail"
    />
    <PartnerDetailsPreview
      v-model="isModal"
      :details-id="requesitesId"
      :comment-text="userComment"
      @hide-dialog="isModal = false"
    />
  </div>
</template>

<style lang="scss">

</style>