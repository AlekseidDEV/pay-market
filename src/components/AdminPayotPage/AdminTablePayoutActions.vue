<script setup>

import DefaultBtn from "@/components/ui/DefaultBtn.vue";

import { inject } from "vue";
import { errorNotify } from "@/utils/errorNotify.js";
import { successNotify } from "@/utils/successNotify.js";

const props = defineProps({
    rowPayout: {
        type: [Object, undefined],
        required: true,
        default: () => {}
    }
})

const emits = defineEmits(['approve', 'reject'])

const $http = inject('$http')

const approvePayout = async () => {
    const {error, status} = await $http.payoutSucces({
        user_id: props.rowPayout.user_id,
        payout_id: props.rowPayout.id,
    })

    if(status !== 200){
        console.error("Error: " + error);
        errorNotify()
        return
    }else {
        successNotify('Выплата одобрена')
        emits('approve')
    }
}

const rejectPayout = async () => {
    const {error, status} = await $http.payoutFail({
        payout_id: props.rowPayout.id,
    })

    if(status !== 200){
        console.error("Error: " + error);
        errorNotify()
        return
    }else {
        successNotify('Выплата отклонена')
        emits('reject')
    }
}
</script>

<template>
  <div class="admin-payout-table-actions">
    <DefaultBtn
      class="admin-payout-table-actions__approve"
      :border="false"
      bg-color="pink"
      @click.stop="approvePayout"
    >
      <q-icon
        name="icon-pm-approve"
        size="10px"
      />
    </DefaultBtn>
    <DefaultBtn
      class="admin-payout-table-actions__reject"
      bg-color="dark"
      :border="false"
      @click.stop="rejectPayout"
    >
      <q-icon
        name="icon-pm-cross"
        size="10px"
      />
    </DefaultBtn>
  </div>
</template>

<style  lang="scss">
.admin-payout-table-actions{
    display: flex;
    justify-content: center;
    gap: 10px;
    &__approve, &__reject{
        padding: 8px 10px;
    }
}
</style>